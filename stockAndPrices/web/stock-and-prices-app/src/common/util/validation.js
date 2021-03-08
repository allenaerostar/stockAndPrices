//This file contains validation functions for form submission.
function validateFormFields(username, password, email) {
    // username check
    if (username.length<8 || username.length>12){
        return "Username should have 8 to 12 characters."
    }
    // password check
    if (password.length<8 || password.length>12){
        return "Password should have 8 to 12 characters."
    }
    else if (!/\d/.test(password) || !/[A-Z]/.test(password)){
        return "Password should include capital letter and number"
    }
    // email check
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)){
        return "Incorrect email format"
    }
    return "true";
}

// backend check for sql keyword 
// sanitizing input python
// dont need to validate fake email. email have the right format. (check if it is not exist in the database)

exports.validateFormFields = validateFormFields;


