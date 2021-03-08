let validation = require('./validation.js');

let user = "abcabcabc";
let pwd = "ABCabc123";
let email = "abc@abc.com";
describe('validation of form fields', () => {
    //this is placeholder test for the validation function: this currently always returning true
    test('validation of form fields return true', () => {
        expect(validation.validateFormFields(user, pwd, email)).toBe("true");
      }),
    test('validation for username', () => {
      let user_too_short = "abcabc";
      let user_too_long = 'abcabcabcabca';
      expect(validation.validateFormFields(user_too_short, pwd, email)).toBe("Username should have 8 to 12 characters.");
      expect(validation.validateFormFields(user_too_long, pwd, email)).toBe("Username should have 8 to 12 characters.");
    }),
    test('validation for password', () => {
      let pwd_too_short = "ABC123";
      let pwd_too_long = "ABCabc1234567";
      let pwd_no_capital = "abcabc123";
      let pwd_no_number = "ABCabcca";
      expect(validation.validateFormFields(user, pwd_too_short, email)).toBe("Password should have 8 to 12 characters.");
      expect(validation.validateFormFields(user, pwd_too_long, email)).toBe("Password should have 8 to 12 characters.");
      expect(validation.validateFormFields(user, pwd_no_capital, email)).toBe("Password should include capital letter and number");
      expect(validation.validateFormFields(user, pwd_no_number, email)).toBe("Password should include capital letter and number");
    }),
    test('validation for email', () => {
      let wrong_email_format1 = "abc.com";
      let wrong_email_format2 = "@abc.com";
      let wrong_email_format3 = "abc@";
      let wrong_email_format4 = "abc@abc";
      let wrong_email_format5 = "abc@.com";
      expect(validation.validateFormFields(user, pwd, wrong_email_format1)).toBe("Incorrect email format");
      expect(validation.validateFormFields(user, pwd, wrong_email_format2)).toBe("Incorrect email format");
      expect(validation.validateFormFields(user, pwd, wrong_email_format3)).toBe("Incorrect email format");
      expect(validation.validateFormFields(user, pwd, wrong_email_format4)).toBe("Incorrect email format");
      expect(validation.validateFormFields(user, pwd, wrong_email_format5)).toBe("Incorrect email format");
    }); 
});