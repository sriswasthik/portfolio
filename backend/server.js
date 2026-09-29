const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const { clerkMiddleware } = require("@clerk/express");
const { requireAdmin } = require("./auth");
const { SECTIONS, validate } = require("./content");
const Content = require("./models/Content");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
// Reads the Clerk session token from the Authorization header, if any.
app.use(clerkMiddleware());

// ✅ Database
// Retries until it connects, so fixing Atlas access (e.g. the IP allow
// list) takes effect without restarting the server.
function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 30s:", err.message);
      setTimeout(connectDb, 30_000);
    });
}

if (process.env.MONGODB_URI) {
  connectDb();
} else {
  console.warn("MONGODB_URI not set: content edits are disabled.");
}

const dbReady = () => mongoose.connection.readyState === 1;

// ==============================
// ✅ GET CONTENT
// Sections that were never saved are left out; the site falls back to
// the defaults in frontend/src/data for those.
// ==============================
app.get("/api/content", async (req, res) => {
  if (!dbReady()) return res.json({});

  try {
    const docs = await Content.find({ section: { $in: SECTIONS } }).lean();
    res.json(Object.fromEntries(docs.map((d) => [d.section, d.items])));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read content" });
  }
});

// ==============================
// ✅ SAVE A SECTION (admin only)
// ==============================
app.put("/api/content/:section", requireAdmin, async (req, res) => {
  if (!dbReady()) return res.status(503).json({ error: "Database unavailable" });

  const { items, error } = validate(req.params.section, req.body?.items);
  if (error) return res.status(400).json({ error });

  try {
    await Content.updateOne(
      { section: req.params.section },
      { $set: { items } },
      { upsert: true }
    );
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save" });
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
