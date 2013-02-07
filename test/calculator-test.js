module("calculator button tests", {
    setup: function(){
        initCalculator();
    }
});

test("clear resets calculator values", function(){
    calculator.operand = '12345.76';
    calculator.operator = '+';
    calculator.lastButtonClicked = 'number';
    calculator.clear();
    deepEqual(calculator.operand, null);
    deepEqual(calculator.operator, null);
    deepEqual(calculator.lastButtonClicked, null);
    deepEqual('0', calculator.display.textContent, "clear makes text in box empty string");
});

test("addDigit appends a digit to the end of the number being displayed", function(){
    var expectedDisplayText = '352';
    calculator.display.textContent = '35';
    calculator.addDigit(2);
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("addDigit replaces 0 with digit if 0 is only text in display", function(){
    var expectedDisplayText = '7';
    calculator.display.textContent = '0';
    calculator.addDigit(7);
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("clicking a number button sets the lastButtonPressed to number", function(){
    calculator.addDigit('1');
    deepEqual('number', calculator.lastButtonClicked);
});

test("addDecimal adds a decimal point to the number in the display", function(){
    var expectedDisplayText = '37.';
    calculator.display.textContent = '37';
    calculator.addDecimal();
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("addDecimal sets lastButtonClicked to decimal", function(){
    calculator.addDecimal();
    deepEqual('decimal', calculator.lastButtonClicked);
});

test("addDecimal does not set lastButtonClicked to decimal if a decimal is already in the number", function(){
    calculator.display.textContent = '42.051';
    calculator.lastButtonClicked = 'number';
    calculator.addDecimal();
    deepEqual('number', calculator.lastButtonClicked);
});

test("no more than one decimal in a number", function(){
    var expectedDisplayText = '37.';
    calculator.display.textContent = '37.';
    calculator.addDecimal();
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("equal without an operator sets display to itself and sets itself as operand", function(){
    var expectedDisplayText = '5004';
    calculator.display.textContent = expectedDisplayText;
    calculator.equal();
    deepEqual(expectedDisplayText, calculator.display.textContent);
    deepEqual(expectedDisplayText, calculator.operand);
});

test("plus operator", function(){
    var firstOperand = '592';
    calculator.set(firstOperand);
    calculator.plus();
    deepEqual(firstOperand, calculator.operand, "plus operator sets the display as the first operator for the calculation");
    deepEqual('', calculator.display.textContent, "plus operator clears out display");
    deepEqual('+', calculator.operator, "plus operator sets + as the operator for the calculation");
});

test("equal operator performs plus calculation and clears calculator variables", function(){
    var firstOperand = '23';
    var secondOperand = '100';

    calculator.operand = firstOperand;
    calculator.operator = '+';
    calculator.set(secondOperand);
    calculator.lastButtonClicked = '0';
    calculator.equal();
    deepEqual(calculator.operator, null);
    deepEqual(calculator.operand, null);
    deepEqual(calculator.lastButtonClicked, null);
    deepEqual(calculator.display.textContent, '123');
});
