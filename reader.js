document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Match Telegram theme
    const theme = tg.themeParams;
    document.body.style.backgroundColor = theme.bg_color || '#f0f0f0';
    document.body.style.color = theme.text_color || '#000';

    // Get URL and title from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pdfUrl = urlParams.get('url');
    const bookTitle = urlParams.get('title') || 'Untitled Book';

    document.getElementById('book-title').textContent = bookTitle;
    document.getElementById('download-link').href = pdfUrl;

    // PDF.js setup
    let pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5, // Adjust for mobile readability
        canvas = document.getElementById('pdf-canvas'),
        ctx = canvas.getContext('2d');

    // Render PDF page
    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext).promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });

            document.getElementById('page-num').textContent = num;
        });
    }

    // Queue page if rendering is in progress
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    // Previous page
    window.prevPage = function() {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    };

    // Next page
    window.nextPage = function() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    };

    // Load PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;
        renderPage(pageNum);
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF. Please use the download link.');
    });
});
