const express = require("express");

const app = express();

// Routes
const uploadRoute = require("./routes/upload");
const downloadRoutes = require("./routes/downloadRoutes");

app.set("view engine", "ejs");

app.use(express.static("public"));

// Route'lar
app.use("/upload", uploadRoute);
app.use("/download", downloadRoutes);

// Ana Sayfa
app.get("/", (req, res) => {
    res.render("index");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server çalışıyor -> http://localhost:${PORT}`);
});