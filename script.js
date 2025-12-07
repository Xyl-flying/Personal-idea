document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 核心变量定义
    // ----------------------------------------------------
    const PASSWORD = "1234"; 
    
    const passwordContainer = document.getElementById('password-container');
    const siteContent = document.getElementById('site-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmitBtn = document.getElementById('password-submit-btn');
    const passwordMessage = document.getElementById('password-message');
    
    // 作品集变量
    const filterLinks = document.querySelectorAll('#works-nav a');
    const worksContainer = document.querySelector('.works-content');
    const workItems = document.querySelectorAll('.work-item');

    // ----------------------------------------------------
    // 2. 密码保护功能
    // ----------------------------------------------------
    passwordSubmitBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    function checkPassword() {
        const input = passwordInput.value;
        if(input === PASSWORD) {
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
        } else {
            passwordMessage.innerText = "密码错误，请重试";
            passwordInput.value = '';
        }
    }
    
    // ----------------------------------------------------
    // 3. 作品集分类筛选功能
    // ----------------------------------------------------

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止默认的锚点跳转

            // 1. 获取目标类别
            const category = link.getAttribute('data-category');
            
            // 2. 切换激活状态
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 3. 滚动到作品集区域 (更好的 UX)
            document.getElementById('works').scrollIntoView({ behavior: 'smooth' });

            // 4. 筛选逻辑
            workItems.forEach(item => {
                // 强制显示或隐藏作品
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // 5. 更新显示的分类标题 (可选，根据您的 HTML 结构)
            const heading = worksContainer.querySelector('.category-heading');
            if(heading) {
                heading.innerText = link.innerText;
            }
        });
    });

    // 初始加载时显示全部作品并激活第一个链接
    const initialCategory = 'all';
    document.querySelector(`.filter-btn[data-category="${initialCategory}"]`).classList.add('active');
    workItems.forEach(item => item.style.display = 'block');
});