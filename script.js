document.querySelectorAll('.feature-card, .card').forEach(card => {
    let timeout;
    
    card.addEventListener('mousemove', e => {
        if (timeout) {
            cancelAnimationFrame(timeout);
        }
        
        timeout = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 降低旋转敏感度
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        if (timeout) {
            cancelAnimationFrame(timeout);
        }
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});


const slideContainers = document.querySelectorAll('.slide-container');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
const totalSlides = slideContainers.length;

        // 初始化显示第一个
        slideContainers[0].classList.add('active');

        function updateCarousel(index) {
            // 隐藏所有slide
            slideContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // 显示当前slide
            slideContainers[index].classList.add('active');
            
            // 更新dot状态
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(currentIndex);
        });
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
            });
        });


        document.addEventListener('DOMContentLoaded', () => {
            const track = document.querySelector('.slider-container');
            const slides = Array.from(track.children);
            const prevButton = document.querySelector('.slider-button.prev');
            const nextButton = document.querySelector('.slider-button.next');
        
            let currentIndex = 0;
        
            const updateSlidePosition = () => {
                const slideWidth = slides[0].getBoundingClientRect().width;
                track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
            };
        
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlidePosition();
            });
        
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlidePosition();
            });
        
            // 可选：自动轮播
            /*
            setInterval(() => {
                nextButton.click();
            }, 5000); // 每5秒切换一次
            */
        });
        


        