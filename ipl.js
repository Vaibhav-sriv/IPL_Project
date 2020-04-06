const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeams = require("./ipl/matchesWonByTeams");
const extraRunsByTeam = require("./ipl/extraRunsByTeam");
const economicalBowler = require("./ipl/economicalBowler");
const strikeRateOfBatsman = require("./ipl/strikeRateOfBatsman")
const economyPerYear = require("./ipl/economyPerYear")
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const ECONOMY_OUTPUT_FILE_PATH = "./ecodata.json";

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
        let strikeRateOfBatsmanResult = strikeRateOfBatsman(matches, deliveries);
      
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

function main2(){
  csv()
  .fromFile(MATCHES_FILE_PATH)
  .then((matches)=>{
    csv()
    .fromFile(DELIVERIES_FILE_PATH)
    .then((deliveries)=>{
      let economyPerYearResult = economyPerYear(matches, deliveries);
      saveData2(economyPerYearResult)    
    })
  })
}

function saveData2(economyPerYearResult){
  const jsonData = {
    economyPerYear : economyPerYearResult
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(ECONOMY_OUTPUT_FILE_PATH, jsonString, "utf8", err2 => {
    if(err2) {
      console.log(err2);
    }
  });
}

main();
main2();
