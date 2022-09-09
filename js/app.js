 const loadProducts = () =>
{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>showProducts(json))
};


const showProducts = products =>
{
    const productContainer = document.getElementById('product-container');
    products.forEach(product => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        const stars = getstars(product.rating.rate);
        // console.log(stars.innerHTML)
        newDiv.innerHTML = `
        
        <div class="h-100 card">
            <img height="250px" src="${product.image}" class="p-4 card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description.length<50 ? product.description : product.description.slice(0,50)+'...'}</p>
            </div>
            <div class="card-footer border-0 bg-white pb-2 g-0">
                <div class="d-flex justify-content-between">
                    <h5 class="text-warning">${product.price}$<h5>
                    <p id="stars">${stars.innerHTML}</p>
                </div>
                <button class="my-btn rounded text-white fw-semibold">Buy</button>
                <button class="my-btn rounded text-white fw-semibold">Details</button>
            </div>
        </div>
        
        `;
        productContainer.appendChild(newDiv);
        
    });
}


const getstars = numOfStars =>
{
    const intNumOfStars = parseInt(numOfStars);
    const newSpan = document.createElement('span');
    
    for(let i=0 ; i<intNumOfStars ; ++i){
        const newI = document.createElement('i');
        newI.classList.add('fa-solid' , 'fa-star' , 'text-warning');
        newSpan.appendChild(newI);
    }
    if(intNumOfStars<5)
    {
        const newI = document.createElement('i');
        newI.classList.add('fa-solid' , 'fa-star-half-stroke' , 'text-warning');
        newSpan.appendChild(newI);
    }
    for(let i=0 ; i<5-intNumOfStars-1 ; ++i){
        const newI = document.createElement('i');
        newI.classList.add('fa-regular' , 'fa-star' , 'text-warning');
        newSpan.appendChild(newI);
    }

   return newSpan;
}


loadProducts();