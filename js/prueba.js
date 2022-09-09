//const ORDER_ASC_BY_COST = "-a+"
//const ORDER_DESC_BY_COST = "+a-"
//const ORDER_BY_SOLD_COUNT = "SoldCount"
let htmlContentToAppend = "";
let productsArray = [];
let minCost = undefined;
let maxCost = undefined;


function showProductsList(){
console.log("estoy en esta función");
console.log(productsArray);

  
  console.log(htmlContentToAppend);
  console.log(minCost);

  for(let i = 0; i < productsArray.length; i++){
      let products = productsArray[i];
  console.log("hola?");          
      if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
          ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){
 console.log("hola?");         
          htmlContentToAppend += `
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
          }
          console.log(products.cost); 
          console.log(htmlContentToAppend);
          document.getElementById('productList').innerHTML += htmlContentToAppend;

  }
};



document.addEventListener('DOMContentLoaded', async function(e) {
  let categoria = localStorage.getItem('catID');
  let url = PRODUCTS_URL + categoria + EXT_TYPE;
  getJSONData(url).then(function(resultObj){
    if (resultObj.status === "ok"){
        productsArray = resultObj.data;
        console.log("estoy en el json");
        showProductsList()
    }
  });
 
    
  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
      
      minCost = undefined;
      maxCost = undefined;
      
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
})




 
////////////////////////
////function sortProducts(criteria, array){
 // let result = [];
 // if (criteria === ORDER_ASC_BY_COST)
 // {
 //     result = array.sort(function(a, b) {
 //         if ( a.cost < b.cost ){ return -1; }
 //         if ( a.cost > b.cost ){ return 1; }
 //         return 0;
 //     });
 // }else if (criteria === ORDER_DESC_BY_COST){
 //     result = array.sort(function(a, b) {
 //         if ( a.cost > b.cost ){ return -1; }
  //        if ( a.cost < b.cost ){ return 1; }
  //        return 0;
 //     });
 // }else if (criteria === ORDER_BY_SOLD_COUNT){
 //     result = array.sort(function(a, b) {
 //         let aCount = parseInt(a.soldCount);
 //         let bCount = parseInt(b.soldCount);

 //         if ( aCount > bCount ){ return -1; }
 //         if ( aCount < bCount ){ return 1; }
 //         return 0;
 //     });
 // }

 // return result;
//

//function sortAndShowProducts(sortCriteria, listaProductos){
 // currentSortCriteria = sortCriteria;

//  if(listaProductos != undefined){
 //     currentProductsArray = listaProductos;
 // }

 // currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

  //Muestro las categorías ordenadas
 // showProductsList();
//}


