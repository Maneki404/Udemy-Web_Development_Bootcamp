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

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

async function checkVisisted(userID) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [userID]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUserColor(userID) {
  const result = await db.query("SELECT color from users WHERE id = $1", [
    userID,
  ]);
  const color = result.rows[0].color;
  return color;
}

app.get("/", async (req, res) => {
  const users = await getUsers();
  const countries = await checkVisisted(1);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      // res.redirect("/");
      const users = await getUsers();
      const countries = await checkVisisted(currentUserId);
      const color = await getUserColor(currentUserId);

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: color,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  var userId = req.body.user;
  currentUserId = userId;

  var newUser = req.body.add;

  if (newUser == undefined) {
    const users = await getUsers();
    const countries = await checkVisisted(userId);
    const color = await getUserColor(userId);

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
    });
  } else {
    res.render("new.ejs", {});
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const newUser = await db.query(
      "INSERT INTO users (color, name) VALUES ($1, $2) RETURNING *",
      [color, name]
    );

    res.redirect("/");
  } catch (err) {
    console.warn(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
