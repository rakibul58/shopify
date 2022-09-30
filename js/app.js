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
        const stars = getStars(product.rating.rate);
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
                <button onclick="addToCart(${product.price} , ${product.id})" class="my-btn rounded text-white fw-semibold">Buy</button>
                <button onclick="fetchProduct('${product.id}')" class="my-btn rounded text-white fw-semibold" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        </div>
        
        `;
        productContainer.appendChild(newDiv);
        
    });
}


const getStars = numOfStars =>
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

let count = 0 ;
const addToCart = (price , id) =>
{
    count++;
    setPrices(price , id);
    document.getElementById('product-count').innerText = count;
}

const setPrices = (price , id) =>{
    const initialPrice = document.getElementById('product-price');
    const initialTotalPrice = document.getElementById('product-total');
    const taxElement = document.getElementById('product-tax');
    const totalWithTaxElement = document.getElementById('product-total-with-tax');
    const totalPrice = +initialPrice.innerText + price;
    const deliveryAndShipping = getShippingAndDelivery(totalPrice);
    const totalPriceWithShippingAndDelivery = totalPrice + deliveryAndShipping*2;
    const tax = totalPriceWithShippingAndDelivery * 0.15;
    const totalWithTax = totalPriceWithShippingAndDelivery + tax;
    document.getElementById('product-delivery').innerHTML = deliveryAndShipping;
    document.getElementById('product-shipping').innerHTML = deliveryAndShipping;

    initialPrice.innerText = totalPrice.toFixed(2);
    initialTotalPrice.innerText = totalPriceWithShippingAndDelivery.toFixed(2);
    taxElement.innerText = tax.toFixed(2);
    totalWithTaxElement.innerText = totalWithTax.toFixed(2);

}

const getShippingAndDelivery = price =>
{
    let deliveryAndShipping = 0;

    if(price>1000){
        deliveryAndShipping = 200;
    }
    else if(price>800){
        deliveryAndShipping = 150;
    }
    else if(price>500)
    {
        deliveryAndShipping = 100;
    }

    return deliveryAndShipping;
}

const fetchProduct = id =>{
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>showModal(json))
}

const showModal = data =>{
    // console.log(data)
    document.getElementById('exampleModalLabel').innerText = data.title;
    document.getElementById('modal-img').setAttribute('src' , data.image);
    document.getElementById('modal-details').innerText = data.description;
    document.getElementById('modal-price').innerText = `Price: ${data.price}$`;
}


const handleCheckOut = () =>{
    if(document.getElementById('alert-sign').classList.contains('d-none'))
        document.getElementById('alert-sign').classList.remove('d-none');
    else
        document.getElementById('alert-sign').classList.add('d-none');
    const initialPrice = document.getElementById('product-price');
    const initialTotalPrice = document.getElementById('product-total');
    const taxElement = document.getElementById('product-tax');
    const totalWithTaxElement = document.getElementById('product-total-with-tax');
    document.getElementById('alert-total-price').innerText = totalWithTaxElement.innerText;
    document.getElementById('product-delivery').innerHTML = deliveryAndShipping;
    document.getElementById('product-shipping').innerHTML = deliveryAndShipping;

}

const hide = () =>{
    document.getElementById('alert-sign').classList.add('d-none');
}

loadProducts();