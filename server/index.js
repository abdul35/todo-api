const express = require("express");
const app = express();
const fs = require("fs")
const cors = require("cors");
const morgan =  require("morgan")
const sequelize = require("./db_config/config.js");
const router = require("./routes/todoRoutes.js");
const Todo = require('./models/todo.model.js')

const PORT = 4000;
let logFile = fs.createWriteStream('./api-logs.log', {flags: 'a'});

app.use(morgan('combined', { stream: logFile }));
app.use(cors());
app.use(express.json());
app.use(router);


(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT} port`);
    });
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()