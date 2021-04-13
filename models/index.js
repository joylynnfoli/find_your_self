const Comments =  require('./comment')
const Library = require('./library')
const User = require('./user')

User.hasMany(Library)
Library.belongsTo(User)

Library.hasMany(Comments)
Comments.belongsTo(Library)

module.exports = {
    Comments,
    Library,
    User,
}
