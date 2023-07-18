const validator = require("validator");
const isEmpty = require("is-empty");

function validateMembsershipInputs(data){

    let errors = {};

    //Covert empty fields to empty string so we can use validator function
    data.name = !isEmpty(data.name) ? data.name: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.contact = !isEmpty(data.contact) ? data.contact: "";
    data.membershipType = !isEmpty(data.membershipType) ? data.membershipType: "";

   
    if(validator.isEmpty(data.membershipType)){
        errors = "Membership Type is required";
    }
    if(validator.isEmpty(data.contact)){
        errors = "Contact is required";
    }
     //Price check
     if(validator.isEmpty(data.email)){
        errors = "Email is required";
    }
     //Name checks
     if(validator.isEmpty(data.name)){
        errors = "Name is required";
    }
    

    return{
        errors, isValid: isEmpty(errors)
    };
}

module.exports = validateMembsershipInputs;