import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function initTextAnimations() {
  const textChars = new SplitType('.text-to-chars', { types: 'chars' });
  const textLines = new SplitType('.text-to-lines', { types: 'lines' });
  const splitTypes = document.querySelectorAll('.reveal-type');

  document.querySelectorAll('.text-to-lines .line').forEach((line) => {
    const innerLine = document.createElement('div');
    innerLine.classList.add('inner-line');
    innerLine.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(innerLine);
  });

    splitTypes.forEach((char,i) => {
        const text = new SplitType(char, {types: ['chars','words']});
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            markers: false
          },
          opacity: 0.1,
          stagger: 0.1,
        })
      });
  // Animate lines
  document.querySelectorAll('.text-to-lines').forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          element.querySelectorAll('.inner-line'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: 'power2.out',
          }
        );
      },
    });
  });

  // Animate characters
  document.querySelectorAll('.text-to-chars').forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          element.querySelectorAll('.char'),
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.04,
            duration: 0.01,
            ease: 'none',
          }
        );
      },
    });
  });
}
