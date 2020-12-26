const express = require('express');
const app = express();
const router = require("./route/router");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + "/src"));
app.use(router);



app.listen(8080, () => {
    console.log('Web 在端口8080启动!');
});


