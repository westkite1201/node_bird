module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", //S3 저장
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //한글 저장
    }
  );

  Image.assoicate = db => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};
