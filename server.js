require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Routes
const usersRoute = require('./routes/users.route');
const booksRoute = require('./routes/books.route');
const transactionsRoute = require('./routes/transactions.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const cartRoute = require('./routes/cart.route');
const shopRoute = require('./routes/shops.route');

const apiLoginRoute = require('./api/routes/login.route');
const apiTransactionsRoute = require('./api/routes/transactions.route');
const apiBooksRoute = require('./api/routes/books.route');
const apiUsersRoute = require('./api/routes/users.route');
const apiCartRoute = require('./api/routes/cart.route');
const apiProfileRoute = require('./api/routes/profile.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

app.use('/api/login', apiLoginRoute);
app.use('/api/transactions', apiTransactionsRoute);
app.use('/api/books', apiBooksRoute);
app.use('/api/users', apiUsersRoute);
app.use('/api/cart', apiCartRoute);
app.use('/api/profile', apiProfileRoute);

app.use(express.static('public'));
app.use(sessionMiddleware);

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/books', booksRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/cart', cartRoute);
app.use('/shops', shopRoute);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  if (req.signedCookies.userId) {
    res.redirect('/users');
  } else {
    res.render('index');
  }
});

app.get('/signout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
