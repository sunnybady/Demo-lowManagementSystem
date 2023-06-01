import React, { Component, useContext, createContext, useReducer } from "react";

const data = {
  title: "我是context",
  num: 3,
  age: "18",
};

const DataContext = createContext(data);

const states = {
  count: 1,
  name: "张三+++++",
  age: 25,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add":
      return { ...state, count: state.count + 1 };
    case "desc":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
const Son = () => {
  const { title } = useContext(DataContext);
  return <div>11{title}</div>;
};

const Test1 = () => {
  const [state, dispatch] = useReducer(reducer, states);
  return (
    <div>
      test1
      {state.count}
      <DataContext.Provider value={{ ...data }}>
        <Son></Son>
      </DataContext.Provider>
      <button
        onClick={() => {
          dispatch({ type: "add" });
        }}
      >
        加
      </button>
      <button
        onClick={() => {
          dispatch({ type: "desc" });
        }}
      >
        减
      </button>
    </div>
  );
};

export default Test1;
