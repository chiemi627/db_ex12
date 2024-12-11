const express = require("express");
const app = express();
const path = require("path");

const apiRouter = require("./routes/api");

const port = 3000;


app.use(express.static(path.join(__dirname, "public")));
app.use(apiRouter);

//サーバを起動する
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
