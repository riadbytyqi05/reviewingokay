document.getElementById("continueButton").addEventListener("click", function() {
    var captchaResponse = grecaptcha.getResponse();
    if (captchaResponse.length > 0) {
        window.location.href = './account.html';
        localStorage.setItem("captcha", "true");
    }
    else {
        var captchaErrorElement = document.getElementById('captcha-error');
        captchaErrorElement.textContent = 'Please complete the reCAPTCHA.';
    }
});