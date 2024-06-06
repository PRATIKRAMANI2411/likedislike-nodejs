import express from "express";
import { createPost, dislike, like } from "../controller/postController.js";


const postRoute = express.Router();

postRoute.post("/create", createPost);
postRoute.post("/like/:postId/:userId", like);
postRoute.post("/dislike/:postId/:userId", dislike);

export default postRoute;