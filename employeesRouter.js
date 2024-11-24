const express = require("express");
const router = express.Router();
let employees = require("./employees"); // Correctly require the employees array

// Get all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// Get a random employee
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// Get a specific employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: `No employee found with id ${id}.` });
  }
});

// Add a new employee
router.post("/", (req, res) => {
  const { name } = req.body;

  // Validate name
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid name provided." });
  }

  // Create a new employee
  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name: name.trim(),
  };

  // Add to the list
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router;