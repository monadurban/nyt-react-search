module.exports = {
  // Start of react applicaton
  entry: "./app/app.js",
  
  // Plain compiled JavaScript will be output here
  output: {
    filename: "public/bundle.js"
  },

  // Describes the transformations performed
  module: {
    loaders: [
      {
        // Only allows files with .js or .jsx extension
        test: /\.jsx?$/,

        // Will only process files in app folder
        include: /app/,
        loader: "babel",
        query: {
          // Specific transformations used
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  // Shows errors with lines and filenames
  devtool: "eval-source-map"
};