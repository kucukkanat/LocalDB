var path = require("path");
module.exports = {
  entry: {
    app: ["./localDB.js"]
  },
  output: {
    publicPath: "/",
    filename: "index.js"
  }
};
