const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050;
const config = require('./config/key');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const whitelist = ['http://localhost:3000', 'https://adklog.com'];
const corsOptions = {
  // origin: (origin, cb) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: true,
  credentials: true,
};
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');

const boardRouter = require('./routes/board');
const todoRouter = require('./routes/todo');
const videoRouter = require('./routes/video');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');

const testRouter = require('./routes/zTest');

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
//extended: true(qs-library 사용) , false(queryString library사용) / 가장 큰 차이점은 json에 중첩된 데이터의 사용 여부로 보인다.
//https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/UploadProfileImage', express.static('UploadProfileImage'));
app.use('/UploadVideo', express.static('UploadVideo'));
app.use('/zDummyFile', express.static('zDummyFile'));

//=============[EXP CODE]==============
// 사용법이 미숙한 코드나 문법을 테스트
//
//=====================================

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

app.use('/api/users', userRouter);
app.use('/api/board', boardRouter);
app.use('/api/todo', todoRouter);
app.use('/api/video', videoRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);

app.use('/api/test', testRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    index: true,
    state: true,
  });
});

app.listen(PORT, () => {
  console.log(`Connected PORT: ${PORT}`);
});
