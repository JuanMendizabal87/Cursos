"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idcursos: Joi.string().required()
  });

  Joi.assert(payload, schema);
}

async function deleteCurso(req, res, next) {
  const { idcursos } = req.params;
  //const { userId } = req.claims;

  try {
    await validate({ idcursos });
  } catch (e) {
    return res.status(400).send(e);
  }

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE cursos
      SET deleted_at = ?
      WHERE idcursos = ?
        
        AND deleted_at IS NULL`;

    const deleted_at = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
    const [deletedStatus] = await connection.execute(sqlQuery, [
      deleted_at,
      idcursos
    ]);
    connection.release();

    if (deletedStatus.changedRows !== 1) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = deleteCurso;
