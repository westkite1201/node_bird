module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci" //한글 저장
    }
  );

  HashTag.assoicate = db => {
    db.HashTag.belongsToMany(db.Post, { though: "PostHashtag" });
  };

  return HashTag;
};
