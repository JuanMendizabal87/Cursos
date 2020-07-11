"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getCursosByCategory(req, res, next) {
  const { category } = req.params;
  // const byCategoria = categoria.categoria;

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM cursos WHERE category = ? ORDER BY created_at ASC`;
    const [rows] = await connection.execute(sqlQuery, [categoria]);
    connection.release();
    
    // preparar respuesta
    const cursos = rows.map(curso => {
      return {
        ...curso
        // created_At: undefined,
        // updated_At: undefined,
        // deleted_At: undefined
        // createdAt: tag.created_at,
        // updatedAt: tag.updated_at,
        // user_id: undefined,
        // created_at: undefined,
        // updated_at: undefined
      };
    });

    return res.status(200).send(cursos);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
}

module.exports = getCursosByCategory;



// *************************

// "use strict";

// const mysqlPool = require("../../../database/mysql-pool");

// async function getursosByCategoria(req, res, next) {
//   const categoria = { ...req.body };
//   // const byCategoria = categoria.categoria;

//   // 2. Select all tags
//   try {
//     const connection = await mysqlPool.getConnection();
//     const sqlQuery = `SELECT * FROM cursos
//     WHERE categoria = ? `;

//     const [rows] = await connection.execute(sqlQuery, [categoria.categoria]);
//     connection.release();

//     // preparar respuesta
//     const cursos = rows.map(curso => {
//       return {
//         ...curso
//         // created_At: undefined,
//         // updated_At: undefined,
//         // deleted_At: undefined
//         // createdAt: tag.created_at,
//         // updatedAt: tag.updated_at,
//         // user_id: undefined,
//         // created_at: undefined,
//         // updated_at: undefined
//       };
//     });

//     return res.status(200).send(cursos);
//   } catch (e) {
//     console.error(e);
//     return res.status(500).send();
//   }
// }

// module.exports = getCursosByCategoria;