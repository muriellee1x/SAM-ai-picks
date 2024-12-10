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
            let slides = Array.from(track.children);
            const prevButton = document.querySelector('.slider-button.prev');
            const nextButton = document.querySelector('.slider-button.next');
            
            // Store initial positions
            const defaultPositions = slides.map(slide => {
               const rect = slide.getBoundingClientRect();
               return rect.left;
            });
            
            let currentIndex = 0;
            
            const updateSlidePositions = () => {
               slides.forEach((slide, index) => {
                   let newPositionIndex = (index - currentIndex + slides.length) % slides.length;
                   let deltaPosition = defaultPositions[newPositionIndex] - defaultPositions[index];
                   slide.style.transform = `translateX(${deltaPosition}px)`;
                   slide.style.transition = 'transform 0.3s ease-in-out';
               });
            };
            
            nextButton.addEventListener('click', () => {
               currentIndex = (currentIndex - 1 + slides.length) % slides.length;
               updateSlidePositions();
            });
            
            prevButton.addEventListener('click', () => {
               currentIndex = (currentIndex + 1) % slides.length;
               updateSlidePositions();
            });
            
            updateSlidePositions();     

            // 可选：自动轮播

            // setInterval(() => {
            //     nextButton.click();
            // }, 3000); 

        });


const popup = document.getElementById('popup-static');
const closePopup = document.getElementById('closePopup-static');

closePopup.addEventListener('click', () => {
    popup.classList.add('hide');
    popup.addEventListener('transitionend', () => {
        if (popup.classList.contains('hide')) {
            popup.style.display = 'none';
        }
    }, {once: true});
});

// const buttonP = document.getElementById('button-P');
// const popup = document.getElementById('popup');
// const closePopup = document.getElementById('closePopup');

// buttonP.addEventListener('click', () => {
//     popup.style.display = 'block';
//     setTimeout(() => popup.classList.add('show'), 10);
// });

// closePopup.addEventListener('click', () => {
//     popup.classList.remove('show');
//     popup.addEventListener('transitionend', () => {
//         if (!popup.classList.contains('show')) {
//             popup.style.display = 'none';
//         }
//     }, {once: true});
// });

// 添加提示框显示逻辑
document.addEventListener('DOMContentLoaded', () => {
    const buttonP = document.getElementById('button-P');
    const tooltip = document.getElementById('tooltip');
    
    buttonP.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });
    
    buttonP.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

        