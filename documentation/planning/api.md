# API Template

_What endpoints and data contracts are needed for the MVP?_

---

## Endpoints

- `GET /api/flights`: Search for flights (uses AviationStack or similar API).
  - Params: origin, destination, date, sort (price/airline)
- `POST /api/auth/register`: Create basic user account (username & password only)
- `POST /api/auth/login`: Authenticate user
- `GET /api/auth/me`: Get current logged-in user info
- `GET /api/destinations`: Browse featured/popular destinations
- `POST /api/search`: Save a user’s search (optional for MVP)

---

## Data Contracts

- **Flight Result**
  - airline, flight number, origin, destination, departure/arrival time, price

- **User**
  - id, username, password (hashed), createdAt

- **Search**
  - id, user_id, origin, destination, date

---

_Match your backend routes and frontend queries to these contracts. Expand as needed with new features._
