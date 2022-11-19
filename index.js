const products = document.querySelector(".card_containers")
const divejemplo = document.getElementById("divejemplo")
const categories = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
const btnShowMore = document.querySelector(".show_more")
const toggleMenu = document.querySelector("#toggle-menu_icon")
const navbarUl = document.getElementById('navbar_ul')
const cartBtn = document.getElementById('cart-btn')
const cartMenu = document.querySelector('.cart-menu')
const overlay = document.querySelector('.overlay')
const closeCartButton = document.querySelector('.close-cart')
const cartProducts = document.getElementById('cart-products')
const productsCart = document.querySelector('.cart-menu')
const total = document.querySelector('.total')

///////////////////////// LOCAL STORAGE ///////////////////

let cart = JSON.parse(localStorage.getItem('cart')) || [];


let saveToLocalStorage = (cartList) => {
   localStorage.setItem('cart', JSON.stringify(cartList))
}




///////////////////////////////////////////////////////////////////////////////////////

                                                // CATALOGO DE PRODUCTOS //

const productsData = [
   {  id:1,
      name:"Champion Men's, Classic Cotton Jersey Athletic Shorts",
      precio: 4500,
      image:"imagenes/short_1.jpg",
      category: "indumentaria"
   },
   {  id:2,
      name:"Adidas Lite Racer Adapt 3.0",
      precio: 25000,
      image:"imagenes/zapatilla_1.jpg",
      category: "calzados"
   },
   {  id:3,
      name:"Iron Gym Pull-Up Bar",
      precio: 15000,
      image:"imagenes/otros_1.jpg",
      category: "otros"
   },
   {  id:4,
      name:"Yes4All plataforma aeróbica ajustable",
      precio: 7900,
      image:"imagenes/otros_2.jpg",
      category: "otros"
   },
   {  id:5,
      name:"Adidas hardware ab-wheel",
      precio: 20000,
      image:"imagenes/otros_3.jpg",
      category: "otros"
   },
   {  id:6,
      name:"Champion Pantalón corto de entrenamiento",
      precio: 9700,
      image:"imagenes/short_2.jpg",
      category: "indumentaria"
   },
   {  id:7,
      name:"Bowflex SelectTech 552 Adjustable Dumbbells",
      precio: 5600,
      image:"imagenes/otros_4.jpg",
      category: "otros"
   },
   {  id:8,
      name:"Nike Free TR 8 tenis deportivos para mujer",
      precio: 31500,
      image:"imagenes/zapatilla_2.jpg",
      category: "calzados"
   },
   {  id:9,
      name:"Amazon Basics",
      precio: 4100,
      image:"imagenes/otros_5.jpg",
      category: "otros"
   },
   {  id:10,
      name:"Under Armour Raid 2.0",
      precio: 9100,
      image:"imagenes/short_3.jpg",
      category: "indumentaria"
   },
   {  id:11,
      name:"Adidas Bolsa de lona Court Lite",
      precio: 17600,
      image:"imagenes/bolso_4.jpg",
      category: "bolsos"
   },
   {  id:12,
      name:"Adidas Puremotion Adapt",
      precio: 4500,
      image:"imagenes/zapatilla_3.jpg",
      category: "calzados"
   },
   {  id:13,
      name:"Mossy Oak Pantalones cortos de gimnasio para hombre",
      precio: 7400,
      image:"imagenes/short_4.jpg",
      category: "indumentaria"
   },
   {  id:14,
      name:"Marcy Banco de utilidad ajustable multiposición",
      precio: 11000,
      image:"imagenes/otros_6.jpg",
      category: "otros"
   },
   {  id:15,
      name:"Champion Pantalones cortos de malla con bolsillos, para hombre",
      precio: 6200,
      image:"imagenes/short_5.jpg",
      category: "indumentaria"
   },
   {  id:16,
      name:"Puma evercat accesorio para bolsa de despacho",
      precio: 4500,
      image:"imagenes/bolso_1.jpg",
      category: "bolsos"
   },
   {  id:17,
      name:"Adidas Defender 4 - Bolsa de lona mediana",
      precio: 17900,
      image:"imagenes/bolso_3.jpg",
      category: "bolsos"
   },
   {  id:18,
      name:"Adidas Defender 4 - Bolsa de lona pequeña",
      precio: 12300,
      image:"imagenes/bolso_2.jpg",
      category: "bolsos"
   },
]


// DIVIDE LA CANTIDAD DE PRODUCTOS QUE QUEREMOS QUE SE RENDERICE //
const splitProducts = (size) => {
   let dividedProducts = [];
   for(let i = 0; i < productsData.length; i += size )
   dividedProducts.push(productsData.slice(i, i + size));
   return dividedProducts 
}

const productsController = {
   dividedProducts:splitProducts(8),
   nextProductsIndex: 1,
   productsLimit:splitProducts(8).length
}


/*RENDERIZA UNA FRACCION DEL CATALOGO DE PRODUCTOS*/
const renderDividedProducts = (index = 0) => {
   divejemplo.innerHTML += productsController.dividedProducts[index]
   .map(renderProduct).join('')
}


