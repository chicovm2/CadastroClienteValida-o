class Validator {
    constructor() {
        this.validations = [
            'data-min-length', 
        ]
    }

// Validação dos campos
validate(form) {

    let inputs = getElementByTagName('input');

    let inputsArray = [...inputs]
    
    // looping nos inputs
    inputsArray.forEach(function(input) {
        
        //loop em todas as validações existentes
        for(let i = 0; this.validations.length > i; i++) {
            // verifica se a validação atual existe no input
            if(input.getAttribute(this.validations[i]) != null) {
            
                // limpando a string para virar um método
                let method = this.validations[i].replace('data-', '').replace('-', '');
                
                // valor do input
                let value = input.getAttribute(this.validations[i]);

                //invocar o método
                this[method](input, value);

            }
        }

    }, this);
}

// verifica se um pintut tem número mínimo de caracteres
minlength(input, minValue) {
    
    let inputLength = input.value.length;

    let errorMessage = 'O campo precisa ter pelo menos ${minValue} caracteres';

    if(inputLength < minValue){
        this.printMessage(input, errorMessage);
    }

}

printMessage(input, msg){

    let template = document.querySelector('.error-validation').cloneNode(true);
    
    template.textContent = msg;
    
    let inputParent = input.ParentNode;

    template.classlist.remove('template');

    inputParent.appendChild(template); 
}



}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let Validator = new Validator();

// Evento Validações //

submit.addEventListener('click', function(e) {

        e.preventDefault();

        Validator.validate(form);

})