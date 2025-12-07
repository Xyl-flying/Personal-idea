// 前端密码保护
const passwordOverlay = document.getElementById('password-overlay');
const siteContent = document.getElementById('site-content');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');

passwordSubmit.addEventListener('click', () => {
    const password = passwordInput.value;
    if(password === '1234'){  // 可自定义密码
        passwordOverlay.style.display = 'none';
        siteContent.style.display = 'block';
    } else {
        alert('密码错误');
    }
});

// 作品集分类切换
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        workItems.forEach(item => {
            if(category === 'all' || item.classList.contains(category)){
                item.style.display='block';
            } else {
                item.style.display='none';
            }
        });
    });
});
