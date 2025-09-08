// Global Variables
let currentProducts = [];
let filteredProducts = [];
let cart = [];
let currentCategory = 'all';

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Experience crystal-clear audio quality with deep bass and crisp highs.",
        rating: 4.5,
        reviewCount: 2847
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Track your workouts and monitor your health 24/7.",
        rating: 4.3,
        reviewCount: 1653
    },
    {
        id: 3,
        title: "Vintage Leather Jacket",
        category: "fashion",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        description: "Genuine leather jacket with vintage styling. Perfect for casual wear with a timeless design that never goes out of style.",
        rating: 4.7,
        reviewCount: 892
    },
    {
        id: 4,
        title: "Organic Cotton T-Shirt",
        category: "fashion",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Soft, comfortable organic cotton t-shirt. Sustainable fashion that feels great and looks amazing. Available in multiple colors.",
        rating: 4.2,
        reviewCount: 1247
    },
    {
        id: 5,
        title: "Modern Table Lamp",
        category: "home",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Sleek modern table lamp with adjustable brightness. Perfect for reading or creating ambient lighting in any room.",
        rating: 4.4,
        reviewCount: 634
    },
    {
        id: 6,
        title: "Ceramic Plant Pot Set",
        category: "home",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
        description: "Set of 3 beautiful ceramic plant pots with drainage holes. Perfect for indoor plants and herbs. Includes matching saucers.",
        rating: 4.6,
        reviewCount: 423
    },
    {
        id: 7,
        title: "JavaScript: The Definitive Guide",
        category: "books",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
        description: "Comprehensive guide to JavaScript programming. From basics to advanced concepts, this book covers everything you need to know.",
        rating: 4.8,
        reviewCount: 1842
    },
    {
        id: 8,
        title: "The Art of Clean Code",
        category: "books",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
        description: "Learn how to write clean, maintainable code. Essential reading for every developer who wants to improve their craft.",
        rating: 4.7,
        reviewCount: 967
    },
    {
        id: 9,
        title: "Mechanical Gaming Keyboard",
        category: "electronics",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
        description: "RGB mechanical gaming keyboard with cherry MX switches. Customizable backlighting and programmable keys for the ultimate gaming experience.",
        rating: 4.5,
        reviewCount: 2156
    },
    {
        id: 10,
        title: "Designer Sunglasses",
        category: "fashion",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "Premium designer sunglasses with UV protection. Stylish frames that complement any outfit while protecting your eyes.",
        rating: 4.3,
        reviewCount: 756
    },
    {
        id: 11,
        title: "Aromatherapy Diffuser",
        category: "home",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1544032527-5d5ac882be9b?w=400&h=400&fit=crop",
        description: "Ultrasonic aromatherapy diffuser with LED color changing lights. Create a relaxing atmosphere in your home with essential oils.",
        rating: 4.4,
        reviewCount: 1089
    },
    {
        id: 12,
        title: "Web Development Bootcamp",
        category: "books",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Complete web development course book. Learn HTML, CSS, JavaScript, and modern frameworks from beginner to advanced level.",
        rating: 4.9,
        reviewCount: 3421
    }
];

// Search suggestions data
const searchSuggestions = [
    "wireless headphones", "smart watch", "leather jacket", "cotton t-shirt",
    "table lamp", "plant pots", "javascript book", "gaming keyboard",
    "sunglasses", "aromatherapy diffuser", "programming books", "electronics",
    "fashion accessories", "home decor", "fitness tracker", "mechanical keyboard"
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestionsDiv = document.getElementById('searchSuggestions');
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const loading = document.getElementById('loading');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const cartModalOverlay = document.getElementById('cartModalOverlay');
const cartModalClose = document.getElementById('cartModalClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const buyNowBtn = document.getElementById('buyNowBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadCartFromStorage();
});

function initializeApp() {
    currentProducts = [...sampleProducts];
    filteredProducts = [...currentProducts];
    
    // Simulate loading
    setTimeout(() => {
        loading.style.display = 'none';
        renderProducts();
    }, 1500);
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSearchSuggestions);
    searchInput.addEventListener('blur', () => {
        setTimeout(() => hideSearchSuggestions(), 200);
    });
    searchBtn.addEventListener('click', handleSearch);
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Modal controls
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Cart modal controls
    cartBtn.addEventListener('click', openCartModal);
    cartModalClose.addEventListener('click', closeCartModal);
    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) closeCartModal();
    });
    
    // Buy now button
    buyNowBtn.addEventListener('click', handleBuyNow);
    
    // Checkout button
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Search Functionality
function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length > 0) {
        const suggestions = searchSuggestions
            .filter(suggestion => suggestion.toLowerCase().includes(query))
            .slice(0, 5);
        
        renderSearchSuggestions(suggestions, query);
        showSearchSuggestions();
    } else {
        hideSearchSuggestions();
    }
    
    // Perform live search
    if (query.length > 2) {
        performSearch(query);
    } else if (query.length === 0) {
        resetFilters();
    }
}

