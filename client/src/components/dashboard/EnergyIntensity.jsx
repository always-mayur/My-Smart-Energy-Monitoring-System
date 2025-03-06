import { Card } from "react-bootstrap"
import { Bar } from "react-chartjs-2"

const EnergyIntensity = () => {
  // Sample data - replace with actual data from API
  const energyIntensityData = {
    labels: ["Kitchen", "Living Room", "Bedroom", "Bathroom", "Office"],
    datasets: [
      {
        label: "kWh/m²",
        data: [12, 8, 5, 3, 9],
        backgroundColor: "#4EEBC5",
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  }

  return (
    <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
      <Card.Header>ENERGY INTENSITY</Card.Header>
      <Card.Body>
        <Bar
          data={energyIntensityData}
          options={{
            indexAxis: "y",
            plugins: { legend: { display: false } },
            scales: {
              y: {
                grid: { display: false },
                ticks: { color: "white" },
              },
              x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "white" },
              },
            },
          }}
        />
      </Card.Body>
    </Card>
  )
}

export default EnergyIntensity

