const carouselItems = [
    {
        title: "资讯分享",
        description: "这里是一段文案这里是一段文案这里是一段文案",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "3d 立体图标生成",
        description: "这里是一段文案这里是一段文案这里是一段文案这里是一段文案这里是一段文案",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "拍立得风格圣诞写真",
        description: "这里是一段文案这里是一段文案这里是一段文案这里是一段文案",
        image: "/placeholder.svg?height=200&width=400",
        dark: true,
    },
    {
        title: "AI 视频课",
        description: "这里是一段文案这里是一段文案这里是一段文案这里是一段文案这里是一段文案",
        image: "/placeholder.svg?height=200&width=400",
    },
    {
        title: "mockup 快速制作",
        description: "这里是一段文案这里是一段文案这里是一段文案这里是一段文案",
        image: "/placeholder.svg?height=200&width=400",
    },
];

class CircularCarousel {
    constructor() {
        this.activeIndex = 2;
        this.container = document.querySelector('#circularCarousel > div');
        this.initializeCards();
        this.initializeNavigation();
        this.updateCarousel();
    }

    initializeCards() {
        carouselItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `carousel-card ${item.dark ? 'dark' : ''}`;
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            this.container.appendChild(card);
        });
    }

    initializeNavigation() {
        const dotsContainer = document.getElementById('carouselDots');
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.onclick = () => this.setActiveIndex(index);
            dotsContainer.appendChild(dot);
        });

        const [prevBtn, nextBtn] = document.querySelectorAll('.carousel-nav-btn');
        prevBtn.onclick = () => this.move('left');
        nextBtn.onclick = () => this.move('right');
    }

    move(direction) {
        if (direction === 'left') {
            this.activeIndex = this.activeIndex === 0 ? carouselItems.length - 1 : this.activeIndex - 1;
        } else {
            this.activeIndex = this.activeIndex === carouselItems.length - 1 ? 0 : this.activeIndex + 1;
        }
        this.updateCarousel();
    }

    setActiveIndex(index) {
        this.activeIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const cards = document.querySelectorAll('.carousel-card');
        const dots = document.querySelectorAll('.carousel-dot');

        cards.forEach((card, index) => {
            const position = (index - this.activeIndex + carouselItems.length) % carouselItems.length;
            let translateX = '0%';
            let translateZ = '0px';
            let opacity = 1;
            let scale = 1;
            let rotate = '0deg';

            if (position === 0) {
                translateZ = '0px';
                scale = 1.2;
            } else if (position === 1 || position === carouselItems.length - 1) {
                translateX = position === 1 ? '120%' : '-120%';
                translateZ = '-100px';
                opacity = 0.8;
                scale = 0.8;
                rotate = position === 1 ? '10deg' : '-10deg';
            } else {
                translateX = position < Math.floor(carouselItems.length / 2) ? '200%' : '-200%';
                translateZ = '-200px';
                opacity = 0.6;
                scale = 0.6;
                rotate = position < Math.floor(carouselItems.length / 2) ? '20deg' : '-20deg';
            }

            card.style.transform = `translateX(${translateX}) translateZ(${translateZ}) scale(${scale}) rotate(${rotate})`;
            card.style.opacity = opacity;
            card.style.zIndex = position === 0 ? '10' : '5';
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.activeIndex);
        });
    }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    new CircularCarousel();
}); 