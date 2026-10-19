/**
 * CineVerse Cinema - Global Application Script (main.js)
 * Header, Mobile Menu, Trailer Modal, Authentication & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTrailerModal();
  initAuthSystem();
  initToast();
});

// 1. THANH ĐIỀU HƯỚNG & MENU MOBILE
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.main-nav');

  // Hiệu ứng đổi màu header khi cuộn chuột
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navMenu.style.display === 'flex';
      navMenu.style.display = isExpanded ? 'none' : 'flex';
      if (!isExpanded) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '76px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(7, 9, 14, 0.98)';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
}

// 2. MODAL XEM TRAILER YOUTUBE POPUP
function initTrailerModal() {
  const modal = document.getElementById('trailer-modal');
  const iframe = document.getElementById('trailer-iframe');
  const closeBtn = document.getElementById('close-trailer-btn');

  if (!modal || !iframe) return;

  // Mở trailer khi click nút có data-trailer
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-trailer]');
    if (trigger) {
      e.preventDefault();
      const videoId = trigger.getAttribute('data-trailer');
      if (videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add('active');
      }
    }
  });

  // Đóng modal
  const closeModal = () => {
    modal.classList.remove('active');
    iframe.src = ''; // Dừng phát video
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

// 3. HỆ THỐNG ĐĂNG NHẬP / ĐĂNG KÝ VÀ TÀI KHOẢN
function initAuthSystem() {
  const authModal = document.getElementById('auth-modal');
  const openAuthBtns = document.querySelectorAll('.open-auth-modal');
  const closeAuthBtn = document.getElementById('close-auth-btn');
  const userBox = document.getElementById('user-header-box');

  const updateHeaderAuth = () => {
    const user = CineVerseUtil.storage.getUser();
    if (!userBox) return;

    if (user) {
      userBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="my-tickets.html" class="btn btn-secondary btn-sm" title="Xem vé đã đặt">
            <i class="fas fa-ticket-alt"></i> Vé của tôi
          </a>
          <span style="font-size: 0.88rem; font-weight: 600; color: #fff;">
            👤 ${user.name}
          </span>
          <button id="logout-btn" class="btn btn-secondary btn-sm" title="Đăng xuất" style="padding: 4px 10px;">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      `;

      document.getElementById('logout-btn')?.addEventListener('click', () => {
        CineVerseUtil.storage.logout();
        showToast('Đã đăng xuất tài khoản', 'info');
        updateHeaderAuth();
      });
    } else {
      userBox.innerHTML = `
        <button class="btn btn-secondary btn-sm open-auth-modal">
          <i class="fas fa-user"></i> Đăng nhập
        </button>
      `;
      userBox.querySelector('.open-auth-modal')?.addEventListener('click', () => {
        authModal?.classList.add('active');
      });
    }
  };

  updateHeaderAuth();

  openAuthBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      authModal?.classList.add('active');
    });
  });

  closeAuthBtn?.addEventListener('click', () => {
    authModal?.classList.remove('active');
  });

  // Xử lý submit form đăng nhập demo
  const loginForm = document.getElementById('quick-login-form');
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email')?.value || 'sinhvien@utc.edu.vn';
    const name = email.split('@')[0];
    CineVerseUtil.storage.setUser({ name, email });
    authModal?.classList.remove('active');
    showToast(`Chào mừng bạn trở lại, ${name}!`, 'success');
    updateHeaderAuth();
  });
}

// 4. TOAST NOTIFICATION
function initToast() {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = 'success') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' ? 'check-circle' : type === 'info' ? 'info-circle' : 'exclamation-circle';
  const color = type === 'success' ? '#10b981' : type === 'info' ? '#38bdf8' : '#ef4444';

  toast.style.borderLeftColor = color;
  toast.innerHTML = `
    <i class="fas fa-${icon}" style="color: ${color}; font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 5. TIỆN ÍCH COPY MÃ GIẢM GIÁ
function copyPromoCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Đã sao chép mã ưu đãi: ${code}`, 'success');
  }).catch(() => {
    showToast(`Mã ưu đãi: ${code}`, 'info');
  });
}
