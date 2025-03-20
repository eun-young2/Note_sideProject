const express = require('express');
const cors = require('cors');
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const db = require('./config/database');

const app = express();
const port = 8000;


//const indexRouter = require("./routes");
const noteRouter = require("./routes/note");

app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
      store: new fileStore(),
      secret: "mysecret",  // ❗ .env에 저장하는 게 보안상 더 좋음
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
      },
    })
  );

//app.use("/", indexRouter);
app.use("/note", noteRouter);

app.listen(port, () => {
  console.log(`✅ 서버 실행중: http://localhost:${port}`);
});
