const Sequelize = require ('sequelize');
const sequelize = new Sequelize('find_your_self_server', 'postgres', 'password',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connect to find_your_self postgress database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;