import express from "express";
import photos from "../data/photos.json" with {type: "json"};
import comments from "../data/comments.json" with {type: "json"};

const router = express.Router();

router.route("/").get((_req, res) => {
  res.json(photos);
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  const photo = photos.filter((p) => p.id === id);

  // if photo array returns empty
  if (!photo.length) {
    return res.sendStatus(404);
  }

  res.json(photo);
});

router.route("/:id/comments").get((req, res) => {
  const id = req.params.id;
  const photoComments = comments.filter((c) => c.id === id);
  const commentsArray = photoComments[0].comments;
  console.log(commentsArray);

  res.json(commentsArray);
});

export default router;
