const { connect } = require("./connectDB.js");
const Todo = require("./todoModel.js");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "First Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with ID: ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} items in the table`);
  } catch (error) {
    console.error(error);
  }
};

const getAllTools = async () => {
  try {
    const todos = await Todo.findAll({
      // where: {
      //     completed: false
      // },
      // order: [
      //     ['id', 'DESC']
      // ]
    });
    const todoList = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

const getSingletodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "DESC"]],
    });
    console.log(todo.displayableString());
  } catch (error) {
    console.error(error);
  }
};

const Updateitem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      },
    );

    // console.log(todo.displayableString());
  } catch (error) {
    console.error(error);
  }
};

const deletItem = async (id) => {
  try {
    const deleterowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Deleted ${deleterowCount} rows!`);
    // console.log(todo.displayableString());
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await getAllTools();
  await countItems();
})();

(async () => {
  await createTodo();
  await countItems();
  await getAllTools();
  await getSingletodo();
  await deletItem(2);
  await Updateitem();
})();
