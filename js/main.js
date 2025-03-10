// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 初始化底部标签栏
    initTabBar();
    
    // 初始化搜索框
    initSearchBar();
    
    // 初始化轮播图
    initCarousel();
});

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElements = document.querySelectorAll('.status-bar-time');
    if (timeElements.length > 0) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        timeElements.forEach(element => {
            element.textContent = timeString;
        });
    }
}

// 初始化底部标签栏
function initTabBar() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果是原型演示，阻止默认行为
            if (window.location.pathname.includes('index.html')) {
                e.preventDefault();
            }
            
            // 移除所有标签的活动状态
            tabItems.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // 添加当前标签的活动状态
            this.classList.add('active');
        });
    });
}

// 初始化搜索框
function initSearchBar() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    });
}

// 初始化轮播图
function initCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        if (items.length <= 1) return;
        
        let currentIndex = 0;
        
        // 显示当前项目
        function showItem(index) {
            items.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // 显示下一个项目
        function showNextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }
        
        // 初始显示第一个项目
        showItem(0);
        
        // 每3秒切换一次
        setInterval(showNextItem, 3000);
    });
}

// 模拟拍照功能
function simulateCamera() {
    const cameraPreview = document.getElementById('camera-preview');
    if (cameraPreview) {
        cameraPreview.classList.add('active');
        
        setTimeout(() => {
            cameraPreview.classList.remove('active');
            // 模拟拍照后跳转到结果页
            window.location.href = 'photo-result.html';
        }, 1500);
    }
}

// 模拟加载数据
function simulateLoading(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
        
        setTimeout(() => {
            element.classList.remove('loading');
            if (typeof callback === 'function') {
                callback();
            }
        }, 1500);
    }
}

// 切换标签
function switchTab(tabContainer, tabId) {
    const container = document.getElementById(tabContainer);
    if (!container) return;
    
    const tabs = container.querySelectorAll('.tab');
    const contents = container.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    const selectedTab = container.querySelector(`#${tabId}`);
    const selectedContent = container.querySelector(`#${tabId}-content`);
    
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
}

// 显示模态框
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// 隐藏模态框
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
} 