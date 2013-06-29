module("calculator button tests", {
    setup: function () {
        initCalculator();
    }
});

test("clear resets calculator values", function () {
    calculator.operand = '12345.76';
    calculator.operator = '+';
    calculator.lastButtonClicked = 'number';
    calculator.clear();
    deepEqual(calculator.operand, null);
    deepEqual(calculator.operator, null);
    deepEqual(calculator.lastButtonClicked, null);
    deepEqual('0', calculator.display.textContent, "clear makes text in box empty string");
});

test("addDigit appends a digit to the end of the number being displayed", function () {
    var expectedDisplayText = '352';
    calculator.display.textContent = '35';
    calculator.digitPress(2);
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("addDigit replaces 0 with digit if 0 is only text in display", function () {
    var expectedDisplayText = '7';
    calculator.display.textContent = '0';
    calculator.digitPress(7);
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("clicking a number button sets the lastButtonPressed to number", function () {
    calculator.digitPress('1');
    deepEqual('number', calculator.lastButtonClicked);
});

test("clicking a number button sets the display to that number if last button pressed was equal", function () {
    var expectedDisplayText = '3';
    calculator.display.textContent = '29.042';
    calculator.equal();
    calculator.digitPress('3');
    deepEqual(expectedDisplayText, calculator.display.textContent)
});

test("addDigit will set the display to the number entered if the last button pressed was an operator", function () {
    var initialDisplayText = '420';
    calculator.display.textContent = initialDisplayText;
    calculator.operatorPress('+');
    deepEqual(initialDisplayText, calculator.display.textContent);
    var digit = '3';
    calculator.digitPress(digit);
    deepEqual(digit, calculator.display.textContent);
});

test("addDecimal adds a decimal point to the number in the display", function () {
    var expectedDisplayText = '37.';
    calculator.display.textContent = '37';
    calculator.decimalPress();
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("addDecimal sets lastButtonClicked to decimal", function () {
    calculator.decimalPress();
    deepEqual('decimal', calculator.lastButtonClicked);
});

test("addDecimal does not set lastButtonClicked to decimal if a decimal is already in the number", function () {
    calculator.display.textContent = '42.051';
    calculator.lastButtonClicked = 'number';
    calculator.decimalPress();
    deepEqual('number', calculator.lastButtonClicked);
});

test("no more than one decimal in a number", function () {
    var expectedDisplayText = '37.';
    calculator.display.textContent = '37.';
    calculator.decimalPress();
    deepEqual(expectedDisplayText, calculator.display.textContent);
});

test("can add a decimal after clicking an operator button", function () {
    calculator.digitPress('7');
    calculator.operatorPress('/');
    calculator.digitPress('2');
    calculator.operatorPress('+');
    calculator.decimalPress();
    deepEqual('0.', calculator.display.textContent);
});

test("equal without an operator sets display to itself and sets itself as operand", function () {
    var expectedDisplayText = '5004';
    calculator.display.textContent = expectedDisplayText;
    calculator.equal();
    deepEqual(expectedDisplayText, calculator.display.textContent);
    deepEqual(expectedDisplayText, calculator.operand);
});

test("plus operator", function () {
    var firstOperand = '592';
    calculator.setDisplay(firstOperand);
    calculator.operatorPress('+');
    deepEqual(firstOperand, calculator.operand, "plus operator sets the display as the first operator for the calculation");
    deepEqual('+', calculator.operator, "plus operator sets + as the operator for the calculation");
    deepEqual('operator', calculator.lastButtonClicked);
});

test("minus operator", function () {
    var firstOperand = '592';
    calculator.setDisplay(firstOperand);
    calculator.operatorPress('-');
    deepEqual(firstOperand, calculator.operand, "minus operator sets the display as the first operator for the calculation");
    deepEqual('-', calculator.operator, "minus operator sets - as the operator for the calculation");
    deepEqual('operator', calculator.lastButtonClicked);
});

test("equal operator performs addition calculation", function () {
    var firstOperand = '23';
    var secondOperand = '100';

    calculator.operand = firstOperand;
    calculator.operator = '+';
    calculator.setDisplay(secondOperand);
    calculator.lastButtonClicked = '0';
    calculator.equal();
    deepEqual(calculator.operator, '+');
    deepEqual(calculator.operand, '100');
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '123');
});

test("equal operator performs subtraction calculation", function () {
    var firstOperand = 200;
    var secondOperand = 27;
    calculator.setDisplay(firstOperand);
    calculator.operatorPress('-');
    calculator.setDisplay(secondOperand);
    calculator.lastButtonClicked = '7';
    calculator.equal();
    deepEqual(calculator.operator, '-');
    deepEqual(calculator.operand, '27');
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '173');
});

test("equal operator performs multiplication calculation", function () {
    var firstOperand = '23';
    var secondOperand = '100';

    calculator.operand = firstOperand;
    calculator.operator = '*';
    calculator.setDisplay(secondOperand);
    calculator.lastButtonClicked = '0';
    calculator.equal();
    deepEqual(calculator.operator, '*');
    deepEqual(calculator.operand, '100');
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '2300');
});

test("equal operator performs division calculation", function () {
    var firstOperand = 200;
    var secondOperand = 5;
    calculator.setDisplay(firstOperand);
    calculator.operatorPress('/');
    calculator.setDisplay(secondOperand);
    calculator.lastButtonClicked = '5';
    calculator.equal();
    deepEqual(calculator.operator, '/');
    deepEqual(calculator.operand, '5');
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '40');
});

test("do not allow dividing by zero", function () {
    var firstOperand = 200;
    var secondOperand = 0;
    calculator.setDisplay(firstOperand);
    calculator.operatorPress('/');
    calculator.setDisplay(secondOperand);
    calculator.lastButtonClicked = '0';
    calculator.equal();
    deepEqual(calculator.operator, null);
    deepEqual(calculator.operand, null);
    deepEqual('equal', calculator.lastButtonClicked);
    deepEqual(calculator.display.textContent, '0');
});


test("clicking on another operator put calculation into display", function () {
    var firstOperand = 7;
    var secondOperand = 3;

    calculator.digitPress(firstOperand);
    calculator.operatorPress('+');
    calculator.digitPress(secondOperand);
    calculator.operatorPress('*');
    deepEqual(calculator.display.textContent, '10');
});

test("clicking on an operator after equals does not perform calculation", function () {
    var firstOperand = 7;
    var secondOperand = 3;

    calculator.digitPress(firstOperand);
    calculator.operatorPress('+');
    calculator.digitPress(secondOperand);
    calculator.equal();
    calculator.operatorPress('*');
    deepEqual(calculator.display.textContent, '10');
});

test("switching between operators does not perform a calculation", function () {
    var firstOperand = 7;

    calculator.setDisplay(firstOperand);
    calculator.operatorPress('+');
    calculator.operatorPress('*');
    deepEqual(calculator.display.textContent, '7');
});

test("repeatedly hitting equals will repeat the last operation with the new result", function () {
    var firstOperand = 7;
    var secondOperand = 3;

    calculator.setDisplay(firstOperand);
    calculator.operatorPress('+');
    calculator.setDisplay(secondOperand);
    calculator.equal();
    deepEqual(calculator.display.textContent, '10');
    calculator.equal();
    deepEqual(calculator.display.textContent, '13');
    calculator.equal();
    deepEqual(calculator.display.textContent, '16');
});

test("clicking on add button sets style to highlight it and unhighlights other operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    calculator.operatorPress('+');

    deepEqual('highlighted-operator-button', addButton.className);
    deepEqual('operator-button', subtractButton.className);
    deepEqual('operator-button', multiplyButton.className);
    deepEqual('operator-button', divideButton.className);
});

test("clicking on subtract button sets style to highlight it and unhighlights other operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    calculator.operatorPress('-');

    deepEqual('operator-button', addButton.className);
    deepEqual('highlighted-operator-button', subtractButton.className);
    deepEqual('operator-button', multiplyButton.className);
    deepEqual('operator-button', divideButton.className);
});

