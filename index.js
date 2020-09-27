const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");
const app = require("./src/app");

app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
