import barba from '@barba/core';
import gsap from 'gsap'; // Ensure GSAP is also imported

export default function initBarba() {
  barba.init({
    views: [
      {
        namespace: 'home',
        beforeEnter({ next }) {
          console.log("VIEWS: 'home': method: 'beforeEnter' : Before Entering Home page..");
          init_home(); // Call your home page init logic
        },
        afterLeave({ current }) {
          console.log("VIEWS: 'home': method: 'afterLeave' : After leaving Home page..");
        }
      },
      {
        namespace: 'works',
        beforeEnter({ next }) {
          console.log("VIEWS: 'works': method: 'beforeEnter' : Before Entering Works page..");
          init_works(); // Call your works page init logic
        },
        afterLeave({ current }) {
          console.log("VIEWS: 'works': method: 'afterLeave' : After leaving Works page..");
        }
      },
      {
        namespace: 'about',
        beforeEnter({ next }) {
          console.log("VIEWS: 'about': method: 'beforeEnter' : Before Entering About page..");
          setTimeout(() => {
            init_about(); // Call your about page init logic
          }, 500);
        },
        afterLeave({ current }) {
          console.log("VIEWS: 'about': method: 'afterLeave' : After leaving About page..");
        }
      }
    ],

    transitions: [
      {
        name: 'default-transition',
        leave(data) {
          return new Promise((resolve) => {
            const boxCont = document.getElementById("box-cont");
            const box = document.getElementById("box");

            if (boxCont && box) {
              boxCont.style.pointerEvents = "auto";
              gsap.fromTo(
                box,
                { x: "0%" },
                {
                  x: "100%",
                  duration: 1,
                  ease: "Expo.easeInOut",
                  onComplete: resolve
                }
              );
            } else {
              resolve(); // Fallback in case elements don't exist
            }
          });
        },
        enter(data) {
          setTimeout(() => {
            const boxCont = document.getElementById("box-cont");
            const box = document.getElementById("box");

            if (boxCont && box) {
              gsap.to(box, {
                x: "200%",
                duration: 1,
                ease: "Expo.easeInOut",
                onComplete: () => {
                  boxCont.style.pointerEvents = "none";
                }
              });
            }
          }, 1000);
        }
      }
    ]
  });
}
