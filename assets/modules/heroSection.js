import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function initHeroSection() {
  const container = document.querySelector('.HeroHomepage_media__Knxtw');
  const content = document.querySelector('.homeHeader_main'); // Ensure this is the positioned parent
  const placeholderEl = document.querySelector('.homeHeader__heading .HeroHomepage_imagePlaceholder__JQkUx');

  if (!container || !placeholderEl || !content) {
    console.warn("One or more elements not found for Hero Section initialization.");
    return;
  }

  // Set initial styles immediately to prevent FOUC (Flash of Unstyled Content)
  gsap.set(container, {
    willChange: 'transform, top, left',
    opacity: 0 // Start hidden to prevent FOUC, will be made visible after initial positioning
  });

  const updateScale = () => {
    const mediaInner = container.querySelector('.HeroHomepage_mediaInner__maSYq');
    if (!mediaInner) return; // Exit if the inner media element isn't found

    // Define a breakpoint for mobile
    const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

    if (isMobile) {
      // On mobile, force scaleX and scaleY to 1.3
      gsap.set(mediaInner, {
        scaleX: 1.3,
        scaleY: 1.3,
        transformOrigin: 'center center'
      });
    } else {
      // On desktop, calculate the scale based on aspect ratio
      const containerRect = container.getBoundingClientRect();
      const elementAspect = containerRect.width / containerRect.height;
      const viewportAspect = window.innerWidth / window.innerHeight;

      if (elementAspect > 0) {
        gsap.set(mediaInner, {
          scaleX: viewportAspect / elementAspect,
          // Keep scaleY at 1 or calculate it if needed for desktop
          scaleY: 1, // Reset scaleY for desktop, or calculate if different
          transformOrigin: 'center center'
        });
      }
    }
  };

  // This function now calculates the final top position for the animation
  const getDynamicToTop = () => {
    // The final position for the top edge of the container to be at 100vh
    return '100vh';
  };

  // Function to set the initial state correctly
  const setInitialState = () => {
    const placeholderRect = placeholderEl.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect(); // Get content's position

    // Calculate initial top and left relative to the 'content' parent
    const fromTop = placeholderRect.top - contentRect.top;
    const fromLeft = placeholderRect.left - contentRect.left;

    // Get the current dimensions of the container for scaling calculation.
    // Assuming current dimensions are its 'natural' size before scaling.
    const currentContainerWidth = container.offsetWidth;
    const currentContainerHeight = container.offsetHeight;

    // Calculate initial scale based on the placeholder's dimensions relative to container's natural dimensions
    const fromScaleX = placeholderRect.width / currentContainerWidth;
    const fromScaleY = placeholderRect.height / currentContainerHeight;

    gsap.set(container, {
      position: 'absolute', // Maintain absolute positioning
      top: fromTop,
      left: fromLeft,
      scaleX: fromScaleX,
      scaleY: fromScaleY,
      x: 0, // Reset any previous x/y transforms
      y: 0,
      transformOrigin: 'top left', // Scale from the top-left corner
      borderRadius: getComputedStyle(placeholderEl).borderRadius || '0px',
      opacity: 1 // Make visible after initial positioning
    });
  };


 
  gsap.fromTo(container, {
    // 'from' values are set by setInitialState()
  }, {
    top: () => getDynamicToTop(), // Animate to 100vh
    left: 0, // Moves to the left edge
    scaleX: 1, // Scale back to natural width
    scaleY: 1, // Scale to natural height (no vertical stretch in this version)
    ease: 'none',
    borderRadius: '0px', // Animate border-radius to 0

    scrollTrigger: {
      trigger: container,
      // Adjust start/end points for mobile vs. desktop if needed
      start: 'top top+=200', // Example: Starts when the top of the container is 200px from viewport top
      end: 'bottom top+=100', // Example: Ends when the bottom of the container is 100px from viewport top
      scrub: 1,
      onRefresh: () => {
        // Re-calculate initial position and scale on refresh (e.g., resize)
        setInitialState();
        updateScale();
      },
    }
  });

  ScrollTrigger.addEventListener('refreshInit', () => {
    setInitialState(); // Recalculate initial state on resize/refresh
    updateScale(); // Recalculate inner media scale
  });

  // Initial refresh to ensure ScrollTrigger picks up correct values
  ScrollTrigger.refresh();
}

