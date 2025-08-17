// Wedding Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Countdown Timer
    function updateCountdown() {
        const weddingDate = new Date('September 19, 2025 17:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<h3>We\'re Married! 💕</h3>';
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Gallery functionality - Load from JSON data
    let galleryData = [];

    let currentImageIndex = 0;
    let filteredImages = galleryData;

    // Load gallery data from JSON
    async function loadGalleryData() {
        try {
            const response = await fetch('gallery_data.json');
            galleryData = await response.json();
            filteredImages = galleryData;
            console.log(`Loaded ${galleryData.length} photos`);
            return true;
        } catch (error) {
            console.error('Error loading gallery data:', error);
            // Fallback to sample data if JSON fails to load
            galleryData = [
                { src: 'images/engagement.jpg', category: 'engagement', caption: 'Our engagement photo' },
                { src: 'images/our_first_date.jpg', category: 'couple', caption: 'Our very first date' },
                { src: 'images/paris_dinner_cruise.jpg', category: 'couple', caption: 'Romantic dinner cruise in Paris' },
                { src: 'images/iceland_waterfall.jpg', category: 'couple', caption: 'Adventure in Iceland' },
                { src: 'images/us_together.jpg', category: 'family', caption: 'Just us together' }
            ];
            filteredImages = galleryData;
            return false;
        }
    }

    // Initialize gallery
    async function initGallery() {
        await loadGalleryData();
        renderGallery('all');
        setupGalleryFilters();
        setupLightbox();
    }
    
    // Render gallery items
    function renderGallery(filter) {
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (filter === 'all') {
            filteredImages = galleryData;
        } else {
            filteredImages = galleryData.filter(item => item.category === filter);
        }
        
        galleryGrid.innerHTML = '';
        
        filteredImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <span>View Photo</span>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Setup gallery filters
    function setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                // Filter gallery
                const filter = button.getAttribute('data-filter');
                renderGallery(filter);
            });
        });
    }
    
    // Lightbox functionality
    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        // Close lightbox
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigation
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
        nextBtn.addEventListener('click', () => navigateLightbox(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') navigateLightbox(-1);
                if (e.key === 'ArrowRight') navigateLightbox(1);
            }
        });
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxMetadata = document.getElementById('lightbox-metadata');

        const photoData = filteredImages[index];

        lightboxImg.src = photoData.src;
        lightboxCaption.textContent = photoData.caption;

        // Build metadata display
        let metadataHTML = '';

        if (photoData.date) {
            const date = new Date(photoData.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            metadataHTML += `<div class="metadata-item"><span class="metadata-label">Date:</span> ${formattedDate}</div>`;
        }

        lightboxMetadata.innerHTML = metadataHTML;

        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function navigateLightbox(direction) {
        currentImageIndex += direction;

        if (currentImageIndex >= filteredImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = filteredImages.length - 1;
        }

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxMetadata = document.getElementById('lightbox-metadata');

        const photoData = filteredImages[currentImageIndex];

        lightboxImg.src = photoData.src;
        lightboxCaption.textContent = photoData.caption;

        // Build metadata display
        let metadataHTML = '';

        if (photoData.date) {
            const date = new Date(photoData.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            metadataHTML += `<div class="metadata-item"><span class="metadata-label">Date:</span> ${formattedDate}</div>`;
        }

        lightboxMetadata.innerHTML = metadataHTML;
    }
    
    // Initialize gallery when page loads
    initGallery();

    // Setup timeline photo clicks
    setupTimelineClicks();

    // Setup timeline photo clicks
    function setupTimelineClicks() {
        const timelinePhotos = document.querySelectorAll('.timeline-clickable');

        timelinePhotos.forEach(photo => {
            photo.addEventListener('click', function() {
                const imageSrc = this.getAttribute('data-src');
                openTimelineLightbox(imageSrc);
            });
        });
    }

    // Open lightbox for timeline photos with metadata
    function openTimelineLightbox(imageSrc) {
        // Find the photo data in gallery
        const photoData = galleryData.find(item => item.src === imageSrc);

        if (photoData) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const lightboxMetadata = document.getElementById('lightbox-metadata');

            lightboxImg.src = photoData.src;
            lightboxCaption.textContent = photoData.caption;

            // Build metadata display
            let metadataHTML = '';

            if (photoData.date) {
                const date = new Date(photoData.date);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                metadataHTML += `<div class="metadata-item"><span class="metadata-label">Date:</span> ${formattedDate}</div>`;
            }

            lightboxMetadata.innerHTML = metadataHTML;

            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 220, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 220, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .detail-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
});
