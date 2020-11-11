module.exports = merge(configBase, {
  mode: "development",
  devServer:{
    port:3001,
    contentBase: path.resolve("public"),
    compress: true,
    hot:true
  },
  devtool:"source-map"
});
