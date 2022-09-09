//const ORDER_ASC_BY_COST = "-$";
//const ORDER_DESC_BY_COST = "+$";
//const ORDER_BY_SOLD_COUNT = "SoldCount.";
//let currentProductsArray = []
//let currentSortCriteria = undefined;
let minCost = undefined; //tuve que hacer esto porque no me funciona el filtrado x precio
let maxCost = undefined;
//const btnfiltrar = document.getElementById("rangeFilterCost");
    // agrego al link creado en la barra de navegación el valor del item llamado 'email' del local storage



document.addEventListener('DOMContentLoaded', async function() {
//la variable "categoria" contiene el item "catID" del local storage. Modifico la variable url para que en lugar de ir directo a la url de los autos utilice la variable categoría, concatenando la url geneal de productos ("PRODUCTS_URL"), definida en el init + la variable categoría recién definida + la extensión .json de la url ("EXT_TYPE"), definida en el init. 
  //la variable url quedaría así: https://japceibal.github.io/emercado-api/cats_products/ + catID + .json
  let categoria = localStorage.getItem('catID');
  let url = PRODUCTS_URL + categoria + EXT_TYPE;
  
    //define el div que tiene el id "productlist" como "listado" 
    const listado = document.querySelector('#productList');
    const listado2 = document.querySelector('#productList2');
    //define los datos obtenidos del .json como "listaProductos"
    const listaProductos = await getJSONData(url);
    //prueba para acceder a los productos dentro de listaProductos
    console.log(listaProductos.data.products);
   productsArray = listaProductos.data.products

   
    //accede a los productos de listaProductos y agrega el HTML escrito acá al listado
    function showProductsList(){      
      //let htmlContentToAppend = ""
      //for(let i = 0; i < arrayProducts.length; i++){
       // let products = arrayProducts[i];
      
     //minCost = document.getElementById("rangeFilterCostMin").value;
    // maxCost = document.getElementById("rangeFilterCostMax").value;
    
       listaProductos.data.products.forEach(products => {   
        console.log(minCost);
       if ((((minCost != undefined) && products.cost >= minCost)) && 
            ((maxCost != undefined) && products.cost <= maxCost ))  {
                    listado.innerHTML += 
         //htmlContentToAppend +=
         //(minCost == undefined) ||
        // (maxCost == undefined) ||  
        `
          <div class="row shadow p-8 rounded overflow-hidden mb-3 bg-white">
            <div class="col-3 p-8">
            <img class="img-fluid" src="${products.image}" alt="">
      
            </div>
            <div class="col-9 d-flex flex-column justify-content-between">
              <div class="productBody">
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
          ` ;
          console.log("se cumple la condición");
          //listado.innerHTML += htmlContentToAppend;   
     }  else { 
      console.log("no se cumple la condición");
      listado2.innerHTML += `
      <div class="row shadow p-8 rounded overflow-hidden mb-3 bg-white">
        <div class="col-3 p-8">
        <img class="img-fluid" src="${products.image}" alt="">
  
        </div>
        <div class="col-9 d-flex flex-column justify-content-between">
          <div class="productBody">
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
      ` 

     // filtrar();
     }
     


        //}}}
    })}
  
  showProductsList();

  
   
  
  document.getElementById('products-category').innerHTML += listaProductos.data.catName;

 // document.getElementById("sortAsc").addEventListener("click", function(){
  //  sortAndShowProducts(ORDER_ASC_BY_COST);
//});

//document.getElementById("sortDesc").addEventListener("click", function(){
//    sortAndShowProducts(ORDER_DESC_BY_COST);
//});

//document.getElementById("sortBySoldCount").addEventListener("click", function(){
//  sortAndShowProducts(ORDER_BY_SOLD_COUNT);
//});
  
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
   
    }) 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";
      
          minCost = undefined;
          maxCost = undefined;
              listado.innerHTML = ``;
         //     showProductsList();
      })
 // var inputMinCost = document.getElementById("rangeFilterCostMin").value;
 // var inputMaxCost = document.getElementById("rangeFilterCostMax").value;
 // function filtrar(){
 //   btnfiltrar.addEventListener('click', function(){
  //    if ((inputMinCost != undefined) && (inputMinCost != "")){
  //      minCost = inputMinCost;
  //    } else {
  //      minCost = undefined;
  //    }
   //   if ((inputMaxCost != undefined) && (inputMaxCost != "")){
   //     maxCost = inputMaxCost;
   //   } else {
   //     maxCost = undefined
   //   }
     
 // })}
})


