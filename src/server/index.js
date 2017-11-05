import express from 'express';
import path from 'path';
import r from 'rethinkdb';
import bodyParser from 'body-parser';
import config from './config.js';

//db connection
let session = null;

//setup db
r.connect({ host: 'localhost', port: config.rethinkdb }, function(err, conn) {
  if (err)
    throw err;
  console.log("Connected")
  session = conn;
});

const app = express();

//handle '/' route
app.get('/', (req, res) => res.sendFile(path.resolve(`index.html`)));

//mount the 2 folders to static
app.use('/static', express.static('static'));
app.use('/static', express.static('dist'));

//because who wants to have to decode JSON
app.use(bodyParser.json());

//get course by crn
app.post('/crn', async (req, res) => {
  const classes = req.body.classes;
  if (!classes || !Array.isArray(classes)) {
    return res.status(400).send({error: 'Malformed request.'});
  }
  classes.forEach(cl => {
    if (cl.length < 5) {
      return res.status(400).send({error: 'Malformed CRNs.'});
    }
  })
  r.db('courses')
    .table('sections')
    .getAll(r.args(classes))
    .run(session, (err, cursor) => {
      if (err)
        res.status(400).send({error: 'Problem with request.'});
      cursor.toArray((err, result) => {
        res.json({
          classes: result
        })
      });
   });
});

//start up the actual app
app.listen(config.port,() => console.log(`App listening on Port:${config.port}`));
