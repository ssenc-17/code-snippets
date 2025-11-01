// commonjs import
const { DatabaseSync } = require("node:sqlite");
const express = require("express");


const app = express();
const database = new DatabaseSync("films.db");


app.get("/", (request, response) => {
    response.send("API status: running");
});

app.get("/api/films", (request, response) => {
    const titleArgument = request.query.title;
    
    let query;
    if (titleArgument && !titleArgument.includes("The")) {
        query = `SELECT title FROM films WHERE title LIKE '${titleArgument}';`;
    } else {
        query = "SELECT title FROM films LIMIT 50;";
    }

    query = database.prepare(query);
    const results = query.all();
    response.json(results);
});


app.get("/api/year", (request, response) => {
    let query = "SELECT * FROM films WHERE year = '"
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
