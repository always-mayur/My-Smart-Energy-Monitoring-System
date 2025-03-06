import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import Sidebar from "../dashboard/Sidebar";

const Appliances = () => {
  const appliances = [
    { id: 1, name: 'HVAC', location: 'Whole House', usage: '18.2 kWh', percentage: '36%', status: 'High Usage', lastUpdated: 'Today, 2:30 PM' },
    { id: 2, name: 'Refrigerator', location: 'Kitchen', usage: '12.5 kWh', percentage: '25%', status: 'Normal', lastUpdated: 'Today, 2:30 PM' },
    { id: 3, name: 'Washing Machine', location: 'Laundry Room', usage: '8.7 kWh', percentage: '17%', status: 'Normal', lastUpdated: 'Today, 2:30 PM' },
    { id: 4, name: 'Lights', location: 'Whole House', usage: '5.8 kWh', percentage: '11%', status: 'Efficient', lastUpdated: 'Today, 2:30 PM' },
    { id: 5, name: 'TV', location: 'Living Room', usage: '5.3 kWh', percentage: '11%', status: 'Efficient', lastUpdated: 'Today, 2:30 PM' },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Container fluid className="p-4">
          <h1 className="mb-4">Appliances</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Appliance</th>
                <th>Location</th>
                <th>Usage (kWh)</th>
                <th>% of Total</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id}>
                  <td>{appliance.name}</td>
                  <td>{appliance.location}</td>
                  <td>{appliance.usage}</td>
                  <td>{appliance.percentage}</td>
                  <td>{appliance.status}</td>
                  <td>{appliance.lastUpdated}</td>
                  <td>
                    <Button variant="primary">Open menu</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Appliances;