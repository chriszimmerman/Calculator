var calculator;

function initCalculator(){
    calculator = {
        display: document.getElementById('display'),
        operand: null,
        operator: null,
        lastButtonClicked: null,

        set: function(value){
            this.display.textContent = value;
        },

        clear: function(){
            this.set('0');
            this.operand = null;
            this.operator = null;
            this.lastButtonClicked = null;

            var addButton = document.getElementById('add');
            var subtractButton = document.getElementById('subtract');
            var multiplyButton = document.getElementById('multiply');
            var divideButton = document.getElementById('divide');

            addButton.className = 'operator-button';
            subtractButton.className = 'operator-button';
            multiplyButton.className = 'operator-button';
            divideButton.className = 'operator-button';
        },

        addDigit: function(number){
            if(this.display.textContent === '0'
                || this.lastButtonClicked === 'operator'
                || this.lastButtonClicked === 'equal'){
                this.set(number);
            }
            else{
                this.set(this.display.textContent + number);
            }
            this.lastButtonClicked = 'number';
        },

        addDecimal: function(){
            if(this.display.textContent.indexOf('.') === -1){
                this.set(this.display.textContent + '.');
                this.lastButtonClicked = 'decimal';
            }
        },

        setOperator: function(operator){
            this.operand = this.display.textContent;
            this.operator = operator;
            this.lastButtonClicked = 'operator';
            function changeButtonCSS() {
                var addButton = document.getElementById('add');
                var subtractButton = document.getElementById('subtract');
                var multiplyButton = document.getElementById('multiply');
                var divideButton = document.getElementById('divide');

                if (operator === '+') {
                    addButton.className = 'highlighted-operator-button';
                    subtractButton.className = 'operator-button';
                    multiplyButton.className = 'operator-button';
                    divideButton.className = 'operator-button';
                }
                else if (operator === '-') {
                    addButton.className = 'operator-button';
                    subtractButton.className = 'highlighted-operator-button';
                    multiplyButton.className = 'operator-button';
                    divideButton.className = 'operator-button';
                }
                else if (operator === '*') {
                    addButton.className = 'operator-button';
                    subtractButton.className = 'operator-button';
                    multiplyButton.className = 'highlighted-operator-button';
                    divideButton.className = 'operator-button';
                }
                else if (operator === '/') {
                    addButton.className = 'operator-button';
                    subtractButton.className = 'operator-button';
                    multiplyButton.className = 'operator-button';
                    divideButton.className = 'highlighted-operator-button';
                }
            }

            changeButtonCSS();
        },

        equal: function(){
            var display = this.display.textContent;
            if(this.operator ===  null){
                this.operand = display;
                this.lastButtonClicked = 'equal';
            }
            else {
                if(this.operator === '+'){
                    this.set((Number(this.operand) + Number(display)).toString());
                }
                else if (this.operator === '-'){
                    this.set((Number(this.operand) - Number(display)).toString());
                }
                else if (this.operator === '*'){
                    this.set((Number(this.operand) * Number(display)).toString());
                }
                else if (this.operator === '/'){
                    if(Number(display) === 0){
                        //alert("Cannot divide by zero!");
                        this.set('0');
                    }
                    else{
                        this.set((Number(this.operand) / Number(display)).toString());
                    }
                }
                this.operand = null;
                this.operator = null;
                this.lastButtonClicked = 'equal';
            }

            var addButton = document.getElementById('add');
            var subtractButton = document.getElementById('subtract');
            var multiplyButton = document.getElementById('multiply');
            var divideButton = document.getElementById('divide');

            addButton.className = 'operator-button';
            subtractButton.className = 'operator-button';
            multiplyButton.className = 'operator-button';
            divideButton.className = 'operator-button';
        }
    };
}