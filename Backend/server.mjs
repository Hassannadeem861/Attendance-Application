import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";

import authRouter from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import feedRouter from "./routes/feed.mjs";
import postRouter from "./routes/post.mjs";
import { decode } from "punycode";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json()); // Middle ware body parser
app.use(cookieParser()); // cookie parser

// /api/v1/login
app.use("/api/v1", authRouter);

// app.use("/static", express.static(path.join(__dirname, "static")));
// app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // JWT
  console.log("cookies: ", req.cookies);

  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded: ", decoded);

    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };

    next();
  } catch (err) {
    res.status(401).send({ message: "invalid token" });
  }
});

app.use("/api/v1", postRouter); // Secure api

// app.route("/").get((req, res, next) => {
//   res.status(200).send(`Hello World`);
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
