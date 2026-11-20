/**
 * SIMULASI PILKADES 2026
 * Interactive Voting Simulation Application
 */

// Application State
const state = {
  selectedCandidate: null, // null | 1 | 2
  config: {
    title: "SURAT SUARA",
    village: "PEMILIHAN KEPALA DESA KARANGSARI",
    district: "KECAMATAN BINONG KABUPATEN SUBANG",
    year: "TAHUN 2026",
    candidate1: {
      id: 1,
      name: "ELAN SUHERLAN",
      photo: "assets/candidate1.png"
    },
    candidate2: {
      id: 2,
      name: "XXXXXXXXXXXXX",
      photo: "assets/candidate2.png"
    }
  },
  lastVote: null
};



// Sound effects using Web Audio API (no external asset needed)
class SoundFx {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTap() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playWarning() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.setValueAtTime(180, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFx();

// DOM Elements
const screenBallot = document.getElementById("screen-ballot");
const screenReceipt = document.getElementById("screen-receipt");

const cardCandidate1 = document.getElementById("card-candidate-1");
const cardCandidate2 = document.getElementById("card-candidate-2");
const btnPilihKandidat = document.getElementById("btn-pilih-kandidat");

// Modals
const modalBackdrop = document.getElementById("modal-backdrop");
const modalAlert = document.getElementById("modal-alert");
const modalConfirm = document.getElementById("modal-confirm");
const modalSuccess = document.getElementById("modal-success");

const btnTutupAlert = document.getElementById("btn-tutup-alert");
const btnUlangi = document.getElementById("btn-ulangi");
const btnPilihConfirm = document.getElementById("btn-pilih-confirm");

// Confirm Modal Info
const confirmPhoto = document.getElementById("confirm-photo");
const confirmName = document.getElementById("confirm-name");

// Receipt Screen Elements
const qrContainer = document.getElementById("qr-container");
const receiptInfo = document.getElementById("receipt-info");
const btnSimpanQr = document.getElementById("btn-simpan-qr");
const btnCetakUlang = document.getElementById("btn-cetak-ulang");
const btnKembaliAwal = document.getElementById("btn-kembali-awal");

// Initialize UI with configuration
function renderConfig() {
  document.getElementById("header-title").textContent = state.config.title;
  document.getElementById("header-village").textContent = state.config.village;
  document.getElementById("header-district").textContent = state.config.district;
  document.getElementById("header-year").textContent = state.config.year;

  updateCardImages();
}

function updateCardImages() {
  const img1 = document.getElementById("img-card-1");
  const img2 = document.getElementById("img-card-2");
  if (img1 && img2) {
    img1.src = state.selectedCandidate === 1 ? "assets/card1_selected.png" : "assets/card1.png";
    img2.src = state.selectedCandidate === 2 ? "assets/card2_selected.png" : "assets/card2.png";
  }
}

// Format Date & Time: 20/11/2026, 10:10:10
function formatDateTime(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

// Modal Manager
function showModal(dialogElement) {
  [modalAlert, modalConfirm, modalSuccess].forEach(d => {
    if (d) d.style.display = "none";
  });
  if (dialogElement) {
    dialogElement.style.display = "block";
    modalBackdrop.classList.add("active");
  }
}

function hideAllModals() {
  modalBackdrop.classList.remove("active");
  setTimeout(() => {
    [modalAlert, modalConfirm, modalSuccess].forEach(d => {
      if (d) d.style.display = "none";
    });
  }, 200);
}

// Selection Logic (Photo 1 & Photo 3)
function selectCandidate(candidateId) {
  sfx.playTap();
  state.selectedCandidate = candidateId;

  // Update visual state (Photo 3: Selected candidate gets red border)
  cardCandidate1.classList.toggle("selected", state.selectedCandidate === 1);
  cardCandidate2.classList.toggle("selected", state.selectedCandidate === 2);
  updateCardImages();
}

cardCandidate1.addEventListener("click", () => selectCandidate(1));
cardCandidate2.addEventListener("click", () => selectCandidate(2));

// Main "PILIH KANDIDAT INI" Click
btnPilihKandidat.addEventListener("click", () => {
  if (!state.selectedCandidate) {
    // Photo 2: No candidate selected -> Show Alert Modal
    sfx.playWarning();
    showModal(modalAlert);
  } else {
    // Photo 4: Candidate selected -> Show Confirmation Modal
    sfx.playTap();
    const candidate = state.selectedCandidate === 1 ? state.config.candidate1 : state.config.candidate2;
    confirmPhoto.src = candidate.photo;
    confirmName.textContent = candidate.name;
    showModal(modalConfirm);
  }
});

// Close Alert Modal (Photo 2 "Tutup")
btnTutupAlert.addEventListener("click", () => {
  hideAllModals();
});

// Photo 4: "ULANGI" Button (Cancel & Re-select)
btnUlangi.addEventListener("click", () => {
  sfx.playTap();
  hideAllModals();
});

// Photo 4: "PILIH" Button (Confirm Selection) -> Photo 5 -> Photo 6
btnPilihConfirm.addEventListener("click", () => {
  sfx.playSuccess();
  const selectedCandidateData = state.selectedCandidate === 1 ? state.config.candidate1 : state.config.candidate2;
  const now = new Date();
  const timestampStr = formatDateTime(now);

  state.lastVote = {
    id: "VOTE-" + Math.floor(100000 + Math.random() * 900000),
    candidateId: state.selectedCandidate,
    candidateName: selectedCandidateData.name,
    timestamp: timestampStr,
    isoTime: now.toISOString(),
    village: state.config.village,
    district: state.config.district,
    year: state.config.year
  };

  // Step 5: Show Success Modal
  showModal(modalSuccess);

  // Automatically transition to Photo 6 after 1.8 seconds
  setTimeout(() => {
    hideAllModals();
    renderReceiptScreen();
  }, 1800);
});

// Photo 6: Render Receipt Screen
let currentQRCode = null;
function renderReceiptScreen() {
  screenBallot.classList.add("hidden");
  screenReceipt.classList.remove("hidden");

  // Format label: Pilihan: XXXXXXXXXX | 20/11/2026, 10:10:10
  receiptInfo.innerHTML = `Pilihan: <span class="bold">${state.lastVote.candidateName}</span> | ${state.lastVote.timestamp}`;

  // Generate QR Code
  qrContainer.innerHTML = "";
  
  // Real verifiable simulation payload
  const qrData = JSON.stringify({
    simulasi: "PILKADES",
    kode_suara: state.lastVote.id,
    pilihan: state.lastVote.candidateName,
    no_urut: state.lastVote.candidateId,
    waktu: state.lastVote.timestamp,
    lokasi: "DESA KARANGSARI, KEC. BINONG, SUBANG"
  });

  currentQRCode = new QRCode(qrContainer, {
    text: qrData,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
}

// Photo 6: "SIMPAN QR CODE" Button
btnSimpanQr.addEventListener("click", () => {
  sfx.playTap();
  try {
    const imgOrCanvas = qrContainer.querySelector("canvas") || qrContainer.querySelector("img");
    if (!imgOrCanvas) return;

    let dataUrl;
    if (imgOrCanvas.tagName === "CANVAS") {
      dataUrl = imgOrCanvas.toDataURL("image/png");
    } else {
      dataUrl = imgOrCanvas.src;
    }

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `QR_HASIL_PILKADES_${state.lastVote.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    alert("Gagal mengunduh QR Code: " + e.message);
  }
});

// Photo 6: "CETAK ULANG" Button
btnCetakUlang.addEventListener("click", () => {
  sfx.playTap();
  window.print();
});

// Photo 6: "KEMBALI KE AWAL" Button (Reset everything back to Photo 1)
btnKembaliAwal.addEventListener("click", () => {
  sfx.playTap();
  resetBallot();
});

function resetBallot() {
  state.selectedCandidate = null;
  cardCandidate1.classList.remove("selected");
  cardCandidate2.classList.remove("selected");
  updateCardImages();
  screenReceipt.classList.add("hidden");
  screenBallot.classList.remove("hidden");
}

// Initialize on Load
renderConfig();
