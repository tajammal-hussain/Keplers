import EmblaCarousel from 'embla-carousel';

export default function initCarousel(){

    const emblaNode = document.querySelector('.embla');
    const embla = EmblaCarousel(emblaNode, {
      loop: true,
      speed: 0,           // Let JS control the speed
      dragFree: true,     // Allow smooth drag
      skipSnaps: true     // Disable snapping for smooth scroll
    });

    let animationFrameId;
    const speed = 0.5; // Adjust this for marquee speed

    const autoScroll = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    embla.on('init', () => {
      autoScroll(); // Start marquee scroll on init
    });

    embla.on('destroy', () => {
      cancelAnimationFrame(animationFrameId);
    });


}