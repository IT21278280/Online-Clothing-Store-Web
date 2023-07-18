const express = require("express");
const router = express.Router();
const { 
    addFinance,
    getFinance,
    UpdateFinance,
    removerFinance,
    getSpecFinance,

} = require("../controllers/FinanceController");

//addFinance
router.post("/",addFinance);
//getFinance
router.get("/all",getFinance);
//UpdateFinance
router.put("/:id",UpdateFinance);
//DeleteFinance
router.delete("/:id",removerFinance);
//getSpecFinance
router.get("/:id",getSpecFinance);


module.exports = router;