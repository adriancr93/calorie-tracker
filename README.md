React + TypeScript + Vite
useReducer: An Alternative to useState
What is useReducer?

useReducer is a React Hook that lets you add a reducer to your component.

The useReducer hook is an alternative to useState that is often used for handling more complex state logic.

While useState is perfect for simple state management, useReducer is better suited when:

The new state depends on the previous state.

There are multiple sub-values to manage.

Conditional or complex state transitions are involved.

Syntax

The useReducer hook takes two arguments:

Reducer → A function that takes the current state and an action, then returns the new state.

Initial State → The starting state value.

const [state, dispatch] = useReducer(reducer, initialState);

Key Terminology in useReducer

When working with reducers, you’ll come across a few common terms:

state → The current value of the state managed by the reducer.

initialState → The starting state when the reducer is first created. (Similar to the initial value in useState.)

actions → Objects that describe what should happen. They contain the logic for updating the state.

payload → The data passed along with an action to update the state.

dispatch → The function used to send (or “dispatch”) an action with its payload to the reducer.