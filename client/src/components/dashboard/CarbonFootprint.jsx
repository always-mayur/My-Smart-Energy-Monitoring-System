import { Card, ProgressBar } from "react-bootstrap"

const CarbonFootprint = () => {
  // Sample data - replace with actual data from API
  const carbonData = [
    { label: "Electricity", value: 75, color: "#4EEBC5" },
    { label: "Gas", value: 45, color: "#FFE14D" },
    { label: "Water", value: 30, color: "#5D9CEC" },
  ]

  return (
    <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
      <Card.Header>CARBON FOOTPRINT</Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <h2>120 kg CO₂e</h2>
          <p>Monthly Carbon Emissions</p>
        </div>

        {carbonData.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>{item.label}</span>
              <span>{item.value} kg</span>
            </div>
            <ProgressBar
              now={item.value}
              max={100}
              style={{ height: "10px" }}
              variant="info"
              className="custom-progress"
            />
          </div>
        ))}

        <div className="mt-4 text-center">
          <p>15% less than last month</p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CarbonFootprint

