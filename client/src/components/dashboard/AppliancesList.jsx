import { Card, ListGroup } from "react-bootstrap";
import { Coffee, Smartphone, Tv, Wifi, Wind } from "react-feather";

const AppliancesList = () => {
  // Sample data - replace with actual data from API
  const appliances = [
    { id: 1, name: "Television", icon: Tv, usage: "0.8 kWh", status: "active" },
    { id: 2, name: "Coffee Maker", icon: Coffee, usage: "1.2 kWh", status: "active" },
    { id: 3, name: "Ceiling Fan", icon: Wind, usage: "0.5 kWh", status: "active" },
    { id: 4, name: "WiFi Router", icon: Wifi, usage: "0.3 kWh", status: "active" },
    { id: 5, name: "Phone Charger", icon: Smartphone, usage: "0.1 kWh", status: "active" },
  ];

  // const AppliancesList = () => {
  //   const [appliances, setAppliances] = useState([]);
  
  //   useEffect(() => {
  //     // Fetch data from API
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:5000/api/appliances");
  //         setAppliances(response.data);
  //       } catch (error) {
  //         console.error("Error fetching appliances data:", error);
  //       }
  //     };
  
  //     fetchData();
  //   }, []);

  return (
    <Card className="h-100 shadow-sm" style={{ backgroundColor: "#1A2B50", color: "white" }}>
      <Card.Header>ACTIVE APPLIANCES</Card.Header>
      <Card.Body className="p-0">
        <ListGroup variant="flush">
          {appliances.map((appliance) => (
            <ListGroup.Item
              key={appliance.id}
              className="d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "transparent", color: "white", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{ width: "40px", height: "40px", backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <appliance.icon size={20} />
                </div>
                <div>{appliance.name}</div>
              </div>
              <div>{appliance.usage}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AppliancesList;

