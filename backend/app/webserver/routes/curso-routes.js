"use strict";

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();


const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-alumno-rol");
const checkOrganizadorRol = require("../controllers/account/check-profesor-rol");


const addAlumnoToCurso = require("../controllers/curso/add-alumno-curso");
const createCurso = require("../controllers/concurso/create-curso");
const deleteCurso = require("../controllers/concurso/delete-curso");
const deleteAlumnoToCurso = require("../controllers/curso/delete-alumno-curso");
const getConcursantesConcurso = require("../controllers/curso/-concurso");
const getCurso = require("../controllers/concurso/get-concurso");
const getCursos = require("../controllers/concurso/get-concursos");
const getCursosByCategoria = require("../controllers/concurso/get-cursos-by-categoria");
const getCursosProfesor = require("../controllers/concurso/get-cursos-profesor");
const getConcursosAlumno = require("../controllers/curso/get-cursos-alumno");
const searchCursos = require("../controllers/curso/search-controller");
const uploadDoc = require("../controllers/curso/upload-doc");


router.post("/cursos", checkAccountSession, checkProfesorRol, createCurso);
router.get("/cursos/search", searchCursos);
router.get("/cursos", getCursos);
router.get("/cursos/:categoria", getCursosByCategoria);
router.get("/cursos/:idcursos", getCurso);
router.delete("/cursos/:idcursos", checkAccountSession, checkProfesorRol, deleteCurso);
router.get("/aumnoe/cursos", checkAccountSession, checkAlumnoRol, getCursoAlumno);
router.get("/profesor/curso", checkAccountSession, checkProfesorRol, getCursosProfesor);
router.post("/cursos/:idcursos", checkAccountSession, checProfesorRol, addAlumnoToCurso);
router.put("/cursos/:idcursos", checkAccountSession, checkProfesorRol, deleteAlumnoToCurso);
router.get("/cursos/:idcursos/alumnos", checkAccountSession, checkProfesorRol, getAlumnoCurso);
router.post("/cursos/:idcursos/curso", checkAccountSession, checkProfesorRol, upload.single("document"), uploadDoc);



module.exports = router;




