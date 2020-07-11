"use strict";

const Joi = require("@hapi/joi");
const uuidV4 = require("uuid/v4");
const mysqlPool = require("../../../database/mysql-pool");

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;


async function validate(payload) {
  const schema = Joi.object({
    nombreCurso: Joi.string()
      .trim()
      .min(1)
      .max(255)
      .required(),
    categoria: Joi.string()
      .trim()
      .min(1)
      .max(45)
      .required()
  });

  Joi.assert(payload, schema);
}

async function createCurso(req, res, next) {
  const cursoData = { ...req.body };
  const { userId } = req.claims;
  console.log(userId);

  try {
    await validate(cursoData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const created_At = new Date()
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");
  const {
    nombreCurso,
    fechaVencimiento,
  } = cursoData;


  const idcursos = uuidV4();
  const curso = {
    idcursos,
    users_idusers: userId,
    nombrecurso,
    
  };

  try {
    const connection = await mysqlPool.getConnection();
    try {
      const sqlCreateCurso = "INSERT INTO cursos SET ?";
      await connection.query(sqlCreateCurso, curso);

      connection.release();

      res.header("Location", `${httpServerDomain}/api/cursos/${idcursos}`);
      return res.status(201).send();
    } catch (e) {
      connection.release();
      throw e;
    }
  } catch (e) {
    console.error(e);

    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).send();
    }

    return res.status(500).send();
  }
}

module.exports = createcurso;
