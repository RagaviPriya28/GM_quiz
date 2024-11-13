// const app = require('./app');
// const http = require('http');
// const connectDB = require('./config/db');
// const socketHandler = require('./sockets/sockets');

// const PORT = process.env.PORT || 5000;

// connectDB();

// // Create an HTTP server using the Express app
// const server = http.createServer(app);

// // Initialize Socket.IO with the HTTP server
// const io = require('socket.io')(server, {
//   cors: {
//     origin: "*", // Allow all origins, adjust for production security
//     methods: ["GET", "POST"]
//   }
// });

// // Pass the io instance to your socket handling function
// socketHandler(io);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const app = require('./app');
// const http = require('http');
// const connectDB = require('./config/db');
// const socketHandler = require('./sockets/sockets');
// const io = require('socket.io'); // Import socket.io
// const PORT = process.env.PORT || 5000;

// connectDB();

// // Create an HTTP server using the Express app
// const server = http.createServer(app);

// // Initialize Socket.IO with the HTTP server
// const socketIo = io(server, {
//   cors: {
//     origin: "http://localhost:3000/", // Allow all origins, adjust for production security
//     methods: ["GET", "POST"]
//   }
// });

// // Set socketIo instance on app for later use in controllers
// app.set('socketio', socketIo); // Make io available in your controllers

// // Pass the io instance to your socket handling function
// socketHandler(socketIo);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const app = require('./app');
const http = require('http');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
const socketHandler = require('./sockets/sockets');

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (adjust this for production to restrict origins)
    methods: ["GET", "POST"]
}});

// Pass the Socket.IO instance to the app so it can be used in controllers
app.set('socketio', io);

// Handle socket events
socketHandler(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
