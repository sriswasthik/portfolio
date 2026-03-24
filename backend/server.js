const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ File path (your database)
const filePath = path.join(__dirname, "data", "projects.json");

// ==============================
// ✅ GET PROJECTS
// ==============================
app.get("/api/projects", (req, res) => {
  try {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read projects" });
  }
});

// ==============================
// ✅ ADD PROJECT
// ==============================
app.post("/api/projects", (req, res) => {
  try {
    const projects = JSON.parse(fs.readFileSync(filePath));

    const newProject = {
      id: Date.now(),
      ...req.body,
    };

    projects.push(newProject);

    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// ==============================
// ✅ DELETE PROJECT
// ==============================
app.delete("/api/projects/:id", (req, res) => {
  try {
    let projects = JSON.parse(fs.readFileSync(filePath));

    projects = projects.filter((p) => p.id != req.params.id);

    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ==============================
// ✅ CONTACT (KEEP SAME)
// ==============================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Contact Message:");
  console.log({ name, email, message });

  res.json({ success: true });
});

// ==============================
// ✅ TEST ROUTES
// ==============================
app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Backend connected successfully 🚀",
  });
});

// ==============================
// ✅ SERVER
// ==============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});