"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/memberCourse.json");

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Member_Courses", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Member_Courses", null, {});
  },
};
