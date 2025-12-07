document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 核心变量定义
    // ----------------------------------------------------
    const EDITOR_PASSWORD = "1234"; // <-- 【重要】请将此密码更改为您专属的密码！
    
    const passwordContainer = document.getElementById('password-container');
    const siteContent = document.getElementById('site-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmitBtn = document.getElementById('password-submit-btn');
    const passwordMessage = document.getElementById('password-message');
    
    // 作品集变量
    const filterLinks = document.querySelectorAll('#works-nav a');
    const worksContainer = document.querySelector('.works-content');
    const workItems = document.querySelectorAll('.work-item');

    // 上传控件变量
    const photoUploadBtn = document.getElementById('photo-upload-btn');
    const photoFileInput = document.getElementById('photo-file-input');
    const newVideoBtn = document.querySelector('.work-item.add-new-video');
    const videoFileInput = document.getElementById('video-file-input');
    const editVideoBtns = document.querySelectorAll('.edit-video-btn');

    // ----------------------------------------------------
    // 2. 密码保护功能 (模式切换)
    // ----------------------------------------------------
    
    passwordSubmitBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    function checkPassword() {
        const input = passwordInput.value;
        if(input === EDITOR_PASSWORD) {
            // 模式 1: 编辑模式 (专属权限)
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.add('editor-mode'); // 激活编辑样式
            console.log("进入编辑模式");
        } else {
            // 模式 2: 访客模式 (默认行为，无上传权限)
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.remove('editor-mode'); 
            passwordMessage.innerText = "密码错误，请重试";
            passwordInput.value = '';
        }
    }

    // ----------------------------------------------------
    // 3. 文件上传触发及占位符处理 (仅在编辑模式下生效)
    // ----------------------------------------------------
    
    // 个人照片上传触发
    if(photoUploadBtn) {
        photoUploadBtn.addEventListener('click', () => {
            photoFileInput.click(); 
        });
    }

    // 新增视频上传触发
    if(newVideoBtn) {
        newVideoBtn.addEventListener('click', () => {
            videoFileInput.click();
        });
    }

    // 替换现有视频触发 (概念性，您需要自行绑定到具体作品ID)
    editVideoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 记录要替换的作品ID
            const workId = btn.closest('.work-item').getAttribute('data-work-id');
            // 触发文件输入，理论上应为新的文件输入或复用已有的
            alert(`正在替换作品 ID: ${workId}。下一步应触发文件选择并处理后端上传。`);
        });
    });

    // 监听照片文件选择变化
    photoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // 概念性地更新前端显示
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-photo').src = e.target.result;
            };
            reader.readAsDataURL(file);
            // TODO: 在此处调用您的后端 API 上传文件并更新数据库路径
            alert(`照片已在前端预览更新。请联系后端工程师完成持久化存储。`);
        }
    });

    // 监听视频文件选择变化
    videoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // TODO: 在此处调用您的后端 API 上传文件，并在数据库中创建新的作品记录
            alert(`已选择视频文件：${file.name}。请联系后端工程师完成持久化存储及作品创建。`);
        }
    });

    // ----------------------------------------------------
    // 4. 作品集分类筛选功能
    // ----------------------------------------------------
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

            const category = link.getAttribute('data-category');
            
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.getElementById('works').scrollIntoView({ behavior: 'smooth' });

            // 筛选逻辑
            workItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    // 确保新增/编辑卡片只在编辑模式下显示
                    if (item.classList.contains('editor-only') && !document.body.classList.contains('editor-mode')) {
                         item.style.display = 'none';
                    } else {
                         item.style.display = 'block';
                    }
                } else {
                    item.style.display = 'none';
                }
            });

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