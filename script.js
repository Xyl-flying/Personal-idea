document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 核心变量定义
    // ----------------------------------------------------
    const EDITOR_PASSWORD = "1234"; // <-- 【重要】请将此密码更改为您专属的密码！
    
    const passwordContainer = document.getElementById('password-container');
    const siteContent = document.getElementById('site-content');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmitBtn = document.getElementById('password-submit-btn');
    
    // 上传控件变量
    const replacePdfBtn = document.getElementById('replace-pdf-btn');
    const pdfFileInput = document.getElementById('pdf-file-input');
    const resumeDownloadLink = document.getElementById('resume-download-link');
    const photoFileInput = document.getElementById('photo-file-input');
    const newVideoBtn = document.querySelector('.work-item.add-new-video');
    const videoFileInput = document.getElementById('video-file-input-new');
    
    // 视频播放模态框变量
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-video-iframe');
    const closeBtn = document.querySelector('.close-btn');
    const videoZoomBtns = document.querySelectorAll('.video-zoom-btn');
    
    // 作品集筛选变量
    const filterLinks = document.querySelectorAll('#works-nav a');
    const worksContent = document.querySelector('.works-content');
    const allWorkItems = document.querySelectorAll('.work-item'); 

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
        const passwordMessage = document.getElementById('password-message');
        
        // 假设只有这个密码进入编辑模式
        if(input === EDITOR_PASSWORD) {
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.add('editor-mode'); 
            passwordMessage.innerText = '';
        } else {
            // 访客模式（密码错误或无密码）
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.remove('editor-mode'); 
            // 确保访客模式下，编辑控件隐藏，下载链接显示
            if (resumeDownloadLink) resumeDownloadLink.style.display = 'inline-block';
            if (replacePdfBtn) replacePdfBtn.style.display = 'none';
            
            // 如果是第一次输入密码错误，可以考虑不跳过，这里我们简化为：输错一次后直接进入访客模式
            // passwordMessage.innerText = "密码错误，请重试"; 
            // passwordInput.value = '';
        }
        // 确保页面内容初始化加载时，筛选器工作
        filterWorkItems('all');
    }

    // ----------------------------------------------------
    // 3. 视频播放模态框逻辑
    // ----------------------------------------------------

    videoZoomBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoSrc = btn.getAttribute('data-video-src');
            modalIframe.src = videoSrc; 
            modal.style.display = "block"; 
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        modalIframe.src = ""; 
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            modalIframe.src = ""; 
        }
    });

    // ----------------------------------------------------
    // 4. 文件上传触发及处理逻辑
    // ----------------------------------------------------
    
    // PDF 替换触发
    if(replacePdfBtn) {
        replacePdfBtn.addEventListener('click', () => { pdfFileInput.click(); });
    }

    pdfFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            alert(`已选择 PDF 文件：${file.name}。请联系后端工程师完成上传和路径更新。`);
        }
    });
    
    // 照片上传触发
    document.getElementById('photo-upload-btn')?.addEventListener('click', () => { photoFileInput.click(); });
    photoFileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-photo').src = e.target.result;
            };
            reader.readAsDataURL(file);
            alert(`照片已在前端预览更新。请联系后端工程师完成持久化存储。`);
        }
    });

    // 新增视频上传触发
    if(newVideoBtn) {
        newVideoBtn.addEventListener('click', () => { 
            if (document.body.classList.contains('editor-mode')) {
                videoFileInput.click();
            }
        });
    }

    videoFileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            alert(`已选择视频文件：${file.name}。请联系后端工程师完成持久化存储及作品创建。`);
        }
    });


    // ----------------------------------------------------
    // 5. 作品集分类筛选功能
    // ----------------------------------------------------
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const category = link.getAttribute('data-category');
            
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
            filterWorkItems(category);

            const heading = worksContent.querySelector('.category-heading');
            if(heading) {
                heading.innerText = link.innerText;
            }
        });
    });

    function filterWorkItems(category) {
        const isEditorMode = document.body.classList.contains('editor-mode');
        
        allWorkItems.forEach(item => {
            const isEditorOnly = item.classList.contains('editor-only');
            
            if (category === 'all' || item.classList.contains(category)) {
                // 如果是编辑占位符，仅在编辑模式下显示
                if (isEditorOnly) {
                    item.style.display = isEditorMode ? 'flex' : 'none';
                } else {
                    item.style.display = 'block';
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 初始加载时：激活第一个链接并执行筛选
    document.querySelector(`.filter-btn[data-category="all"]`).classList.add('active');
    filterWorkItems('all');
});