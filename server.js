const express = require("express");
const app = express();
const employeesRouter = require("./employeesRouter");
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// Use employees router
app.use("/employees", employeesRouter);

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});