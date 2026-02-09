# 🧃 Reduxish

A tiny, fully-typed Redux-inspired state management library with **store enhancement/plugin support for functionality such as thunking, logging, etc with full type inference on the enhanced store.** Complies with flux architecture and fully compatible with react-redux bindings.

---

## ✨ Features

### 🏪 Store Creation

Create a store with a **strongly‑typed state**, a **typed dispatch**, and a **simple subscription model**.

#### 🧩 Combine Reducers
Split your state into logical slices and merge them into a single root reducer.
- Store root state shape is automatically inferred from slices


---

### 🧠 Middleware Support

Intercept actions before they hit your reducers.

Perfect for:

- logging
- thunking/async flows
- side‑effects
- analytics

Middlewares are:

- composable
- fully typed

Use ```applyMiddleware``` utility to compose middlewares. This utility also infers the dispatch extensions applied by the middleware via ```InferDispatchExtensionsFromMiddlewareArray``` recursive helper type (caveat: middlewares should be defined as a tuple for inference to work)

##### Create store example with sotre enhancment/middelware support:
```
const middlewares = [resolveMiddleware, loggerMiddleware] as const;
const store = createStore(
  todoApp,
  {
    todos: []
  },
  applyMiddleware(middlewares),
);
```

---

### ⚛️ Using with React?

Continue using your usual react-redux hook bindings, no changes required!

- useDispatch, useSelector all work out of the box
- use typed versions of hooks by using our inferred types with react-redux "withTypes" utility
  - i.e
  ```
    type AppDispatch = typeof store.dispatch
    type RootState = ReturnType<typeof store.getState>
    export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
    export const useAppSelector = useSelector.withTypes<RootState>()
  ```
---

## 📦 Installation

```bash
npm install @kashcode/reduxish
```
---

#### 📦 Note: this is a hobby project (not for production use). It is primarily to illustrate the simplicity of building a "redux" implementation from scratch