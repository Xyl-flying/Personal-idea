// ----------------- 前端密码保护 -----------------
const passwordOverlay = document.getElementById('password-overlay');
const siteContent = document.getElementById('site-content');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');

passwordSubmit.addEventListener('click', () => {
    const password = passwordInput.value.trim();
    if(password === '1234'){  // 可自定义密码
        passwordOverlay.style.display = 'none';
        siteContent.style.display = 'block';
        animateFadeIn(); // 显示页面时触发动画
    } else {
        alert('密码错误');
    }
});

// ----------------- 作品集分类切换 -----------------
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        workItems.forEach(item => {
            if(category === 'all' || item.classList.contains(category)){
                item.style.display = 'block';
                item.classList.add('fade-in'); // 添加渐入效果
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// ----------------- 渐入动画 -----------------
function animateFadeIn() {
    const fadeItems = document.querySelectorAll('.fade-in');
    fadeItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, index * 100); // 依次延迟
    });
}

// ----------------- 页面初次加载动画 -----------------
document.addEventListener('DOMContentLoaded', () => {
    if(siteContent.style.display === 'block') {
        animateFadeIn();
    }
});
