# 📱 mobilefirst-backend

This is the backend for a Node.js web application built with Express, Sequelize, Passport, Kafka, and Socket.IO. It supports user authentication, real-time updates via WebSocket, and order processing with Kafka.

---

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install dotenv sequelize mysql2 helmet cors body-parser express-session bcrypt sequelize-paginate
npm install jsonwebtoken passport passport-jwt passport-local socket.io socket.io-client express-validator
npm install --save-dev sequelize-cli nodemon

###  2. Initialize Sequelize
cd database_config
npx sequelize-cli init

# 🗃️ Database Migration
<!-- For migration db -->
npx sequelize-cli db:migrate

| Feature            | URL                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------- |
| Node.js Web App    | [http://localhost:3000]                                      
| API Base URL       | [http://localhost:3000/emit]                            
| Test Socket API    | [http://localhost:3000/emit/\:random-data] |
| phpMyAdmin (MySQL) | [http://localhost:8080]                                    
| Kafka UI (Kafdrop) | [http://localhost:9000]                                     



<!-- links -->
# https://github.com/eliasbutting/nodejs-docker-express/blob/master/docker-compose.yml

# ✅ Step 1: User Authentication
Step 1 -> http://localhost:3000
- user can login, register , view profile and dashboard

Step 2 -> For Socket Checking
- http://localhost:3000/emit 
- fire this api then after data will reflcated in dashboard order notification section

Step 3 -> For KAFKA
- POST: http://localhost:3000/orders/create-order
- POST: http://localhost:3000/orders/update-order
- fire this api then after data will reflcated in dashboard order notification section

Step 4 -> Verifying KAFKA message
- http://localhost:9000/
- WEb ui view of complete kafka messages

Step 5 -> Check phpmyadmin DB
- http://localhost:8080


Step 6 -> reference images
kafdrop.png
image.png
nodeapp.png