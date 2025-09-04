# useReducer: An Alternative to useState

## What is useReducer?

**useReducer** is a React Hook that lets you add a reducer to your component.

The `useReducer` hook is an alternative to `useState` that is often used for handling **more complex state logic**.

While `useState` is perfect for simple state management, `useReducer` is better suited when:
- The new state depends on the previous state.
- There are multiple sub-values to manage.
- Conditional or complex state transitions are involved.

---

### Syntax

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

![useReducer Syntax](https://dummyimage.com/600x200/000/fff&text=useReducer+Syntax)

---

### Key Terminology in useReducer

When working with reducers, you’ll come across a few common terms:

| Term           | Description |
|----------------|-------------|
| **state**      | The current value of the state managed by the reducer. |
| **initialState** | The starting state when the reducer is first created. (Similar to the initial value in `useState`.) |
| **actions**    | Objects that describe what should happen. They contain the logic for updating the state. |
| **payload**    | The data passed along with an action to update the state. |
| **dispatch**   | The function used to send (or "dispatch") an action with its payload to the reducer. |

---

### Reducer Flow Diagram

![Reducer Flow](https://dummyimage.com/800x400/1e293b/ffffff&text=dispatch+→+reducer+→+new+state)

---

### Example: Counter Reducer

```tsx
import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

---

### Visual Explanation

1. **dispatch(action)** → Triggers the reducer function.  
2. **reducer(state, action)** → Determines the new state based on the action.  
3. **React re-renders** → The component updates with the new state.  

---

✅ This makes `useReducer` a powerful tool when dealing with **complex state transitions** in React applications.

---

# Other Essential React Hooks

## useState

**useState** is the most basic React Hook for adding state to functional components.

### Syntax
```tsx
const [state, setState] = useState(initialValue);
```

### Example: Simple Counter
```tsx
import { useState } from "react";

export default function SimpleCounter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

---

## useEffect

**useEffect** lets you perform side effects in your components (data fetching, subscriptions, etc).

### Syntax
```tsx
useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [dependencies]);
```

### Example: Fetch Data on Mount
```tsx
import { useEffect, useState } from "react";

export default function FetchData() {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => res.json())
      .then((json) => setData(JSON.stringify(json)));
  }, []);
  return <pre>{data}</pre>;
}
```

---

## useMemo

**useMemo** memoizes expensive calculations so they only run when dependencies change.

### Syntax
```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Example: Expensive Calculation
```tsx
import { useState, useMemo } from "react";

function expensiveCalculation(num: number) {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num * Math.random();
  }
  return result;
}

export default function MemoExample() {
  const [number, setNumber] = useState(1);
  const memoizedResult = useMemo(() => expensiveCalculation(number), [number]);
  return (
    <div>
      <input type="number" value={number} onChange={e => setNumber(Number(e.target.value))} />
      <p>Result: {memoizedResult}</p>
    </div>
  );
}
```

---

## useCallback

**useCallback** memoizes functions so they don’t get recreated on every render.

### Syntax
```tsx
const memoizedCallback = useCallback(() => {
  // function body
}, [dependencies]);
```

### Example: Memoized Event Handler
```tsx
import { useState, useCallback } from "react";

export default function CallbackExample() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);
  return <button onClick={increment}>Count: {count}</button>;
}
```

---

## Custom Hooks

**Custom hooks** let you extract and reuse logic across components.

### Example: useWindowWidth
```tsx
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function WindowWidthDisplay() {
  const width = useWindowWidth();
  return <div>Window width: {width}px</div>;
}
```

---

## Visual Summary

| Hook         | Purpose                                   |
|--------------|-------------------------------------------|
| useState     | Add state to components                   |
| useReducer   | Complex state logic                       |
| useEffect    | Side effects (fetch, subscriptions, etc.) |
| useMemo      | Memoize expensive calculations            |
| useCallback  | Memoize functions                         |
| Custom Hook  | Reusable logic                            |

---

✨ **Combine these hooks to build awesome, efficient React apps!**

