import { gsap } from 'gsap';

export default function MouseRotateEffect() {
    const boxes = document.querySelectorAll('.floating-image');

    boxes.forEach((box) => {
        const bounds = box.getBoundingClientRect();

        const rotateXTo = gsap.quickTo(box, "rotateX", { duration: 0.4, ease: "power2.out" });
        const rotateYTo = gsap.quickTo(box, "rotateY", { duration: 0.4, ease: "power2.out" });
        const xTo = gsap.quickTo(box, "x", { duration: 0.4, ease: "power2.out" });
        const yTo = gsap.quickTo(box, "y", { duration: 0.4, ease: "power2.out" });

        document.addEventListener("mousemove", (e) => {
            const rect = box.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const rotateX = gsap.utils.clamp(-9, 9, deltaY / 30);
            const rotateY = gsap.utils.clamp(-9, 9, -deltaX / 30);
            const translateX = gsap.utils.clamp(-10, 10, -deltaX / 60);
            const translateY = gsap.utils.clamp(-10, 10, -deltaY / 60);

            rotateXTo(rotateX);
            rotateYTo(rotateY);
            xTo(translateX);
            yTo(translateY);
        });

        box.addEventListener("mouseleave", () => {
            rotateXTo(0);
            rotateYTo(0);
            xTo(0);
            yTo(0);
        });
    });
}
