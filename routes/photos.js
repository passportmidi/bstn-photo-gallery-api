import express from "express";
import photos from "../data/photos.json" with {type: "json"};

const router = express.Router();

router.route("/").get((_req, res) => {
  res.json(photos);
});

export default router;
