const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Member, Course, Member_Course } = require("../models");

class Controller {
  static async Home(req, res) {
    try {
      res.send("welcome");
    } catch (err) {}
  }

  static async register(req, res) {
    try {
      const { name, password } = req.body;

      if (!name) {
        throw { name: "Name is required" };
      } else if (!password) {
        throw { name: "Password is required" };
      } else {
        await Member.create({
          name,
          password,
        });

        res.status(201).json("Your account has been created!");
      }
    } catch (err) {
      if (err.name === "Name is required") {
        res.status(400).json({ message: "Name is required" });
      } else if (err.name === "Password is required") {
        res.status(400).json({ message: "Password is required" });
      } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Name already registered" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async login(req, res) {
    try {
      const { name, password } = req.body;
      if (!name) {
        throw { name: "Name is required" };
      } else if (!password) {
        throw { name: "Password is required" };
      } else {
        const findMember = await Member.findOne({
          where: { name },
        });

        if (!findMember) {
          throw { name: "Invalid member name/password" };
        }

        const checkPass = checkPassword(password, findMember.password);

        if (!checkPass) {
          throw { name: "Invalid member name/password" };
        }

        const payload = {
          id: findMember.id,
        };

        const access_token = createToken(payload);

        res.status(200).json({ access_token: access_token });
      }
    } catch (err) {
      if (err.name === "Name is required") {
        res.status(400).json({ message: "Name is required" });
      } else if (err.name === "Password is required") {
        res.status(400).json({ message: "Password is required" });
      } else if (err.name === "Invalid member name/password") {
        res.status(401).json({ message: "Invalid member name/password" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async courseList(req, res) {
    try {
      // const course = await Course.findAll({ include: Member_Course });
      const course = await Course.findAll({ include: Member });

      res.status(299).json(course);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async myCourses(req, res) {
    try {
      const id = req.memberId;
      const myCourses = await Member_Course.findAll({ where: id, include: {model: Course, include: Member} });

      res.status(299).json(myCourses);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addMyCourse(req, res) {
    try {
      const id = req.memberId;
      const { CourseId } = req.params;
      await Member_Course.create({
        MemberId: id,
        CourseId,
        status: "In Progress",
      });

      res.status(299).json("Course successfully added!");
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async completeMyCourse(req, res) {
    try {
      const id = req.memberId;
      const { CourseId } = req.params;
      await Member_Course.update(
        {
          status: "Completed",
        },
        {
          where: {
            MemberId: id,
            CourseId,
          },
        }
      );

      res.status(200).json("Course has been completed!");
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async removeMyCourse(req, res) {
    try {
      const id = req.memberId;
      const { CourseId } = req.params;
      await Member_Course.destroy({
        where: {
          MemberId: id,
          CourseId,
        },
      });

      res.status(299).json("Course has been removed!");
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
