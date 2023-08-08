const {
  htmlController,
  assetsController,
} = require("../controllers/homeController");

const home = {
  html: (res, pathName, data = {}) => htmlController(res, pathName, data),
  assets: (res, pathDir, pathName) => assetsController(res, pathDir, pathName),
};
module.exports = home;
