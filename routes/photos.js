import express from "express";
import photos from "../data/photos.json" with {type: "json"};
import comments from "../data/comments.json" with {type: "json"};
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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

router
  .route("/:id/comments")
  .get((req, res) => {
    const id = req.params.id;
    const commentsArray = comments[id];
    res.json(commentsArray);
  })
  .post((req, res) => {
    try {
      const { name, comment } = req.body;
      if (!name) {
        throw new Error("Name cannot be empty");
      }
      else if (!comment) {
        throw new Error("Comment cannot be empty");
      }
      else {
        const newComment = {
          name,
          comment,
          id: uuidv4(),
          timestamp: Date.now(),
        };
        const id = req.params.id;
        comments[id].push(newComment);
  
        // write updated comments to file
        const json = JSON.stringify(comments);
        fs.writeFileSync("./data/comments.json", json);
  
        res.status(201).json(comments[id]);
      }
    } catch (error) {
      // TODO: will return a 400 error code if name, or comment are not included in the object, or if name, or comment are not strings
      res.status(400).send(`${error}`);
    }
  });

export default router;
