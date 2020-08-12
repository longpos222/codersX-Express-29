const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const userRoute = require('./routes/user.route');
const apiUserRoute = require('./api/routes/user.route.js');
const bookRoute = require('./routes/book.route');
const apiBookRoute = require('./api/routes/book.route.js');
const transactionRoute = require('./routes/transaction.route');
const apiTransactionRoute = require('./api/routes/transaction.route');
const authRoute = require('./routes/auth.route');
const apiAuthRoute = require('./api/routes/auth.route');
const cartRoute = require('./routes/cart.route');
const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
//const cookieMiddleware = require('./middleware/cookie.middleware');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.COOKIE_SIGNED_KEY));
app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/api/users', apiUserRoute);
app.use('/books',bookRoute);
app.use('/api/books', apiBookRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute);
app.use('/api/transactions', apiTransactionRoute);
app.use('/auth', authRoute);
app.use('/api/auth', apiAuthRoute);
app.use('/cart', cartRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', authMiddleware.requireAuth, (req, res) => res.render('index'));

app.listen(port, () => console.log('Server listening on port ' + port));
