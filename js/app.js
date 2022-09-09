 const loadProducts = () =>
{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>showProducts(json))
};


const showProducts = (products) =>
{
    const productContainer = document.getElementById('product-container');
    products.forEach(product => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        
        <div class="h-100 card bg-opacity-50">
            <img height="250px" src="${product.image}" class="p-4 card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as...</p>
            </div>
            <div class="card-footer border-0 bg-white pb-4">
                <button class="my-btn rounded text-white fw-semibold">Buy Now</button>
                <button class="my-btn rounded text-white fw-semibold">Details</button>
            </div>
        </div>
        
        `;
        productContainer.appendChild(newDiv);
        
    });
}


loadProducts();