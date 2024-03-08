const express = require("express");
const Url = require("../models/Url");

const router = express.Router();

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function randomCode(n = 6) {
  let s = "";
  for (let i = 0; i < n; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return s;
}

const isHttpUrl = (s) => /^https?:\/\/.+/i.test(s || "");

router.get("/", async (_req, res) => {
  res.json(await Url.find().sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const { target } = req.body;
  let { code } = req.body;
  if (!isHttpUrl(target)) return res.status(400).json({ error: "target must be an http(s) URL" });
  if (code) {
    if (!/^[0-9a-zA-Z]{1,32}$/.test(code)) return res.status(400).json({ error: "bad code" });
    if (await Url.findOne({ code })) return res.status(409).json({ error: "code taken" });
  } else {
    do { code = randomCode(); } while (await Url.findOne({ code }));
  }
  const url = await Url.create({ code, target });
  res.status(201).json(url);
});

router.get("/:code", async (req, res) => {
  const url = await Url.findOne({ code: req.params.code });
  if (!url) return res.status(404).json({ error: "not found" });
  res.json(url);
});

router.delete("/:id", async (req, res) => {
  const url = await Url.findByIdAndDelete(req.params.id);
  if (!url) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

module.exports = router;
