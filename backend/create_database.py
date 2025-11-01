import sqlite3
import csv
import os

os.remove("films.db")
connection = sqlite3.connect("films.db")
cursor = connection.cursor()

cursor.execute("create table films(id text, title text, overview text, genres text, director text, actors text, characters text, year text, votes text, rating text, popularity text, budget text, poster_url text);")

with open("movies.csv", "r", encoding="UTF-8") as file:
    reader = csv.reader(file, delimiter="\t")
    next(reader)

    # id, title, overview, tags, genres, director, actors, characters, year, votes, rating, popularity, budget, poster_url
    for row in reader:
        row.pop(3)
        # row[6] = row[6].replace("\"\"", "\\\"").replace("'", "")
        values = str(row)[1:-1]
        query = f"insert into films values({values})"
        # print(query)
        cursor.execute(query)
        connection.commit()


cursor.execute("create table lists(id text, list_title text, film_titles text);")

connection.close()
print("Created database.")
