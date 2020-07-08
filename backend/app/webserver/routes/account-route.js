"use strict";

const express = require("express");
const checkAccountSession = require("../controllers/account/check-account-session");

const createAccount = require("../controllers/account/create-account-controller");
const updateAccount = require("../controllers/account/update-account");

const router = express.Router();

router.post("/accounts", createAccount);
router.put("/accounts/:userId", checkAccountSession, updateAccount);

module.exports = router;

