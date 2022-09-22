//convierto a objeto el id guardado en el local storage
let idInfo = JSON.parse(localStorage.getItem("id"));
//uso la url de product info, más la id del producto seleccionado + .json
let url = PRODUCT_INFO_URL + idInfo + EXT_TYPE;
let comments = PRODUCT_INFO_COMMENTS_URL + idInfo + EXT_TYPE;
let productInfo = {};
let productComments = {};
let starFill = `<span class="fa fa-star checked"></span>`
let starHalf = `<span class="fa fa-star-half checked"></span>`
let star = `<span class="fa fa-star" style='color: gray'></span>`

//obtengo los datos de la url del producto
document.addEventListener('DOMContentLoaded', function(e){
  getJSONData(url).then(function(resultObj){
    if (resultObj.status === "ok"){
      console.log(resultObj);
      productInfo = resultObj.data;
      console.log(productInfo);
    }

  })
//obtengo los datos de los comentarios
  getJSONData(comments).then(function(resultObj){
    if (resultObj.status === "ok"){
      console.log(resultObj);
      productComments = resultObj.data;
      console.log(productComments);
    }
    showProduct();
  })
})

//función para poner la cantidad de estrellas según el puntaje
function showScore(score){
//escribo un html vacío
  let totalScore = ``;
//redondeo hacia abajo por si hay algún número decimal
  let scoreFloor = Math.floor(score);
  console.log(scoreFloor)
//mientras el puntaje sea menor al puntaje redondeado se agrega una estrella completa
  for(let i = 0; i < scoreFloor; i++){
    totalScore += starFill
    
  }
//si el puntaje menos el puntaje redondeado es mayor a cero, es porque hay un decimal. Por lo que se agregará media estrella.
  if (score - scoreFloor > 0){
    totalScore += starHalf;
    scoreFloor ++;
  }
//si el puntaje redondeado es menor a 5 (entre 0 y 4) se completa hasta 5 con estrellas vacías (grises).
  if(scoreFloor < 5) {
    for(let i = scoreFloor; i < 5; i++){
      totalScore += star;
    }
  }
//retorno el html escrito en totalScore
  return totalScore;
  
}

const btn = document.querySelector("#sendComment");

let userScore = document.querySelector("#userScore").value;
let comment = document.querySelector("#comment").value;
btn.addEventListener("click", function(){
  if (comment && userScore){
    console.log("hay comentario")
  } else {
    alert("los campos no pueden estar vacíos")
  }
})

//muestro la información del producto
function showProduct(){
  console.log(JSON.stringify(productInfo.cost));

              document.querySelector("#productInfo").innerHTML += 
              `
              <div class="text-center p-4">
          <h2 id="productName">${productInfo.name}</h2>
        </div>
        <div class="precio">
          <p><strong>Precio</strong></p>
          <p>${productInfo.currency} ${productInfo.cost}</p>
  
        </div>
        <div class="desc">
          <p><strong>Descripción</strong></p>
          <p>${productInfo.description}</p>
        </div>
        <div class="categoria">
          <p><strong>Categoría</strong></p>
          <p>${productInfo.category}</p>
        </div>
        <div class="cant">
          <p><strong>Cantidad de vendidos</strong></p>
          <p>${productInfo.soldCount}</p>
        </div>
        <div class="img">
        <p><strong>Imágenes ilustrativas</strong></p>
        </div>
        `
//para las imágenes itero el array productInfo.images
        for(let i = 0; i < productInfo.images.length; i++){
        document.querySelector("#productImages").innerHTML +=
          `
          <div class="card" style="width: 250px;"> 
          <img src="${productInfo.images[i]}" alt="${productInfo.name} class="card-img-top">
          </div> 
          `
        }
//para los comentarios itero el array productComments y uso la función showScore, usando como argumento el score de los comentarios en cada caso.
        for(let i = 0; i < productComments.length; i++){
          
          document.querySelector("#productComments").innerHTML +=
          `
          <li class="list-group-item pb-4">

          <p class="card-title pb-2"><span><strong> ${productComments[i].user}</strong>  </span> ${productComments[i].dateTime} <span class="float-end">${showScore(productComments[i].score)}</span></p>
  
              <p class="card-text">${productComments[i].description}</p>
            
              </li>
          
          `
          
        }

}








