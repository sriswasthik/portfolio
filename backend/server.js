const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();




// Middleware
app.use(cors());
app.use(express.json());
app.get("/api/projects", (req, res) => {
  res.json([
    {
      title: "Invoice Generator",
      description: "Full stack invoice generator with PDF export and backend integration.",
      github: "https://github.com/sriswasthik/invoice-generator"
    },
    {
      title: "-----------------------",
      description: "---------------------------------------------",
      github: "https://github.com/sriswasthik/healthcare-dashboard"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio with clean UI and smooth user experience.",
      github: "https://github.com/sriswasthik/portfolio-project"
    }
  ]);
});



app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("New Contact Message:");
    console.log({ name, email, message });

    res.json({ success: true, message: "Message received" });
});

// Test route
app.get("/", (req, res) => {
    res.send("Portfolio API is running...");
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Backend connected successfully 🚀",
    });
});



// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});