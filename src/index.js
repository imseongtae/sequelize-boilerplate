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

async function createUser(name) {
  const user = await db.User.create({ name })

  return user;
}

async function getUser(name) {
  const user = await db.User.findOne({ where: { name } });
  return user;
}

async function assignTaskToUser(task, user) {
  await task.setUser(user)
}

async function listAllUserTasks(user) {
  tasks = await user.getTasks();
  tasks.forEach(task => {
    console.log(task.taskName);
  });
}

// createUser('ham1');
getUser('ham').then(res => {
  console.log('getUserName: ', res.name);
})

// getTasksPromise();
getTasksAsync();