function matchesWonByTeams(matches) {
    const matchWonResult = {};
    for(let match of matches){
        matchWonResult[match["season"]]={};
    }
    for (let match of matches) {
    var year=match["season"];
    var winningteam=match["winner"];
    if(!matchWonResult[year].hasOwnProperty(winningteam)){
        if(winningteam===""){
            matchWonResult[year]['noresult']=1;
        }else{
            matchWonResult[year][winningteam]=1;
        }
    }else{
        if(winningteam===""){
            matchWonResult[year]['noresult']+=1;
        }else{
            matchWonResult[year][winningteam]+=1;
        }
    }
}
   return matchWonResult;
}
module.exports = matchesWonByTeams; 