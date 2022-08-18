const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"


function getHTML(products){
    //función que retorna el HTML escrito acá abajo
    return `
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
    `;
}


document.addEventListener('DOMContentLoaded', async function() {
    //define el div que tiene el id "productlist" como "listado" 
    const listado = document.querySelector('#productList');
    //define los datos obtenidos del .json como "listaProductos"
    const listaProductos = await getJSONData(url);
    //prueba para acceder a los productos dentro de listaProductos
    console.log(listaProductos.data.products);
    
    //accede a los productos de listaProductos y agrega el HTML escrito en la función getHTML al listado
    listaProductos.data.products.forEach(products => {
        listado.innerHTML += getHTML(products)
    })

})
