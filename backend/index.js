const dotenv = require("dotenv");
dotenv.config(); // Use .env variables

// Frameworks
const express = require("express");
const app = express();
const morgan = require("morgan"); // Print req info on terminal
const cors = require("cors"); // Enable cors on application

// Documentation server
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/api.yaml");

// Application
const models = require("./src/database/models");

app.use(morgan("dev")); // Morgan req info style

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const { authMiddleware } = require("./src/middlewares/auth");
const { errorMiddleware } = require("./src/middlewares/error");

app.use(authMiddleware);
// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require("./src/routes"));

app.use(errorMiddleware);

// Sequelize
const force = true;
models.sequelize
  .sync({ force })
  .then(async () => {
    if (force) {
      let execProcess = require("./src/utils/execCommand");
      // Call seed all
      await execProcess.result("npm run seed", (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    }

    app.listen(4000);
  })
  .catch((err) => {
    throw new Error(err);
  });
