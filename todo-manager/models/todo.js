/* eslint-disable no-unused-vars */
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos() {
      return this.findAll();
    }

    static getOverdues() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static getDuetoday() {
      return this.findAll({
        where: {
          dueDate: new Date().toISOString().split("T")[0],
        },
      });
    }

    static getDueLater() {
      let tom = new Date().setDate(new Date().getDate() + 1);
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: tom,
          },
        },
      });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }

    static gettodo = async () => {
      const todos = await Todo.findAll();
      return todos;
    };
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
