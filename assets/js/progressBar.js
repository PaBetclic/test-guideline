
document.addEventListener("DOMContentLoaded", () => {
    const colorBar = document.querySelector(".container-bar-anim");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    colorBar.style.transition = "margin-top 0.5s ease"; 
                    colorBar.style.marginTop = "30px";

                    const numbers = document.querySelectorAll(".animNumber");
                    numbers.forEach(number => {
                        number.style.opacity = "1";
                    });

                    setTimeout(() => {
                        animateBar();
                    }, 500); 

                    observer.unobserve(entry.target); 
                }
            });
        },
        {
            root: null,
            rootMargin: "-65% 0px",
            threshold: 0
        }
    );

    observer.observe(colorBar);

    function animateBar() {
        const bars = document.querySelectorAll(".barAnim");

        bars.forEach(bar => {
            const numberElement = bar.querySelector(".animNumber");
            const finalWidth = numberElement.getAttribute("data-width");
            bar.style.width = finalWidth;
            animateNumber(numberElement, parseInt(finalWidth)); 
        });
    }

    function animateNumber(element, finalValue) {
        let current = 25; 
        const increment = (finalValue - current) / 50; 
        const duration = 1000; 
        const intervalTime = duration / 50;

        const interval = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= finalValue) || (increment < 0 && current <= finalValue)) {
                clearInterval(interval);
                element.textContent = `${finalValue}%`; 
            } else {
                element.textContent = `${Math.round(current)}%`;
            }
        }, intervalTime);
    }
});

const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

function playVideosSequentially() {
    video1.onended = () => {
        video1.style.display = 'none'; 
        video2.style.display = 'block';
        video2.controls = true; 
        video2.play(); 
    };

    video2.onended = () => {
        video2.style.display = 'none'; 
        video1.style.display = 'block'; 
        video1.controls = true; 
        video1.play(); 
    };
}

playVideosSequentially();

