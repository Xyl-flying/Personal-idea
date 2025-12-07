document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 核心变量定义
    // ----------------------------------------------------
    const EDITOR_PASSWORD = "1234"; // <-- 【重要】请将此密码更改为您专属的密码！
    
    // ... (其他变量定义不变) ...
    
    // 视频播放模态框变量
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-video-iframe');
    const closeBtn = document.querySelector('.close-btn');
    const videoZoomBtns = document.querySelectorAll('.video-zoom-btn');
    
    // 作品集变量 (更新：现在只需要work-scroll-container)
    const filterLinks = document.querySelectorAll('#works-nav a');
    const worksContent = document.querySelector('.works-content');
    const workScrollContainer = document.querySelector('.work-scroll-container'); 
    const allWorkItems = document.querySelectorAll('.work-item'); // 获取所有卡片，包括占位符

    // 上传控件变量
    const newVideoBtn = document.querySelector('.work-item.add-new-video');
    const videoFileInput = document.getElementById('video-file-input-new'); // 新增视频的输入框 ID 已更新

    // ----------------------------------------------------
    // 2. 密码保护功能 (模式切换) (略)
    // ----------------------------------------------------
    // ... (checkPassword 函数和密码逻辑保持不变) ...

    function checkPassword() {
        const input = passwordInput.value;
        if(input === EDITOR_PASSWORD) {
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.add('editor-mode'); 
            console.log("进入编辑模式");
        } else {
            passwordContainer.style.display = 'none';
            siteContent.style.display = 'block';
            document.body.classList.remove('editor-mode'); 
            if (resumeDownloadLink) resumeDownloadLink.style.display = 'inline-block';
            if (replacePdfBtn) replacePdfBtn.style.display = 'none';
        }
    }


    // ----------------------------------------------------
    // 3. 视频播放模态框逻辑
    // ----------------------------------------------------

    videoZoomBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoSrc = btn.getAttribute('data-video-src');
            modalIframe.src = videoSrc; // 加载带 autoplay=1 的视频源
            modal.style.display = "block"; // 显示模态框
        });
    });

    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        modalIframe.src = ""; // 停止播放，清除视频源
    });

    // 点击模态框背景关闭
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            modalIframe.src = ""; // 停止播放
        }
    });

    // ----------------------------------------------------
    // 4. 文件上传触发及处理逻辑 (略)
    // ----------------------------------------------------
    
    // 新增视频上传触发
    if(newVideoBtn) {
        newVideoBtn.addEventListener('click', () => {
            // 检查是否处于编辑模式，防止访客误操作
            if (document.body.classList.contains('editor-mode')) {
                videoFileInput.click();
            }
        });
    }

    // 监听视频文件选择变化 (略)
    videoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            alert(`已选择视频文件：${file.name}。请联系后端工程师完成持久化存储及作品创建。`);
        }
    });

    // ... (照片和 PDF 上传逻辑保持不变) ...


    // ----------------------------------------------------
    // 5. 作品集分类筛选功能 (适应横向滚动)
    // ----------------------------------------------------
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 

            const category = link.getAttribute('data-category');
            
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.getElementById('works').scrollIntoView({ behavior: 'smooth' });

            // 筛选逻辑 (针对横向滚动容器内的卡片)
            allWorkItems.forEach(item => {
                const isEditorOnly = item.classList.contains('editor-only');
                const isEditorMode = document.body.classList.contains('editor-mode');
                
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

            const heading = worksContent.querySelector('.category-heading');
            if(heading) {
                heading.innerText = link.innerText;
            }
        });
    });

    // 初始加载时显示全部作品并激活第一个链接
    const initialCategory = 'all';
    document.querySelector(`.filter-btn[data-category="${initialCategory}"]`).classList.add('active');
    allWorkItems.forEach(item => item.style.display = 'block');
});