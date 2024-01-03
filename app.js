const fs = require("fs").promises;
// importing the fs with asynchronous functionality
const directoryPath = "./02_01_2024/entry";

async function main(path) {
  const data = await readFileNames(path);
  console.log(data);
  //   getting the names of files and storing it in an array
}

async function readFileNames(path) {
  const fileNames = await fs.readdir(path);
  return fileNames;

  //   using the readdir function from fs to read the names of files and return the data to the  ain function
}

main(directoryPath);
