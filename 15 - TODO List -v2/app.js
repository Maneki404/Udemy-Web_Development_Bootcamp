const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Get Up",
});
const item2 = new Item({
  name: "Eat",
});
const item3 = new Item({
  name: "Poop",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({})
    .then((items) => {
      if (items.length == 0) {
        Item.insertMany(defaultItems)
          .then(() =>
            console.log(`Inserted ${defaultItems.length} items succesfully.`)
          )
          .catch((err) => console.log(err));
      }
      res.render("list", { listTitle: "Today", newListItems: items });
    })
    .catch((err) => console.log(err));
});

app.get("/:category", function (req, res) {
  const customListName = _.capitalize(req.params.category);
  List.findOne({ name: customListName })
    .then((list) => {
      if (!list) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + req.params.category);
      } else {
        res.render("list", { listTitle: list.name, newListItems: list.items });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/", function (req, res) {
  const itemName = req.body.todoItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });

  if (listName == "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
      .catch((err) => console.log(err));
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName == "Today") {
    Item.findByIdAndRemove(checkedItemId)
      .then(() => console.log("Item deleted successfully."))
      .catch((err) => console.log(err));
    res.redirect("/");
  } else {
    console.log("ELSE EXECUTED");
    console.log("ID IS: " + checkedItemId);
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then((foundList) => {
        console.log("Deleted!" + foundList);
        res.redirect("/" + listName);
      })
      .catch((err) => console.log("ERROR IS: " + err));
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
