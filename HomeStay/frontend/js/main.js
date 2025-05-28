document.addEventListener('DOMContentLoaded', () => {
    // URL API trỏ đến server Express đang chạy cục bộ
    const apiUrl = 'http://localhost:3000/api/users';

    /**
     * Hàm này thực hiện việc gọi API để lấy danh sách người dùng
     * và sau đó gọi hàm khác để hiển thị chúng lên bảng.
     */
    const fetchAndDisplayUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            
            const users = await response.json();
            displayUsersInTable(users);

        } catch (error) {
            console.error('Lỗi khi tải danh sách người dùng:', error);
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                 mainContent.innerHTML += '<p style="color:red;text-align:center; margin-top: 20px;">Không thể tải danh sách người dùng. Vui lòng đảm bảo server backend đang chạy.</p>';
            }
        }
    };

    /**
     * Hàm này nhận một mảng người dùng và hiển thị chúng
     * trong phần thân của bảng #usersTable.
     * @param {Array} users - Mảng các đối tượng người dùng.
     */
    const displayUsersInTable = (users) => {
        const tbody = document.querySelector('#usersTable tbody');
        tbody.innerHTML = ''; // Xóa các hàng cũ trước khi thêm dữ liệu mới

        if (!users || users.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3; // Gộp cả 3 cột
            td.textContent = 'Không có người dùng nào trong cơ sở dữ liệu.';
            td.style.textAlign = 'center';
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        users.forEach(user => {
            const tr = document.createElement('tr');
            
            // Sử dụng toán tử ?? để đảm bảo giá trị không phải là null/undefined
            tr.innerHTML = `
                <td>${user.name ?? 'Không có tên'}</td>
                <td>${user.email ?? 'Không có email'}</td>
                <td>${user.age ?? ''}</td>
            `;
            tbody.appendChild(tr);
        });
    };

    // Gọi hàm chính để bắt đầu quá trình lấy và hiển thị dữ liệu
    fetchAndDisplayUsers();
});