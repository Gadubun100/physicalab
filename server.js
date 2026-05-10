import express from "express";
import cors from "cors";

const API_KEY = process.env.ANTHROPIC_KEY || "";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    console.log("Sending request to Anthropic...");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    console.log("Response received:", JSON.stringify(data).slice(0, 100));
    res.json(data);
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));