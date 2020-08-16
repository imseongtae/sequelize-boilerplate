# Sequelize

## table of contents


---

## sequelizerc setting

## sequelizerc
- 파일 확장자가 없어야 vscode 아이콘 적용을 받음

```
const path = require('path');

module.exports = {
  'config': path.resolve('src/db/config/config.js'),
  'models-path': path.resolve('src/db/models'),
  'seeders-path': path.resolve('src/db/seeders'),
  'migrations-path': path.resolve('src/db/migrations')
}
```

### config.js

```js
const path = require('path');
const storage = path.join(__dirname, '../../../db.sqlite');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory'
  },
  production: {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'mysql',
    logging: false
  }
};
```


만약 NODE_ENV 를 production 이나 text 와 같이 설정해주지 않으면, Sequelize는 이를 development 로 가정합니다.


## Model 생성

### Task Model

```bash
$ npx sequelize model:generate --name Task --attributes taskName: string
```

### User Model

```bash
$ npx sequelize model:generate --name User --attributes name:string
```

### Project 구조
- 생성한 Model은 `src/db/models` 폴더 안에 저장되고, migrations는 `src/db/migrations` 폴더 안에 저장됨
- Migrations 파일 이름에 붙는 숫자는 시간정보를 나타내며, sequelize는 이를 인식해 어떤 마이그레션이 먼저이고, 어떤 순서로 생성되어야 할 지에 대해 판단함
- `src/db/seeders`를 통해 Sequlize는 우리 데이터베이스에 seeding(더미 데이터 넣기)하는 방법을 제공

```bash
├── package-lock.json
├── package.json
└── src
    ├── db
    │   ├── config
    │   │   └── config.js
    │   ├── migrations
    │   │   ├── 20200816132716-create-user.js
    │   │   └── 20200816132859-create-task.js
    │   ├── models
    │   │   ├── index.js
    │   │   ├── task.js
    │   │   └── user.js
    │   └── seeders
    └── index.js
```

### DB 생성
DB를 생성하고, 마이그레이션하기 위해 아래 명령어 실행

```bash
$ npx sequelize db:migrate
```

### seed
데이터베이스가 비었기에 seed파일을 통해 이를 해결

```bash
$ npx sequelize seed:generate --name task
```

- seed 할 준비를 하고, DB에 더미를 채우기
- 아래 코드에서 더미 데이터를 작성하고, seed를 실행하면 에러 발생

```bash
$ npx sequelize db:seed:all
```

```js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
```

### seed 실행 에러 해결
- `createdAt`, `updatedAt` 데이터도 같이 만들어야 함

```js
'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    /**
     * “Tasks” 라는 복수형으로 명시
     * 이는 Model이 아닌 실제 Table을 참조하고 있기 때문 
     * Migrations 파일도 같은 문법을 가지기에 혼란이 생길 수 있음
     */
    return queryInterface.bulkInsert(
      'Tasks',
      [
        {
          taskName: 'This is task number one!',
          createdAt,
          updatedAt
        },
        {
          taskName: 'This is task number two!',
          createdAt,
          updatedAt
        },
        {
          taskName: 'This is task number three!',
          createdAt,
          updatedAt
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
```


## Association
RDBMS에서는 **Association**이 중요하다. 데이터를 하나의 테이블에 모두 보관하는 것이 아니라, 여러 모델을 만들고 그 사이의 관계를 통해 데이터를 다루기 때문

Sequelize API를 이용한 기본적인 호출을 작성하였습니다. 물론 더 많은 유용한 API가 문서에 있습니다.

### Association API
Association 설정을 통해 아래 메소드를 사용할 수 있음
- belongsTo는 `.set<Model>` 메소드를 제공
- hasMany는 `.get<Model>s` 메소드를 제공

```js
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
```


## 참고 문헌

- [번역-마이그레이션과-sequelize-cli-튜토리얼](https://medium.com/graphql-seoul/%EB%B2%88%EC%97%AD-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%EA%B3%BC-sequelize-cli-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-3926c0a9eae6)