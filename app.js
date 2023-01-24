import createError from 'http-errors';
import express, { json, urlencoded, static as eStatic } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fetch from "node-fetch";
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import transactionRouter from './routes/transactions';
import merchantRouter from './routes/merchants';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'https';
import sequelize from './sequelize/sequelize'
import Transactions from './sequelize/models/m_transactions';
import Merchant from './sequelize/models/user';
import Customer from './sequelize/models/m_customer'
import cors from 'cors';


http.globalAgent.options.rejectUnauthorized = false

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(eStatic(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionRouter);
app.use('/merchants', merchantRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/*

  As shown above, sync({ force: true }) and sync({ alter: true }) can be destructive operations. 
  Therefore, they are not recommended for production-level software. Instead, 
  synchronization should be done with the advanced concept of Migrations, with the help of the Sequelize CLI.
    
*/

await sequelize.sync({alter: true}).then(() => {
  console.log("Synced db done");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});


export default app;
