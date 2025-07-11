import initSmoothScroll from './modules/smoothScroll.js';
import initCustomCursor from './modules/customCursor.js';
import initSpannerSystem from "./modules/spanner.js";
import initHeroSection from './modules/heroSection.js';
import { initNavigation } from './modules/navigation.js';
import initGsapAnimations from './modules/gsapAnimations.js';
import initTextAnimations from './modules/textAnimations.js';
import initSwiperSlider from './modules/swiperSlider.js';
import { initVideoPlayer } from './modules/video_player.js';
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initCustomCursor();
    initSpannerSystem();
    initHeroSection(); // run only after layout is stable
    initNavigation(); // Initialize navigation after all other modules
    initGsapAnimations();
    initTextAnimations();       
    initSwiperSlider();
    initVideoPlayer();
});
  