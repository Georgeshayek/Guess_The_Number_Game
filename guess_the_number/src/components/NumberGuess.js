import styler from "./NumberGuess.module.css";
import React, { useState, useEffect } from "react";
const NumberGuess = () => {
  const [userGuess, setUserGuess] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * (10 - 1 + 1)) + 1
  );
  const [chances, setChance] = useState(2);
  const [won, setWon] = useState(2);
  const [result, setResult] = useState("");
  const [livesleft, setLivesLeft] = useState();
  const [close, setClose] = useState("");
  useEffect(() => {
    setLivesLeft(`You still have ${chances + 1} attempts left`);
  }, [chances]);
  const resetall = () => {
    setWon(2);
    setRandomNumber(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    setChance(2);
    setResult("");
    setUserGuess("");
    setLivesLeft("You still have 3 attempts left");
    setClose("");
  };
  const winlost = (num, str) => {
    setWon(num);
    setResult(str);
    setClose("");
  };
  const checkResult = (event) => {
    event.preventDefault();
    if (chances === 0 && +userGuess !== randomNumber) {
      winlost(0, "You've Lost");
      setLivesLeft(`unlucky it was ${randomNumber}! try again!`);
    } else
      +userGuess === randomNumber
        ? winlost(1, "You've Won!!")
        : reduceChances();

    setUserGuess("");
  };
  const reduceChances = () => {
    setChance((prev) => prev - 1);
    setClose(userGuess > randomNumber ? "Lower" : "Higher");
    setLivesLeft(`you still have ${chances} attempts left`);
  };
  const setUserGuessHandler = (event) => {
    setUserGuess(event.target.value);
  };
  return (
    <div className={styler.main_Container}>
      <div className={styler.title_Container}>
        <h3>Guess The Number</h3>
      </div>
      <div
        className={styler.Result_Container}
        style={{ color: won === 1 ? "green" : "red" }}
      >
        {result}
      </div>

      <form onSubmit={checkResult} onReset={resetall}>
        <div className={styler.Lives_Container}>
          <p>{livesleft}</p>
        </div>
        <div className={styler.HighLow_Container}>
          <p>{close}</p>
          <div className={styler.Input_Container}>
            <label>Please Insert a number between 1 and 10</label>
            <input
              type="number"
              min="1"
              max="10"
              onChange={setUserGuessHandler}
              value={userGuess}
              required
            />
          </div>
        </div>

        <button type="submit" className={won === 2?styler.Btn_Active:''} disabled={won !== 2}>
          Submit
        </button>
        <button type="reset" className={styler.Btn_Active}>Reset</button>
      </form>
    </div>
  );
};
export default NumberGuess;
