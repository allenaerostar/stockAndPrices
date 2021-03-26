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
      let usernameLengthError = "Username should have 8 to 12 characters."
      expect(validation.validateFormFields(user_too_short, pwd, email)).toBe(usernameLengthError);
      expect(validation.validateFormFields(user_too_long, pwd, email)).toBe(usernameLengthError);
    }),
    test('validation for password', () => {
      let pwd_too_short = "ABC123";
      let pwd_too_long = "ABCabc1234567";
      let pwd_no_capital = "abcabc123";
      let pwd_no_number = "ABCabcca";
      let passwordLengthError = "Password should have 8 to 12 characters."
      let passwordFormatError = "Password should include capital letter and number"
      expect(validation.validateFormFields(user, pwd_too_short, email)).toBe(passwordLengthError);
      expect(validation.validateFormFields(user, pwd_too_long, email)).toBe(passwordLengthError);
      expect(validation.validateFormFields(user, pwd_no_capital, email)).toBe(passwordFormatError);
      expect(validation.validateFormFields(user, pwd_no_number, email)).toBe(passwordFormatError);
    }),
    test('validation for email', () => {
      let wrong_email_format1 = "abc.com";
      let wrong_email_format2 = "@abc.com";
      let wrong_email_format3 = "abc@";
      let wrong_email_format4 = "abc@abc";
      let wrong_email_format5 = "abc@.com";
      let emailFormatError = "Incorrect email format"
      expect(validation.validateFormFields(user, pwd, wrong_email_format1)).toBe(emailFormatError);
      expect(validation.validateFormFields(user, pwd, wrong_email_format2)).toBe(emailFormatError);
      expect(validation.validateFormFields(user, pwd, wrong_email_format3)).toBe(emailFormatError);
      expect(validation.validateFormFields(user, pwd, wrong_email_format4)).toBe(emailFormatError);
      expect(validation.validateFormFields(user, pwd, wrong_email_format5)).toBe(emailFormatError);
    }); 
});