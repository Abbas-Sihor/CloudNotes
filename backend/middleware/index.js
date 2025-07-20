require("dotenv").config();
const connectToMongo = require("./db");

connectToMongo();
const express = require("express");
const app = express();
const port = process.env.PORT
//availabe routes

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port 5000`);
});