/* RENDERIZA LOS PRODUCTOS SEGUN SU CATEGORIA */ 
const renderFilteredProducts = (category) => {
   const productsList = productsData.filter((product)=>
   product.category === category);

   divejemplo.innerHTML = productsList.map(renderProduct).join('')
}

/*CHEQUEA SI ES QUE RECIBE UNA CATEGORIA, EN BASE A ESO RENDERIZA POR CATEGORIA O RENDERIZA EL TOTAL DE PRODUCTOS*/
const renderProducts = (index=0 , category = undefined) => {
   if(!category){
      renderDividedProducts(index);
      return
   }
   renderFilteredProducts(category)
}

/*RENDERIZADO DE CADA PRODUCTO DEL CATALOGO*/

const renderProduct = (productos) => {
   const {name,precio,image,id} = productos;
   return`<div class="card">
   <div class="image_card">
       <img src="${image}" alt="">
   </div>    
   <h3 id="name">${name}</h3>
   <div class="button-agregar">
      <div>
         <p class="precio-card">$${precio}</p>  
         <small><p>6 cuotas de $ ${Math.ceil(precio/6)}</p></small>
      </div>   
      <button class="add-button"
      data-name='${name}' data-id='${id}' data-precio='${precio}' data-image='${image}'>AGREGAR</button>
   </div>   
</div>
   `;

   

} ;


/*RECIBE EL EVENTO Y APLICA EL FILTRO DEL BOTON SELECCIONADO AL MISMO TIEMPO QUE SE FIJA SI HAY QUE RENDERIZAR POR CATEGORIA O RENDERIZAR TODOS LOS PRODUCTOS*/
const applyFilter = (e) => {
   console.log(e.target.dataset)
   if(!e.target.classList.contains('category')) return;
   changeFilterState(e)
   if(!e.target.dataset.category){
      divejemplo.innerHTML = '';
      renderProducts()
   }else{
      renderProducts(0, e.target.dataset.category)
   }

}

const changeFilterState = (e) => {
   const selectedCategory = e.target.dataset.category;
   changeActivatedBtn(selectedCategory)
   changeShowMoreState(selectedCategory)
}


// FILTRO DE LOS BOTONES DE CATEGORIA //
const changeActivatedBtn = (selectedCategory)=>{
   const categories = [...categoriesList];
   categories.forEach((categoryBtn) => {
      if(categoryBtn.dataset.category!== selectedCategory){
         categoryBtn.classList.remove('actived');
         return;
         
      }
      categoryBtn.classList.add('actived')
   })

}

// FILTRO DEL BOTON DE VER MAS //
const changeShowMoreState = (category) => {
   if (!category) {
      btnShowMore.classList.remove('hidden')
      return
   }
   btnShowMore.classList.add('hidden')
} 

const isLastIndexOf = () => {
   return productsController.nextProductsIndex === productsController.productsLimit;
}
    


const showMoreProducts = () => {
   renderProducts(productsController.nextProductsIndex);
   productsController.nextProductsIndex ++;
   if(isLastIndexOf()){
      btnShowMore.classList.add('hidden')
      productsController.nextProductsIndex = 1;
   }
}


////////////////////////////////////////////////////////////////////////////////////////////////

// PERMITIMOS VER EL MENU HAMBURGUESA/////
const toggleMenuResponsive = () => {
   navbarUl.classList.toggle("navbar_list-responsive")

 }

 // ABRIMOS EL CARRITO //
 const toggleCart = () => {
   cartMenu.classList.toggle('toggle_cart');
   if(navbarUl.classList.contains('navbar_list-responsive')){
      navbarUl.classList.remove('navbar_list-responsive')
   }
   overlay.classList.toggle("show-overlay")
 }

 // BOTON PARA CERRAR EL CARRITO Y BORRA EL BLUR DE FONDO //
 const closeOnClick = () => {
   cartMenu.classList.toggle('toggle_cart')
   overlay.classList.add("show-overlay");
 };



 ///////////////////////////////////////////////////////////////////////////////////////////////

 // RENDERIZADO DE CADA PRODUCTO ENVIADO AL CARRITO //

 const renderCartProducts = (product) => {
   const {image,name,precio,quantity,id} = product;
   return `
         <div class="cart-item">
           <img src='${image}' alt=${name} />
           <div class="item-info">
             <h3 class="item-tittle">${name}</h3>
             <span class="item-price">$${precio}</span>
             <div class="item-handler">
               <div>Cantidad: </div>
               <div class="quantity-container">
                  <button class="quantity-handler down" data-id=${id}>-</button>
                  <span class="item-quantity">${quantity}</span>
                  <button class="quantity-handler up" data-id=${id}>+</button>
               </div>   
             </div>
            </div>
         </div>
    `;
 };

 
 // LOGICA PARA RENDERIZADO DE PRODUCTOS EN EL CARRITO // 
 const renderCart = () => {
   if(!cart.length){
      cartProducts.innerHTML = `<p class="empty-message">El carrito esta vacio</p>`
      return
      }
      cartProducts.innerHTML = cart.map(renderCartProducts).join('')
 }

 // LOGICA PARA CONTROLAR EL TOTAL DE PRODUCTOS EN EL CARRITO //
 const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * Number(cur.quantity) , 0)
 }

 const showTotal = () => {
   total.innerHTML = `$${getCartTotal().toFixed(2)}`
 }

 // CONSTANTE AUXILIAR //
 const CreateProductData = (id, name, image, precio) => {
   return {id, name, image, precio};
 };


 // CONFIRMAMOS QUE EL PRODUCTO QUE AGREGAMOS YA EXISTA EN EL CARRITO //
 const isExistingCartProduct = (product) => {
   return cart.find((item) => item.id === product.id)
 }


 // CHEQUEAMOS SI EL PRODUCTO QUE AGREGAMOS YA ESTA EN EL CARRITO, SI ES ASI, SOLO LE SUMAMOS UNA UNIDAD A SU CANTIDAD //
 const addUnitProduct = (product) => {
   cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
      ? {...cartProduct, quantity: cartProduct.quantity + 1}
      : cartProduct
   })
   checkCartState()}

 // COMO NO EXISTE EL PRODUCTO EN EL CARRITO, CREAMOS UNO NUEVO //
 const createCartProduct = (product) => {
   cart = [...cart, {...product, quantity: 1}]
   checkCartState();
 }

