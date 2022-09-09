
document.addEventListener('DOMContentLoaded', function (){
//creo una constante "boton" en la que capturo el elemento con id "ingresar"
const boton = document.getElementById('ingresar');
// hago una escucha al evento click. Cuando se haga click en el botón se llama a la función validar(). 
boton.addEventListener("click", () =>{
    validar();
})
})


function validar() {
    //creo una constante "emailInput" en la que capturo el elemento con id "email"
    const emailInput = document.querySelector("#email").value;
    //creo una constante "passwordInput" en la que capturo el elemento con id "password"
    const passwordInput = document.querySelector("#password").value;
    console.log(emailInput);
    // creo una constante url con la dirección de la portada
    const url = 'http://127.0.0.1:5500/portada.html'

    //si emailInput y passwordInput dan true, se llama a la función redireccionar(), si no, se llama a la función showAlertError()
    if (emailInput && passwordInput) {
        redireccionar(url);
    //Guardo el email en el almacenamiento local
        localStorage.setItem('email', emailInput);
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

