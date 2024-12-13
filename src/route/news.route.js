const handle = require("../controller/news.controller");
const multer_cloudinary = require("../middleware/multer_cloudinary");
const protect_route_admin = require("../security/protect_route_admin");

const news_route = (app) => {
  app.post(
    "/api/create-news",
    protect_route_admin,
    multer_cloudinary.fields([{ name: "photos" }]), // Updated to use multer_cloudinary
    handle.create
  );

  app.put(
    "/api/update-news/:id",
    protect_route_admin,
    multer_cloudinary.fields([{ name: "updatePhoto" }, { name: "addPhoto" }]), // Updated to use multer_cloudinary
    handle.updateNews
  );

  app.put("/api/isvisible/:id", protect_route_admin, handle.updateIsVisible);
  app.delete("/api/remove-news/:id", protect_route_admin, handle.deleteNews);

  app.get("/api/admin-get-all", handle.admingetAll);
  app.get("/api/user-get-all", handle.usergetAll);
  app.get("/api/get-data/:id", handle.getData);

  // start maintain speed
  app.get("/api/get-length-categories-popular-news", handle.countLengthOfCategoriesAndgetPopularNews);
  app.get("/api/categories-home",handle.GetByCategoriesInHome)
  app.get(
    "/api/categories/:startIndex/:endIndex",
    handle.getByCategories
  );
  // end maintain speed

  app.post("/api/increase-viewer/:id", handle.increaseViewer);

  // commants
  app.post("/api/news/:newsId/comments", handle.addComment);

  app.post(
    "/api/news/:newsId/comments/:commentId/reply",
    handle.replyToComment
  );
  
  // action
  app.post(
    "/api/news/:newsId/comments/:commentId/like-dislike",
    handle.likeOrDislikeComment
  );
  app.post(
    "/api/news/:newsId/comments/:commentId/replies/:replyId/like-dislike",
    handle.likeOrDislikeReply
  );

  // remove
  app.delete("/api/news/:newsId/comment/:commentId", handle.removeComment);
  
  app.delete(
    "/api/news/:newsId/comment/:commentId/reply/:replyId",
    handle.removeReply
  );

  app.put("/news/:newsId/comment/:commentId", handle.editComment);
  app.put("/news/:newsId/comment/:commentId/replies/:replyId", handle.editReply);

};

module.exports = news_route;
