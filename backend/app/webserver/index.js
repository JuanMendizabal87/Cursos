'use strict';

const express = require('express');

const {
  accountRouter,
  alumnoRouter,
  cursoRouter,

} = require('./routes');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', accountRouter);
app.use('/api', alumnoRouter);
app.use('/api', cursoRouter);

let server = null;
async function listen(port) {
  if (server) {
    return server;
  }

  try {
    server = await app.listen(port);
    return server;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error('Can not close a non started server');
  }
}

module.exports = {
  listen,
  close,
};
