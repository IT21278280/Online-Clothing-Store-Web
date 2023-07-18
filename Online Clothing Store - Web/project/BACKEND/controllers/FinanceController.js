const FinanceModel = require("../models/FinanceModel");


const addFinance = (req, res) => {

    const {amount,category,type,date,reference,description} = req.body;

    const addfinance = new FinanceModel({
        amount,
        category,
        type,
        date,
        reference,
        description,
    });

//addFinance
    addfinance.save().then((makefinance)=>{
        res.json(makefinance);
    }).catch((err)=>{
        console.log(console.error);     
    });
};

//getAllFinance
const getFinance = async (req, res) => {
  
    try{
      const cors = await FinanceModel.find();
      res.json(cors);
  
    }catch(error){
      res.status(400).json(error);
    }
  }

//update
  const UpdateFinance = async (req, res) => {
    const FinanceID = req.params.id;
  
    try {
      const cRs = await FinanceModel.findById(FinanceID);
  
      if(!cRs){
        return res.status(404).json("There is a no ResultID");
      }
  
      const {amount,category,type,date,reference,description} = req.body;
      
      const cor = await FinanceModel.findByIdAndUpdate(FinanceID, {amount,category,type,date,reference,description});
  
    } catch (error) { 
      res.status(400).json(error.message);
    }
  }

  //deleteResult
  const removerFinance = async (req,res) => {
    const FinanceID = req.params.id;
  
    try{
      const crs = await FinanceModel.findById(FinanceID);
      if(!crs){
        return res.status(404).json("There is no Student Result to remove");
      }
  
      const removerFinance = await FinanceModel.findByIdAndDelete(FinanceID);
      res.status(200).json(removerFinance)
    }catch(error){
      res.status(400).json(error.message);
  
    }
  }


  //get spesific

  const getSpecFinance = async (req,res) => {

    let FinanceID = req.params.id;
    const finance = await  FinanceModel.findById(FinanceID)
        .then((finance) => {

            res.status(200).send({status: "search success",finance})

        }).catch(() => {

            console.log(err.message);
            res.status(500).send({status: "Error ", error: err.message});

        })

}



  module.exports ={
    addFinance,
    getFinance,
    UpdateFinance,
    removerFinance,
    getSpecFinance,
    
  }