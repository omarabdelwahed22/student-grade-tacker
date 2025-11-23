const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json());

const grades = require("./routes/grades");
app.use("/grades", grades);


app.get("/", (req,res)=> {
    res.send("Hi")})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));