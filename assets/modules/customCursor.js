export default function initCustomCursor() {
    const cursorInner = document.querySelector('.circle-cursor-inner');
    const cursorOuter = document.querySelector('.circle-cursor-outer');
  
    if (!cursorInner || !cursorOuter) return;
  
    let mouseX = 0;
    let mouseY = 0;
    let isMagnetic = false;
  
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  
      if (!isMagnetic) {
        cursorOuter.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      cursorInner.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  
      // Hide cursor over iframes
      if (e.target.tagName.toLowerCase() === 'iframe') {
        cursorInner.style.visibility = 'hidden';
        cursorOuter.style.visibility = 'hidden';
      } else {
        cursorInner.style.visibility = 'visible';
        cursorOuter.style.visibility = 'visible';
      }
    });
  
    // Hover effects
    document.querySelectorAll('a, .cursor-as-pointer').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorInner.classList.add('cursor-link-hover');
        cursorOuter.classList.add('cursor-link-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorInner.classList.remove('cursor-link-hover');
        cursorOuter.classList.remove('cursor-link-hover');
      });
    });
    
    // Query Selector Drag Effect
    document.querySelectorAll('.cursor-drag').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorInner.classList.add('cursor-drag-hover');
        cursorOuter.classList.add('cursor-drag-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorInner.classList.remove('cursor-drag-hover');
        cursorOuter.classList.remove('cursor-drag-hover');
      });
    });

    // Magnetic effect
    document.querySelectorAll('.cursor-magnet, .icon-button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect();
        cursorOuter.style.transition = 'all .2s ease-out';
        cursorOuter.style.transform = `translate(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px)`;
        cursorOuter.style.width = `${rect.width}px`;
        cursorOuter.style.height = `${rect.height}px`;
        cursorOuter.style.marginLeft = '0px';
        cursorOuter.style.marginTop = '0px';
        isMagnetic = true;
      });
  
      el.addEventListener('mouseleave', () => {
        cursorOuter.style.transition = '';
        cursorOuter.style.width = '';
        cursorOuter.style.height = '';
        cursorOuter.style.marginLeft = '';
        cursorOuter.style.marginTop = '';
        isMagnetic = false;
      });
    });

  }
  