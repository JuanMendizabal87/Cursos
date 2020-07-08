"use strict";

async function checkEStudentRol(req, res, next) {
const {
rol,
} = req.claims;

if (rol !== "estudent") {
return res.status(403).send();
}

next();
}

module.exports = checkEStudentRol;