// commonjs import
const { DatabaseSync } = require("node:sqlite");
const express = require("express");


const app = express();
app.use(express.json());

const database = new DatabaseSync("films.db");


app.get("/", (request, response) => {
    response.send("API status: running");
});


app.get("/api/film", (request, response) => {
    // "/api/film?title=The Great Gatsby" -> All information about the specific film
    const titleArgument = request.query.title;
    let query = `SELECT * FROM films WHERE title = '${titleArgument}';`;

    query = database.prepare(query);
    const result = query.get();
    if (result === undefined) {
        response.sendStatus(404);
    } else {
        response.json(result);
    }
});

app.get("/api/films", (request, response) => {
    // "/api/films?title=Harry%" -> All films titles beginning with "Harry"
    const titleArgument = request.query.title;
    
    let query;
    if (titleArgument) {
        query = `SELECT title FROM films WHERE title LIKE '${titleArgument}';`;
    } else {
        query = "SELECT title FROM films LIMIT 50;";
    }

    query = database.prepare(query);
    const results = query.all();
    response.json(results);
});


app.get("/api/year", (request, response) => {
    // "/api/year?year=2020" -> All films released in 2020
    const yearArgument = request.query.year;

    let query = `SELECT title FROM films WHERE year = '${yearArgument}';`
    query = database.prepare(query);
    const result = query.all();
    response.json(result);
});


app.post("/api/list", (request, response) => {
    console.log(request.body);
    response.send("Hello world from POST");
});


`
/api/films
-> Returns all films

/api/films?title=The%
/api/films/XYZ
-> Returns films that match the title "XYZ"
    Args:
    title: string

/api/year/2010



/api/genre/Action
`


app.listen(3000, () => {
    console.log("App listening.")
});
