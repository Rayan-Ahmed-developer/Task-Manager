const Task = require('../model/taskModel')

// GET all tasks
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user.id   // 🔥 filter by user
    });

    res.send(tasks);

  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
};

// ADD task
const addTask = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).send({ msg: "Task is required" });
    }

    const task = await Task.create({
      text,
      user: req.user.id   // 🔥 correct place
    });

    res.send(task);

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).send({
      msg: "Server error",
      error: error.message
    });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    await task.deleteOne();
    res.send({ msg: "Task deleted" });
  } catch(error){
    console.log("🔥 ERROR:", error);
    res.status(500).send({
        msg: "Server error",
        error: error.message
    });
}
};

module.exports= { getTasks, addTask, deleteTask };