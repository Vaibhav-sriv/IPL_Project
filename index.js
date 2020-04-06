const express = require("express");
const app = express();
var server = app.listen(3000, console.log("Server running on port : 3000"))
app.use(express.static('public'))

var someObject = require("./ecodata.json")

app.get("/economy", (req, res) => {
  const season = req.query.season;
  const result = someObject.economyPerYear[season]
  res.send(result)
})




