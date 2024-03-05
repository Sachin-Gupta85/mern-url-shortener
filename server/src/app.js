const express = require("express");
const cors = require("cors");
const Url = require("./models/Url");
const urls = require("./routes/urls");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/urls", urls);

// public redirect endpoint — increments the click counter
app.get("/r/:code", async (req, res) => {
  const url = await Url.findOneAndUpdate(
    { code: req.params.code },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  if (!url) return res.status(404).json({ error: "not found" });
  res.redirect(302, url.target);
});

module.exports = app;
