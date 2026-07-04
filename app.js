const express = require("express");

const app = express();

const uploadRoute = require("./routes/upload");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server çalışıyor -> http://localhost:${PORT}`);
});