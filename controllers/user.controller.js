const userService = require("../model/user-service.js");

exports.getAll = async (req, res) => {
  const { limit } = req.query;
  try {
    const result = await userService.getUsers(limit);
    console.log(result);
    if (result) {
      res.json({ status: true, result });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};
exports.getOne = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ status: false, message: "User not found" });
  try {
    const result = await userService.getOne(id);
    console.log(result);
    res.json({ status: true, result });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};
exports.create = async (req, res) => {
  const { name, age, username } = req.body;
  const newObj = {
    name,
    age,
    username,
  };
  try {
    const result = await userService.createUser(newObj);
    console.log(result);
    res.json({ status: true, result });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ status: false, message: "User not found" });

  try {
    const result = await userService.updateUser(id, req.body);
    console.log(result);
    if (result && result[0].affectedRows > 0) {
      return res.json({ status: true, message: "Success" });
    } else {
      return res.json({ status: false, message: "Amjiltgui" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};
exports.delete= async (req, res) => {
  const { id } = req.params;
  if (!id) return res.json({ status: false, message: "User not found" });
  try {
    const result = await userService.deleteUser(id);
    console.log(result);
    if (result && result[0].affectedRows > 0) {
      return res.json({ status: true, message: "Success" });
    } else {
      return res.json({ status: false, message: "Amjiltgui" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
};
