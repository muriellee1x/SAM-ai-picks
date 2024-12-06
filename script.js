let selectedIndex = 0;
let carouselInterval;
let isPaused = false;


// document.addEventListener('DOMContentLoaded', function() {
//     // 获取搜索输入框
//     const searchInput = document.getElementById('searchInput');
    
//     // 获取所有建议标签按钮
//     const suggestionButtons = document.querySelectorAll('.flex.flex-wrap.justify-center.gap-4 button');
    
//     // 为每个按钮添加点击事件监听器
//     suggestionButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // 更新正则表达式以匹配更多的特殊字符和表情符号
//             const buttonText = this.textContent
//                 .replace(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}]/gu, '')
//                 .trim();
//             // 设置输入框的值
//             searchInput.value = buttonText;
//             // 让输入框获得焦点
//             searchInput.focus();
//         });
//     });
// });

// // 初始化分类按钮
// function initializeCategories() {
//     const container = document.getElementById('categoryScroll');
//     categories.forEach((category, index) => {
//         const button = document.createElement('button');
//         button.className = `category-button ${index === 0 ? 'selected' : ''}`;
//         button.innerHTML = `
//             <img src="${category.image}" alt="">
//             <span>${category.name}</span>
//         `;
//         button.onclick = () => selectCategory(index);
//         container.appendChild(button);
//     });
// }

// // 选择分类
// function selectCategory(index) {
//     const buttons = document.querySelectorAll('.category-button');
//     buttons[selectedIndex].classList.remove('selected');
//     buttons[index].classList.remove('selected');
//     selectedIndex = index;
//     buttons[selectedIndex].classList.add('selected');

//     buttons[selectedIndex].scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest',
//         inline: 'center'
//     });
// }

// // 在初始化分类按钮的部分添加以下代码
// function selectCategory(button) {
//     // 移除所有按钮的 active 状态和 shine 效果
//     document.querySelectorAll('.category-button').forEach(btn => {
//         btn.classList.remove('active');
//         btn.removeAttribute('data-shine-border');
//         // 移除可能存在的 shine-border 相关元素
//         const parent = btn.parentElement;
//         if (parent && parent.classList.contains('shine-border-gradient')) {
//             parent.replaceWith(btn);
//         }
//     });

//     // 添加新的 active 状态和 shine 效果
//     button.classList.add('active');
//     button.setAttribute('data-shine-border', '');
//     // 重新初始化当前按钮的 shine 效果
//     new ShineBorder(button);
// }

// // 为所有分类按钮添加点击事件
// document.querySelectorAll('.category-button').forEach(button => {
//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         selectCategory(button);
//     });
// });

// 轮播相关代码
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const moveLeftBtn = document.querySelector('#moveLeft');
    const moveRightBtn = document.querySelector('#moveRight');
    let currentItem = 0;

    // 初始化第一个item为active
    carouselItems[0].classList.add('active');

    function moveLeft() {
        carouselItems[currentItem].classList.remove('active');
        currentItem = (currentItem - 1 + carouselItems.length) % carouselItems.length;
        carouselItems[currentItem].classList.add('active');
    }

    function moveRight() {
        carouselItems[currentItem].classList.remove('active');
        currentItem = (currentItem + 1) % carouselItems.length;
        carouselItems[currentItem].classList.add('active');
    }

    moveLeftBtn.addEventListener('click', moveLeft);
    moveRightBtn.addEventListener('click', moveRight);
});