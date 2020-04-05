function extraRunsByTeam(matches, deliveries){
    let newArray = []; // Ids from matches
    let newArray2 = [];
    for (let match of matches) {
        const season = match.season;
        if (season === '2016') {
            newArray.push(match.id);
            newArray2.push(match.team1, match.team2)
        }
    }
    let extraRunResult = {};
    let total = 0;
    for (let delivery of deliveries) {
        if (newArray.includes(delivery.match_id)) {
            total = Number(delivery.wide_runs) + Number(delivery.bye_runs) + Number(delivery.legbye_runs) + Number(delivery.noball_runs) + Number(delivery.penalty_runs);
            if (!extraRunResult.hasOwnProperty(delivery.bowling_team)) {
                extraRunResult[delivery.bowling_team] = total;
            } else {
                extraRunResult[delivery.bowling_team] += total;
            }
        }
    }
    return extraRunResult;

}

module.exports = extraRunsByTeam;