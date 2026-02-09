# 🧃 Tiny State, Big Vibes

A **custom, fully‑typed, Redux‑ish state management library** for people who like their global state **predictable**, **type‑safe**, and **a little bit fun**.

Think Redux, but:

- smaller
- friendlier
- aggressively typed
- and not afraid to smile

---

## ✨ Features

### 🏪 Store Creation

Create a store with a **strongly‑typed state**, a **typed dispatch**, and a **simple subscription model**.

- `dispatch(action)` – sends actions through reducers & middleware
- `subscribe(listener)` – react to state changes
- `getState()` – read the current state safely

All fully inferred from your reducers. No `any`. No guessing.

---

### 🧩 Combine Reducers

Split your state into logical slices and merge them into a single root reducer.

- Each reducer owns its slice
- State shape is automatically inferred
- Action unions flow through cleanly

Your root state type is built for you. Like magic, but TypeScript.

---

### 🧠 Middleware Support

Intercept actions before they hit your reducers.

Perfect for:

- logging
- async flows
- side‑effects
- analytics
- chaos (controlled chaos)

Middlewares are:

- composable
- ordered
- fully typed from `dispatch` to `next`

---

### ⚛️ React Integration Utilities

Opt‑in React bindings for modern React apps.

Includes helpers for:

- subscribing components to store updates
- selecting slices of state efficiently
- avoiding unnecessary re‑renders

Works great with function components, hooks, and strict mode.

No class components were harmed in the making of this library.

---

## 📦 Installation

```bash
npm install tiny-state-big-vibes
```

or if you’re feeling spicy:

```bash
pnpm add tiny-state-big-vibes
```