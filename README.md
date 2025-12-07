# NurseOnCall — Full Stack (Node + MongoDB + React)

What this delivers
- Backend: Node.js + Express + Mongoose (MongoDB)
  - Auth scaffolding (JWT + email/password)
  - Nurse model + availability
  - Request endpoints (create request, list requests)
  - Simple notification hooks (Twilio + SendGrid placeholders)
  - Seed script to create sample nurses
- Frontend: React SPA
  - Request flow UI (patient info, geolocation, date/time)
  - Map view using Leaflet/OpenStreetMap (basic)
  - Lists available nurses filtered by distance & availability
  - Request submission (POST to backend)
- Dev convenience: env examples and scripts

Run locally (quick start)
1. Prerequisites
   - Node.js >= 18, npm
   - MongoDB running locally or use MongoDB Atlas
2. Clone files and open a terminal in project root
3. Backend
   - cd backend
   - cp .env.example .env and set MONGO_URI, JWT_SECRET, optionally TWILIO/EMAIL settings
   - npm install
   - npm run seed   # creates sample nurses
   - npm run dev    # starts server on PORT (default 4000)
4. Frontend
   - cd frontend
   - npm install
   - npm start      # starts React dev server (default 3000)
5. Open http://localhost:3000 and test the flow

Environment variables (.env)
- MONGO_URI - MongoDB connection string
- JWT_SECRET - secret for signing JWTs
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM - optional for SMS
- SENDGRID_API_KEY, EMAIL_FROM - optional for email

Notes & next steps
- Notifications: Twilio and SendGrid integration are provided as placeholders; add credentials to enable real SMS/email.
- Timezones and scheduling: currently availability is hourly slot based and stored as ISO local strings. For production, convert to timezone-aware ranges (use luxon).
- Authentication: Account creation and verification flows are scaffolded. Add proper password reset, nurse verification, and admin UI.
- Security: Add rate-limiting, input sanitization, HTTPS (TLS), and additional validation.
- Deploy: Use MongoDB Atlas + Render/Heroku/DO/Vercel for frontend. I can provide deployment configuration if you want.

If you'd like, I can:
- Push this repo to GitHub (give owner/repo).
- Add production-ready infra (Docker, GitHub Actions, staging deploy).
- Replace slot-based availability with calendar sync (Google Calendar).
- Implement OTP phone verification using Twilio.

Tell me if you want me to push this to GitHub, tell me the repository owner/name (format owner/repo). I already have the repo provided by the user.
