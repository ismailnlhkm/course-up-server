"use strict";

const { Member } = require("../models");
const { readPayload } = require("../helpers/jwt");
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const decode = readPayload(access_token);
    const { id } = decode;
    const member = await Member.findByPk(+id);

    if (!member) {
      throw { name: "Invalid token" };
    }

    req.memberId = +member.id;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(400).json({ message: "Invalid token" });
    } else if (err.name === "Invalid token") {
      res.status(400).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = authentication;
