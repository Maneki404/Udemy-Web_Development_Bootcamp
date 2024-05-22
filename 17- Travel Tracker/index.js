import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "dontstealme!404",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const visited = await db.query("SELECT country_code FROM visited_countries");
  let countryCodes = [];

  visited.rows.forEach((element) => {
    countryCodes.push(element.country_code);
  });

  return countryCodes;
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const code = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [input]
  );

  console.warn(code.rows[0].country_code);

  if (code.rows.length != 0) {
    const data = code.rows[0];
    const countryCode = data.country_code;

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);

    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
