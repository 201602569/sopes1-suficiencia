const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");



var app = Express();

Mongoose.connect('mongodb+srv://chris:amor4219@cluster0.3plrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const PersonModel = Mongoose.model("person", {
    
  name: {
    type: String,
    required: "Please enter a name"
  },
  location: {
    type: String,
    required: "Please enter a location"
  },

  age: {
    type: Number,
    required: "Please enter a number"
  },
  gender: {
    type: String,
    required: "Please enter a number"
  },
  vaccine_type: {
    type: String,
    required: "Please enter a vaccine"
  }
});
app.post("/person", async(request, response) => {
    try {
        var person = new PersonModel(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3100, () => {
    console.log("Listening at :3100...");
});