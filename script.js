// ----------------- 前端密码保护 -----------------
const passwordOverlay = document.getElementById('password-overlay');
const siteContent = document.getElementById('site-content');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');

passwordSubmit.addEventListener('click', () => {
    const password = passwordInput.value.trim();
    if (password === '1234') {  // 可自定义密码
        passwordOverlay.style.display = 'none';
        siteContent.style.display = 'block';
    } else {
        alert('密码错误');
    }
});

// 支持按 Enter 键提交密码
passwordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        passwordSubmit.click();
    }
});


// ----------------- 作品集分类切换 -----------------
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 激活按钮样式
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 获取分类
        const category = btn.dataset.category;

        // 切换作品显示
        workItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
                // 添加淡入动画
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    });
});

// ----------------- 页面加载淡入效果 -----------------
document.addEventListener('DOMContentLoaded', () => {
    workItems.forEach(item => {
        if (item.style.display !== 'none') {
            item.classList.add('fade-in');
        }
    });
});
