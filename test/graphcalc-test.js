describe("Parsing expressions", function(){
    it("Parses an addition expression with single digit operands", function(){
        var input = "3+5";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('+', new Tree(3), new Tree(5));
        expect(result).toEqual(expected);
    });

   it("Parses a multiplication expression with single digit operands", function(){
        var input = "7*3";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('*', new Tree(7), new Tree(3));
        expect(result).toEqual(expected);
    });

    it("Parses a simple subtraction expression with multi-digit operands", function(){
        var input = "32-763";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('-', new Tree(32), new Tree(763));
        expect(result).toEqual(expected);
    });

    it("Parses an expression with multiple operations", function(){
        var input = "8-40+103";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('+');
        expected.left = new Tree('-', new Tree(8), new Tree(40));
        expected.right = new Tree(103);
        expect(result).toEqual(expected);
    });

    it("Parses an expression with operators of different precedence", function(){
        var input = "6+3*4";
        var result = graphcalc.parseExpression(input);
        var multiplicationSubtree = new Tree('*', new Tree(3), new Tree(4));
        var expected = new Tree('+', new Tree(6), multiplicationSubtree);
        expect(result).toEqual(expected);
    });

    it("Parses an expression of multiple operations of different precedence", function(){
        var input = "3*48*7-500/4+21";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('+', new Tree('-',
                                        new Tree('*',
                                            new Tree('*',
                                                new Tree(3),
                                                new Tree(48)),
                                            new Tree(7)),
                                        new Tree('/',
                                            new Tree(500),
                                            new Tree(4))),
                                     new Tree(21));
        expect(result).toEqual(expected);
    });

    it("Parses an expression with exponents", function(){
        var input = "3^9*5+2";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('+',
                            new Tree('*',
                                new Tree('^',
                                    new Tree(3),
                                    new Tree(9)),
                                new Tree(5)),
                            new Tree(2));
        expect(result).toEqual(expected);
    });

    it("Parses an expression reflecting the proper order of operations", function(){
        var input = "20+5*2^7-30956";
        var result = graphcalc.parseExpression(input);
        var expected = new Tree('-',
                            new Tree('+',
                                new Tree(20),
                                new Tree('*',
                                    new Tree(5),
                                    new Tree('^',
                                        new Tree(2),
                                        new Tree(7)))),
                            new Tree(30956));
        expect(result).toEqual(expected);
    });
});

describe("Evaluating expression trees", function(){
    it("Evaluates a simple addition expression", function(){
        var tree = new Tree('+', new Tree(2), new Tree(7));
        var result = graphcalc.evaluateTree(tree);
        expect(result).toEqual(9);
        tree = new Tree('+', new Tree(3), new Tree(4));
        result = graphcalc.evaluateTree(tree);
        expect(result).toEqual(7);
    });
});