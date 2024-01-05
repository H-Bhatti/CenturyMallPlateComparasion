const fss = require("fs");

// importing the fs with asynchronous functionality
const Datastore = require("nedb");
// adding database

const logFilePath = "./logsEntry.txt";
// ------------cahnge logfile name here

const database = new Datastore("databaseEntry.db");
// -------------------change database name ere

database.loadDatabase();
// initilizing the database and calling it

var collectedData = [];
// data collected from cashiers

const collectedDataPath = "./dataEntry.csv";
// --------------cahnde datafile path here

// reading with readstream beter aproach
const readStream = fss.createReadStream(collectedDataPath);

readStream
  .on("data", (chuck) => {
    let chunkString = chuck.toString();
    collectedData = chunkString.trim("\r\n").split("\r\n");
  })
  .on("end", () => {
    comparasion(collectedData);
  });

function comparasion(collectedData) {
  // ..
  // Create a write stream
  const now = new Date();
  logWriter(now);
  // ..
  var n = 0;
  for (const element of collectedData) {
    console.log(`Searching for plate Number: ${element}`);
    logWriter(`Searching for plate Number: ${JSON.stringify(element)}`);

    database.find({ plate: element }, function (err, docs) {
      // docs is an array containing documents Mars, Earth, Jupiter
      // If no document is found, docs is equal to []
      if (err) {
        console.error(err);
        return;
      }
      if (docs.length !== 0) {
        console.log(docs);
        n = n + 1;
        console.log(n);
        logWriter(`Data Found for plate Number: ${JSON.stringify(docs)} ${n}`);
      }
    });
  }
}

//...................................................

function logWriter(data) {
  const logStream = fss.createWriteStream(logFilePath, { flags: "a" });
  logStream.write(data + "\n" + "\n", "utf-8", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    } else {
      console.log("Log entry added to", logFilePath);
    }
  });
}
