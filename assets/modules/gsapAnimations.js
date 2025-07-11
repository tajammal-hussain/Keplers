import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function initGsapAnimations() {

    
    // Find all sphere trigger elements
    document.querySelectorAll('.--trigger-sphere').forEach(triggerElement => {
        ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => document.body.classList.add('--is-sphere'),
            onLeave: () => document.body.classList.remove('--is-sphere'),
            onEnterBack: () => document.body.classList.add('--is-sphere'),
            onLeaveBack: () => document.body.classList.remove('--is-sphere')
        });
    });

    // Find all white trigger elements
    document.querySelectorAll('.--trigger-white').forEach(triggerElement => {
        ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top top+=100',
            end: 'bottom center',
            onEnter: () => document.body.classList.add('--is-light'),
            onLeave: () => document.body.classList.remove('--is-light'),
            onEnterBack: () => document.body.classList.add('--is-light'),
            onLeaveBack: () => document.body.classList.remove('--is-light')
        });
    });

    //  gsap.to(".frame-large", {
    //     xPercent: -200, // Move to the right
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: "#portfolio",
    //         start: "top top+=100",
    //         end: () => "+=" + document.querySelector(".frame-large").offsetWidth,
    //         scrub: true,
    //         pin: true,
    //         anticipatePin: 1
    //     }
    // });

    gsap.utils.toArray(".testimonial-card").forEach(function(card) {
        gsap.set(card, {
            transformStyle: "preserve-3d",
            transformPerspective: 1000
        });
        const q = gsap.utils.selector(card);
        const front = q(".card-front");
        const back = q(".card-back");
        
        gsap.set(back, { rotationY:-180 });
        
        const tl = gsap.timeline({ paused: true })
            .to(front, { duration: 0.3, rotationY: 180 })
            .to(back, { duration: 0.3, rotationY: 0 }, 0)
        
        card.addEventListener("mouseenter", function() {
            tl.play();
        });
        card.addEventListener("mouseleave", function() {
            tl.reverse();
        });
    });
    ScrollTrigger.refresh();

   const wrapper = document.querySelector('.m_number_text_change');

    if (wrapper) {
    let tl = gsap.timeline({
        scrollTrigger: {
        trigger: ".steps-wrapper", // A common parent wrapper of all steps
        start: "top top+=500",
        end: "bottom bottom-=400",
        scrub: true,
        pin: false,
        markers: false,
        }
    });

    // Add label for each section to move wrapper upward by a fixed percent
    tl.to(wrapper, { yPercent: 0, ease: "none" }, "step1")
        .to(wrapper, { yPercent: -16.6666, ease: "none" }, "step2")
        .to(wrapper, { yPercent: -33.3333, ease: "none" }, "step3")
        .to(wrapper, { yPercent: -56.6666, ease: "none" }, "step4")
        .to(wrapper, { yPercent: -80, ease: "none" }, "step5");
    }

};


