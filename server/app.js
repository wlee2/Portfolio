import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import clientSessions from 'client-sessions';

//userRouters
import mainRouter from './routers/main';
import projectListsRouter from './routers/projectLists';
import login from './routers/login';
import register from './routers/register';
import drive from './routers/drive';
import blog from './routers/blog';
import connect from './schemas';
import sql from './sequelize';

// config const data
import config from './commons/Constants';

const app = express();
// app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//mongo Connet
// connect();
connect();
sql.initalize();
//dev mode --common mode when it'll deploy
app.use(logger('dev'));
//cookie secure by SESSIONS_SECRET
app.use(cookieParser(config.SESSIONS_SECRET));
//session
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: config.SESSIONS_SECRET, // this should be a long un-guessable string.
    duration: 10 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 5 * 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
//Middlewares
app.use('/storage', express.static(path.join(__dirname, 'userStorage')));
app.use('/', mainRouter);
app.use('/sample', projectListsRouter);
app.use('/regist', register);
app.use('/login', login);
app.use('/blog', blog)
app.use('/drive', drive);
app.get('/logout', (req, res) => {
    req.session.reset()
    res.send(true);
})
//

//
//
const ProjectLists = require("./schemas/projectLists")
app.get('/projects', (req, res) => {
    ProjectLists.find({})
    .then(data => res.send(data))
})
app.use((req,res)=>{
    // res.status(404).send("Page Not Found");
    res.redirect('/');
})

const server = app.listen(config.PORT, () => {
 	const port = server.address().port

 	console.log('Example app listening at http://localhost:%s', port)
});