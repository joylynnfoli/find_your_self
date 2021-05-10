const Comments = require("./comment");
const Topics = require("./Topics");
const User = require("./user");

User.hasMany(Topics);
Topics.belongsTo(User);

Topics.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(Topics);
Comments.belongsTo(User)

module.exports = {
  Comments,
  Topics,
  User,
};
