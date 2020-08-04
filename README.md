# codersX-Express-27 - Exercise 1
Sau khi đã chạy bản web một thời gian, bạn nghĩ đến việc làm app cho mobile, bạn thuê được một anh chàng làm mobile từ Silicon Valley, bạn đảm nhận phần REST API.
Hai bên lên plan và quyết định chỉ làm 2 tính năng: đăng nhập + xem các transaction.
Áp dụng kiến thức đã học ở bài REST API để tạo ra các endpoint sau:

*1. POST /api/login*
- link : http://localhost:8080/api/auth/login
- body : 
  ```json
  {
    "email" : "long@gmail.com",
    "password" : "1234567890"
  }
  ```
- result :
  ```json
  {
    "accessTokenKey": "ey...J9.eyJ...Z9.6t...B74",
    "refreshTokenKey": "ey...6J9.eyJ...fQ.5F...2A"
  }
  ```
*2. GET /api/transactions*
- link : http://localhost:8080/api/auth/login
- authorization : 
  ```json
  Bearer ey...J9.eyJ...Z9.6t...B74
  ```
- result :
  ```json
  [
    {
        "id": "5f27c2ba3e017a1e350caa6f",
        "userName": "LongLong",
        "bookTitle": "Elon Musk: Tesla, SpaceX",
        "isComplete": true
    },
    {
        "id": "5f27c2ba3e017a1e350caa70",
        "userName": "LongLong",
        "bookTitle": "Steve Jobs - Sức Mạnh Của Sự Khác Biệt",
        "isComplete": true
    }
  ]
  ```