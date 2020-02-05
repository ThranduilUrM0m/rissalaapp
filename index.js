const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

// IMPORT MODELS
require('./models/Articles');
require('./models/Letters');
require('./models/Students');
require('./models/Reports');
require('./models/Homeworks');
require('./models/Exams');
require('./models/Courses');
require('./models/Subjects');
require('./models/Modules');
require('./models/Classrooms');
require('./models/Schools');
require('./models/Events');

const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);
mongoose.set('debug', true);

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'rissala_app', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

//IMPORT ROUTES
const router = express.Router();
app.use("/user", router);
require('./controllers/userController')(router);
app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});