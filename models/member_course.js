"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member_Course extends Model {
    static associate(models) {
      Member_Course.belongsTo(models.Member);
      Member_Course.belongsTo(models.Course);
    }
  }
  Member_Course.init(
    {
      MemberId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member_Course",
    }
  );
  return Member_Course;
};
