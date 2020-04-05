function economyPerYear(matches, deliveries){
    let years = [];
    for(let i of matches){
        if(!years.includes(i.season)){
            years.push(i.season)
        }
        years.sort((a,b)=>{return a-b})
    }

    let economyPerYearResult={}
    for(let y of years){
        let matchId=[]
        for (let match of matches) {
            const season = match.season;
            if (season === y) {
            matchId.push(match.id);
            }
        }
        const runsByPlayer={}
        const ballsPerPlayer={}
        for(let i of deliveries){
            if(matchId.includes(i.match_id)){  // Calculating Runs By Player
                if(!runsByPlayer.hasOwnProperty(i.bowler)){
                    runsByPlayer[i.bowler]=Number(i.wide_runs)+Number(i.noball_runs)+Number(i.batsman_runs)
                }else{
                    runsByPlayer[i.bowler]+=Number(i.wide_runs)+Number(i.noball_runs)+Number(i.batsman_runs)
                }

                if(!ballsPerPlayer.hasOwnProperty(i.bowler)){ // Calculating Balls By Player
                    ballsPerPlayer[i.bowler]=1
                }else{
                    ballsPerPlayer[i.bowler]+=1
                }
                if(Number(i.wide_runs)>0 || Number(i.noball_runs)>0){
                    ballsPerPlayer[i.bowler]-=1
                }
            }
        }
        let arr=[]
        for(let i in runsByPlayer){
            arr.push([i,Number(Number.parseFloat(runsByPlayer[i]/(ballsPerPlayer[i]/6)).toFixed(2))])
        }
        arr.sort((a,b)=>{return a[1]-b[1]})
        let arr2=[]
        for(let i=0; i<10; i++){
            arr2.push({'bowler' : arr[i][0], 'economy' : arr[i][1]})
        }
        economyPerYearResult[y]=arr2

    }
    return economyPerYearResult
}

module.exports=economyPerYear;