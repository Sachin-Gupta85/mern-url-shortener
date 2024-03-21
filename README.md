# 🔗 mern-url-shortener — link shortener (MERN + Python)

> Shorten URLs with optional custom codes and count clicks via a redirect endpoint. **React** + **Express** + **MongoDB**, with a **Python** base62 codec and a cross-stack test harness.

![React](https://img.shields.io/badge/React-18-61dafb)
![Express](https://img.shields.io/badge/Express-4-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248)
![Tests](https://img.shields.io/badge/tests-jest%20%2B%20pytest%20%2B%20vitest-brightgreen)

## ✨ Features
- Create short links (random or custom code); `GET /r/:code` 302-redirects and
  atomically increments a **click counter**.
- Validates `http(s)` targets and rejects duplicate codes (409).
- **Python companion** (`pytools/shortcode.py`): a base62 id↔code codec with a
  round-trip property test (pytest).
- Express API tested with Jest + mongodb-memory-server.

## 🚀 Run
```bash
docker compose up --build
cd client && npm install && npm run dev
```

## ✅ Test
```bash
./run_harness.sh      # jest (5) + pytest (3) + vitest (1)
```

## 🔌 API
`GET /api/urls` · `POST /api/urls` · `GET /api/urls/{code}` ·
`DELETE /api/urls/{id}` · `GET /r/{code}` (redirect)

## 📝 License
MIT — see [LICENSE](LICENSE).
