const buscarProductos = async (category) => {
    try {
       const res = await fetch('https://fakestoreapi.com/products/');
       const data = await res.json();
       const results = data
       if(category!=category){
          renderProductsList(results)
       }else{
          const categoria = results.category;
          renderFilteredProducts(results,categoria)
       }
       
 
    } catch (error) {
       console.log(error)
    }
 }