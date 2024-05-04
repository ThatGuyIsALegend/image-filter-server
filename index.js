const express = require('express');
const multer = require('multer');
const session = require('express-session');
const fs = require('node:fs');
const cors = require('cors');
const { deleteOldFiles } = require('./utils')

const app = express();
const PORT = process.env.PORT || 3000;

// Periodically delete old files
setInterval(() => {deleteOldFiles('./uploads', 3600*1000)}, 360*1000)

app.use(cors({
    origin: 'http://localhost:5173', // React app URL
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

require('./routes')(app);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}'`);
});