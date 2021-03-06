const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
//   operatorsAliases: true, // eski sürümde vardı
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  logging: true,
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.sync({
//   force: true,
// }).then(() => {
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.note = require('../model/note.model.js')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
// db.note.belongsToMany(db.note, { through: 'user_roles', foreignKey: 'userId', otherKey: 'noteId'});
// });
module.exports = db;

