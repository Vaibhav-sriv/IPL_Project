const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeams = require("./ipl/matchesWonByTeams");
const extraRunsByTeam = require("./ipl/extraRunsByTeam");
const economicalBowler = require("./ipl/economicalBowler");
const strikeRateOfBatsman = require("./ipl/strikeRateOfBatsman")
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
    csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
        let result = matchesPlayedPerYear(matches);
        let matchWonResult = matchesWonByTeams(matches);
        let extraRunResult = extraRunsByTeam(matches, deliveries);
        let economicalBowlerResult = economicalBowler(matches, deliveries);
        let strikeRateOfBatsmanResult = strikeRateOfBatsman(matches, deliveries)
        console.log(strikeRateOfBatsmanResult)
        saveData(result, matchWonResult, extraRunResult, economicalBowlerResult, strikeRateOfBatsmanResult);
      });
    });
}

function saveData(result, matchWonResult, extraRunResult, economicalBowlerResult, strikeRateOfBatsmanResult) {
  const jsonData = {
    matchesPlayedPerYear: result,
    matchesWonByTeams : matchWonResult,
    extraRunsByTeam : extraRunResult,
    economicalBowler : economicalBowlerResult,
    strikeRateOfBatsman : strikeRateOfBatsmanResult
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
