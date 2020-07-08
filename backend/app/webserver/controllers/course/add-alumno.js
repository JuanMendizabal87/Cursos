"use strict";

const Joi = require("@hapi/joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    idconcursos: Joi.string().guid({version: ["uuidv4"]}).required()
    // userId: Joi.string()
    //   .guid({
    //     version: ["uuidv4"]
    //   })
    //   .required()
  });

  Joi.assert(payload, schema);
}

async function getCurso(idcursos) {
  const connection = await mysqlPool.getConnection();
  const getConcursoQuery = `SELECT idconcursos, users_idusers,
  nombreCurso, bases, fechaVencimiento, categoria,
  created_At, updated_At, deleted_At 
  FROM cursos
    WHERE idcursos = ?
      AND deleted_at IS NULL`;
  const [cursoData] = await connection.execute(getCursoQuery, [idcursos]);
  connection.release();

  if (cursoData.length < 1) {
    return null;
  }

  return cursoData[0];
}

async function addAlumnoToCurso(req, res, next) {
  // /api/notes/37664a0b-0811-4005-8a26-db41b93825a8/tags
  const { idcursos } = req.params;
  const { userId } = req.claims;

console.log(idcursos);
  const payload = {
    idcursos
    // userId
  };

  try {
    await validate(payload);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }

  try {
    const concurso = await getCurso(idcursos/*, userId*/);

    if (!curso) {
      return res.status(404).send();
    }

    try {
      const connection = await mysqlPool.getConnection();
      const getWorkerQuery = `SELECT users_idusers
        FROM users_has_concursos 
        WHERE concursos_idconcursos = ?
        AND deleted_at IS NULL `;
      const [results] = await connection.execute(getWorkerQuery, [idcursos]);
      connection.release();
      if (results.length !== 0) {
        return res.status(403).send();
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: e.message
      });
    }

    /**
     * Exercise 1
     *  Delete tag from a note
     *    Exercise: Do a proper query to delete a tag from a note for the logged in user
     * Exercise 2
     *  Is it possible to delete a tag from note without perform a getProject call?
     */
    const sqlAddAlumnoToCurso = `INSERT INTO users_has_cursos SET ?`;
    // const userId = cursoData.userId;
    console.log(userId);

    const userRow = {
        cursos_idcursos: idcursos,
        users_idusers: userId,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    const connection = await mysqlPool.getConnection();
    try {
      await connection.query(sqlAddAlumnoToCurso, userRow);
      connection.release();
    } catch (e) {
      console.error(e);
      connection.release();
      return res.status(500).send({
        message: e.message
      });
    }

    return res.status(204).send();
  } catch (e) {
    console.error(e);

    return res.status(500).send({
      message: e.message
    });
  }
}

module.exports = addAlumnoToCurso;

