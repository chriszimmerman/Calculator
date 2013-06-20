/* 2013 Chris Zimmerman */

var graphcalc = {
    addSymbol: function (symbolOnButton) {
        var displayArea = document.getElementById("display");
        displayArea.textContent = displayArea.value + symbolOnButton;
    },

    clear: function () {
        document.getElementById("display").textContent = "";
        document.getElementById("result").textContent = "";
    },

    calculate: function () {
        var expression = document.getElementById("display").value;
        var result = document.getElementById("result");
        result.textContent = this.rpnEval(this.rpnParse(expression)).toString();
    },

    rpnParse: function (input, variableValue) {
        var getNextElementFromExpressionString = function (expression, start) {
            var currentPosition = start;
            var elementToInspect = expression[start];

            if (elementToInspect !== '.' && isNaN(elementToInspect)) {
                return elementToInspect;
            }
            else {
                while (expression[currentPosition] === '.' || !isNaN(expression[currentPosition])) {
                    currentPosition++;
                }

                var result = expression.substring(start, currentPosition);
                if (!result.match(/^\d+\.?\d*$/)) {
                    throw new Error("Number contains multiple decimals")
                }
                return result;
            }
        };

        var xValue = 1;
        if (variableValue !== undefined) {
            xValue = variableValue;
        }
        input = input.replace(/X/g, xValue);

        var outputQueue = [];
        var operatorStack = [];

        var i = 0;

        while (i < input.length) {
            var current = getNextElementFromExpressionString(input, i);

            if (!isNaN(current)) {
                outputQueue.push(Number(current));
            }
            else if (current === '(') {
                operatorStack.push(current);
            }
            else if (current === ')') {
                while (operatorStack[operatorStack.length - 1] !== '(') {
                    if (operatorStack.length === 0) {
                        throw new Error("Mismatched parentheses");
                    }
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            }
            else if (current === '+' || current === '-' || current === '*' || current === '/' || current === '^') {
                function isLesserPrecedence() {
                    return (current !== '^' && precedence(current) === precedence(operatorStack[operatorStack.length - 1]))
                        || precedence(current) < precedence(operatorStack[operatorStack.length - 1]);
                };

                function precedence(op) {
                    if (op === '+' || op === '-')
                        return 1;
                    else if (op === '*' || op === '/')
                        return 2;
                    else if (op === '^')
                        return 3;
                    else
                        return 0;
                };

                if (isLesserPrecedence()) {
                    while (isLesserPrecedence()) {
                        var operator = operatorStack.pop();
                        outputQueue.push(operator);
                    }
                }
                operatorStack.push(current);
            }

            i = i + current.length;
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    },

    rpnEval: function (expression) {
        var operandStack = [];

        while (expression.length > 0) {
            var current = expression.shift();

            if (!isNaN(current)) {
                operandStack.push(current);
            }
            else if (current === '+' || current === '-' || current === '*' || current === '/' || current === '^') {
                var arg2 = operandStack.pop();
                var arg1 = operandStack.pop();

                if (current === '+') {
                    operandStack.push(arg1 + arg2);
                }
                else if (current === '-') {
                    operandStack.push(arg1 - arg2);
                }
                else if (current === '*') {
                    operandStack.push(arg1 * arg2);
                }
                else if (current === '/') {
                    operandStack.push(arg1 / arg2);
                }
                else {
                    operandStack.push(Math.pow(arg1, arg2));
                }
            }
        }

        return operandStack[0];
    }
};

