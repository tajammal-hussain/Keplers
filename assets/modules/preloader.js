import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function initPreloader() {

    const preloaderWrap = document.querySelector('.preloader-wrap');
    const pageContent = document.getElementById('wrapper');
    const pageNav = document.querySelector('.header-nav');
    const header = document.querySelector('header');
    const body = document.body;

    // Initial States
    gsap.set(header, { yPercent: -50, opacity: 0 });
    gsap.set('.cls-1', { opacity: 0 });
    gsap.set('.cls-2', { opacity: 0 });

    preloaderWrap?.addEventListener('mouseenter', () => {});

    preloaderWrap?.addEventListener('mouseleave', () => {
        const ball = document.getElementById('ball');
        const ballLoader = document.getElementById('ball-loader');
        if (ball) {
            ball.classList.remove('with-blur');
            ball.innerHTML = '';
            gsap.to(ball, {
                duration: 0.2,
                borderWidth: '4px',
                scale: 0.5,
                borderColor: '#999999',
                backgroundColor: 'transparent',
            });
        }
        if (ballLoader) {
            gsap.to(ballLoader, { duration: 0.2, borderWidth: '4px', top: 0, left: 0 });
        }
    });

    body.classList.remove('hidden', 'hidden-ball');

    function initOnFirstLoad() {
        gsap.to('.percentage-intro', { duration: 0.5, opacity: 0, ease: 'power4.inOut' });
        gsap.to('.preloader-intro span', { duration: 0.7, opacity: 0, xPercent: -101, delay: 0.3, ease: 'power4.out' });
        gsap.to('.trackbar', { duration: 0.7, clipPath: 'inset(0% 0%)', delay: 0.3, ease: 'power3.out' });
        gsap.set('.preloader-wrap', { visibility: 'hidden', yPercent: -101 });
        gsap.to('.preloader-wrap', { duration: 0.3, opacity: 0, ease: 'power2.inOut' });

        document.querySelectorAll('.hero-pixels-cover').forEach(wrapper => {
            const pixels = wrapper.querySelectorAll('.pixel');
            gsap.to(pixels, {
                duration: 0.2,
                opacity: 0,
                delay: gsap.utils.random(1, 1.5),
                ease: 'power4.out',
                onComplete: () => {
                    wrapper.querySelectorAll('.pixels-wrapper').forEach(el => el.remove());
                }
            });
        });

        gsap.set(pageContent, { opacity: 0 });
        gsap.to([pageContent, pageNav], {
            duration: 1.7,
            opacity: 1,
            delay: 0.1,
            ease: 'power3.out',
            onComplete: () => {
                gsap.set(pageContent, { clearProps: 'y' });
            }
        });
        gsap.to(header, {
            duration: 0.5,
            delay: 1,
            yPercent: 0,
            opacity: 1,
            ease: 'power3.out',
            onComplete: () => {
                gsap.set(header, { clearProps: 'y' });
            }
        });
    }

    if (!body.classList.contains('disable-ajaxload')) {
        const perf = performance.getEntriesByType('navigation')[0] || performance.timing;
        const est = -(perf.loadEventEnd - perf.startTime);
        const loadTime = Math.min(Math.max(((est / 100) % 50) * 1000, 5000), 20000);
        const timeSeconds = loadTime / 1000 - 1.5;

        // Counter Timeline
        const counterTl = gsap.timeline();

        counterTl.to('.percentage-first span', {
            y: 0,
            duration: 1.5,
            ease: 'expo.out'
        }, timeSeconds - 1);

        counterTl.to('.number_2', {
            yPercent: -900,
            duration: timeSeconds - 1,
            ease: 'expo.inOut'
        }, 0.75);

        counterTl.to('.number_3', {
            yPercent: -900,
            duration: timeSeconds - 1,
            ease: 'expo.inOut'
        }, 1);

        gsap.to(['.percentage', '.percentage-first'], {
            duration: 1.2,
            delay: timeSeconds,
            opacity: 0,
            y: -document.querySelector('.percentage-wrapper')?.offsetHeight ?? 100,
            ease: 'expo.inOut'
        });

        gsap.to('.percentage-last span', {
            duration: 1.2,
            delay: timeSeconds,
            opacity: 1,
            y: 0,
            ease: 'expo.inOut',
            onComplete: () => {
                gsap.to('.percentage-last', { duration: 0.5, opacity: 0, y: -30 });
            }
        });

        // Main Preloader Timeline
        const tl = gsap.timeline({ delay: 0.75 });

        // Animate cls-1 and cls-2 DURING counter
        tl.to('.cls-1', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .fromTo('.cls-1', { x: 100 }, { x: 0, duration: 1, ease: 'power3.out' }, 0.1);

        tl.to('.cls-2', { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.1)
          .fromTo('.cls-2', { x: -100 }, { x: 0, duration: 1, ease: 'power3.out' }, 0.2);

        // After counter, do zoom and then init page
        tl.addLabel('afterCounter', timeSeconds + 1.3);

        tl.fromTo('.svg-loader',
          { scale: 1.5, transformOrigin: 'center center' },
          { scale: 200, duration: 1.2, ease: 'expo.inOut' },
          'afterCounter'
        );

        tl.add(() => {
            initOnFirstLoad();
        }, 'afterCounter+=1.3');

    } else {
        initOnFirstLoad();
    }
}
