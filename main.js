const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
});

gsap.registerPlugin(Flip);
CustomEase.create('cubic', '0.83, 0, 0.17, 1');

const gallery = document.querySelector('.img-gallery-container');
const images = gsap.utils.toArray('.img');
let rotationValues = [-10, -5, 2, -2];
let isFlipped = false;

function applyRotate() {
    images.forEach((img, index) => {
        const rotation = isFlipped ? 0 : rotationValues[index];
        gsap.to(img, {
            rotate: rotation,
            duration: 2,
            ease: 'cubic',
            delay: 0.155,
        });
    });
}

document.querySelector('.btn').addEventListener('click', () => {
    isFlipped = !isFlipped;

    setTimeout(() => {
        document.querySelector('.btn').textContent = isFlipped ? 'Hide All Ideas' : 'Explore Ideas';
    }, 1000);

    let stat = Flip.getState('.img-gallery-container, .img');
    gallery.classList.toggle('order');
    images.forEach((img) => img.classList.toggle('reorder'));

    Flip.from(stat, { // Corrected variable name to 'stat'
        absolute: true,
        duration: 2,
        rotate: 0,
        stagger: 0.05,
        ease: 'cubic',
        onStart: () => {
            applyRotate();
        },
        onComplete: () => {
            scroller.update();
        },
    });
});
