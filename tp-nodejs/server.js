//#region 
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const express = require("express");
const cors = require("cors");
var inventory = require("./inventory.json");
const fs = require("fs");
var bodyParser = require("body-parser");
const { title } = require("process");
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");

var app = express();
const port = "90";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//#endregion
app.get("/articles", auth, (req, res) => {
  res.json(inventory);
})

app.post("/add", auth, (req, res) => {
  var article = req.body;
  article.id = inventory.articles.length + 1;
  if (
    !article.title ||
    !article.description ||
    !article.price ||
    !article.currency ||
    !article.brand
  ) {
    res.send({ code: "101", message: "Missing fields" });
    return;
  }
  inventory.articles.push(article);
  fs.writeFile(
    "inventory.json",
    JSON.stringify({ articles: inventory.articles }),
    function (err) {
      console.log(err);
    }
  );
  return res.send({ message: "Ok" });
})

app.delete("/delete/:id", auth, function (req, res) {
  let newInventory = inventory.articles.filter(
    (item) => item.id.toString() !== req.params.id.toString()
  );
  fs.writeFile(
    "inventory.json",
    JSON.stringify({ articles: newInventory }),
    function (err) {
      console.log(err);
    }
  );
  res.send({ message: "Ok" });
});

app.get("/articles/:id", auth, (req, res) => {
  const article = inventory.articles.find(
    (a) => a.id.toString() === req.params.id
  );
  res.json(article);

})

app.post("/edit/:id", auth, (req, res) => {
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

app.post("/signup", async (req, res) => {
  // const { name, email, password } = req.body;
  // const token = jwt.sign({ email }, 'secretkey', { expiresIn: "6h" });
  // var user1 = {};
  // if (req.body.email === "" || req.body.name === "" || req.body.password === "") {
  //   return res.send({ message: "veuillez remplir tous les champs !!!" })
  // }
  // bcrypt.hash(password, 8, async function (err, hash) {
  //   user1 = await prisma.user.create({
  //     data: {
  //       name: name,
  //       email: email,
  //       password: hash,
  //       token: token
  //     }
  //   })
  //   if (user1) {
  //     res.send({ message: "User create", token: token });
  //   }
  // });
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await prisma.user.findUnique({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
})

app.post("/login", async (req, res) => {
  const { name, email, password } = req.body
  const token = jwt.sign({ email }, 'secretkey', { expiresIn: "6h" });

  const foundedUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })
  // console.log("foundedUser", foundedUser);
  if (!foundedUser) {
    console.warn("sorry no item found")
    return res.send({ message: "Aucun utilisateur trouvé" })
  }
  var isValidUser = false;

  bcrypt.compare(password, foundedUser?.password, function (err, result) {
    isValidUser = result;
    result && res.send({ token: token });;
  })
})

app.listen("90", () => {
  console.log("server running on port " + port);
})