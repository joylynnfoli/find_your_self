const Sequelize = require ('sequelize');
const sequelize = new sequelize(process.env.DATABASE_URL, {
// const sequelize = new Sequelize('find_your_self_server', 'postgres', 'password',{
//     host: 'localhost',
//     dialect: 'postgres'
dialectOptions: {
    ssL:{
        require: true,
        rejectUnauthorized: false
    }
}
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