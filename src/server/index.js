import express from 'express';
import path from 'path';
import config from './config.js';


const app = express();

//handle '/' route
app.get('/', (req, res) => res.sendFile(path.resolve(`index.html`)));

//mount the 2 folders to static
app.use('/static', express.static('static'));
app.use('/static', express.static('dist'));

//start up the actual app
app.listen(config.port,() => console.log(`App listening on Port:${config.port}`));
