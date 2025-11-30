import express, { Router } from "express";
import settlement from "./settlement/index.js";

const v1 = express.Router();

v1.use("/settlement", settlement);

export default v1;
