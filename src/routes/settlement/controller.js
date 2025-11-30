import calculateSettlement from "./settlementCalculation.js";

export default function handleSettlementCalculation(req, res) {
  let input = req.body;
  let settlement = calculateSettlement(input["totalDays"], input["flatmates"]);
  res.status(200).json({ res: settlement });
}
