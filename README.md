# React + TypeScript + Vite

## useReducer: An Alternative to useState

### What is useReducer?

![Reducer Concept](https://react.dev/images/docs/reducer.svg)

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

