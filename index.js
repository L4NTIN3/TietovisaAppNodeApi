const express = require("express")
const app = express();
const fs = require("fs")
const cors = require("cors")
const port = 3000;

app.use(express.json())
const databasePath = "questions.json"

const allowedOrigins = ['https://ashy-sky-0b6965303.3.azurestaticapps.net', "http://localhost:5173"]
const corsOptions = {
    origin: allowedOrigins, // Allow requests from this domain
    methods: 'GET,PUT,POST,DELETE',    // Specify allowed HTTP methods
    optionsSuccessStatus: 204 
}

app.use(cors(corsOptions))



const allowedApiKey = 'fzCXTefLOAL83YfNr0lrFhNk67FlQByygjOgugk45HzJIuxBWjcOeNmyfu5Zy74dtedIrTc0KsEkfBtXc0KsEkfBtXf9eotEc8Lz';

// Middleware tarkistamaan API-avain
function checkApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];

  if (apiKey === allowedApiKey) {
    next(); // Jatka pyyntöjen käsittelyyn
  } else {
    res.status(403).json({ message: 'Access denied. Invalid API key.' });
  }
}

app.post("/question", checkApiKey, (req, res) => {

    const data = req.body; 
    const existingData = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    existingData.push(data)

    fs.writeFileSync(databasePath, JSON.stringify(existingData))
    res.send(`Lisättiin: ${data}`)

})


app.get("/questions", checkApiKey, (req, res) => {
    const questions = fs.readFileSync(databasePath, "utf8")
    res.send(questions)
})

app.listen(port, () => {
    console.log(`Sovellus kuuntelee portissa ${port}`);
});