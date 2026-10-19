/**
 * CineVerse Cinema - Interactive Booking Engine (booking.js)
 * Step Flow, Dynamic Seat Map, 5-Min Timer, Concessions, Voucher & Digital Ticket Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialMovieId = urlParams.get('movie') || CineVerseData.movies[0].id;
  const initialCinemaId = urlParams.get('cinema') || CineVerseData.cinemas[0].id;

  const bookingState = {
    currentStep: 1,
    movie: CineVerseUtil.getMovieById(initialMovieId) || CineVerseData.movies[0],
    cinema: CineVerseUtil.getCinemaById(initialCinemaId) || CineVerseData.cinemas[0],
    date: new Date().toISOString().split('T')[0],
    time: "19:30",
    seats: [],
    combos: {},
    voucher: null,
    paymentMethod: 'momo',
    timerInterval: null,
    timerSeconds: 300 // 5 phút đếm ngược
  };

  initBookingUI(bookingState);
});

function initBookingUI(state) {
  renderStep1Controls(state);
  renderCombosList(state);
  updateSidebarSummary(state);
  setupStepNavigation(state);
  setupVoucherInput(state);
  setupPaymentMethods(state);
}

// ==========================================
// BƯỚC 1: CHỌN PHIM, RẠP, NGÀY VÀ GIỜ CHIẾU
// ==========================================
function renderStep1Controls(state) {
  const movieSelect = document.getElementById('select-movie');
  const cinemaSelect = document.getElementById('select-cinema');
  const datePillsWrap = document.getElementById('date-pills');
  const showtimeWrap = document.getElementById('showtime-buttons');

  // Đổ danh sách Phim
  if (movieSelect) {
    movieSelect.innerHTML = CineVerseData.movies
      .filter(m => m.status === 'now_showing')
      .map(m => `<option value="${m.id}" ${m.id === state.movie.id ? 'selected' : ''}>${m.title} (${m.format.join('/')})</option>`)
      .join('');

    movieSelect.addEventListener('change', (e) => {
      state.movie = CineVerseUtil.getMovieById(e.target.value);
      state.time = state.movie.showtimes[0] || "19:30";
      renderShowtimes(state);
      updateSidebarSummary(state);
    });
  }

  // Đổ danh sách Rạp
  if (cinemaSelect) {
    cinemaSelect.innerHTML = CineVerseData.cinemas
      .map(c => `<option value="${c.id}" ${c.id === state.cinema.id ? 'selected' : ''}>${c.name}</option>`)
      .join('');

    cinemaSelect.addEventListener('change', (e) => {
      state.cinema = CineVerseUtil.getCinemaById(e.target.value);
      updateSidebarSummary(state);
    });
  }

  // Tạo 7 ngày chiếu liên tiếp từ hôm nay
  if (datePillsWrap) {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    let pillsHtml = '';
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Hôm nay' : days[d.getDay()];
      const dayNumber = d.getDate();
      const monthNumber = d.getMonth() + 1;

      pillsHtml += `
        <div class="date-pill ${i === 0 ? 'active' : ''}" data-date="${dateStr}">
          <div class="day-name">${dayName}</div>
          <div class="day-number">${dayNumber}/${monthNumber}</div>
        </div>
      `;
    }
    datePillsWrap.innerHTML = pillsHtml;

    datePillsWrap.querySelectorAll('.date-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        datePillsWrap.querySelectorAll('.date-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.date = pill.getAttribute('data-date');
        updateSidebarSummary(state);
      });
    });
  }

  renderShowtimes(state);
}

function renderShowtimes(state) {
  const showtimeWrap = document.getElementById('showtime-buttons');
  if (!showtimeWrap) return;

  const times = state.movie.showtimes && state.movie.showtimes.length > 0 
    ? state.movie.showtimes 
    : ["10:00", "13:30", "16:15", "19:00", "21:30"];

  showtimeWrap.innerHTML = times.map((t, idx) => `
    <button type="button" class="time-btn ${t === state.time ? 'active' : ''}" data-time="${t}">
      ${t}
    </button>
  `).join('');

  showtimeWrap.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showtimeWrap.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.time = btn.getAttribute('data-time');
      updateSidebarSummary(state);
    });
  });
}

// ==========================================
// BƯỚC 2: SƠ ĐỒ CHỌN GHẾ NGỒI THÔNG MINH
// ==========================================
function renderSeatMap(state) {
  const container = document.getElementById('seat-map');
  if (!container) return;

  const rows = [
    { label: 'A', type: 'standard', cols: 10 },
    { label: 'B', type: 'standard', cols: 10 },
    { label: 'C', type: 'standard', cols: 10 },
    { label: 'D', type: 'vip', cols: 10 },
    { label: 'E', type: 'vip', cols: 10 },
    { label: 'F', type: 'vip', cols: 10 },
    { label: 'G', type: 'couple', cols: 5 } // Ghế đôi Sweetbox
  ];

  // Giả lập một vài ghế đã có người đặt trước
  const occupiedSeats = ['C3', 'C4', 'E5', 'E6', 'D7'];

  let html = '';
  rows.forEach(r => {
    html += `<div class="seat-row">`;
    html += `<span class="seat-row-label">${r.label}</span>`;
    
    for (let c = 1; c <= r.cols; c++) {
      const seatId = `${r.label}${c}`;
      const isOccupied = occupiedSeats.includes(seatId);
      const isSelected = state.seats.some(s => s.id === seatId);

      let price = CineVerseData.seatPricing.standard.price;
      if (r.type === 'vip') price = CineVerseData.seatPricing.vip.price;
      if (r.type === 'couple') price = CineVerseData.seatPricing.couple.price;

      html += `
        <button type="button" 
          class="seat-btn seat-${r.type} ${isSelected ? 'seat-selected' : ''} ${isOccupied ? 'seat-occupied' : ''}"
          data-seat-id="${seatId}"
          data-seat-type="${r.type}"
          data-seat-price="${price}"
          ${isOccupied ? 'disabled' : ''}>
          ${r.type === 'couple' ? `${seatId}` : c}
        </button>
      `;
    }
    html += `<span class="seat-row-label">${r.label}</span></div>`;
  });

  container.innerHTML = html;

  // Lắng nghe sự kiện click ghế
  container.querySelectorAll('.seat-btn:not(.seat-occupied)').forEach(btn => {
    btn.addEventListener('click', () => {
      const seatId = btn.getAttribute('data-seat-id');
      const seatType = btn.getAttribute('data-seat-type');
      const seatPrice = parseInt(btn.getAttribute('data-seat-price'), 10);

      const existingIndex = state.seats.findIndex(s => s.id === seatId);
      if (existingIndex > -1) {
        state.seats.splice(existingIndex, 1);
        btn.classList.remove('seat-selected');
      } else {
        if (state.seats.length >= 8) {
          showToast('Bạn chỉ được chọn tối đa 8 ghế cho mỗi đơn đặt!', 'warning');
          return;
        }
        state.seats.push({ id: seatId, type: seatType, price: seatPrice });
        btn.classList.add('seat-selected');
      }

      updateSidebarSummary(state);
    });
  });
}

// ==========================================
// BƯỚC 3: CHỌN COMBO BẮP NƯỚC (F&B)
// ==========================================
function renderCombosList(state) {
  const container = document.getElementById('combos-container');
  if (!container) return;

  container.innerHTML = CineVerseData.combos.map(item => {
    const qty = state.combos[item.id] || 0;
    return `
      <div class="combo-card" data-combo-id="${item.id}">
        <div class="combo-top">
          <div class="combo-emoji">${item.image}</div>
          <div>
            <h4 class="combo-title">${item.name}</h4>
            <p class="combo-desc">${item.description}</p>
          </div>
        </div>
        <div class="combo-bottom">
          <div class="combo-price">${CineVerseUtil.formatCurrency(item.price)}</div>
          <div class="qty-control">
            <button type="button" class="qty-btn qty-minus" data-id="${item.id}">-</button>
            <span class="qty-count" id="qty-${item.id}">${qty}</span>
            <button type="button" class="qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (state.combos[id] && state.combos[id] > 0) {
        state.combos[id]--;
        document.getElementById(`qty-${id}`).textContent = state.combos[id];
        updateSidebarSummary(state);
      }
    });
  });

  container.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      state.combos[id] = (state.combos[id] || 0) + 1;
      document.getElementById(`qty-${id}`).textContent = state.combos[id];
      updateSidebarSummary(state);
    });
  });
}

// ==========================================
// TÍNH TOÁN & CẬP NHẬT SIDEBAR REAL-TIME
// ==========================================
function updateSidebarSummary(state) {
  document.getElementById('side-movie-title').textContent = state.movie.title;
  document.getElementById('side-cinema-name').textContent = state.cinema.name;
  document.getElementById('side-datetime').textContent = `${state.time} - ${state.date}`;
  
  const posterEl = document.getElementById('side-poster');
  if (posterEl) posterEl.src = state.movie.poster;

  // Ghế đã chọn
  const seatNames = state.seats.map(s => s.id).join(', ') || 'Chưa chọn';
  document.getElementById('side-seats').textContent = seatNames;

  // Tổng tiền ghế
  const seatsTotal = state.seats.reduce((sum, s) => sum + s.price, 0);

  // Tổng tiền combos
  let combosTotal = 0;
  let combosDesc = [];
  Object.keys(state.combos).forEach(comboId => {
    const qty = state.combos[comboId];
    if (qty > 0) {
      const combo = CineVerseData.combos.find(c => c.id === comboId);
      if (combo) {
        combosTotal += combo.price * qty;
        combosDesc.push(`${combo.name} (x${qty})`);
      }
    }
  });

  document.getElementById('side-combos').textContent = combosDesc.length > 0 ? combosDesc.join(', ') : 'Không';

  const subtotal = seatsTotal + combosTotal;
  let discount = 0;

  if (state.voucher) {
    if (state.voucher.discountType === 'percent') {
      discount = Math.round((subtotal * state.voucher.value) / 100);
    } else {
      discount = state.voucher.value;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);

  document.getElementById('side-subtotal').textContent = CineVerseUtil.formatCurrency(subtotal);
  document.getElementById('side-discount').textContent = discount > 0 ? `-${CineVerseUtil.formatCurrency(discount)}` : '0đ';
  document.getElementById('side-total').textContent = CineVerseUtil.formatCurrency(finalTotal);

  return { subtotal, discount, finalTotal };
}

// ==========================================
// BỘ ĐẾM GIỮ GHẾ 5 PHÚT (COUNTDOWN TIMER)
// ==========================================
function startSeatTimer(state) {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerSeconds = 300;

  const timerEl = document.getElementById('seat-timer-digits');
  if (!timerEl) return;

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      alert('Hết thời gian giữ ghế (5 phút)! Hệ thống sẽ đặt lại lựa chọn ghế của bạn.');
      state.seats = [];
      goToStep(1, state);
      return;
    }

    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// ==========================================
// CHUYỂN BƯỚC ĐẶT VÉ (STEP CONTROLLER)
// ==========================================
function setupStepNavigation(state) {
  const nextBtn = document.getElementById('btn-next-step');
  const prevBtn = document.getElementById('btn-prev-step');

  nextBtn?.addEventListener('click', () => {
    if (state.currentStep === 1) {
      goToStep(2, state);
    } else if (state.currentStep === 2) {
      if (state.seats.length === 0) {
        showToast('Vui lòng chọn ít nhất 1 ghế ngồi để tiếp tục!', 'warning');
        return;
      }
      goToStep(3, state);
    } else if (state.currentStep === 3) {
      goToStep(4, state);
    } else if (state.currentStep === 4) {
      processFinalBooking(state);
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (state.currentStep > 1) {
      goToStep(state.currentStep - 1, state);
    }
  });
}

function goToStep(stepNumber, state) {
  state.currentStep = stepNumber;

  // Cập nhật Stepper indicators
  document.querySelectorAll('.step-indicator').forEach(ind => {
    const s = parseInt(ind.getAttribute('data-step'), 10);
    ind.classList.remove('active', 'completed');
    if (s === stepNumber) ind.classList.add('active');
    else if (s < stepNumber) ind.classList.add('completed');
  });

  // Ẩn/Hiện nội dung từng bước
  for (let i = 1; i <= 4; i++) {
    const content = document.getElementById(`step-content-${i}`);
    if (content) content.style.display = i === stepNumber ? 'block' : 'none';
  }

  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');

  if (prevBtn) prevBtn.style.visibility = stepNumber === 1 ? 'hidden' : 'visible';
  if (nextBtn) {
    nextBtn.textContent = stepNumber === 4 ? 'Xác nhận & Thanh toán' : 'Tiếp tục';
  }

  if (stepNumber === 2) {
    renderSeatMap(state);
    startSeatTimer(state);
  }
}

// ==========================================
// MÃ GIẢM GIÁ (VOUCHER)
// ==========================================
function setupVoucherInput(state) {
  const btn = document.getElementById('btn-apply-voucher');
  const input = document.getElementById('voucher-code');

  btn?.addEventListener('click', () => {
    const code = input?.value.trim().toUpperCase();
    if (!code) return;

    const found = CineVerseData.vouchers.find(v => v.code === code);
    if (found) {
      state.voucher = found;
      showToast(`Áp dụng thành công mã ${code}: ${found.description}`, 'success');
      updateSidebarSummary(state);
    } else {
      showToast('Mã ưu đãi không hợp lệ hoặc đã hết hạn!', 'error');
    }
  });
}

// ==========================================
// PHƯƠNG THỨC THANH TOÁN
// ==========================================
function setupPaymentMethods(state) {
  document.querySelectorAll('.pay-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.paymentMethod = card.getAttribute('data-method');
    });
  });
}

// ==========================================
// XÁC NHẬN THANH TOÁN & TẠO VÉ ĐIỆN TỬ QR
// ==========================================
function processFinalBooking(state) {
  if (state.timerInterval) clearInterval(state.timerInterval);

  const { finalTotal } = updateSidebarSummary(state);
  const bookingCode = `UTC-${Math.floor(100000 + Math.random() * 900000)}`;

  const ticketData = {
    bookingCode: bookingCode,
    movieTitle: state.movie.title,
    cinemaName: state.cinema.name,
    date: state.date,
    time: state.time,
    room: "Hội Trường A5 (IMAX)",
    seats: state.seats.map(s => s.id).join(', '),
    totalPrice: finalTotal,
    paymentMethod: state.paymentMethod.toUpperCase(),
    bookingDate: new Date().toLocaleString('vi-VN'),
    poster: state.movie.poster
  };

  // Lưu vào LocalStorage
  CineVerseUtil.storage.saveTicket(ticketData);

  // Hiển thị vé điện tử trên Modal
  renderDigitalTicketModal(ticketData);
}

function renderDigitalTicketModal(ticket) {
  const modal = document.getElementById('ticket-success-modal');
  const container = document.getElementById('digital-ticket-render');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="digital-ticket">
      <div class="ticket-header">
        <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">VÉ ĐIỆN TỬ SINH VIÊN UTC</p>
        <h3>UTC CINEMA</h3>
        <div class="ticket-code">MÃ ĐẶT VÉ: ${ticket.bookingCode}</div>
      </div>
      <div class="ticket-body">
        <h3 style="color: #fff; font-size: 1.15rem; text-align: center;">${ticket.movieTitle}</h3>
        <div class="ticket-info-grid">
          <div class="ticket-info-item">
            <label>Rạp chiếu</label>
            <p>${ticket.cinemaName}</p>
          </div>
          <div class="ticket-info-item">
            <label>Phòng chiếu</label>
            <p>${ticket.room}</p>
          </div>
          <div class="ticket-info-item">
            <label>Suất chiếu</label>
            <p>${ticket.time} | ${ticket.date}</p>
          </div>
          <div class="ticket-info-item">
            <label>Ghế ngồi</label>
            <p style="color: var(--accent-gold);">${ticket.seats}</p>
          </div>
          <div class="ticket-info-item">
            <label>Thanh toán</label>
            <p>${ticket.paymentMethod}</p>
          </div>
          <div class="ticket-info-item">
            <label>Tổng thanh toán</label>
            <p style="color: #10b981;">${CineVerseUtil.formatCurrency(ticket.totalPrice)}</p>
          </div>
        </div>

        <div class="ticket-qr-area">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="#000">
            <!-- Simulated QR Code SVG pattern -->
            <rect width="100" height="100" fill="#fff" />
            <rect x="10" y="10" width="25" height="25" fill="#000" />
            <rect x="15" y="15" width="15" height="15" fill="#fff" />
            <rect x="18" y="18" width="9" height="9" fill="#000" />
            <rect x="65" y="10" width="25" height="25" fill="#000" />
            <rect x="70" y="15" width="15" height="15" fill="#fff" />
            <rect x="73" y="18" width="9" height="9" fill="#000" />
            <rect x="10" y="65" width="25" height="25" fill="#000" />
            <rect x="15" y="70" width="15" height="15" fill="#fff" />
            <rect x="18" y="73" width="9" height="9" fill="#000" />
            <rect x="42" y="15" width="12" height="6" fill="#000" />
            <rect x="42" y="35" width="20" height="8" fill="#000" />
            <rect x="65" y="45" width="15" height="10" fill="#000" />
            <rect x="45" y="65" width="10" height="20" fill="#000" />
            <rect x="65" y="70" width="20" height="15" fill="#000" />
          </svg>
          <div class="ticket-barcode">||| | |||| || ||| | |||</div>
          <p style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Xuất trình mã này tại quầy soát vé hoặc kiosk tự động</p>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 10px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="window.print()">
            <i class="fas fa-print"></i> In vé
          </button>
          <a href="my-tickets.html" class="btn btn-secondary" style="flex: 1;">
            <i class="fas fa-ticket-alt"></i> Xem vé đã lưu
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}
