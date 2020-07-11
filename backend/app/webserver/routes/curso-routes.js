"use strict";

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();


const checkAccountSession = require("../controllers/account/check-account-session");
const checkEscritorRol = require("../controllers/account/check-alumno-rol");
const checkOrganizadorRol = require("../controllers/account/check-profesor-rol");


const addAlumnoToCurso = require("../controllers/curso/add-alumno-curso");
const createCurso = require("../controllers/curso/create-curso");
const deleteCurso = require("../controllers/curso/delete-curso");
const deleteAlumnoToCurso = require("../controllers/curso/delete-alumno-curso");
const getCursoAlumno = require("../controllers/curso/-alumno");
const getCurso = require("../controllers/curso/get-curso");
const getCursos = require("../controllers/curso/get-cursos");
const getCursosByCategoria = require("../controllers/curso/get-cursos-by-categoria");
const getCursosAlumno = require("../controllers/curso/get-cursos-alumno");
const searchCursos = require("../controllers/curso/search-controller");
const uploadDoc = require("../controllers/curso/upload-doc");


router.post("/cursos", checkAccountSession, createCurso);
router.get("/cursos/search", searchCursos);
router.get("/cursos", getCursos);
router.get("/cursos/:categoria", getCursosByCategoria);
router.get("/cursos/:idcursos", getCurso);
router.delete("/cursos/:idcursos", checkAccountSession, deleteCurso);
router.get("/aumnoe/cursos", checkAccountSession, checkAlumnoRol, getCursoAlumno);
router.post("/cursos/:idcursos", checkAccountSession, addAlumnoToCurso);
router.put("/cursos/:idcursos", checkAccountSession,  deleteAlumnoToCurso);
router.get("/cursos/:idcursos/alumnos", checkAccountSession, getAlumnoCurso);
router.post("/cursos/:idcursos/curso", checkAccountSession, upload.single("document"), uploadDoc);



module.exports = router;




