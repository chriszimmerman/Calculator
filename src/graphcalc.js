/* 2013 Chris Zimmerman */

var graphcalc = {
    parseExpression: function(input){
        var getNextElementFromExpression = function(expression, start){
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

        var root = null;

        var i = 0;
        while(i < input.length){
            var current = getNextElementFromExpression(input, i);
            var insertElementIntoTree = function(current, root){
                if(!isNaN(current)){
                    if(root === null) {
                        root = new Tree(Number(current));
                    }
                    else if(root.left === null){
                        root.left = new Tree(Number(current));
                    }
                    else if(root.right === null){
                        root.right = new Tree(Number(current));
                    }
                    else{
                        root.right = insertElementIntoTree(current, root.right);
                    }
                }
                else{
                    if(root === null){
                        root = new Tree(String(current));
                    }
                    if(typeof root.node === "number"){
                        var temp = new Tree(String(current));
                        temp.left = root;
                        root = temp;
                    }
                    else if (typeof root.node === "string"){
                        if((current === '*' || current === '/') && (root.node === '+' || root.node === '-')){
                            var temp = new Tree(String(current));
                            temp.left = root.right;
                            root.right = temp;
                        }
                        else{
                            var temp = new Tree(String(current));
                            temp.left = root;
                            root = temp;
                        }
                    }
                }
                return root;
            };

            root = insertElementIntoTree(current, root);
            i = i + current.length;
        }
        return root;
    }

    /*evaluateTree: function evaluateTree(input){
        if(typeof(input.node) === "number"){
            return input.node;
        }
        else if(typeof(input.node) === "string"){
            if(input.node.toString() === "+"){
                return evaluateTree(input.left) + evaluateTree(input.right);
            }
        }
    }*/
};

function Tree(n, left, right){
    this.node = n,
    left === undefined ? this.left = null : this.left = left,
    right === undefined ? this.right = null : this.right = right
};
