const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("films.db");

let query = "select title from films where title like 'The%';";
query = database.prepare(query);
const results = query.all();

console.log(results);
