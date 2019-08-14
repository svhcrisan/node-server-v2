const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");

//Folders & files
const data = require("./routes/index.js");

//init app
const app = express();

module.exports = app;

const server = https.createServer(
    {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.cert")
    },
    app
);


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on http://locahost:${PORT}`);
});

app.use(bodyParser.json());
app.use("/", data);
app.use(express.urlencoded({ extended: false }));
