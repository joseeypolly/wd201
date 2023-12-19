const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "253312";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established Successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });
