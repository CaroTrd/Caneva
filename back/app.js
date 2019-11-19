const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const  morgan  =  require('morgan');
var cors = require('cors')
const  app  =  express();
var  server  =  require('http').createServer(app);
const inscriptionRoutes = require('./api/controllers/inscription/index');
const loginRoutes = require('./api/controllers/login/index');
const deleteAccountRoutes = require('./api/controllers/delete_account/index');
const curriculumRoutes = require('./api/controllers/curriculum/index')

require('dotenv').config();

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));

app.use('/api/inscription', inscriptionRoutes);
app.use('/api/user', loginRoutes);
app.use('/api/delete', deleteAccountRoutes);
app.use('/api/curriculum', curriculumRoutes);

server.listen( process.env.PORT  ||  4000, function(){
    console.log('Listening on port '  +  server.address().port);
});