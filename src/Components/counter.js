import React, { useEffect, useState } from "react";
import { getCounter, putCounter } from "../Function Calls/backend";
import Symbol from "./symbol";

import "./counter.css";

require("dotenv").config();
const maxCounter = process.env.REACT_APP_MAX_VALUE || 1000;

const Counter = () => {
  const [info, setInfo] = useState({
    counter: 1,
    loading: false,
    error: "",
  });

  const { counter, loading, error } = info;

  useEffect(() => {
    getCounter()
      .then((data) => {
        if (data.error) {
          setInfo({ ...info, error: data.error, loading: false });
        } else {
          setInfo({
            ...info,
            error: "",
            loading: false,
            counter: data.counter ? data.counter : 1,
          });
        }
      })
      .catch((err) => console.log("Get Error", err));
  }, []);

  const loadingMessage = () => {
    return (
      <div className="msg" style={{ display: loading ? "block" : "none" }}>
        <p>Saving counter value...</p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="msg" style={{ display: error ? "block" : "none" }}>
        <p>{error}</p>
      </div>
    );
  };

  const counterValue = () => {
    return (
      <div id="cInfo">
        <p>Counter Value : {counter}</p>
      </div>
    );
  };

  const helpPutCounter = (temp) => {
    let body = {
      Pratik: parseInt(counter) + temp,
    };

    putCounter(body)
      .then((data) => {
        if (data.error) {
          setInfo({
            ...info,
            loading: false,
            error: data.error,
          });
        } else {
          setInfo({
            ...info,
            error: "",
            loading: false,
            counter: parseInt(counter) + temp,
          });
        }
      })
      .catch((err) => console.log("Get Error", err));
  };

  const increment = () => {
    setInfo({ ...info, loading: true });
    if (counter + 1 > maxCounter) {
      setInfo({
        ...info,
        loading: false,
        error: "Counters maximum value reached!",
      });
    } else {
      helpPutCounter(1);
    }
  };

  const decrement = () => {
    setInfo({ ...info, error: "", loading: true });
    helpPutCounter(-1);
  };

  return (
    <div className="fullPage">
      <div className="main">
        {errorMessage()}
        {loadingMessage()}
        <div className="counter">
          {/* <Symbol symbol={"+"} id="plus" /> */}
          <div className="btn" id="minus" onClick={decrement}>
            <p>-</p>
          </div>
          <div className="btn">
            <input
              value={counter}
              id="ipt"
              type="number"
              autoFocus="on"
              onChange={(event) => {
                setInfo({ ...info, counter: event.target.value });
              }}
              //   onBlur={helpPutCounter(0)}
            />
          </div>
          {/* <Symbol symbol={"-"} id="plus" /> */}

          <div className="btn" id="plus" onClick={increment}>
            <p>+</p>
          </div>
        </div>
        {counterValue()}
      </div>
    </div>
  );
};

export default Counter;
