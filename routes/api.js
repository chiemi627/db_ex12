const express = require("express");
const db = require('better-sqlite3')('meibo.db');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/today", function(req,res){
  const current = new Date(); //本日の日付を取得
  const data = {
    'month':current.getMonth()+1,
    'day':current.getDate()
  }
  res.json(data);
});

app.get("/api/meibo/random10", function(req,res){
  const query = `
    SELECT firstname,lastname,birthday,birthplace
    FROM meibo
    ORDER BY random()
    LIMIT 10
  `;
  try{
    const rows = db.prepare(query).all();
    res.json(rows);
  }catch(err){
    console.log(err);
  }
});

app.post("/api/hello", function(req,res){
  console.log("Hello");
  console.log(req.body);
  const data = {
    serverMessage: req.body.message
  }
  res.json(data);
});

module.exports = app;