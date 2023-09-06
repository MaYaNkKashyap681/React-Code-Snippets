import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Hello col="red" />
      <NewComp col="yellow" /> {/* Pass 'col' prop with 'yellow' */}
    </div>
  );
}

const WrapperComponent = (Element) => {
  return (props) => <div style = {{backgroundColor: "red"}}><Element {...props} /></div>;
};

const Hello = ({ col }) => {
  return <h1 style={{ color: col }}>Hello</h1>;
};

const NewComp = WrapperComponent(Hello);
