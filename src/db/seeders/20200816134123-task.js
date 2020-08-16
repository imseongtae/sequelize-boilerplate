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
