const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

canvas.width = 400;
canvas.height = 600;

let score = 0;
let catX = 180;
const catWidth = 50;
let items = [];

// Kontrol Kucing
// Kontrol Kucing dengan Keyboard (Tetap ada buat cadangan)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && catX > 0) catX -= 30;
    if (e.key === "ArrowRight" && catX < canvas.width - catWidth) catX += 30;
});

// FITUR BARU: Kontrol Kucing dengan Mouse / Kursor
canvas.addEventListener("mousemove", (e) => {
    // Menghitung posisi kursor relatif terhadap canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Membuat posisi kucing tepat di tengah kursor
    catX = mouseX - (catWidth / 2);

    // Batasan agar kucing tidak keluar canvas
    if (catX < 0) catX = 0;
    if (catX > canvas.width - catWidth) catX = canvas.width - catWidth;
});

function createItem() {
    const x = Math.random() * (canvas.width - 30) + 15;
    items.push({ x: x, y: 0 });
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Gambar Leher/Badan (Makin panjang sesuai skor)
    ctx.fillStyle = "#FFD700"; 
    let neckHeight = 50 + (score * 2); // Leher nambah panjang tiap skor naik
    ctx.fillRect(catX + 15, canvas.height - neckHeight, 20, neckHeight);

    // 2. Gambar Kepala Kucing (Emoji)
    ctx.font = "50px serif";
    ctx.textAlign = "center";
    ctx.fillText("🐱", catX + (catWidth / 2), canvas.height - neckHeight);

    // 3. Update & Gambar Makanan (Ikan)
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item.y += 4; // Kecepatan jatuh

        ctx.fillText("🐟", item.x, item.y);

        // Cek jika tertangkap kepala kucing
        if (item.y > canvas.height - neckHeight - 20 && 
            item.y < canvas.height - neckHeight + 20 &&
            item.x > catX && item.x < catX + catWidth) {
            items.splice(i, 1);
            score += 10;
            scoreElement.innerText = score;
        }

        // Hapus jika lewat bawah
        if (item.y > canvas.height) items.splice(i, 1);
    }

    requestAnimationFrame(drawGame);
}

setInterval(createItem, 1200);
drawGame();