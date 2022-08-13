"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/course.json");

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Courses", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
