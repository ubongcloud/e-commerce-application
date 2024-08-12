document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
        { id: 2, name: 'Product 2', price: 49.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
        { id: 3, name: 'Product 3', price: 39.99, image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b' },
        // Add more products as needed
    ];

    const cart = [];

    function renderProducts(productList) {
        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = '';

        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4';
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = `Cart (${cart.length})`;
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'list-group-item';
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(cartItem);

            total += item.price;
        });

        document.getElementById('cart-total').textContent = total.toFixed(2);
    }

    document.getElementById('product-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            const product = products.find(p => p.id === productId);

            cart.push(product);
            updateCartCount();
            renderCart();
        }
    });

    document.getElementById('search-input').addEventListener('input', (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
        renderProducts(filteredProducts);
    });

    renderProducts(products);
    updateCartCount();
});