let validation = require('./validation.js');
describe('validation of form fields', () => {
    //this is placeholder test for the validation function: this currently always returning true
    test('validation of form fields should return true', () => {
        expect(validation.validateFormFields()).toBe(true);
      });  
});