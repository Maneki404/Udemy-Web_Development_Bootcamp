const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
}

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You should enter a name"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("fruit", fruitSchema); //CREATING COLLECTION

// const fruit = new Fruit({
//   name: "Apple",
//   rating: "5",
//   review: "Pretty plain.",
// });

// const fruit = new Fruit({
//   name: "Peach",
//   rating: "10",
//   review: "YUMMY!",
// });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
});

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 8,
//   review: "Good stuff!",
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 8,
//   review: "Yummm!",
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 9,
//   review: "Eat my banana.",
// });

// Fruit.insertMany([kiwi, orange, banana])
//   .then(() => console.log("Succesfully inserted 3 fruits to fruitsDB."))
//   .catch((err) => console.log(err));

//person.save();

//fruit.save();

// Fruit.deleteOne({ name: "Peach" })
//   .then(() => console.log("Deleted peach."))
//   .catch((err) => console.log(err));

Fruit.find({})
  .then((fruits) =>
    fruits.forEach((fruit) => {
      console.log(fruit.name);
      mongoose.connection.close();
    })
  )
  .catch((err) => console.log(err));
