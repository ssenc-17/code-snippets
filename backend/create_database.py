import sqlite3
import csv
import os

os.remove("films.db")
connection = sqlite3.connect("films.db")
cursor = connection.cursor()

cursor.execute("create table films(title text, year text, certificate text, duration text, genre text, rating text, description text, votes text);")

with open("IMDB.csv", "r", encoding="UTF-8") as file:
    reader = csv.reader(file)
    next(reader)

    for row in reader:
        row.pop(9)
        row[6] = row[6].replace("\"\"", "\\\"").replace("'", "")
        values = str(row)[1:-1]
        query = f"insert into films values({values})"
        print(query)
        cursor.execute(query)
        connection.commit()


connection.close()
print("Created database.")
