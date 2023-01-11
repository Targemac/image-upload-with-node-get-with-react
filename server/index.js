const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./dbConfig");
const Image = require("./models");
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, filename, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, filename.originalname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

//return all data from db
app.get("/", async (req, res) => {
  const allData = await Image.find();
  res.json(allData);
});

//post a single image
app.post("/", upload.single("avatar"), (req, res) => {
  //fetching image from uploads folder and adding to model
  const saveImg = new Image({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });

  //saving to mongodb
  saveImg
    .save()
    .then(() => console.log("Image saved successfully"))
    .catch((err) => console.log(err));
  res.json("image saved");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
