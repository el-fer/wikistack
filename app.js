const express = require('express');
const app = express();
const morgan = require('morgan');
const layout = require('./views/layout');
const path = require('path');
const models = require('./models');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"./public")));

app.get('/', (req, res) => {
  res.send(layout(''));
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
