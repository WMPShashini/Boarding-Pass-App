# QR Scan Server

Run locally:

```
cd server
npm install
cp .env.example .env
# edit .env to set MONGO_URI if needed
npm run dev
```

API:
- `GET /api/countries` - list countries
- `GET /api/countries/:code` - single country
- `GET /api/scan?code=US` - simulate scanning QR code