function renderSearchSuggestions(suggestions, query) {
    searchSuggestionsDiv.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = highlightMatch(suggestion, query);
        suggestionItem.addEventListener('click', () => {
            searchInput.value = suggestion;
            hideSearchSuggestions();
            performSearch(suggestion);
        });
        searchSuggestionsDiv.appendChild(suggestionItem);
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

function showSearchSuggestions() {
    searchSuggestionsDiv.style.display = 'block';
}

function hideSearchSuggestions() {
    searchSuggestionsDiv.style.display = 'none';
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        performSearch(query);
        hideSearchSuggestions();
    }
}

function performSearch(query) {
    filteredProducts = currentProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    // Update active filter
    filterButtons.forEach(btn => btn.classList.remove('active'));
    currentCategory = 'search';
    
    renderProducts();
}

// Filter Functionality
function handleFilter(e) {
    const category = e.target.dataset.category;
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentCategory = category;
    
    if (category === 'all') {
        filteredProducts = [...currentProducts];
    } else {
        filteredProducts = currentProducts.filter(product => product.category === category);
    }
    
    renderProducts();
}

function resetFilters() {
    filteredProducts = [...currentProducts];
    currentCategory = 'all';
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active');
    renderProducts();
}

// Product Rendering
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
        <div class="product-category">${formatCategory(product.category)}</div>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
            <div class="stars">${generateStars(product.rating)}</div>
            <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
        </div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
    `;
    
    card.addEventListener('click', () => openProductModal(product));
    
    return card;
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    return stars;
}

// Modal Functionality
function openProductModal(product) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalRating = document.getElementById('modalRating');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalCategory.textContent = formatCategory(product.category);
    modalRating.innerHTML = `
        <div class="stars">${generateStars(product.rating)}</div>
        <span class="rating-count">${product.rating.toFixed(1)} (${product.reviewCount.toLocaleString()} reviews)</span>
    `;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    
    // Store current product for buy now functionality
    buyNowBtn.dataset.productId = product.id;
    
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cart Functionality
function handleBuyNow() {
    const productId = parseInt(buyNowBtn.dataset.productId);
    const product = currentProducts.find(p => p.id === productId);
    
    if (product) {
        addToCart(product);
        closeModal();
        
        // Show success message
        showNotification(`${product.title} added to cart!`, 'success');
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToStorage();
    renderCartItems();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function openCartModal() {
    renderCartItems();
    cartModalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h4>Your cart is empty</h4>
                <p>Add some products to get started!</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification('Redirecting to checkout...', 'success');
    
    setTimeout(() => {
        cart = [];
        updateCartCount();
        saveCartToStorage();
        closeCartModal();
        showNotification('Thank you for your purchase!', 'success');
    }, 1500);
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('amazonCloneCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('amazonCloneCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        if (modalOverlay.style.display === 'flex') {
            closeModal();
        } else if (cartModalOverlay.style.display === 'flex') {
            closeCartModal();
        }
    }
    
    // Enter key for search
    if (e.key === 'Enter' && document.activeElement === searchInput) {
        handleSearch();
    }
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: rgba(255, 255, 255, 0.8);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
    }
    
    .no-products h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: white;
    }
`;
document.head.appendChild(notificationStyles);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const debouncedSearch = debounce(performSearch, 300);

// Update search input handler to use debounced search
searchInput.removeEventListener('input', handleSearchInput);
searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length > 0) {
        const suggestions = searchSuggestions
            .filter(suggestion => suggestion.toLowerCase().includes(query))
            .slice(0, 5);
        
        renderSearchSuggestions(suggestions, query);
        showSearchSuggestions();
    } else {
        hideSearchSuggestions();
    }
    
    if (query.length > 2) {
        debouncedSearch(query);
    } else if (query.length === 0) {
        resetFilters();
    }
});

// Intersection Observer for lazy loading (future enhancement)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker Registration (for future PWA enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for offline functionality
        console.log('Service Worker support detected');
    });
}

console.log('Amazon Clone initialized successfully!');
console.log('Features: Search, Filter, Cart, Product Details, Responsive Design');
console.log('Built with vanilla JavaScript - no external libraries required');
