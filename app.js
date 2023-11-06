const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const flash = require('connect-flash');

require('dotenv').config();

const pageRouter = require('./routes/pageRoute');
const authRouter = require('./routes/authRoute');
const trainingRouter = require('./routes/trainingRoute');

//DB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`✔️  MongoDB connection is successful`))
  .catch((err) => console.log(`❌ MongoDB connection is failed\n${err}`));

//APP
const app = express();

//Configration
app.set('view engine', 'ejs');

//GLOBAL VARIABLES
global.userIN = null;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.user;
  next();
});
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/training', trainingRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

//LISTEN
const port = process.env.PORT ?? 5000;
app.listen(port, () => console.log(`🚀 The server running at port ${port}`));
