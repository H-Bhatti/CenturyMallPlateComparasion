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

var collectedData = [];
// data collected from cashiers

const collectedDataPath = "./data.csv";

// main(directoryPath);

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

function comparasion() {
  for (const element of collectedData) {
    console.log(element);
  }
}

// try method with readfilesync, this is a synchronows function which reads the file and processes it and makes it into an array

try {
  // Synchronously read the contents of a file
  const data = fss.readFileSync("./data.csv", "utf8");
  collectedData = data.trim("\r\n").split("\r\n");
} catch (error) {
  console.error("Error reading file:", error.message);
}
console.log(collectedData);

// file path for collected data csv

// fs module fore reading the csv and pushing it into an array
// fss
//   .createReadStream(collectedDataPath)
//   .pipe(csv({}))
//   .on("data", (data) => {
//     collectedData.push(data);
//   })
//   .on("end", () => {
//     console.log("collectedData");
//     comparasion();
//   });
