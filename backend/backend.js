// commonjs import
const { DatabaseSync } = require("node:sqlite");
// const { select, insert, update } = require("./database.js");
const express = require("express");


const app = express();
app.use(express.json());

const database = new DatabaseSync("films.db");

const EQUALS = "=";
const LIKE = "LIKE";

`
SELECT ...   -> getting values
INSERT INTO ... -> adds new values to the database
UPDATE SET ... -> changes existing values
`

function databaseSelect(table, what, options) {
    let where;
    if (options.length) {
        const formattedOptions = options.map(option => {
            const { name, comparator, value } = option;
            return `${name} ${comparator} '${value}'`;
        })
        where = "WHERE " + formattedOptions.join(" AND ");
    } else {
        where = "";
    }
    const query = `SELECT ${what} FROM ${table} ${where} LIMIT 50;`;
    const prepared = database.prepare(query);
    const results = prepared.all();
    return results;
}

function databaseInsert(table, data) {
    const dataString = `(${data.map(value => `'${value}'`).join(", ")})`;
    const query = `INSERT INTO ${table} VALUES ${dataString};`
    database.exec(query);
}

function databaseUpdate() {

}
"UPDATE films SET genre = 'Action' WHERE title = 'My film';"

// SELECT * FROM films WHERE title = 'Star Wars' AND year = '1976' LIMIT 50;

app.get("/", (request, response) => {
    response.send("API status: running");
});


app.get("/api/film", (request, response) => {
    // "/api/film?title=The Great Gatsby" -> All information about the specific film
    const results = databaseSelect("films", "*", [{
        name: "title",
        comparator: EQUALS,
        value: request.query.title
    }]);
    if (results.length === 0) {
        response.sendStatus(404);
    } else {
        response.json(results[0]);
    }
});

app.get("/api/films", (request, response) => {
    // "/api/films?title=Harry%" -> All films titles beginning with "Harry"
    response.json(databaseSelect("films", "title", [{
        name: "title",
        comparator: LIKE,
        value: request.query.title
    }]));
});


app.get("/api/year", (request, response) => {
    // "/api/year?year=2020" -> All films released in 2020
    // "/api/year/2020"
    response.json(databaseSelect("films", "title", [{
        name: "year",
        comparator: EQUALS,
        value: request.query.year
    }]));
});


app.post("/api/list", (request, response) => {
    console.log(request.body);
    databaseInsert("lists", Object.values(request.body))
    database.close();
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
