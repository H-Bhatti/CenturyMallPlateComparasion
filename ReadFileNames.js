const fs = require("fs").promises;

// importing the fs with asynchronous functionality
const directoryPath = "./02_01_2024/entry";
// -----------change Images folder path here
const Datastore = require("nedb");
// adding database

const database = new Datastore("databaseEntry.db");
// ----------cahngedatabase here

database.loadDatabase();
// initilizing the database and calling it

main(directoryPath);

async function main(path) {
  const data = await readFileNames(path);

  for (element of data) {
    element = element.replace(".jpg", "");
    element = element.split(" ");
    const plate = { PlateCode: element[2], plate: element[3] };
    database.insert(plate, (err) => {
      if (err) {
        console.log(`error in pushing into database: ${err}`);
      }
    });
  }

  // console.log(data);

  //   getting the names of files and storing it in an array
}

async function readFileNames(path) {
  const fileNames = await fs.readdir(path);
  return fileNames;
  //   using the readdir function from fs to read the names of files and return the data to the  ain function
}
