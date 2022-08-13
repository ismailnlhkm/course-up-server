"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.Member, { through: models.Member_Course });
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          message: "Course name must be unique",
        },
        validate: {
          notNull: {
            message: "Course name is required",
          },
          notEmpty: {
            message: "Course name is required",
          },
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          message: "Course logo must be unique",
        },
        validate: {
          notNull: {
            message: "Course logo is required",
          },
          notEmpty: {
            message: "Course logo is required",
          },
        },
      },
      mentor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Mentor is required",
          },
          notEmpty: {
            message: "Mentor is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
