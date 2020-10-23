import React from 'react';
import TestRenderer from 'react-test-renderer';
import Button from './button.js';

describe('create button', () => {

    test('create button with no properties', () => {
        const button = <Button></Button>
        const buttonElementTree = TestRenderer.create(button).getInstance();
        expect(buttonElementTree.type).toBe('button');
        expect(buttonElementTree.onClickHandler).toBe(undefined);
        expect(buttonElementTree.labelText).toBe('Submit');
    });

    test('create button with submit type, no onClick, and labelText of Login', () => {
        const button = <Button buttonType='submit' labelText='Login'></Button>
        const buttonElementTree = TestRenderer.create(button).getInstance();
        expect(buttonElementTree.type).toBe('submit');
        expect(buttonElementTree.onClickHandler).toBe(undefined);
        expect(buttonElementTree.labelText).toBe('Login');
    });

    test('create button with submit type, no onClick, and no labeltext', () => {
        const button = <Button buttonType='submit'></Button>
        const buttonElementTree = TestRenderer.create(button).getInstance();
        expect(buttonElementTree.type).toBe('submit');
        expect(buttonElementTree.onClickHandler).toBe(undefined);
        expect(buttonElementTree.labelText).toBe('Submit');
    });

    test('create button with submit type, an onClick function, and no labelText', () => {
        const myFunction = (event) => {
            return true;
        };
        const button = <Button buttonType='submit' onClick={myFunction}></Button>
        const buttonElementTree = TestRenderer.create(button).getInstance();
        expect(buttonElementTree.type).toBe('submit');
        expect(buttonElementTree.onClickHandler).toBe(myFunction);
        expect(buttonElementTree.labelText).toBe('Submit');
    });

    test('create button with submit type, an onClick function, and labelText Login', () => {
        const myFunction = (event) => {
            return true;
        };
        const button = <Button buttonType='submit' onClick={myFunction} labelText='Login'></Button>
        const buttonElementTree = TestRenderer.create(button).getInstance();
        expect(buttonElementTree.type).toBe('submit');
        expect(buttonElementTree.onClickHandler).toBe(myFunction);
        expect(buttonElementTree.labelText).toBe('Login');
    });

});