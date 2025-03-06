# My Smart Energy Monitoring System ⚡️

A creative and functional mini energy monitoring system for a smart home, demonstrating both front-end and back-end development expertise. This project provides a snapshot of a smart home’s energy usage with interactive visualizations and secure data management.

## Live Demo 🌐
Check out the deployed version of the app here: [Smart Home Energy Monitoring System](https://my-smart-energy-monitoring-system-1.onrender.com)

## Challenges 🧠
One of the key challenges faced during development was with the login system. Due to the integration of both JWT and Passport.js for authentication, passwords were getting hashed twice, leading to login failures. This issue was resolved by carefully debugging both libraries and streamlining the authentication process to ensure password hashing happened only once.

## Features ✨
- **Interactive Dashboard:** Visualize energy usage from home appliances using dynamic charts.
- **Energy Trends:** View historical energy consumption data and identify usage patterns.
- **Budgeting & Alerts:** Set energy budgets and receive alerts when usage exceeds the limit.
- **Secure Authentication:** User login and authentication powered by JWT and Passport.js.
- **Sample Data Integration:** Preloaded sample data for demonstration purposes.

## Technology Stack 🛠️
### Frontend
- **ReactJS:** Chosen for its ease of building and managing small, reusable components efficiently.
- **Bootstrap:** Ensured responsive and polished UI design with minimal effort.

### Backend
- **Node.js & Express.js:** Selected for their robust ecosystem and extensive npm package support.
- **MongoDB (Cloud):** Scalable and flexible NoSQL database, implemented via MongoDB Atlas.
- **CORS:** Enabled cross-origin requests for seamless front-end and back-end communication.

### Authentication
- **JWT (JSON Web Tokens):** Used for stateless, secure user authentication and session management.
- **Passport.js:** Provided middleware support for various authentication strategies and streamlined user management.

**Why Both JWT and Passport.js?**
- **JWT:** Ideal for generating and verifying access tokens for a stateless architecture.
- **Passport.js:** Simplifies integration of multiple authentication methods and session management.
Combining both ensured a balance of simplicity, flexibility, and security in the authentication process.

## Installation & Setup 🚀
1. Clone the repository:
   ```bash
   git clone https://github.com/always-mayur/Smart-Home-Energy-Snapshot.git
   cd Smart-Home-Energy-Snapshot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Future Enhancements 🌱
- Implement real-time data fetching from IoT devices.
- Enhance the dashboard with advanced data visualization techniques.
- Expand user roles and permissions for better access control.

## Snapshots of the WebPage
![App Dashboard](https://raw.githubusercontent.com/always-mayur/My-Smart-Energy-Monitoring-System/main/client/public/screenshot(108).png)
![App Dashboard](https://raw.githubusercontent.com/always-mayur/My-Smart-Energy-Monitoring-System/main/client/public/screenshot(115).png)



