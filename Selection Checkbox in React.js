import React, { useState, useEffect } from "react";

const Selector = () => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (val) => {
    var currentIndex = checked.indexOf(val);
    var newArr = [...checked];

    if (currentIndex === -1) {
      newArr.push(val);
    } else {
      newArr.splice(currentIndex, 1);
    }

    setChecked(newArr);
  };

  useEffect(() => {}, [checked]);

  const list = [
    "checkbox1",
    "checkbox2",
    "checkbox3",
    "checkbox4",
    "checkbox5"
  ];

  return (
    <div
      className="selector-bg"
      style={{ background: "aliceblue", height: "100vh", margin: "20px" }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "20px"
          }}
        >
          Select List
        </h1>
        <form>
          <div style={{ padding: "20px" }}>
            {list.map((val) => (
              <div
                style={{
                  display: "flex",
                  backgroundColor: "yellowgreen",
                  padding: "10px",
                  margin: "12px"
                }}
                key={val}
              >
                <input
                  type="checkbox"
                  id={val}
                  value={val}
                  name={val}
                  onChange={() => handleToggle(val)}
                  style={{ marginRight: "10px" }}
                />
                <label for={val}>{val}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div style={{ display: "flex", backgroundColor: "gray" }}>
        {checked.map((item) => (
          <p
            key={item}
            style={{
              margin: "10px",
              color: "whitesmoke",
              border: "2px solid greenyellow",
              padding: "2px"
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Selector;
