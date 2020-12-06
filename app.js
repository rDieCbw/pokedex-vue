const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(compression());
app.use(express.static('public'));

// ROUTES
const index = require('./routes/index');
app.use('/', index);

app.listen(3333, "localhost", () => {
    console.log(
        `Servidor rodando em http://localhost:3333`
    );
    console.log('Para derrubar o servidor: ctrl + c');
});

module.exports = app;