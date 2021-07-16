const port = process.env.PORT || 5050;
const config = require("./config/key");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  Credential: true,
};
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user");
const boardRouter = require("./routes/board");
const todoRouter = require("./routes/todo");

// app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//=============[EXP CODE]==============
// 사용법이 미숙한 코드나 문법을 테스트

//=====================================

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/board", boardRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`Connected Port: ${port}`);
});
