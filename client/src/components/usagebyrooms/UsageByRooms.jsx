import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Sidebar from "../dashboard/Sidebar";

const UsageByRooms = () => {
  const rooms = [
    { id: 1, name: 'Kitchen', usage: '12.5 kWh', percentage: '25%', status: 'Normal' },
    { id: 2, name: 'Hall', usage: '10.2 kWh', percentage: '20%', status: 'Normal' },
    { id: 3, name: 'Room 1', usage: '8.7 kWh', percentage: '17%', status: 'Normal' },
    { id: 4, name: 'Room 2', usage: '7.5 kWh', percentage: '15%', status: 'Normal' },
    { id: 5, name: 'Room 3', usage: '6.3 kWh', percentage: '13%', status: 'Normal' },
    { id: 6, name: 'Bathroom', usage: '5.8 kWh', percentage: '10%', status: 'Normal' },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Container fluid className="p-4">
          <h1 className="mb-4">Energy Consumption by Rooms</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Room</th>
                <th>Usage (kWh)</th>
                <th>% of Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.usage}</td>
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

export default UsageByRooms;