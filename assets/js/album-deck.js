(function () {
    const deck = document.querySelector('.album-deck');
    if (!deck) return;

    const photos = JSON.parse(deck.querySelector('.album-deck-data').textContent);
    if (!photos.length) return;

    const front = deck.querySelector('.photo-stack-front img');
    const behind = deck.querySelector('.photo-stack-back-one img');
    const back = deck.querySelector('.photo-stack-back-two img');
    const full = document.querySelector('[data-album-full-photo]');
    const count = deck.querySelector('.photo-stack-count');
    const stack = deck.querySelector('.photo-stack');
    let index = 0;

    function fitStack() {
        if (!front.naturalWidth || !front.naturalHeight) return;
        const ratio = front.naturalWidth / front.naturalHeight;
        const maxHeight = Math.min(420, Math.max(260, window.innerHeight * 0.5));
        const imageHeight = Math.min(maxHeight - 42, (stack.clientWidth * 0.84 - 24) / ratio);
        stack.style.setProperty('--card-width', `${imageHeight * ratio + 24}px`);
        stack.style.setProperty('--card-height', `${imageHeight + 42}px`);
    }

    front.addEventListener('load', fitStack);
    window.addEventListener('resize', fitStack);

    function showPhoto(nextIndex) {
        index = (nextIndex + photos.length) % photos.length;
        front.src = photos[index].image;
        front.alt = photos[index].alt;
        behind.src = photos[(index + 1) % photos.length].image;
        back.src = photos[(index + 2) % photos.length].image;
        full.src = photos[index].image;
        full.alt = photos[index].alt;
        count.textContent = `${index + 1} / ${photos.length}`;
        if (front.complete) fitStack();
    }

    deck.querySelectorAll('[data-photo-step]').forEach(button => {
        button.addEventListener('click', () => {
            showPhoto(index + Number(button.dataset.photoStep));
        });
    });

    deck.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showPhoto(index + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });

    showPhoto(0);
}());
