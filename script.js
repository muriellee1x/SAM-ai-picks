let selectedIndex = 0;
let carouselInterval;
let isPaused = false;


document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索输入框
    const searchInput = document.getElementById('searchInput');
    
    // 获取所有建议标签按钮
    const suggestionButtons = document.querySelectorAll('.flex.flex-wrap.justify-center.gap-4 button');
    
    // 为每个按钮添加点击事件监听器
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新正则表达式以匹配更多的特殊字符和表情符号
            const buttonText = this.textContent
                .replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '')
                .trim();
            // 设置输入框的值
            searchInput.value = buttonText;
            // 让输入框获得焦点
            searchInput.focus();
        });
    });
});

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

// 添加图片3D效果处理函数
function initializeImagePerspective() {
    const container = document.getElementById('featureTagsContainer');
    const card = document.getElementById('feature-tag-image-container');
    
    const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const maxRotation = 15;
        
        const rotateY = ((x - centerX) / centerX) * maxRotation;
        const rotateX = -((y - centerY) / centerY) * maxRotation;
        
        card.classList.add('tilting');
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    };
    
    const handleMouseLeave = () => {
        card.classList.remove('tilting');
        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
    };
    
    const handleMouseEnter = () => {
        card.classList.add('tilting');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tags = document.querySelectorAll('.suggestion-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 移除其他标签的选中状态
            tags.forEach(t => t.classList.remove('active'));
            // 为当前点击的标签添加选中状态
            tag.classList.add('active');
            
            // 使用相同的表情符号清理逻辑
            const cleanText = tag.textContent
                .replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '')
                .trim();
                
            // 更新搜索框内容
            if (searchInput) {
                searchInput.value = cleanText;
                searchInput.focus();
            }
        });
    });
});