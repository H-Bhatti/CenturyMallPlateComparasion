const fs = require("fs").promises;
const fss = require("fs");

// importing the fs with asynchronous functionality
const directoryPath = "./02_01_2024/entry";
const Datastore = require("nedb");
// adding database

const csv = require("csv-parser");
const { resolve } = require("path");

const database = new Datastore("database1.db");
database.loadDatabase();
// initilizing the database and calling it

async function main(path) {
  const data = await readFileNames(path);

  for (element of data) {
    element = element.replace(".jpg", "");
    element = element.split(" ");
    const plate = { PlateCode: element[2], plate: element[3] };
    database.insert(plate, (err) => {
      if (err) {
        console.log(err);
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

// main(directoryPath);

const results = [];
fss
  .createReadStream("./data.csv")
  .pipe(csv({}))
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results.length);
    // console.log(results)
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
    }
  });
