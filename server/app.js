const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const authRoute = require("./Router/auth");
const linksRoute = require("./Router/links");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const Port = process.env.PORT || 5000;
const DB = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection to the database established"))
    .catch((err) => console.error("Error connecting to the database:", err));


app.use("/api/auth", authRoute);
app.use("/api/links", linksRoute);

// Serve static assets if you have a client-side app
// app.use(express.static(path.join(__dirname, "/client/build")));

// For client-side routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.listen(Port, () => {
    console.log(`Server is listening at port ${Port}`);
});
