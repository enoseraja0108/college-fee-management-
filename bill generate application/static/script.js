document.addEventListener('DOMContentLoaded', () => {
    // மெயின் கன்டெய்னரை தேர்வு செய்தல்
    const mainWrapper = document.querySelector('.main-wrapper');
    const leftSide = document.querySelector('.left-side');
    
    // பக்கம் லோடு ஆனவுடன் வரும் அனிமேஷன்
    setTimeout(() => {
        mainWrapper.classList.add('active-page');
    }, 100);

    // நீங்கள் கேட்ட அந்த பட்டன் கிளிக் லாஜிக் (ஏற்கனவே உள்ள கோடுகளுடன் இணைக்கப்பட்டது)
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mainWrapper.classList.add("active");
            // வீடியோவில் உள்ளது போன்ற டிரான்ஸ்ஃபார்மேஷன் பங்க்ஷனை அழைத்தல்
            const url = registerBtn.getAttribute('data-url');
            if(url) transformToPage(url);
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mainWrapper.classList.remove("active");
            const url = loginBtn.getAttribute('data-url');
            if(url) transformToPage(url);
        });
    }
});

/**
 * பக்கங்களுக்கு இடையே மாறும் போது நியான் பார் மற்றும் ஸ்லைடிங் 
 * எஃபெக்டை உருவாக்கும் பங்க்ஷன்
 */
function transformToPage(url) {
    const mainWrapper = document.querySelector('.main-wrapper');
    const leftSide = document.querySelector('.left-side');

    // 1. டாப் லோடிங் பார் (Top Loading Bar)
    const loader = document.createElement('div');
    loader.className = 'top-loading-bar';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.width = "100%";
    }, 10);

    // 2. ஸ்லைடிங் அனிமேஷன் (Blue side expands)
    leftSide.style.transition = "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    leftSide.style.width = "100%";
    leftSide.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    
    // 3. பழைய பக்கத்தை மறைத்தல்
    mainWrapper.style.opacity = "0";
    mainWrapper.style.transform = "scale(0.9)";

    // 4. குறிப்பிட்ட நேரத்திற்கு பிறகு அடுத்த பக்கத்திற்கு செல்லுதல்
    setTimeout(() => {
        window.location.href = url;
    }, 650);
}