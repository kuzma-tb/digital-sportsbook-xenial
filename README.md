# Digital Sportsbook — Home Task

A simplified sports betting web app built with **React**, **Redux**, **Bootstrap**, and **WebSockets**.
Users can place bets, manage their balance, receive real-time odds updates, and enjoy responsive optimized images.

---

## Getting Started

### 1. Install dependencies
```sh
npm install
```

---

### 2. Optimize images (optional but recommended)

Optimizes all images in `public/img` into responsive **.webp** versions with **small**, **medium**, and **large** breakpoints.

```sh
npm run optimize-images
```

> **Note**: If this step is skipped, the homepage will display an alert asking to run the optimizer.

---

### 3. Start the development server

```sh
npm run start
```
App runs at: http://localhost:3000

---

### 4. Start the WebSocket server (for real-time odds)

```sh
npm run wss
```

WebSocket server runs on port 8080 and pushes updated odds every 10 seconds.

---

## Implemented Tasks

### 1. Fix: Balance not updating after placing a bet
  - Balance is now correctly reduced by total stake when a bet is placed
  - Selections are cleared after submission

### 2. Improve: SelectionButton toggling
  - Clicking a selected button removes it from the Betslip
  - Button state reflects active/inactive selection
  - UX consistent and intuitive

### 3. WebSocket odds updates
  - WebSocket server (scripts/websocket-server.js) sends random odds every 10s
  - Client (OddsWebSocketListener.jsx) listens globally
  - Redux store is updated in real-time
  - Betslip reflects updated odds live

### 4. Responsive Image Optimization (optional)
  - Script: scripts/optimize-images.js
  - Uses sharp to generate .webp variants (small, medium, large)
  - Deletes original .jpg, .png, .webp files after conversion
  - Generates optimized.json to verify completeness
  - Homepage displays alert if images are missing
