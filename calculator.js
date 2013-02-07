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
        },

        addDigit: function(number){
            if(this.display.textContent === '0'){
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

        plus: function(){
            this.operand = this.display.textContent;
            this.operator = '+';
            this.set('');
        },

        equal: function(){
            if(this.operator ===  null){
                this.operand = this.display.textContent;
            }
            else {
                this.set((Number(this.operand) + Number(this.display.textContent)).toString());
                this.operand = null;
                this.operator = null;
                this.lastButtonClicked = null;
            }
        }
    };
}