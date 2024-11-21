// Products Data
const products = [
    { id: 1, name: 'Product A', price: 50000 },
    { id: 2, name: 'Product B', price: 75000 },
    { id: 3, name: 'Product C', price: 100000 }
];

// Cart
let cart = [];

// Helper to format to Rupiah
const formatRupiah = (number) => `Rp ${number.toLocaleString('id-ID')}`;

// Populate Products
const productList = document.querySelector('.product-list');
products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${formatRupiah(product.price)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('#cart-total');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <p>${item.name} x ${item.quantity} (${formatRupiah(item.price * item.quantity)})</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    cartTotal.textContent = formatRupiah(total);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Handle Checkout
document.querySelector('#checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment successful! Thank you for shopping with us.');
    cart = [];
    updateCart();
    e.target.reset();
});
