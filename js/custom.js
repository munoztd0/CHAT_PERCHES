/**
 * Custom JavaScript for Les Chats Perchés Vaud website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Generate carousel indicators dynamically
    setupCarouselIndicators();
    
    // Fix any broken images
    fixBrokenImages();
    
    // Add native lazy loading
    addNativeLazyLoading();
});

/**
 * Generate carousel indicators dynamically
 */
function setupCarouselIndicators() {
    const carousel = document.getElementById('myCarousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-inner .item');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    
    if (items.length && indicatorsContainer) {
        // Clear existing indicators
        indicatorsContainer.innerHTML = '';
        
        // Create new indicators based on number of items
        items.forEach((item, index) => {
            const indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#myCarousel');
            indicator.setAttribute('data-slide-to', index.toString());
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicatorsContainer.appendChild(indicator);
        });
    }
}

/**
 * Fix any broken images by checking if they have data-src attributes
 */
function fixBrokenImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // If the image has a data-src attribute, restore it
        if (img.hasAttribute('data-src')) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
        }
        
        // Handle image loading errors
        img.onerror = function() {
            console.error('Failed to load image:', img.src);
            // Try to reload the image without cache
            const originalSrc = img.src;
            img.src = originalSrc + '?t=' + new Date().getTime();
        };
    });
}

/**
 * Add native lazy loading attribute to images
 */
function addNativeLazyLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute if not already present
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Ensure alt text for accessibility
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
            const imgSrc = img.getAttribute('src');
            if (imgSrc) {
                const fileName = imgSrc.split('/').pop().split('.')[0];
                img.setAttribute('alt', 'Image ' + fileName);
            }
        }
    });
} 