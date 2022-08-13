"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsToMany(models.Course, { through: models.Member_Course });
    }
  }
  Member.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          message: "Name is required",
        },
        validate: {
          notNull: {
            message: "Name is required",
          },
          notEmpty: {
            message: "Name is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Password is required",
          },
          notEmpty: {
            message: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );

  Member.beforeCreate((member, options) => {
    member.password = hashPassword(member.password);
  });

  return Member;
};
