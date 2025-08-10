// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;  // Telegram object
    tg.ready();  // Tell Telegram the app is ready (hides loading)

    // Adapt to Telegram theme (light/dark mode)
    const theme = tg.themeParams;
    document.body.style.backgroundColor = theme.bg_color || '#f0f0f0';
    document.body.style.color = theme.text_color || '#000';

    // Age verification button
    const verifyButton = document.getElementById('verify-button');
    verifyButton.addEventListener('click', function() {
        // Open Telegram's official age bot (launched July 2025)
        tg.openTelegramLink('https://t.me/age_verification_bot');
        // After verification, assume user closes and returns—show content (in real app, check status)
        document.getElementById('age-gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    });

    // Optional: Send data to bot (e.g., when user clicks something)
    // tg.sendData('User viewed content');  // Uncomment if needed
});