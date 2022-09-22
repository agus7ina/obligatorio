const ORDER_ASC_BY_COST = "-a+"
const ORDER_DESC_BY_COST = "+a-"
const ORDER_BY_SOLD_COUNT = "SoldCount"
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
let currentProductsArray = [];



//la variable "categoria" contiene el item "catID" del local storage. Modifico la variable url para que en lugar de ir directo a la url de los autos utilice la variable categoría, concatenando la url geneal de productos ("PRODUCTS_URL"), definida en el init + la variable categoría recién definida + la extensión .json de la url ("EXT_TYPE"), definida en el init. 
  //la variable url quedaría así: https://japceibal.github.io/emercado-api/cats_products/ + catID + .json
  let categoria = localStorage.getItem('catID');
  let url = PRODUCTS_URL + categoria + EXT_TYPE;
    
  getJSONData(url).then(function(resultObj){
    if (resultObj.status === "ok"){
      console.log(resultObj.data);
      document.getElementById('products-category').innerHTML += resultObj.data.catName;

      currentProductsArray = resultObj.data.products;
      showProductsList();
    }
  })



function sortProducts(criteria, array){
  let result = [];
 
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
         return 0;
      });
  }else if (criteria === ORDER_BY_SOLD_COUNT){
      result = array.sort(function(a, b) {

          if ( a.soldCount > b.soldCount ){ return -1; }
          if ( a.soldCount < b.soldCount ){ return 1; }
         return 0;
      });
  }

  return result;

}
   
//accede a los productos de listaProductos y agrega el HTML escrito acá al listado
function showProductsList(){   
     //define el div que tiene el id "productlist" como "listado" 
     let listado = document.querySelector('#productList');
     listado.innerHTML = "";
    let resultados = document.querySelector('#resultados');
     if ((minCost != undefined && minCost != "") || (maxCost != undefined && maxCost != "")){
      listado.innerHTML = "";
      resultados.innerHTML = "resultados de tu búsqueda";
      currentProductsArray = currentProductsArray.filter(product => {
        console.log(product);
        return (product.cost >= minCost &&
        product.cost <= maxCost) 
       })

     }
     
     console.log(currentProductsArray);
     
  for(let i=0; i < currentProductsArray.length; i++){
    let products = currentProductsArray[i]; 
    let productId = "id" + products.id
    

      listado.innerHTML += `
      <div onclick="console.log("click")" class="row shadow p-8 rounded overflow-hidden mb-3 bg-white click" id="${productId}">
        <div class="col-3 p-8">
        <img class="img-fluid" src="${products.image}" alt="">
  
        </div>
        <div class="col-9 d-flex flex-column justify-content-between">
          <div class="productBody product">
            <h3>${products.name}</h3>
            <p>${products.description}</p>
          </div>
          <div class="productFooter d-flex justify-content-between">
            <p>Vendidos: <span class="cantidad">${products.soldCount}</span></p>
            <div class="precio">
              <span class="moneda">${products.currency}</span>
              <span class="precio">${products.cost}</span>
            </div>
          </div>
        </div>
        
      </div>
      `;

      console.log(productId);

    } 

    let product = document.getElementsByClassName("click");

    console.log(product);   
  //agrego un evento click a cada producto
      for(let i = 0; i < product.length; i++){
        product[i].addEventListener('click', function () {
          console.log("click");
  //gurado el identificador del producto en el local storage
          localStorage.setItem("id", currentProductsArray[i].id); 
  //redirijo a product-info
          window.location = "product-info.html";
        })
      }
  }




  function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    
     if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
   }


document.addEventListener('DOMContentLoaded', function(e) {


})


document.addEventListener('DOMContentLoaded', function(){

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.querySelector('#resultados').innerHTML = "";
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
      
      minCost = undefined;
      maxCost = undefined;
  
      console.log(minCost);
      let categoria = localStorage.getItem('catID');
      let url = PRODUCTS_URL + categoria + EXT_TYPE;
      //no encontré la forma de que productsArray vuelva a estar conformado por todos los productos como antes de filtrar por precio, sin repetir el código.  
      getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
          console.log(resultObj.data);
          document.getElementById('products-category').innerHTML += resultObj.data.catName;
    
          currentProductsArray = resultObj.data.products;
          showProductsList();
        }
      })
       showProductsList();
    });
 
  document.getElementById("rangeFilterCost").addEventListener('click', function(){
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;    
       
      console.log(minCost)
    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
     }
     else{
         minCost = undefined;
     }
     
     if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
         maxCost = parseInt(maxCost);
     }
     else{
         maxCost = undefined;
     }   
      showProductsList();
     
      });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
        console.log("click");
    });



})





// document.querySelector(`#${productId}`).addEventListener("click", function(){
//  console.log("holaaaa");
// })


