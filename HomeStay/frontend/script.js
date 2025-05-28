// js/script.js

// JavaScript cho Gallery (Modal và Filter)
// Modal script
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");

function openModal(imgSrc) {
  modal.style.display = "block";
  modalImg.src = imgSrc.replace(/"/g, ""); // Remove quotes from src
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Filter links functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterLinksContainer = document.querySelector('.gallery-filter-links'); // Thêm class này vào div chứa các link filter
    if (filterLinksContainer) {
        const filterLinks = filterLinksContainer.querySelectorAll('a');
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item'); // Các item trong gallery

        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent page jump

                filterLinks.forEach(l => {
                    l.classList.remove('active-filter');
                    l.classList.add('inactive-filter');
                });
                this.classList.add('active-filter');
                this.classList.remove('inactive-filter');

                const filterCategory = this.querySelector('p').textContent.toLowerCase();

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category').toLowerCase();
                    if (filterCategory === 'all' || itemCategory === filterCategory) {
                        item.style.display = ''; // Show item
                    } else {
                        item.style.display = 'none'; // Hide item
                    }
                });
            });
        });
    }
});

// JavaScript cho Header (Responsive Menu - Example)
// Đây là một ví dụ cơ bản cho menu responsive.
// Bạn cần thêm nút hamburger menu vào HTML của header để nó hoạt động.
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle'); // Class cho nút hamburger
    const mainNav = document.querySelector('header nav'); // Thẻ nav trong header

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('hidden'); // Hoặc 'block' tùy thuộc vào CSS của bạn
            // Hoặc toggle một class khác để thay đổi style display (vd: 'flex-col' cho menu dọc)
            mainNav.classList.toggle('flex-col');
            mainNav.classList.toggle('absolute'); // Đặt menu tuyệt đối để nổi lên
            mainNav.classList.toggle('top-full');
            mainNav.classList.toggle('left-0');
            mainNav.classList.toggle('w-full');
            mainNav.classList.toggle('bg-white');
            mainNav.classList.toggle('shadow-md');
            mainNav.classList.toggle('py-4');
        });

        // Đóng menu khi click ra ngoài (hoặc khi click vào một link)
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !mainNav.contains(event.target)) {
                if (!mainNav.classList.contains('hidden')) {
                     mainNav.classList.add('hidden');
                     mainNav.classList.remove('flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white', 'shadow-md', 'py-4');
                }
            }
        });
    }
});