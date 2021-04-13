module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define("library", {
      user_id: {
        type: DataTypes.INTEGER,
      },
      videoURL: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
    });
    return Library;
  };
  