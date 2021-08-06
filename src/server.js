const express=require('express');
const bodyParser=require('body-parser')
const logger=require('morgan');

const routes=require('./routes')

const PORT=process.env.PORT || 3003;

const app=express();

app.use(bodyParser.json());
app.use(logger('dev'))

app.use('/api', routes);

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))