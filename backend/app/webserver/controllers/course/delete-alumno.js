"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string().required()
  });

  Joi.assert(payload, schema);
}

async function deleteStudent(req, res, next) {
  const { idcursos } = req.params;
  const { userId } = req.claims;

  try {
    await validate({ idcursos });
  } catch (e) {
    return res.status(400).send(e);
  }
  const cursos_idcursos = idcursos;
  const users_idusers = userId;

  let connection;
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE users_has_concursos
      SET deleted_at = ?
      WHERE concursos_idconcursos = ?
        
        AND users_idusers = ?
        AND deleted_at IS NULL`;

    const deleted_at = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
    const [deletedStatus] = await connection.execute(sqlQuery, [
      deleted_at,
      concursos_idconcursos,
      users_idusers
    ]);
    connection.release();

    if (deletedStatus.changedRows === 0) {
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

module.exports = deleteAlumnoToCurso;
