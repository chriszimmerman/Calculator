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

        resetButtonCSS: function () {
            var addButton = document.getElementById('add');
            var subtractButton = document.getElementById('subtract');
            var multiplyButton = document.getElementById('multiply');
            var divideButton = document.getElementById('divide');

            addButton.className = 'operator-button';
            subtractButton.className = 'operator-button';
            multiplyButton.className = 'operator-button';
            divideButton.className = 'operator-button';
        },

        clear: function(){
            this.set('0');
            this.operand = null;
            this.operator = null;
            this.lastButtonClicked = null;
            this.resetButtonCSS();
        },

        digitPress: function(number){
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

        decimalPress: function(){
            if(this.lastButtonClicked === 'operator'){
                this.set('0.');
                this.lastButtonClicked = 'decimal';
            }
            if(this.display.textContent.indexOf('.') === -1){
                this.set(this.display.textContent + '.');
                this.lastButtonClicked = 'decimal';
            }
        },

        operatorPress: function(operator){
            var display = this.display.textContent;

            if(this.operator != null && this.lastButtonClicked !== 'operator' && this.lastButtonClicked !== 'equal') {
                if(this.operator === '+'){
                    this.operand = (Number(this.operand) + Number(display)).toString();
                    this.set(this.operand);
                }
                else if (this.operator === '-'){
                    this.operand = (Number(this.operand) - Number(display)).toString();
                    this.set(this.operand);
                }
                else if (this.operator === '*'){
                    this.operand = (Number(this.operand) * Number(display)).toString();
                    this.set(this.operand);
                }
                else if (this.operator === '/'){
                    if(Number(display) === 0){
                        this.set('0');
                    }
                    else{
                        this.operand = (Number(this.operand) / Number(display)).toString();
                        this.set(this.operand);
                    }
                }
            }
            else{
                this.operand = display;
            }

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
            }
            else if(this.lastButtonClicked === 'equal'){
                if(this.operator === '+'){
                    this.set((Number(display) + Number(this.operand)).toString());
                }
                else if (this.operator === '-'){
                    this.set((Number(display) - Number(this.operand)).toString());
                }
                else if (this.operator === '*'){
                    this.set((Number(display) * Number(this.operand)).toString());
                }
                else if (this.operator === '/'){
                    if(Number(this.operand) === 0){
                        this.set('0');
                    }
                    else{
                        this.set((Number(display) / Number(this.operand)).toString());
                    }
                }
            }
            else {
                var temp;
                if(this.operator === '+'){
                    temp = display;
                    this.set((Number(this.operand) + Number(display)).toString());
                    this.operand = temp;
                }
                else if (this.operator === '-'){
                    temp = display;
                    this.set((Number(this.operand) - Number(display)).toString());
                    this.operand = temp;
                }
                else if (this.operator === '*'){
                    temp = display;
                    this.set((Number(this.operand) * Number(display)).toString());
                    this.operand = temp;
                }
                else if (this.operator === '/'){
                    if(Number(display) === 0){
                        this.set('0');
                        this.clear();
                    }
                    else{
                        temp = display;
                        this.set((Number(this.operand) / Number(display)).toString());
                        this.operand = temp;
                    }
                }
            }
            this.lastButtonClicked = 'equal';
            this.resetButtonCSS();
        }
    };
}