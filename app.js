require("dotenv").config();
const express = require('express');
const app = express()
const sequelize = require('./db');
const user = require('./controllers/usercontroller');
const library = require('./controllers/librarycontroller');
const comments = require('./controllers/commentcontroller')



sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json())

app.use('/user', user);

app.use(require('./middleware/validate-session'))
app.use('/library', library);
app.use('/comments', comments);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}`);
})