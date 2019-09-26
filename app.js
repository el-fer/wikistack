const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const path = require('path');
const models = require('./models');
const wikiRouter = require('./routes/wiki')
//const userRouter = require('./routes/user')


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"./public")));
app.use('/wiki', wikiRouter)
//app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.redirect('/wiki')
});

const { db } = require('./models');
db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 1337;

const init = async () => {
await models.db.sync();
app.listen(PORT, () =>{
  console.log(`Listening in port ${PORT}`);
});
}

init();
