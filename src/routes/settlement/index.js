import express, { Router } from "express";
import handleSettlementCalculation from "./controller.js";

let settlement = express.Router();
/**
 * @openapi
 * /v1/settlement/:
 *   post:
 *     description: Create settlements for a list of flatmates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalDays
 *               - flatmates
 *             properties:
 *               totalDays:
 *                 type: number
 *                 description: Total number of days
 *               flatmates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - daysAbsent
 *                     - expenditure
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Flatmate's name
 *                     daysAbsent:
 *                       type: number
 *                       description: Number of days the flatmate was absent
 *                     expenditure:
 *                       type: number
 *                       format: float
 *                       description: Amount spent by the flatmate
 *     responses:
 *       200:
 *         description: Settlements for flatmates.
 */
settlement.post("/", handleSettlementCalculation);

export default settlement;
