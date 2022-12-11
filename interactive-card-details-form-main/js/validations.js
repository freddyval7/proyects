const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
var i = 0;

const exp = {
    name: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{1,40}$/,
    cardNumber: /^\d{16}$/,
    date: /^\d{1,2}$/,
    cvc: /^\d{1,3}$/,
}

const camp = {
    groupName: false,
    groupNumber: false,
    groupData: false,
    groupCvc: false,
} 

const validateForm = (e)=>{
    switch(e.target.name){
        case "name":
            validateInput(exp.name,e.target,"groupName");
        break;
        case "number":
            validateInput(exp.cardNumber,e.target,"groupNumber");
        break;
        case "month":
            validateInput(exp.date,e.target,"groupData");
        break;
        case "year":
            validateInput(exp.date,e.target,"groupData");
        break;
        case "cvc":
            validateInput(exp.cvc,e.target,"groupCvc");
        break;
    }
}

const validateInput = (expr, input, id) => {
    if(expr.test(input.value)){
        document.getElementById(id).classList.remove("form__group-error");
        document.querySelector(`#${id} .form__error`).classList.remove("form__error-active");
        document.querySelector(`#${id} .form__error2`).classList.remove("form__error2-active")
        camp[id] = true;
    } else{
        if(input.value == undefined){
            document.getElementById(id).classList.add("form__group-error");
            document.querySelector(`#${id} .form__error2`).classList.add("form__error2-active");
            document.querySelector(`#${id} .form__error`).classList.remove("form__error-active");   
            camp[id] = false;
        } else{
            document.getElementById(id).classList.add("form__group-error");
            document.querySelector(`#${id} .form__error`).classList.add("form__error-active");      
            document.querySelector(`#${id} .form__error2`).classList.remove("form__error2-active");
            camp[id] = false;
        }
    }
} 

const changeText = (e) => {
    let inputText = e.target.value;
    inputText = inputText.toUpperCase();
    switch(e.target.name){
        case "name":
            document.getElementById("nameCard").innerText = inputText
        break;
        case "number":
            document.getElementById("numberCard").innerText = inputText
        break;
        case "month":
            document.getElementById("dateMonthCard").innerText = inputText 
        break;
        case "year":
            document.getElementById("dateYearCard").innerText = inputText 
        break;
        case "cvc":
            document.getElementById("cvcCard").innerText = inputText 
        break;
    }  
}

const addSpacing = (string, space, n) => {
    let stringFinal = "";
    const stringLength = string.length;
    for (let i = 0; i < stringLength; i += n) {
        if (i + n < stringLength) {
            stringFinal += string.substring(i, i + n) + space;
        } else {
            stringFinal += string.substring(i, stringLength);
        }
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm);
    input.addEventListener("keyup", changeText);
    input.addEventListener("blur", validateForm);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(camp.groupName && camp.groupNumber && camp.groupData && camp.groupCvc){
        form.reset();
        document.getElementById("form").classList.add("form-disabled")
        document.getElementById("success").classList.add("success-active")
    }
    else{
        validateInput(exp.name,e.target,"groupName");
        validateInput(exp.cardNumber,e.target,"groupNumber");
        validateInput(exp.date,e.target,"groupData");
        validateInput(exp.cvc,e.target,"groupCvc");
    }
})

document.getElementById("success__btn").onclick = function(){
    document.getElementById("form").classList.remove("form-disabled")
    document.getElementById("success").classList.remove("success-active")
    location.reload();
}