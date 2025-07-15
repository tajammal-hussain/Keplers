import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initNavigation() {
    const container = document.querySelector('#main-menu');
    const navButtons = document.querySelectorAll('ul.nav li a');
    const custom_html = container?.querySelector('.custom-html-wrap');

    // IMPORTANT: We no longer get textContent globally, as it will be determined per click
    // const textContent = navButtons.length > 0 ? navButtons[0].querySelector('.menu-title') : null;

    if (!container || navButtons.length === 0) { // Removed textContent from this check
        console.warn('Navigation setup failed. Missing container or nav buttons.');
        return;
    }

    const menuItems = container.querySelectorAll('li');
    const menuLinks = container.querySelectorAll('a');
    const customItems = custom_html ? custom_html.querySelectorAll('a') : [];

    // Initial setup
    gsap.set(container, {
        display: 'none',
        opacity: 0,
        overflow: 'hidden'
    });

    let isAnimating = false; // Flag to track animation status
    let currentTextContentElement = null; // To store the textContent element of the clicked button

    const openTl = gsap.timeline({
        paused: true,
        onStart: () => {
            isAnimating = true;
            navButtons.forEach(button => {
                button.style.pointerEvents = 'none'; // Disable clicks on all nav buttons
            });
        },
        onComplete: () => {
            isAnimating = false;
            navButtons.forEach(button => {
                button.style.pointerEvents = 'auto'; // Enable clicks on all nav buttons
            });
        }
    });

    openTl.set(container, { display: 'block', height: "100%" })
        .to(container, {
            opacity: 1,
            duration: .6,
            ease: "power3.in"
        }, 0)
        .from(customItems, {
            y: "100%",
            stagger: .1,
            duration: .6,
            ease: "power3.in"
        }, "<")
        .to(menuItems, {
            x: 0,
            "--clip-path": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
            opacity: 1,
            stagger: .1,
            duration: 1.4,
            ease: "elastic.out(2,.8)"
        }, "<50%");

    const closeTl = gsap.timeline({
        paused: true,
        onStart: () => {
            isAnimating = true;
            navButtons.forEach(button => {
                button.style.pointerEvents = 'none'; // Disable clicks on all nav buttons
            });
        },
        onComplete: () => {
            gsap.set(container, { display: 'none' });
            isAnimating = false;
            navButtons.forEach(button => {
                button.style.pointerEvents = 'auto'; // Enable clicks on all nav buttons
            });
        }
    });

    closeTl.to(customItems, {
        y: "-100%",
        stagger: .1,
        duration: .6,
        ease: "power3.out"
    }, "<")
    .to(menuItems, {
        x: 0,
        "--clip-path": "0% 0%, 0% 0%, 0% 100%, 0% 100%",
        stagger: .1,
        duration: .6,
        ease: "power3.out"
    }, "<")
    .to(container, {
        opacity: 0,
        duration: .6,
        ease: 'power1.inOut'
    }, ">");

    let isOpen = false;

    // Attach event listener to each navButton
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (isAnimating) { // Prevent click if an animation is already running
                return;
            }

            // Get the textContent element specific to the clicked button
            const clickedTextContent = button.querySelector('.menu-title');

            if (!clickedTextContent) { // If the clicked button doesn't have .menu-title, do nothing.
                console.warn('Clicked button does not contain a .menu-title element.');
                return;
            }

            // Store the reference to the clicked textContent element
            currentTextContentElement = clickedTextContent;

            if (!isOpen) {
                openTl.restart();
                currentTextContentElement.textContent = 'Close'; // Update text on the current clicked button's textContent
            } else {
                closeTl.restart();
                currentTextContentElement.textContent = 'Menu'; // Update text on the current clicked button's textContent
            }
            isOpen = !isOpen;
        });
    });
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (isOpen && !isAnimating) {
                closeTl.restart();
                if (currentTextContentElement) {
                    currentTextContentElement.textContent = 'Menu';
                }
                isOpen = false;
            }
        });
    });

    
}