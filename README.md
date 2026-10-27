# ⛅ SkyPulse Weather (실시간 날씨 및 주간 예보)

Open-Meteo의 공개 기상 API를 기반으로 전 세계 및 대한민국 모든 시·군·구의 실시간 날씨, 체감 기온, 상세 기상 지표(습도, 풍향/풍속, 강수량, 자외선 지수, 기압), 24시간 시간별 예보 및 7일 주간 일기예보를 제공하는 반응형 웹 애플리케이션입니다.

![SkyPulse Weather App](https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&auto=format&fit=crop&q=80)

## ✨ 주요 기능

- **별도 API 키 없는 100% 무료 공개 API 연동**: [Open-Meteo](https://open-meteo.com/) Forecast API 사용
- **전국 203개 시·군·구 행정구역 완벽 지원**: 서울, 부산, 대구 등 대도시는 물론 익산, 김제, 군산, 정읍, 남원 등 모든 지방 자치단체 0ms 즉각 검색
- **한글 자동 로마자 변환(Romanization)**: 사전에 없는 작은 읍/면/동이나 해외 도시 검색 시 자동 음절 변환 후 한국/글로벌 지오코딩 수행
- **날씨 상태별 동적 테마 & 파티클**: 맑음(낮/밤), 흐림, 비, 눈, 뇌우, 안개 등 날씨 상태에 따른 부드러운 배경 그라데이션 및 비/눈 파티클 애니메이션
- **주요 기상 지표 카드**: 체감 온도, 습도(프로그레스 바), 풍속 및 실시간 풍향 나침반, 강수량, 자외선 지수(UV 단계별 색상), 대기압
- **AI 라이프스타일 날씨 조언**: 기온, 풍속, 강수 상태를 분석하여 우산 챙기기, 옷차림 추천 등 맞춤 팁 제공
- **24시간 시간별 예보**: 시간대별 기온 변화 및 강수 확률 가로 스크롤 카드
- **7일 주간 일기예보**: 애플 날씨 스타일의 직관적인 최저/최고 기온 컬러 범위 바
- **편의 기능**: 섭씨(°C) ↔ 화씨(°F) 즉각 토글, 브라우저 GPS 기반 내 위치 조회, 최근 검색 기록 관리
- **반응형 글래스모피즘 UI**: 모바일, 태블릿, 데스크톱 모든 해상도 지원

## 🚀 로컬 실행 방법

별도의 복잡한 설치 없이 Node.js만 있으면 바로 구동 가능합니다.

```bash
# 로컬 개발 서버 실행
npm start
# 또는
node server.js
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 🛠️ 기술 스택

- **Frontend**: Semantic HTML5, Modern Vanilla CSS (Glassmorphism), Vanilla JavaScript (ES6+)
- **API**: [Open-Meteo Forecast & Geocoding API](https://open-meteo.com/), [BigDataCloud Reverse Geocoding](https://www.bigdatacloud.net/)
- **Deployment**: Vercel

## 📄 라이선스

MIT License. 누구나 자유롭게 사용 및 수정할 수 있습니다.
