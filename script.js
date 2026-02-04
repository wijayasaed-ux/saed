// ====== AMBIL NAMA TAMU DARI URL ======
// contoh link: index.html?to=Saed%20Wijaya
const params = new URLSearchParams(window.location.search);
const to = params.get("to");
if(to){
  document.getElementById("toName").innerText = decodeURIComponent(to);
}

// ====== OPEN UNDANGAN + MUSIC ======
const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

openBtn.addEventListener("click", () => {
  cover.style.display = "none";
  mainContent.classList.remove("hidden");

  music.play().then(() => {
    musicPlaying = true;
    musicBtn.style.display = "block";
    musicBtn.innerText = "🔊";
  }).catch(() => {
    musicBtn.style.display = "block";
    musicBtn.innerText = "🔇";
  });
});

// tombol musik
musicBtn.addEventListener("click", () => {
  if(!musicPlaying){
    music.play();
    musicPlaying = true;
    musicBtn.innerText = "🔊";
  }else{
    music.pause();
    musicPlaying = false;
    musicBtn.innerText = "🔇";
  }
});

// ====== COUNTDOWN ======
const weddingDate = new Date("2026-05-12T08:00:00").getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if(distance < 0){
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2,"0");
  document.getElementById("hours").innerText = String(hours).padStart(2,"0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2,"0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2,"0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ====== RSVP KE WHATSAPP ======
document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const status = document.getElementById("status").value;
  const jumlah = document.getElementById("jumlah").value;
  const pesan = document.getElementById("pesan").value.trim();

  const nomorWA = "6281234567890"; // GANTI NOMOR WA PANITIA

  const text =
`Halo, saya *${nama}* mau konfirmasi kehadiran undangan.

📌 Status: *${status}*
👥 Jumlah: *${jumlah}* orang
💬 Pesan: ${pesan ? pesan : "-"}

Terima kasih 🙏`;

  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// ====== UCAPAN & DOA (SIMPAN DI LOCAL STORAGE) ======
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");

function loadWishes(){
  const data = JSON.parse(localStorage.getItem("wishes") || "[]");
  wishList.innerHTML = "";
  data.reverse().forEach(item => {
    const div = document.createElement("div");
    div.className = "wish-item";
    div.innerHTML = `<b>${item.name}</b><p>${item.text}</p>`;
    wishList.appendChild(div);
  });
}

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("wishName").value.trim();
  const text = document.getElementById("wishText").value.trim();

  const data = JSON.parse(localStorage.getItem("wishes") || "[]");
  data.push({name, text});
  localStorage.setItem("wishes", JSON.stringify(data));

  wishForm.reset();
  loadWishes();
});

loadWishes();
