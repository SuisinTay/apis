const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

var obj = {
  users: [],
};

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/list_users", (req, res) => {
  fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
    res.end(data);
  });
});

app.post("/post-test", (req, res) => {
  obj.users.push(req.body);
  var json = JSON.stringify(obj);
  fs.writeFile("users.json", json, "utf8", (err) => {
    if (err) throw err;
    console.log("Successful!");
  });
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

app.listen(8000, () => console.log(`Started server at http://localhost:8000!`));
