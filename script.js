// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

const newsImage = document.getElementById("newsImage");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

reveals.forEach(el => observer.observe(el));

// Image upload
function handleImgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const preview = document.getElementById('newsImgPreview');
        const placeholder = document.getElementById('uploadPlaceholder');
        const removeBtn = document.getElementById('removeImgBtn');
        preview.src = ev.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        removeBtn.style.display = 'flex';
        document.getElementById('newsImgBox').style.border = 'none';
    };
    reader.readAsDataURL(file);
}

function removeImg(e) {
    e.stopPropagation();
    const preview = document.getElementById('newsImgPreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    const removeBtn = document.getElementById('removeImgBtn');
    const box = document.getElementById('newsImgBox');
    preview.src = '';
    preview.style.display = 'none';
    placeholder.style.display = 'block';
    removeBtn.style.display = 'none';
    box.style.border = '2px dashed var(--border)';
    document.getElementById('newsImgInput').value = '';
}

newsImage.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = newsImage.src;
});

modal.addEventListener("click", () => {
    modal.classList.remove("active");
});