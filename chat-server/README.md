src
└── main
├── java/com/example/chatapp
│ ├── config/ # 보안, CORS, WebSocket 등 설정
│ ├── controller/ # REST + WebSocket 컨트롤러
│ ├── dto/ # 요청/응답 DTO
│ ├── entity/ # JPA Entity
│ ├── repository/ # JPA Repository
│ ├── security/ # JWT 인증, 필터, 유저 인증
│ ├── service/ # 비즈니스 로직 (메시지, 채팅방, 유저 등)
│ ├── websocket/ # WebSocket 핸들러, 메시지 처리
│ └── ChatApplication.java # main 클래스
└── resources
├── application.yml
└── static/ (필요 시)
