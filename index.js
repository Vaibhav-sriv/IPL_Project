const express = require("express");
const app = express();
app.use(express.static('public'))

var someObject = require("./ecodata.json")

app.get("/economy", (req, res) => {
  const season = req.query.season;
  const result = someObject.economyPerYear[season]
  res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
  console.log("Server in running at port : 3000")
})

