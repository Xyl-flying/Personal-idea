document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 核心变量定义
    // ----------------------------------------------------
    const CORRECT_PASSWORD = "1234"; // <-- **【重要】在这里设置您的密码！**
    const storedAccess = localStorage.getItem('portfolioAccess'); 
    
    const passwordOverlay = document.getElementById('password-overlay');
    const siteContent = document.getElementById('site-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');


    // ----------------------------------------------------
    // 2. 密码保护功能 (Password Protection)
    // ----------------------------------------------------
    
    // 初始化：检查本地存储，如果已授权，直接显示内容
    if (storedAccess === 'granted') {
        showSiteContent();
    } else {
        // 否则，显示密码覆盖层
        passwordOverlay.style.display = 'flex'; 
    }

    // 绑定事件
    passwordSubmit.addEventListener('click', handlePasswordSubmission);

    // 回车键提交
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handlePasswordSubmission();
        }
    });

    function handlePasswordSubmission() {
        if (passwordInput.value === CORRECT_PASSWORD) {
            // 密码正确：设置本地存储，下次访问时自动通过
            localStorage.setItem('portfolioAccess', 'granted');
            showSiteContent();
        } else {
            alert('密码错误，请重试！');
            passwordInput.value = ''; // 清空输入框
        }
    }

    function showSiteContent() {
        passwordOverlay.style.display = 'none';
        siteContent.style.display = 'block';
    }


    // ----------------------------------------------------
    // 3. 作品集筛选功能 (Portfolio Filtering)
    // ----------------------------------------------------
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切换按钮激活状态
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // 筛选逻辑
            workItems.forEach(item => {
                if(category === 'all' || item.classList.contains(category)){
                    item.style.display='block';
                } else {
                    item.style.display='none';
                }
            });
        });
    });

    // 4. 页面初始加载：显示全部作品并激活“全部”按钮
    // 确保默认显示全部作品
    workItems.forEach(item => item.style.display='block');

    // 确保“全部”按钮处于激活状态 (如果没有 active 按钮，则激活第一个)
    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton && !document.querySelector('.filter-btn.active')) {
        allButton.classList.add('active');
    }
});