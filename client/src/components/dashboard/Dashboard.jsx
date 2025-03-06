"use client"

import axios from "axios"
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { useEffect, useState } from "react"
import { Card, Col, Container, Nav, Row } from "react-bootstrap"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import AppliancesList from "./AppliancesList"
import CarbonFootprint from "./CarbonFootprint"
import EnergyIntensity from "./EnergyIntensity"
import Sidebar from "./Sidebar"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title)

const Dashboard = () => {
  const [period, setPeriod] = useState("month")
  const [energyData, setEnergyData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/energy/data?period=${period}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setEnergyData(res.data)
      } catch (err) {
        console.error("Error fetching energy data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [period])

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard data...</div>
  }

  // Sample data for charts (replace with actual data from API)
  const costData = {
    labels: ["Electricity", "Gas"],
    datasets: [
      {
        data: [180, 34],
        backgroundColor: ["#4EEBC5", "#FFE14D"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  }

  const changeInCostData = {
    labels: ["Feb", "Mar"],
    datasets: [
      {
        label: "Monthly Cost",
        data: [203, 214],
        backgroundColor: ["#4EEBC5", "#4EEBC5"],
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  }

  const usageEstimateData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "kWh",
        data: [120, 300, 180, 450],
        borderColor: "#FF5C5C",
        backgroundColor: "rgba(255, 92, 92, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#FF5C5C",
        pointBorderColor: "#FFFFFF",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Container fluid className="p-4">
          <h1 className="mb-4">Energy Dashboard</h1>

          <div className="mb-4">
            <Nav variant="pills" className="d-inline-flex">
              <Nav.Item>
                <Nav.Link active={period === "today"} onClick={() => setPeriod("today")} className="rounded-pill">
                  TODAY
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={period === "month"} onClick={() => setPeriod("month")} className="rounded-pill">
                  MONTH
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={period === "year"} onClick={() => setPeriod("year")} className="rounded-pill">
                  YEAR
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Row className="mb-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
                <Card.Header>COST PREDICTED</Card.Header>
                <Card.Body className="d-flex justify-content-center align-items-center">
                  <div style={{ position: "relative", width: "200px", height: "200px" }}>
                    <Doughnut
                      data={costData}
                      options={{ plugins: { legend: { position: "right", labels: { color: "white" } } } }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <div className="ml-5">
                      <div>Total</div>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>₹214</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
                <Card.Header>CHANGE IN COST</Card.Header>
                <Card.Body>
                  <div className="d-flex flex-column h-100">
                    <div style={{ flex: 1 }}>
                      <Bar
                        data={changeInCostData}
                        options={{
                          plugins: { legend: { display: false } },
                          scales: {
                            y: {
                              grid: { color: "rgba(255, 255, 255, 0.1)" },
                              ticks: { color: "white" },
                            },
                            x: {
                              grid: { display: false },
                              ticks: { color: "white" },
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="text-center mt-3">
                      <div style={{ color: "#FF5C5C", fontSize: "24px", fontWeight: "bold" }}>5.42%</div>
                      <div>INCREASE IN COST</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
                <Card.Header>USAGE ESTIMATE</Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <span>Till Now: </span>
                    <span style={{ fontWeight: "bold" }}>45.2 kWh</span>
                    <span className="ms-4">Predicted: </span>
                    <span style={{ fontWeight: "bold" }}>460 kWh</span>
                  </div>
                  <Line
                    data={usageEstimateData}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          grid: { color: "rgba(255, 255, 255, 0.1)" },
                          ticks: { color: "white" },
                        },
                        x: {
                          grid: { display: false },
                          ticks: { color: "white" },
                        },
                      },
                    }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <AppliancesList />
            </Col>
            <Col md={4}>
              <EnergyIntensity />
            </Col>
            <Col md={4}>
              <CarbonFootprint />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard

