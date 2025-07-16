import Swiper from 'swiper';
import { Navigation, Pagination, Parallax } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Parallax]); // 👈 Add Parallax here

export default function initSwiperSlider() {

    var portfolioSwiper = new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 4.8,
        spaceBetween: 10,
        loop: true,
        speed: 600,
        centeredSlides: true,
        navigation: {
          nextEl: '.portfolio__next',
          prevEl: '.portfolio__prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        keyboard: {
          enabled: true,
        },
        mousewheel: {
          enabled: false,
        },
        grabCursor: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'slide',
        parallax: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 10,
          }
        }
      });

      portfolioSwiper.on('slideChange', function () {
          console.log('Swiper slide changed! Pausing all videos.');
          pauseAllVideos();
      });
      
      pauseAllVideos();
      
      // Function to pause all videos on the page
      function pauseAllVideos() {
          const allVideos = document.querySelectorAll('video');
          allVideos.forEach(video => {
              if (!video.paused) { // Only pause if it's currently playing
                  video.pause();
                  // Assuming you want the play button to reappear immediately
                  const parentContainer = video.closest('.workCard__media');
                  if (parentContainer) {
                      const playButton = parentContainer.querySelector('.icon-button');
                      if (playButton) {
                          playButton.style.display = 'block';
                      }
                  }
              }
          });
      }

      function playActiveVideo() {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach(slide => {
          const video = slide.querySelector("video");
          if (!video) return;
          if (slide.classList.contains("swiper-slide-active")) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      }
    window.addEventListener("load", playActiveVideo);

    var testimonials_slider  = new Swiper('.tabs-list', {
      direction: 'horizontal',
      slidesPerView: 3.2,
      spaceBetween: 30,
      navigation: {
        nextEl: '.testimonials__next',
        prevEl: '.testimonials__prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        enabled: false,
      },
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'slide',
      parallax: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 10,
        }
      }
    });

    


}
