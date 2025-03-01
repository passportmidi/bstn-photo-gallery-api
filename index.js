import express from "express";
import "dotenv/config";
import cors from "cors";
import photos from "./routes/photos.js";
import tags from "./routes/tags.js";

const app = express();

app.use(express.json());

// serve images
app.use(express.static("public"));

// enables all origins
app.use(cors());

app.use("/photos", photos);
app.use("/tags", tags);

// use port 8080 unless PORT is set in .env
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
