describe("Parsing expression into RPN", function () {
    it("Parses a simple addition expression", function () {
        var expression = "3 + 4";
        var result = [3, 4, '+'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses a simple subtraction expression", function () {
        var expression = "7 - 3";
        var result = [7, 3, '-'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses a simple multiplication expression", function () {
        var expression = "8 * 2";
        var result = [8, 2, '*'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses a simple division expression", function () {
        var expression = "10000 / 599";
        var result = [10000, 599, '/'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses an expression with numbers containing decimals", function () {
        var expression = "70.5 / 2.0";
        var result = [70.5, 2.0, '/'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses an expression containing mixed addition and subtraction operators", function () {
        var expression = "100 - 2 + 85 - 33";
        var result = [100, 2, '-', 85, '+', 33, '-'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses an expression containing mixed multiplication and division operators", function () {
        var expression = "30 * 5 / 5 * 10 / 10";
        var result = [30, 5, '*', 5, '/', 10, '*', 10, '/'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses an expression containing operators of mixed precedence (no parentheses)", function () {
        var expression = "4000 - 3800 * 10 + 84 / 42";
        var result = [4000, 3800, 10, '*', '-', 84, 42, '/', '+'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses expressions with the power operator", function () {
        var expression = "2 ^ 3 ^ 4";
        var result = [2, 3, 4, '^', '^'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses simple expressions containing parentheses", function () {
        var expression = "( 3 + 7 ) * ( 8 - 5 )";
        var result = [3, 7, '+', 8, 5, '-', '*'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses expressions with nested parentheses", function () {
        var expression = "( ( 3 - 2 ) + ( 7 - 3 ) ) + 4";
        var result = [3, 2, '-', 7, 3, '-', '+', 4, '+'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses expressions containing parentheses", function () {
        var expression = "3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3";
        var result = [3, 4, 2, '*', 1, 5, '-', 2, 3, '^', '^', '/', '+'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Replaces any variable in the expression with the default value of 1", function () {
        var expression = "X + 3 * X";
        var result = [1, 3, 1, '*', '+'];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Replaces any variable in the expression with the value passed into rpnParse if specified", function () {
        var expression = "X + 3 * X";
        var result = [7, 3, 7, '*', '+'];
        expect(graphcalc.rpnParse(expression, 7)).toEqual(result);
    });

    it("Parses a negative number", function () {
        var expression = "( -3 )";
        var result = [-3];
        expect(graphcalc.rpnParse(expression)).toEqual(result);
    });

    it("Parses an expression with a negative sub-expression", function () {
        var expression = "-( X + 4 ) * 2";
        var result = [3, 4, '+', 'negative', 2, '*'];
        expect(graphcalc.rpnParse(expression, 3)).toEqual(result);
    });

    it("Parses an expression with nested negative sub-expressions", function () {
        var expression = "-( -( 3 * X ) + 7 )";
        var result = [3, 2, '*', 'negative', 7 , '+', 'negative'];
        expect(graphcalc.rpnParse(expression, 2)).toEqual(result);
    });

    it("Parses an expression containing the sine function", function () {
        var expression = "sin( X )";
        var result = [0, 'sin'];
        expect(graphcalc.rpnParse(expression, 0)).toEqual(result);
    });

    it("Parses an expression containing nested sine functions", function () {
        var expression = "sin( sin( X ) + 3 )";
        var result = [0, 'sin', 3, '+', 'sin'];
        expect(graphcalc.rpnParse(expression, 0)).toEqual(result);
    });

    it("Parses an expression containing the cosine function", function () {
        var expression = "cos( X + 2 )";
        var result = [1, 2, '+', 'cos'];
        expect(graphcalc.rpnParse(expression, 1)).toEqual(result);
    });

    it("Parses an expression containing nested cosine functions", function () {
        var expression = "cos( 3 + cos( X ) / 3 )";
        var result = [3, 1, 'cos', 3, '/', '+', 'cos'];
        expect(graphcalc.rpnParse(expression, 1)).toEqual(result);
    });

    it("Parses an expression containing the sin function", function () {
        var expression = "7 - tan( X )";
        var result = [7, 3, 'tan', '-'];
        expect(graphcalc.rpnParse(expression, 3)).toEqual(result);
    });

    it("Parses an expression containing nested tangent functions", function () {
        var expression = "tan( 3 + tan( X ) / 3 )";
        var result = [3, 1, 'tan', 3, '/', '+', 'tan'];
        expect(graphcalc.rpnParse(expression, 1)).toEqual(result);
    });

    it("Accepts lowercase 'X' as a valid variable", function () {
        var expression = "x + X";
        var result = [1, 1, '+'];
        expect(graphcalc.rpnParse(expression, 1)).toEqual(result);
    });
});

describe("Evaluating RPN expressions", function () {
    it("Evaluates a simple addition expression", function () {
        var expression = [2, 3, '+'];
        var result = 5;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates a simple subtraction expression", function () {
        var expression = [100, 9, '-'];
        var result = 91;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates a simple multiplication expression", function () {
        var expression = [25, 20, '*'];
        var result = 500;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates a simple division expression", function () {
        var expression = [1000, 10, '/'];
        var result = 100;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates a simple exponential expression", function () {
        var expression = [3, 5, '^'];
        var result = 243;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates an expression of mixed operators", function () {
        var expression = [2, 3, '+', 5, 2, '-', '*'];
        var result = 15;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates an expression with a negative function", function () {
        var expression = [-7.5, 8, '+', 'negative'];
        var result = -0.5;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates an expression containing a sin function", function () {
        var expression = [0, 'sin', 5, '+'];
        var result = 5;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates an expression containing a cos function", function () {
        var expression = [0, 'cos', 5, '+'];
        var result = 6;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });

    it("Evaluates an expression containing a sin function", function () {
        var expression = [1, 'tan', 5, '+'];
        var result = 6.557407724654903;
        expect(graphcalc.rpnEval(expression)).toEqual(result);
    });
});

describe("Error handling", function () {
    it("Throws an error when there are not enough parentheses on left", function () {
        var expression = "( 7 - 2 ) + 4 )";
        expect(function () {
            graphcalc.rpnParse(expression);
        }).toThrow(new Error("Mismatched parentheses"));
    });
});