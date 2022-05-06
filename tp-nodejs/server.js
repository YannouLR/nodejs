//#region 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const express = require("express");
const cors = require("cors");
var inventory = require("./inventory.json");
const fs = require("fs");
var  bodyParser = require("body-parser");
const { title } = require("process");

var app = express();
const port = "90";
app.use(cors());
app.use(bodyParser.urlencoded( { extended : true }))
app.use(bodyParser.json())
//#endregion
app.get("/articles", (req, res) => {
    res.json(inventory);
})

app.post("/add", (req, res) => {
  // article.title = req.body.title
  // article.description = req.body.description
  // article.price = req.body.price
  // article.brand = req.body.price
  inventory.articles.forEach((element, index) => {
      inventory.articles[index] = article;
  });
  fs.writeFile(
    "inventory.json",
    JSON.stringify({articles: inventory.articles}),
    function (err) {
      console.log(err);
    }
  );
  res.send({message : "ok"});
})

app.get("/articles/:id", (req, res) => {
    const article = inventory.articles.find(
        (a) => a.id.toString() === req.params.id
      );
      res.json(article);
    
})

app.post("/edit/:id", (req, res) => {
    const article = inventory.articles.find(
        (a) => a.id.toString() === req.params.id
      );
      article.title = req.body.title;
      article.price = req.body.price;
      // article.currency = req.body.currency;
      // article.brand = req.body.brand;
      article.description = req.body.description;
      inventory.articles.forEach((element, index) => {
        if (element.id === article.id) {
          inventory.articles[index] = article;
        }
      });
      fs.writeFile(
        "inventory.json",
        JSON.stringify({ articles: inventory.articles }),
        function (err) {
          console.log(err);
        }
      );
      res.send({ message: "Ok" });
})

app.post("/addUser", (req, res) => {
  const { name, email, password } = req.body;
      var user1 = {}
      bcrypt.hash(password, 8, async function (err, hash) {
          user1 = await prisma.user.create({
              data: {
                  name: name,
                  email: email,
                  password: hash
              }
          })
      });
      res.send({message : "Utilisateur crée"});
})

app.post("/modifyUser", (req, res) => {
  const foundedUser = await prisma.user.findUnique({
    where: {
        email: "toto@toto.com"
    }
})
console.log(foundedUser);
if (!foundedUser) {
    console.warn("sorry no item found")
}
var isValidUser = false;

bcrypt.compare(password, foundedUser?.password, function (err, result) {
    isValidUser = result;
    result && console.log("C'est trouvé")
})
      res.send({message : "Utilisateur modifié"});
})

app.listen("90", () => {
    console.log("server running on port " + port);
})