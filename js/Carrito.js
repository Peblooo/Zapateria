document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const shoppingCart = document.getElementById('shopping-cart');
    const cartIcon = document.getElementById('cart-icon');

    // Modal elements
    const sizeModal = document.getElementById('size-modal');
    const sizeForm = document.getElementById('size-form');
    const closeModal = document.getElementsByClassName('close')[0];

    const confirmationMessage = document.getElementById('confirmation-message');

    cartIcon.addEventListener('mouseover', () => {
        shoppingCart.style.display = 'block';
    });

    cartIcon.addEventListener('mouseout', (e) => {
        if (!shoppingCart.contains(e.relatedTarget)) {
            shoppingCart.style.display = 'none';
        }
    });

    shoppingCart.addEventListener('mouseover', () => {
        shoppingCart.style.display = 'block';
    });

    shoppingCart.addEventListener('mouseout', (e) => {
        if (!cartIcon.contains(e.relatedTarget)) {
            shoppingCart.style.display = 'none';
        }
    });

    // Añadir evento a los botones de agregar al carrito
    document.querySelectorAll('.btn-1, .btn-2, .btn-3, .btn-4, .btn-5, .btn-6, .btn-7, .btn-8, .btn-9, .btn-10').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.getAttribute('data-name'),
                color: button.getAttribute('data-color'),
            };
            // Mostrar el modal y guardar el producto en el formulario
            sizeForm.dataset.product = JSON.stringify(product);
            sizeModal.style.display = 'block';
        });
    });

    // Function to show confirmation message
    const showConfirmationMessage = () => {
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.style.display = 'none';
        }, 3000); // 3 seconds before hiding
    };

    // Añadir al carrito al enviar el formulario del modal
    sizeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const product = JSON.parse(sizeForm.dataset.product);
        const size = document.getElementById('shoe-size').value;
        product.size = size;
        addToCart(product);
        sizeModal.style.display = 'none';
        showConfirmationMessage(); // Show confirmation message after adding to cart and closing modal
    });

    // Cerrar el modal al hacer clic en la "x"
    closeModal.addEventListener('click', () => {
        sizeModal.style.display = 'none';
        showConfirmationMessage(); // Show confirmation message after closing modal
    });

    // Cerrar el modal si el usuario hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target == sizeModal) {
            sizeModal.style.display = 'none';
            showConfirmationMessage(); // Show confirmation message after closing modal
        }
    });

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.color} - Talla ${item.size}`;
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Eliminar';
            removeBtn.addEventListener('click', () => {
                removeFromCart(index);
            });

            li.appendChild(removeBtn);
            cartItemsContainer.appendChild(li);

        });
        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    // Renderizar los items almacenados
    renderCartItems();
});