test("clicking on multiply button sets style to highlight it and unhighlights other operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    calculator.operatorPress('*');

    deepEqual('operator-button', addButton.className);
    deepEqual('operator-button', subtractButton.className);
    deepEqual('highlighted-operator-button', multiplyButton.className);
    deepEqual('operator-button', divideButton.className);
});

test("clicking on divide button sets style to highlight it and unhighlights other operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    calculator.operatorPress('/');

    deepEqual('operator-button', addButton.className);
    deepEqual('operator-button', subtractButton.className);
    deepEqual('operator-button', multiplyButton.className);
    deepEqual('highlighted-operator-button', divideButton.className);
});

test("equals button resets CSS on operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    addButton.className = 'highlighted-operator-button';
    subtractButton.className = 'highlighted-operator-button';
    multiplyButton.className = 'highlighted-operator-button';
    divideButton.className = 'highlighted-operator-button';

    calculator.equal();

    deepEqual('operator-button', addButton.className);
    deepEqual('operator-button', subtractButton.className);
    deepEqual('operator-button', multiplyButton.className);
    deepEqual('operator-button', divideButton.className);
});

test("clear button resets CSS on operator buttons", function () {
    var addButton = document.getElementById('add');
    var subtractButton = document.getElementById('subtract');
    var multiplyButton = document.getElementById('multiply');
    var divideButton = document.getElementById('divide');

    addButton.className = 'highlighted-operator-button';
    subtractButton.className = 'highlighted-operator-button';
    multiplyButton.className = 'highlighted-operator-button';
    divideButton.className = 'highlighted-operator-button';

    calculator.clear();

    deepEqual('operator-button', addButton.className);
    deepEqual('operator-button', subtractButton.className);
    deepEqual('operator-button', multiplyButton.className);
    deepEqual('operator-button', divideButton.className);
});
