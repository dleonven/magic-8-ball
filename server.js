const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* get the random line from answers.txt and send it */
app.get('/api', (req, res) => {
  fs.readFile("answers.txt", function(err, data){
    if(err) throw err;
    let lines = data.toString().split('\n');
    const line = lines[Math.floor(Math.random()*lines.length)];
    res.send({ express: line });
 })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
