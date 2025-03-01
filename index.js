import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

// enables all origins
app.use(cors());

// use port 8080 unless PORT is set in .env
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
