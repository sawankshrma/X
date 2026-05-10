import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { prisma } from "./lib/prisma";
import { CreateUserSchema, SigninSchema } from "./lib/types";
import bcrypt from "bcrypt";
import cors from "cors"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "";

console.log(process.env.JWT_SECRET);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://locoalhost:4200"
}))

app.post("/api/v1/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success){
     console.log(parsedData.error);
      res.json({
        message: `${parsedData.error}`
      });
      return;
  }
  try {
    const hassedPassword = await bcrypt.hash(parsedData.data.password, 5);
    const user = await prisma.user.create({
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: hassedPassword,
        profilePicUrl: parsedData.data.profile_pic_url
      }
    })
    res.json(user.id);
  }
  catch(e) {
    res.status(411).json(e);
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success){
    console.log(parsedData.error);
    res.json({
      message: `${parsedData.error}`
    });
  }
  try {
    const user = await prisma.user.findFirst({
        where: {
            username: parsedData.data?.username,
        }
    })
    if (!user) {
      res.status(401).json("Wrong Credentials");
      return;
    }
    const password = parsedData.data?.password || ''
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json("Wrong Credentials");
    }

    const token = jwt.sign({
      id: user.id
    }, JWT_SECRET)
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: "lax"
    })
    res.status(200).json(`Logged In as ${user.username}`);

  }
  catch (e) {
    console.log(e);
    res.status(411).json(e);
  }
});

app.get("/api/v1/me", middleware, async (req, res) => {
  try{
    //@ts-ignorets-ignore
    const userId = req.userId;

    const user = await prisma.user.findFirst({
      where: {
        id : userId
      }
    })

    if (!user) res.status(200).send("this should not happen");
    res.status(200).json(user);

  }
  catch(e){
    console.log(e);
    res.status(411).send(e)
  }
})

app.post("/api/v1/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  res.json({
    message: "Logged Out!"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});