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

test("clicking a number button sets the display to that number if last button pressed was equal", function(){
    var expectedDisplayText = '3';
    calculator.display.textContent = '29.042';
    calculator.equal();
    calculator.addDigit('3');
    deepEqual(expectedDisplayText, calculator.display.textContent)
});

test("addDigit will set the display to the number entered if the last button pressed was an operator", function(){
    var initialDisplayText = '420';
    calculator.display.textContent = initialDisplayText;
    calculator.setOperator('+');
    deepEqual(initialDisplayText, calculator.display.textContent);
    var digit = '3';
    calculator.addDigit(digit);
    deepEqual(digit, calculator.display.textContent);
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
    calculator.setOperator('+');
    deepEqual(firstOperand, calculator.operand, "plus operator sets the display as the first operator for the calculation");
    deepEqual('+', calculator.operator, "plus operator sets + as the operator for the calculation");
    deepEqual('operator', calculator.lastButtonClicked);
});

test("minus operator", function(){
    var firstOperand = '592';
    calculator.set(firstOperand);
    calculator.setOperator('-');
    deepEqual(firstOperand, calculator.operand, "minus operator sets the display as the first operator for the calculation");
    deepEqual('-', calculator.operator, "minus operator sets - as the operator for the calculation");
    deepEqual('operator', calculator.lastButtonClicked);
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
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '123');
});

test("subtraction", function(){
    var firstOperand = 200;
    var secondOperand = 27;
    calculator.set(firstOperand);
    calculator.setOperator('-');
    calculator.set(secondOperand);
    calculator.lastButtonClicked = '7';
    calculator.equal();
    deepEqual(calculator.operator, null);
    deepEqual(calculator.operand, null);
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '173');
});

test("multiplication", function(){
    var firstOperand = '23';
    var secondOperand = '100';

    calculator.operand = firstOperand;
    calculator.operator = '*';
    calculator.set(secondOperand);
    calculator.lastButtonClicked = '0';
    calculator.equal();
    deepEqual(calculator.operator, null);
    deepEqual(calculator.operand, null);
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '2300');
});

test("division", function(){
    var firstOperand = 200;
    var secondOperand = 5;
    calculator.set(firstOperand);
    calculator.setOperator('/');
    calculator.set(secondOperand);
    calculator.lastButtonClicked = '5';
    calculator.equal();
    deepEqual(calculator.operator, null);
    deepEqual(calculator.operand, null);
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '40');
});