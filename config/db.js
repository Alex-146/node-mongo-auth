
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = {
  connectionUrl: `mongodb+srv://${user}:${password}@cluster0.rb0sz.mongodb.net/auth-test?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}