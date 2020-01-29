module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT, //매우 긴글
        allowNull: false
      }
    },
    {
      charset: "utf8mb4", // 한글 + 이모티콘 가능
      collate: "utf8mb4_general_ci" //한글 저장
    }
  );

  Post.assoicate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" });
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Likers" });
  };

  return Post;
};
