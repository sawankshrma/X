import { Post } from './generated/prisma/browser';
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();
app.use(express.json());

app.get("/api/v1/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.get("/api/v1/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})


app.listen(3001);