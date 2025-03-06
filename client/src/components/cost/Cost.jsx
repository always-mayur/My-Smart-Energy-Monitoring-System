import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Sidebar from "../dashboard/Sidebar";

const Cost = () => {
  const appliances = [
    { id: 1, name: 'HVAC', cost: '₹500', percentage: '36%', status: 'High Usage' },
    { id: 2, name: 'Refrigerator', cost: '₹300', percentage: '25%', status: 'Normal' },
    { id: 3, name: 'Washing Machine', cost: '₹200', percentage: '17%', status: 'Normal' },
    { id: 4, name: 'Lights', cost: '₹150', percentage: '11%', status: 'Efficient' },
    { id: 5, name: 'TV', cost: '₹100', percentage: '11%', status: 'Efficient' },
  ];

  const rooms = [
    { id: 1, name: 'Kitchen', cost: '₹300', percentage: '25%', status: 'Normal' },
    { id: 2, name: 'Hall', cost: '₹250', percentage: '20%', status: 'Normal' },
    { id: 3, name: 'Room 1', cost: '₹200', percentage: '17%', status: 'Normal' },
    { id: 4, name: 'Room 2', cost: '₹150', percentage: '15%', status: 'Normal' },
    { id: 5, name: 'Room 3', cost: '₹100', percentage: '13%', status: 'Normal' },
    { id: 6, name: 'Bathroom', cost: '₹50', percentage: '10%', status: 'Normal' },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Container fluid className="p-4">
          <h1 className="mb-4">Cost of Energy Consumption</h1>
          <h2 className="mb-4">Appliances</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Appliance</th>
                <th>Cost</th>
                <th>% of Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance) => (
                <tr key={appliance.id}>
                  <td>{appliance.name}</td>
                  <td>{appliance.cost}</td>
                  <td>{appliance.percentage}</td>
                  <td>{appliance.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2 className="mb-4">Rooms</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Room</th>
                <th>Cost</th>
                <th>% of Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.cost}</td>
                  <td>{room.percentage}</td>
                  <td>{room.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Cost;