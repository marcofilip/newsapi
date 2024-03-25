const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
const APIkey = process.env.API_KEY;

app.get("/getnews", async (req, res) => {
  try {
    var today = new Date();
    let todaystring =
      today.getFullYear() +
      "-" +
      today.getDate() +
      "-" +
      (today.getMonth() + 1);

    const url =
      "https://newsapi.org/v2/everything?q=italia&from=" +
      todaystring +
      "&sortBy=publishedAt&apiKey=" +
      APIkey;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching top news:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.options("/getnews", cors());

app.listen(process.env.PORT, () => {
  console.log("Il server è partito.");
});
