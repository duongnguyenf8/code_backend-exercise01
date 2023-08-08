# Chữa bài tập về nhà: backend-exercise01

---

## Folder chính:

Folder **views**: Được sử dụng để lưu trữ tất cả các file phía client.

Folder **server**: Được sử dụng để lưu trữ file chạy chính của NodeJS.

Folder **data**: Được sử dụng để lưu, thêm, sửa, xóa data cần hiển thị.

Folder **modal**: Được sử dụng để chia các controller hợp lý theo từng tác vụ.

Folder **controllers**: Được sử dụng để viết các hàm xử lý theo từng modal.

---

## Folder Views

**index.html**: File code HTML của trang chủ, trang chính:

- `{ten_bien}`: Chứa tên biến trùng với tên biến trong file `data/json`.

- `(ten_the)`: Chứa tên thẻ được thêm vào.

- `(ten_the.className)`: Sau dấu chấm là className của thẻ đó.

- Ví dụ:
  ```html
  <!-- Code trong file html -->
  <div class="array">{address}(p.array-attr)</div>
  <!-- Sau khi chạy: -->
  <div class="array">
    <p class="array-attr">
      <!-- Thông tin của address -->
    </p>
    <p class="array-attr">
      <!-- Thông tin của address nếu còn -->
    </p>
    <p class="array-attr">
      <!-- Thông tin của address nếu còn nữa -->
    </p>
  </div>
  ```

---

## Folder server

**index.js**: File code js chạy server chính của dự án:

- **http**: Sử dụng để khởi tạo server ở port 3000.

- **url**: Sử dụng để lấy được pathname một cách nhanh chóng.

- **data**: Dữ liệu từ file `data/json`.

- **`{html, assets}`**: 2 modal để xử lý 2 tác vụ:

  Xử lý file `html` và gửi file `assets`.

**Luồng chạy:**

1. Check xem có phải phương thức `GET` không.

   Nếu không thì in ra: Phương thức không được hỗ trợ.

   Nếu có thì sang bước 2.

2. Check pathname xem có gọi tới `trang chủ` hay `assets/*` không.

   Nếu không, trả về **`404`** Not Found.

   Nếu có thì sang bước 3.

3. Kiểm tra pathname xem vào trường hợp nào

   Nếu vào trường hợp `'/'` thì gọi hàm html.

   Nếu vào trường hợp `'assets'` thì gọi hàm assets.
