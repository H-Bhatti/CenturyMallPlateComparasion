const fs = require("fs");
const path = require("path");

const directoryPath = "./02_01_2024/entry";

// Read all files in the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  console.log(files);
  // Log the names of all files in the directory
  //   files.forEach((file) => {
  //     console.log(file);
  //   });
});
