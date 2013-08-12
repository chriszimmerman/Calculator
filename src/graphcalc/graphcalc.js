/* 2013 Chris Zimmerman */

var graphcalc = {
    addSymbol: function (symbolOnButton) {
        var displayArea = document.getElementById("display");
        displayArea.value = displayArea.value + symbolOnButton;
    },

    clear: function () {
        document.getElementById("display").value = "";
        this.clearChart()
    },

    clearChart: function() {
        var chart = document.getElementById("chartdiv");
        chart.innerHTML = "";
    },

    graph: function () {
        this.clearChart();
        var expression = document.getElementById("display").value;
        var scale = 0.05;
        var minValue = parseInt(document.getElementById("minValue").value);
        var maxValue = parseInt(document.getElementById("maxValue").value);
        var points = this.calculate(expression, minValue, maxValue, scale);
        this.plot(expression, points);
    },

    calculate: function (expression, minValue, maxValue, scale) {
        var points = [[]];

        for (var i = minValue; i <= maxValue; i += scale) {
            points[0].push([i, this.rpnEval(this.rpnParse(expression, i))]);
        }

        return points;
    },

    plot: function (expression, points){
        var graph = $.jqplot('chartdiv', points,
            { title: "y = " +expression,
                axes: {yaxis: {renderer: $.jqplot.LogAxisRenderer}},
                series: [
                    {color: '#333333'},
                    {showMarker:false}
                ],
                seriesDefaults: {
                    markerOptions: {
                        show: false
                    }
                },
                cursor:{
                    show: true,
                    zoom:true,
                    showTooltip:false
                }
            });
        $('.button-reset').click(function() { graph.resetZoom() });
    },

    rpnParse: function (input, variableValue) {
        var xValue = 1 ;

        if (variableValue !== undefined) {
            if (variableValue < 0) {
                variableValue = "( " + variableValue + " )";
            }
            xValue = variableValue;
        }

        input = input.replace(/X/g, xValue);
        input = input.replace(/x/g, xValue);
        input = input.replace(/\-\(/g, "negative (");
        input = input.replace(/\be\b/g, Math.E);
        input = input.replace(/sin\(/g, "sin (");
        input = input.replace(/cos\(/g, "cos (");
        input = input.replace(/tan\(/g, "tan (");

        var delimitedExpression = input.split(/\s+/g);

        var outputQueue = [];
        var operatorStack = [];

        for (var i = 0; i < delimitedExpression.length; i++) {
            var current = delimitedExpression[i];

            if (!isNaN(current)) {
                outputQueue.push(Number(current));
            }
            else if (current === '(' || current === 'negative' || current === 'sin' || current === 'cos' || current === 'tan') {
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

                var isFunction = function(potentialFn){
                    return potentialFn === 'negative'
                        || potentialFn === 'sin'
                        || potentialFn === 'cos'
                        || potentialFn === 'tan';
                };

                if (isFunction(operatorStack[operatorStack.length - 1])) {
                    outputQueue.push(operatorStack.pop());
                }
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
            else if (current === 'negative') {
                var arg = operandStack.pop();
                operandStack.push(arg * -1);
            }
            else if (current === 'sin') {
                var arg = operandStack.pop();
                operandStack.push(Math.sin(arg));
            }
            else if (current === 'cos') {
                var arg = operandStack.pop();
                operandStack.push(Math.cos(arg));
            }
            else if (current === 'tan') {
                var arg = operandStack.pop();
                operandStack.push(Math.tan(arg));
            }
        }

        return operandStack[0];
    }
};

var Foo = function(){
    this.qux = function(){
        this.bar();
    };

    this.bar = function(){
        var x = 3 + 7;
    };
};