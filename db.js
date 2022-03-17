const mongoose = require("mongoose")
const config = require("./config")

mongoose.connect(
  config.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

