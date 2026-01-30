// This script will be loaded by MkDocs

document.addEventListener('DOMContentLoaded', function() {
    // --- Aurora Background Click Splash Logic ---
    // We check if the aurora background exists on the page
    if (document.querySelector('.aurora-background')) {
        document.body.addEventListener('click', function(e) {
            // Create a splash element
            const splash = document.createElement('div');
            splash.className = 'click-splash';
            
            // Position it at the click coordinates
            splash.style.left = `${e.clientX}px`;
            splash.style.top = `${e.clientY}px`;
            
            // Append to the body, then remove after the animation ends
            document.body.appendChild(splash);
            setTimeout(() => {
                splash.remove();
            }, 600);
        });
    }
});
