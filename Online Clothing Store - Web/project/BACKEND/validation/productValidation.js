const validator = require("validator");
const isEmpty = require("is-empty");

function validateProductsInputs(data){

    let errors = {};

    //Covert empty fields to empty string so we can use validator function
    data.name = !isEmpty(data.name) ? data.name: "";
    data.price = !isEmpty(data.price) ? data.price: "";
    data.description = !isEmpty(data.description) ? data.description: "";
    data.category = !isEmpty(data.category) ? data.category: "";
    data.image = !isEmpty(data.image) ? data.image: "";
    data.image1 = !isEmpty(data.image1) ? data.image1: "";
    data.image2 = !isEmpty(data.image2) ? data.image2: "";
    data.image3 = !isEmpty(data.image3) ? data.image3: "";

    
    


    //Name checks
    if(validator.isEmpty(data.name)){
        errors = "Name is required";
    }

    //Price check
    if(validator.isEmpty(data.price)){
        errors = "Price is required";
    }

    if(validator.isEmpty(data.description)){
        errors = "Description is required";
    }
    if(validator.isEmpty(data.category)){
        errors = "Category is required";
    }
    if(validator.isEmpty(data.image)){
        errors = "Image is required";
    }
    if(validator.isEmpty(data.image1)){
        errors = "Image 1 is required";
    }
    if(validator.isEmpty(data.image2)){
        errors = "Image 2 is required";
    }
    if(validator.isEmpty(data.image3)){
        errors = "Image 3 is required";
    }
    

    return{
        errors, isValid: isEmpty(errors)
    };
}

module.exports = validateProductsInputs;