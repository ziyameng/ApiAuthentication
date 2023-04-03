const User = require("../model/User");
const bcrypt = require("bcryptjs");

//Register Funciton
exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 10) {
    return res
      .status(400)
      .json({ message: "Password is less than 10 character" });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
      .catch((error) =>
        res.status(401).json({
          message: "User is not successful created",
          error: error.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or Password is not provided" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res
        .status(401)
        .json({ message: "Login is not successful", error: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({ message: "Login Successfully", user })
          : res.status(400).json({ message: "Login not successful" });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;

  if (role && id) {
    if (role === "admin") {
      try {
        const user = await User.findById(id);

        if (user.role !== "admin") {
          user.role = role;

          try {
            await user.save();
            res.status(201).json({ message: "User update successful", user });
          } catch (err) {
            res.status(400).json({ message: "error occured" });
            process.exit(1);
          }
        } else {
          res.status(400).json({ message: "User is already an Admin" });
        }
      } catch (error) {
        res
          .status(400)
          .json({ message: "error occured", error: error.message });
      }
    } else {
      res.status(400).json({ message: "Role is not admin" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Role or id is not present or not provided" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.deleteOne())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occured", error: error.message });
    });
};
