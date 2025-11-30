import express from "express";
import v1 from "./src/routes/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = 3000;
const swaggerSpec = swaggerJsdoc({
  definition: { openapi: "3.0.0", info: { title: "API", version: "1.0.0" } },
  apis: ["./src/routes/**/*.js"],
});

const app = express();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use("/v1", v1);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
