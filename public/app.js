
document.querySelector(".year-input-button").addEventListener("click", fetchEconomyPerYear);

function fetchEconomyPerYear(){
  var y=document.querySelector(".year-input").value;
  if(Number(y)>=2008 || Number(y)<=2019){
    document.querySelector(".economy-per-year")
    fetch("./data.json")
      .then(response => response.json())
      .then(response =>{
        document.querySelector("#economy-per-year")
        visualizeEconomyPerYear(y,response.economyPerYear[y])
      })
  }  
}

function visualizeEconomyPerYear(y, list){
  var seriesData6=[]
  for(let i in list){
    seriesData6.push([list[i].bowler, list[i].economy])
  }
  console.log(seriesData6)
  Highcharts.chart("economy-per-year", {
          chart: {
              type: "column"
          },
          title: {
              text: "Top Economical Bowlers in " + y + " season"
          },
          subtitle: {
              text: 'Source: <a href="http://ipl.com">ipl</a>'
          },
          xAxis: {
              type: "category",
              labels: {
                  rotation: -45,
                  style: {
                      fontSize: "13px",
                      fontFamily: "Verdana, sans-serif"
                  }
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: "Economy"
              }
          },
          legend: {
              enabled: !1
          },
          tooltip: {
              pointFormat: "Economy: <b>{point.y:0.2f} </b>"
          },
          series: [{
              name: "Bowlers",
              data: seriesData6,
              dataLabels: {
                  enabled: !0,
                  rotation: 0,
                  color: "#FFFFFF",
                  align: "center",
                  format: "{point.y:.2f}",
                  y: 25,
                  style: {
                      fontSize: "13px",
                      fontFamily: "Verdana, sans-serif"
                  }
              }
          }]
      })
}




function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData); 
}
 
fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeExtraRunsByTeam(data.extraRunsByTeam);
  visualizeMatchesWonByTeams(data.matchesWonByTeams);
  visualizeEconomicalBowlerResult(data.economicalBowler);
  visualizeStrikeRateOfBatsman(data.strikeRateOfBatsman);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  let seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

//2nd-------------------------------------------------------------------------------------

function visualizeMatchesWonByTeams(matchesWonByTeams){
  let year=[]
  for(let i in matchesWonByTeams) {
    year.push(i)
  }
  var newA=[]
  for(let i in matchesWonByTeams){
    for(let j=0; j<Object.keys(matchesWonByTeams[i]).length; j++){
      if(!newA.includes(Object.keys(matchesWonByTeams[i])[j]))
      newA.push(Object.keys(matchesWonByTeams[i])[j])
    }
  }
  var seriesData2=[]
  for(let teamName of newA){
    var data=[]
    for(let i in matchesWonByTeams){
      if(matchesWonByTeams[i].hasOwnProperty(teamName)){
        data.push(matchesWonByTeams[i][teamName])
      }else{
        data.push(0)
      }
    }
    seriesData2.push({'name' : teamName, 'data' : data})
  }

  Highcharts.chart('Matches-Won-By-Teams', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Matches Won By Teams Over All The Years'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        categories: year,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Matches Won'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData2
  });

}

//3rd-------------------------------------------------------------------------------------

function visualizeExtraRunsByTeam(extraRunsByTeam) {
  let seriesData3 = [];
  for (let team in extraRunsByTeam) {
    seriesData3.push([team, extraRunsByTeam[team]]);
  }
  Highcharts.chart("Extra-Runs-By-Team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Runs Conceaded By Each Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData3
      }
    ]
  });
}
// 4rth----------------------------------------------------------------------------------------

function visualizeEconomicalBowlerResult(economicalBowler){
  let seriesData4=[]
  for(let i of economicalBowler){
    seriesData4.push([i.bowler, Number(i.economy)])
  }

  Highcharts.chart("economical-Bowler", {
    chart: {
      type: "column"
    },
    title: {
      text: "Economy of Bowlers in 2015"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Players",
        data: seriesData4
      }
    ]
  });
}

//5th-------------------------------------------------------------------------------------------------- 

function visualizeStrikeRateOfBatsman(strikeRateOfBatsman){
  let seriesData5=[]
  for(let i of strikeRateOfBatsman){
    seriesData5.push(i)
  }

  Highcharts.chart('strike-Rate', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Strike Rate of Batsman in year 2018'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Strike Rate'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Strike rate of Batsman in Year 2018'
    },
    series: [{
        name: 'Population',
        data: seriesData5,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}
