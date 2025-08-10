document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Match Telegram theme
    const theme = tg.themeParams;
    document.body.style.backgroundColor = theme.bg_color || '#f0f0f0';
    document.body.style.color = theme.text_color || '#000';

    // Optional: Fetch books from javmyanmar.com API
    /*
    fetch('https://javmyanmar.com/api/books')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('dynamic-content');
            data.books.forEach(book => {
                const item = document.createElement('div');
                item.className = 'book-item';
                item.innerHTML = `
                    <a href="reader.html?url=${encodeURIComponent(book.url)}&title=${encodeURIComponent(book.title)}">
                        <img src="${book.cover}" alt="${book.title}">
                        <p class="book-title">${book.title}</p>
                    </a>
                `;
                content.appendChild(item);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
    */
});
