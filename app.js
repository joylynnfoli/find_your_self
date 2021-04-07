const express = require('express');
const app = express ()
const sequelize = require ('./db');

const user = require('./controllers/usercontroller');
const favorites = require('./controllers/favoritesController');

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json())

app.use('/user', user);
app.use('/favorites', favorites);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})                                        