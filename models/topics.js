module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define("topics", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    playlistId: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
  });
  return Topics;
};
