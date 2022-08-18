
document.addEventListener('DOMContentLoaded', function (){
const boton = document.getElementById('ingresar');
boton.addEventListener("click", () =>{
    validar();
})
})


function validar() {
    const emailInput = document.querySelector("#email").value;
    const passwordInput = document.querySelector("#password").value;
    console.log(emailInput);
    const url = 'http://127.0.0.1:5500/portada.html'

    if (emailInput && passwordInput) {
        redireccionar(url)
    } else {
        showAlertError();
    }
    
};
function redireccionar(url) {
    location.replace(url)
};
function showAlert() {
    alert("correcto")
};
function showAlertError() {
    alert("los campos no pueden estar vacíos")
};

console.log(validar);

