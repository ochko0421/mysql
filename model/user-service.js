const pool = require("../config/mysql_config.js");

exports.getUsers = async (limit) => {
  try {
    if (limit) {
      const [rows] = await pool.query(
        `SELECT * FROM user ORDER BY id DESC LIMIT  ${limit}`
      );
      return rows;
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getOne = async (id) => {
  try {
    const [row] = await pool.query(`SELECT * FROM User where id = ${id}`);
    return row[0];
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (user) => {
  const { name, age, username } = user;
  //this question marks are similar with C language => printf('%d %d', x,y)
  const [result] = await pool.query(
    `INSERT INTO user VALUES (?, ?, ?, ?)`,
    [ name, age, null,username]
  );
  return result;
};
exports.updateUser = async (id, updatedData) => {
  console.log(updatedData);
  let [result] = "";
  for (let i = 0; i < Object.keys(updatedData).length; i++) {
    result = await pool.query(
      `UPDATE user SET ${Object.keys(updatedData)[i]} = '${
        Object.values(updatedData)[i]
      }' WHERE id = ${id}`
    );
  }
  return result;
};
exports.deleteUser = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM User WHERE id= ${id}`
  );
  return result;
};