// EXTRAEMOS LA DATA DESDE LOS BOTONES QUE PRESIONAMOS Y ARMAMOS LA LOGICA PARA EL CARRITO //
 const addProduct = (e) => {
   if (!e.target.classList.contains("add-button")) return;
   const { id, name, precio, image} = e.target.dataset;
   const product = CreateProductData(id, name, image, precio);
   // SI ES QUE YA EXISTE EL PRODUCTO EN EL CARRITO, HACER ESTO//
   if (isExistingCartProduct(product)) {
     addUnitProduct(product);
     //  confirmationMsg()//
   // SI NO EXISTE EN EL CARRITO HACER ESTO //    
   } else {
     createCartProduct(product);
       confirmationMsg()
   }
   checkCartState();
 };

 const checkCartState = () => {
   saveToLocalStorage(cart);
   renderCart(cart);
    //showSubTotal(cart)//
   showTotal(cart);
    //showEnvio(cart)//
   //contadorCarrito();//f
   //disableBtn(btnBuy);//
   // disableBtn(btnEmpty);
 };


 // ELIMINAMOS UN PRODUCTO DEL CARRITO //
 const removeProductFromCart = (existingProduct) => {
      cart = cart.filter((product) => product.id !== existingProduct.id);
      checkCartState()
   }

   const substractProductUnit = (existingProduct) => {
      cart = cart.map((cartProduct) => {
      return cartProduct.id === existingProduct.id
      ? {...cartProduct, quantity: cartProduct.quantity -1}
      : cartProduct })
   }


// CUANDO SE QUITAN CANTIDADES DE PRODUCTOS, EN CASO DE QUEDAR SOLO UNA UNIDAD BORRA EL PRODUCTO COMPLETO DEL CARRITO... SINO LE RESTA UNA UNIDAD //
 const handleMinusBtnEvent = (id) => {
   const existingCartProduct = cart.find((item) => item.id === id)
   if(existingCartProduct.quantity === 1)
      if(window.confirm("¿Desea eliminar este producto del carrito?")){
      removeProductFromCart(existingCartProduct)
      return} 
   substractProductUnit(existingCartProduct)
 }

 const handlePlusBtnEvent = (id) => {
   const existingCartProduct = cart.find((item) => item.id === id);
   addUnitProduct(existingCartProduct)

 }

 // SI EL BOTON PRESIONADO CONTIENE DOWN O UP, SELECCIONAMOS LO QUE CORRESPONDA PARA CONTINUAR LA LOGICA // 
 const handleQuantity = (e) => {
   if(e.target.classList.contains("down")){
      handleMinusBtnEvent(e.target.dataset.id);
   }else if(e.target.classList.contains("up")){
      handlePlusBtnEvent(e.target.dataset.id)
   }
   checkCartState()
 }

 const resetCartItems = () => {
   cart = [];
   checkCartState()
 }

 const changeBg = () => {
   var headerContainer = document.getElementById('header-container')
   var scrollValue = window.scrollY
   if (scrollValue < 200) {
      headerContainer.classList.remove('header-container_scroll')
   }else{
      headerContainer.classList.add('header-container_scroll')
   }
 }



const init = () => {
   renderProducts();
   categories.addEventListener('click', applyFilter)
   btnShowMore.addEventListener('click',showMoreProducts)
   toggleMenu.addEventListener('click', toggleMenuResponsive)
   cartBtn.addEventListener('click', toggleCart)
   closeCartButton.addEventListener('click', closeOnClick)
   document.addEventListener('DOMContentLoaded', renderCart)
   document.addEventListener('DOMContentLoaded', showTotal)
   products.addEventListener('click', addProduct)
   productsCart.addEventListener('click', handleQuantity)
   window.addEventListener('scroll', changeBg)
}
init()