console.log('hello world');

const db = require('./db/models')

// Promises
function getTasksPromise() {
  db.Task.findAll()
    .then(tasks => {
      tasks.forEach(task => {
        console.log(task.taskName);
      });
    })
    .catch(err => {
      console.log(err);
    })
}

async function getTasksAsync() {
  try {
    const tasks = await db.Task.findAll();
    tasks.forEach(task => {
      console.log(task.taskName);
    });
  } catch (error) {
    console.log(error);
  }
}

// getTasksPromise();
getTasksAsync();