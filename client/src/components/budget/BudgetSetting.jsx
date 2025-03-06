"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from "react-bootstrap"
import { Slider } from "@mui/material"
import axios from "axios"
import Sidebar from "../dashboard/Sidebar"

const BudgetSetting = () => {
  const [budget, setBudget] = useState(2000)
  const [alertThreshold, setAlertThreshold] = useState(80)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "/api/budget/set",
        { budget, alertThreshold },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      setSuccess("Budget settings saved successfully!")
      setError("")
    } catch (err) {
      setError("Failed to save budget settings. Please try again.")
      setSuccess("")
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Container className="p-4">
          <h1 className="mb-4">Energy Budget Settings</h1>

          <Row>
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  {success && <Alert variant="success">{success}</Alert>}
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Monthly Budget (₹)</Form.Label>
                      <div className="d-flex align-items-center">
                        <Slider
                          value={budget}
                          onChange={(e, newValue) => setBudget(newValue)}
                          min={500}
                          max={10000}
                          step={100}
                          valueLabelDisplay="auto"
                          aria-labelledby="budget-slider"
                          className="me-3 flex-grow-1"
                        />
                        <Form.Control
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          style={{ width: "100px" }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Alert Threshold (% of budget)</Form.Label>
                      <div className="d-flex align-items-center">
                        <Slider
                          value={alertThreshold}
                          onChange={(e, newValue) => setAlertThreshold(newValue)}
                          min={50}
                          max={95}
                          step={5}
                          valueLabelDisplay="auto"
                          aria-labelledby="threshold-slider"
                          className="me-3 flex-grow-1"
                        />
                        <Form.Control
                          type="number"
                          value={alertThreshold}
                          onChange={(e) => setAlertThreshold(Number(e.target.value))}
                          style={{ width: "100px" }}
                        />
                      </div>
                      <Form.Text className="text-muted">
                        You will receive alerts when your energy usage reaches this percentage of your budget.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Notification Preferences</Form.Label>
                      <Form.Check type="checkbox" label="Email notifications" defaultChecked className="mb-2" />
                      <Form.Check type="checkbox" label="In-app notifications" defaultChecked className="mb-2" />
                      <Form.Check type="checkbox" label="SMS notifications (additional charges may apply)" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Save Budget Settings
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm mb-4" style={{ backgroundColor: "#1A2B50", color: "white" }}>
                <Card.Body>
                  <h5>Current Month Usage</h5>
                  <h2>₹1,450</h2>
                  <div className="d-flex justify-content-between mt-3">
                    <span>Budget: ₹{budget}</span>
                    <span>{Math.round((1450 / budget) * 100)}%</span>
                  </div>
                  <ProgressBar
                    now={(1450 / budget) * 100}
                    variant={(1450 / budget) * 100 > alertThreshold ? "danger" : "success"}
                    className="mt-2"
                  />
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Body>
                  <h5>Budget Tips</h5>
                  <ul className="mt-3">
                    <li>Set your budget based on your historical usage patterns</li>
                    <li>Consider seasonal variations in energy consumption</li>
                    <li>Adjust your alert threshold to get timely notifications</li>
                    <li>Review your budget settings monthly for better energy management</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default BudgetSetting

