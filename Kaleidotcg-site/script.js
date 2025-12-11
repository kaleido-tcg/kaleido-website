// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 移动端菜单切换
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 平滑滚动到锚点（仅在同一页面内）
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // 如果是页面内锚点链接（以#开头或包含#）
        if (href.includes('#') && (href.startsWith('#') || href.includes(window.location.pathname.split('/').pop()))) {
            e.preventDefault();
            const hashIndex = href.indexOf('#');
            const targetId = href.substring(hashIndex);
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // 如果是跨页面链接，让浏览器正常处理
    });
});

// 处理页面加载时的锚点跳转
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            setTimeout(() => {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Gallery分页功能
let currentPage = 1;
const itemsPerPage = 12; // 每页显示的图片数量

// 初始化Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const pagination = document.getElementById('pagination');
    
    if (!galleryGrid || typeof galleryImages === 'undefined') {
        return; // 如果不在gallery页面或数据未加载，直接返回
    }
    
    // 计算总页数
    const totalPages = Math.ceil(galleryImages.length / itemsPerPage);
    
    // 渲染当前页的图片
    function renderGallery(page) {
        galleryGrid.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, galleryImages.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const image = galleryImages[i];
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.loading = 'lazy'; // 懒加载
            
            // 图片加载错误处理
            img.onerror = function() {
                this.src = `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${image.alt}%3C/text%3E%3C/svg%3E`;
            };
            
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        }
        
        // 重新绑定图片预览事件
        bindGalleryEvents();
    }
    
    // 渲染分页控件
    function renderPagination() {
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        pagination.innerHTML = '';
        
        // 上一页按钮
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-btn';
        prevButton.textContent = '« Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery(currentPage);
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(prevButton);
        
        // 页码按钮
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            const firstButton = document.createElement('button');
            firstButton.className = 'pagination-btn';
            firstButton.textContent = '1';
            firstButton.addEventListener('click', () => {
                currentPage = 1;
                renderGallery(currentPage);
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(firstButton);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                pagination.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'pagination-btn';
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderGallery(currentPage);
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(pageButton);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                pagination.appendChild(ellipsis);
            }
            
            const lastButton = document.createElement('button');
            lastButton.className = 'pagination-btn';
            lastButton.textContent = totalPages;
            lastButton.addEventListener('click', () => {
                currentPage = totalPages;
                renderGallery(currentPage);
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(lastButton);
        }
        
        // 下一页按钮
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-btn';
        nextButton.textContent = 'Next »';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery(currentPage);
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(nextButton);
    }
    
    // 绑定图片预览事件
    function bindGalleryEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        if (!modal || !modalImg) return;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = item.src;
                modalImg.alt = item.alt;
            });
        });
    }
    
    // 初始化
    renderGallery(currentPage);
    renderPagination();
}

// 图片预览功能（保留原有功能以兼容其他页面）
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close');

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// 页面加载动画
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 活动项动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-item, .gallery-item, .contact-item, .hours-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 首页介绍区块动画
    const introObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟，让每个区块依次出现
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 200);
                // 观察一次后取消观察，避免重复触发
                introObserver.unobserve(entry.target);
            }
        });
    }, introObserverOptions);

    // 观察标题
    const introTitle = document.querySelector('.intro-section h2');
    if (introTitle) {
        introObserver.observe(introTitle);
    }

    // 观察所有介绍区块
    const introBlocks = document.querySelectorAll('.intro-block');
    introBlocks.forEach(block => {
        introObserver.observe(block);
    });

    // 初始化Gallery（如果存在）
    if (document.getElementById('galleryGrid')) {
        initGallery();
    }
});

