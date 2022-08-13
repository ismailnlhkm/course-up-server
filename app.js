const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const route = require("./routes");
const cors = require("cors");
const bp = require('body-parser')

app.use(cors());
app.use(bp.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
