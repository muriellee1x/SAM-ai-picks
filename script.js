let selectedIndex = 0;
let carouselInterval;
let isPaused = false;

// 初始化分类按钮
function initializeCategories() {
    const container = document.getElementById('categoryScroll');
    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.className = `category-button ${index === 0 ? 'selected' : ''}`;
        button.innerHTML = `
            <img src="${category.image}" alt="">
            <span>${category.name}</span>
        `;
        button.onclick = () => selectCategory(index);
        container.appendChild(button);
    });
}

// 选择分类
function selectCategory(index) {
    const buttons = document.querySelectorAll('.category-button');
    buttons[selectedIndex].classList.remove('selected');
    buttons[index].classList.remove('selected');
    selectedIndex = index;
    buttons[selectedIndex].classList.add('selected');
    buttons[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

// 滚动控制
function initializeScroll() {
    const container = document.getElementById('categoryScroll');
    const leftButton = document.getElementById('scrollLeft');
    const rightButton = document.getElementById('scrollRight');

    function checkScroll() {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        leftButton.style.display = scrollLeft > 0 ? 'flex' : 'none';
        rightButton.style.display = scrollLeft < scrollWidth - clientWidth - 1 ? 'flex' : 'none';
    }

    container.addEventListener('scroll', checkScroll);
    checkScroll();

    leftButton.onclick = () => {
        container.scrollBy({ left: -200, behavior: 'smooth' });
    };

    rightButton.onclick = () => {
        container.scrollBy({ left: 200, behavior: 'smooth' });
    };
}

// Header scroll effect
function initializeHeaderEffect() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 向下滚动时增加不透明度
        if (currentScrollY > lastScrollY) {
            header.querySelector('.container').classList.remove('bg-black/50');
            header.querySelector('.container').classList.add('bg-black/80');
        } 
        // 向上滚动或回到顶部时恢复原来的透明度
        else {
            header.querySelector('.container').classList.remove('bg-black/80');
            header.querySelector('.container').classList.add('bg-black/50');
        }
        
        lastScrollY = currentScrollY;
    });
}

// 轮播卡片逻辑
function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = Array.from(track.children);
    const centerIndex = Math.floor(cards.length / 2);
    let currentIndex = centerIndex;

    // 设置卡片初始位置
    function updateCarousel() {
        cards.forEach((card, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);
            
            // 计算每个卡片的位置和样式
            const xPos = offset * 260; // 卡片间距
            const zPos = -Math.abs(offset) * 100; // z轴位置
            const scale = 1 - (absOffset * 0.1); // 缩放
            const opacity = 1 - (absOffset * 0.2); // 透明度
            
            card.style.transform = `translateX(${xPos}px) translateZ(${zPos}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = cards.length - absOffset;
        });

        // 更新轮播点
        const dots = document.querySelectorAll('.carousel-dots button');
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-gray-600', index === currentIndex);
            dot.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    }

    // 自动轮播
    function autoRotate() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    // 初始化位置
    updateCarousel();

    // 设置自动轮播
    setInterval(autoRotate, 3000);

    // 点击切换
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
}

// 添加特征标签动画
function initializeFeatureTags() {
    const tags = document.querySelectorAll('.feature-tag');
    
    tags.forEach(tag => {
        const duration = 8 + Math.random() * 4 + 's';
        const delay = -Math.random() * 8 + 's';
        
        tag.style.setProperty('--duration', duration);
        tag.style.animationDelay = delay;
        
        // 保持垂直位置
        tag.dataset.originalTop = tag.style.top;
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
    initializeScroll();
    initializeHeaderEffect();
    initializeCarousel();
    initializeFeatureTags();

    const categoryContainer = document.querySelector('.category-container');
    categoryContainer.addEventListener('mouseenter', () => isPaused = true);
    categoryContainer.addEventListener('mouseleave', () => isPaused = false);
}); 