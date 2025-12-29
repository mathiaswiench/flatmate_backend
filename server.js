import express from "express";
import settlement from "./src/routes/settlement/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = parseInt(process.env.PORT) || 8080;

const swaggerSpec = swaggerJsdoc({
  definition: { openapi: "3.0.0", info: { title: "API", version: "1.0.0" } },
  apis: ["./src/routes/**/*.js"],
});

const app = express();

app.use(express.json());
app.use("/settlement", settlement);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});
