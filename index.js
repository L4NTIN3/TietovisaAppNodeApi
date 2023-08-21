const express = require("express")
const app = express();
const fs = require("fs")
const port = 3000;

app.use(express.json())
const databasePath = "questions.json"

app.post("/question", (req, res) => {

    const data = req.body; 
    const existingData = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    existingData.push(data)

    fs.writeFileSync(databasePath, JSON.stringify(existingData))
    res.send(`Lisättiin: ${data}`)

})


app.get("/questions", (req, res) => {
    const questions = fs.readFileSync(databasePath, "utf8")
    res.send(questions)
})

app.listen(port, () => {
    console.log(`Sovellus kuuntelee portissa ${port}`);
});