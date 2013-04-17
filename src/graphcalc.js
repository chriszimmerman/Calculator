/* 2013 Chris Zimmerman */

var graphcalc = {
    parseExpression: function(input){
        var isNull = function(o){return o === null;}
        var isString = function(o){return typeof o === "string"};

        var getNextElementFromExpressionString = function(expression, start){
          var currentPosition = start;
          var elementToInspect = expression[start];

            if(isNaN(elementToInspect)){
            return elementToInspect;
          }
          else{
            while(!isNaN(expression[currentPosition])){
                  currentPosition++;
            }
            return expression.substring(start, currentPosition);
          }
        };

        var tree = null;

        var i = 0;
        while(i < input.length){
            var current = getNextElementFromExpressionString(input, i);
            var insertElementIntoTree = function(current, root){
                if(!isNaN(current)){
                    if(isNull(root)) {
                        root = new Tree(Number(current));
                    }
                    else if(isNull(root.left)){
                        root.left = new Tree(Number(current));
                    }
                    else if(isNull(root.right)){
                        root.right = new Tree(Number(current));
                    }
                    else{
                        root.right = insertElementIntoTree(current, root.right);
                    }
                }
                else{
                    if(isNull(root)){
                        root = new Tree(String(current));
                    }
                    if(typeof root.node === "number"){
                        var temp = new Tree(String(current));
                        temp.left = root;
                        root = temp;
                    }
                    else if (isString(root.node)){
                        var isNewElementHigherPrecedence = function(newElement, rootElement){
                            var getPrecedence =  function(operator){
                                if(operator === '^'){
                                    return 3;
                                }
                                else if(operator === '*' || operator === '/'){
                                    return 2;
                                }
                                return 1;
                            };
                            return getPrecedence(newElement) > getPrecedence(rootElement);
                        };

                        if(isNewElementHigherPrecedence(current, root.node)){
                            var newNode = new Tree(String(current));
                            if(isString(root.right.node)){
                                root.right = insertElementIntoTree(current, root.right);
                            }
                            else{
                                newNode.left = root.right;
                                root.right = newNode;
                            }
                        }
                        else{
                            var newNode = new Tree(String(current));
                            newNode.left = root;
                            root = newNode;
                        }
                    }
                }
                return root;
            };

            tree = insertElementIntoTree(current, tree);
            i = i + current.length;
        }
        return tree;
    },

    evaluateTree: function evaluateTree(input){
        if(typeof(input.node) === "number"){
            return input.node;
        }
        else if(typeof(input.node) === "string"){
            if(input.node.toString() === "+"){
                return evaluateTree(input.left) + evaluateTree(input.right);
            }
        }
    }
};

function Tree(n, left, right){
    this.node = n,
    left === undefined ? this.left = null : this.left = left,
    right === undefined ? this.right = null : this.right = right
};