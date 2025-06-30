// Enhanced Love Letter JavaScript - Mobile Optimized
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const letterFullscreen = document.getElementById('letterFullscreen');
    const closeFullscreen = document.getElementById('closeFullscreen');
    const nextBtn = document.getElementById('nextBtn');
    
    let isOpen = false;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let tapTimeout = null;
    
    // Tap envelope to open/close
    envelope.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isDragging) {
            if (isOpen) {
                closeEnvelope();
            } else {
                openEnvelope();
            }
        }
    });
    
    // Prevent accidental taps during swipe
    envelope.addEventListener('touchstart', function() {
        clearTimeout(tapTimeout);
    });
    
    // Open envelope function
    function openEnvelope() {
        envelope.classList.add('open');
        envelope.classList.remove('close');
        isOpen = true;
        
        // Add romance effect
        setTimeout(() => {
            console.log('Love is in the air! 💕');
        }, 500);
    }
    
    // Close envelope function
    function closeEnvelope() {
        envelope.classList.add('close');
        envelope.classList.remove('open');
        isOpen = false;
    }
    
    // Touch events for swipe detection (mobile focused)
    letter.addEventListener('touchstart', handleTouchStart, { passive: false });
    letter.addEventListener('touchmove', handleTouchMove, { passive: false });
    letter.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Mouse events for desktop fallback
    letter.addEventListener('mousedown', handleMouseDown);
    letter.addEventListener('mousemove', handleMouseMove);
    letter.addEventListener('mouseup', handleMouseUp);
    letter.addEventListener('mouseleave', handleMouseUp);
    
    function handleTouchStart(e) {
        if (!isOpen) return;
        e.preventDefault();
        startY = e.touches[0].clientY;
        isDragging = false;
        letter.style.transition = 'none';
        
        // Set timeout to detect if this is a tap or swipe
        tapTimeout = setTimeout(() => {
            isDragging = false;
        }, 100);
    }
    
    function handleTouchMove(e) {
        if (!isOpen) return;
        e.preventDefault();
        
        clearTimeout(tapTimeout);
        isDragging = true;
        currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        
        if (deltaY > 0) { // Swiping up
            const progress = Math.min(deltaY / 80, 1);
            letter.style.transform = `translateY(${-deltaY}px) scale(${1 + progress * 0.05})`;
            letter.style.opacity = 1 - progress * 0.2;
        }
    }
    
    function handleTouchEnd(e) {
        if (!isOpen) return;
        e.preventDefault();
        
        clearTimeout(tapTimeout);
        letter.style.transition = 'all 0.3s ease';
        
        const deltaY = startY - currentY;
        
        if (deltaY > 40 && isDragging) { // Swipe up threshold (reduced for mobile)
            showFullscreenLetter();
        } else {
            // Reset position
            letter.style.transform = '';
            letter.style.opacity = '';
        }
        
        // Reset dragging state after animation
        setTimeout(() => {
            isDragging = false;
        }, 300);
    }
    
    // Mouse events (desktop fallback)
    function handleMouseDown(e) {
        if (!isOpen) return;
        e.preventDefault();
        startY = e.clientY;
        isDragging = false;
        letter.style.transition = 'none';
        document.body.style.userSelect = 'none';
    }
    
    function handleMouseMove(e) {
        if (!isOpen) return;
        e.preventDefault();
        isDragging = true;
        currentY = e.clientY;
        const deltaY = startY - currentY;
        
        if (deltaY > 0) { // Moving up
            const progress = Math.min(deltaY / 100, 1);
            letter.style.transform = `translateY(${-deltaY}px) scale(${1 + progress * 0.1})`;
            letter.style.opacity = 1 - progress * 0.3;
        }
    }
    
    function handleMouseUp(e) {
        if (!isOpen) return;
        e.preventDefault();
        letter.style.transition = 'all 0.3s ease';
        document.body.style.userSelect = '';
        
        const deltaY = startY - currentY;
        
        if (deltaY > 50 && isDragging) { // Swipe up threshold
            showFullscreenLetter();
        } else {
            // Reset position
            letter.style.transform = '';
            letter.style.opacity = '';
        }
        
        setTimeout(() => {
            isDragging = false;
        }, 300);
    }
    
    // Show fullscreen letter with animation
    function showFullscreenLetter() {
        letterFullscreen.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add romantic entrance effect
        setTimeout(() => {
            const hearts = createFloatingHearts();
            document.body.appendChild(hearts);
            
            setTimeout(() => {
                if (document.body.contains(hearts)) {
                    document.body.removeChild(hearts);
                }
            }, 3000);
        }, 500);
    }
    
    // Close fullscreen letter
    closeFullscreen.addEventListener('click', function() {
        letterFullscreen.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset letter position
        setTimeout(() => {
            letter.style.transform = '';
            letter.style.opacity = '';
        }, 300);
    });
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        // Add loading animation
        nextBtn.innerHTML = '<span>Loading...</span><span class="loading-dots">...</span>';
        nextBtn.disabled = true;
        
        setTimeout(() => {
            // Navigate to next page (replace with your desired URL)
            window.location.href = 'door.html';
            // Or you can use: window.open('next-page.html', '_blank');
        }, 1500);
    });
    
    // Create floating hearts effect (optimized for mobile)
    function createFloatingHearts() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        
        // Reduced number of hearts for mobile performance
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 15 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatUp ${Math.random() * 2 + 2}s ease-out forwards;
                opacity: 0.7;
            `;
            container.appendChild(heart);
        }
        
        // Add CSS animation if not exists
        if (!document.getElementById('floatUpStyle')) {
            const style = document.createElement('style');
            style.id = 'floatUpStyle';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(180deg);
                        opacity: 0;
                    }
                }
                .loading-dots {
                    animation: dots 1.5s infinite;
                }
                @keyframes dots {
                    0%, 20% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        return container;
    }
    
    // Keyboard shortcuts (for desktop)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && letterFullscreen.classList.contains('active')) {
            closeFullscreen.click();
        }
        if (e.key === 'Enter' && isOpen && !letterFullscreen.classList.contains('active')) {
            showFullscreenLetter();
        }
        if (e.key === ' ' && !isOpen) {
            e.preventDefault();
            openEnvelope();
        }
    });
    
    // Prevent zoom on double tap (mobile)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Initialize
    console.log('Mobile Love Letter system initialized! 💖');
    console.log('Instructions:');
    console.log('1. Tap envelope to open/close');
    console.log('2. Swipe up on letter to read full message');
    console.log('3. Tap "Continue Our Story" to proceed');
});