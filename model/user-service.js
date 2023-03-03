const pool = require("../config/mysql_config.js")

export async function getProducts(limit, where) {
    if (limit) {
      const [rows] = await pool.query(
        `SELECT productId FROM product limit ${limit} `
      );
      return rows;
    } 
  }
  export async function getProduct(id) {
    const [row] = await pool.query(`SELECT * FROM product where productId=${id}`);
    return row[0];
  }
  export async function createProduct(
    productId,
    productName,
    productPrice,
    productImage
  ) {
    //this question marks are similar with C language => printf('%d %d', x,y)
    const [result] = await pool.query(
      `INSERT INTO product VALUES (?, ?, ?, ?)`,
      [productId,productName,productPrice,productImage]
    );
    return result;
  }
  export async function updateProduct(productId, updatedData) {
    let [result] = "";
    for (let i = 0; i < Object.keys(updatedData).length; i++) {
      result = await pool.query(
        `UPDATE product SET ${Object.keys(updatedData)[i]} ='${
          Object.values(updatedData)[i]
        }'  WHERE productId = ${productId}`
      );
    }
    return result;
  }
  export async function deleteProduct(productId) {
    const [result] = await pool.query(
      `DELETE FROM product WHERE productId='${productId}';`
    );
    return result;
  }
  