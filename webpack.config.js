var path = require("path");
module.exports = {
  entry: {
    app: ["./localDB.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "index.js"
  }
};
