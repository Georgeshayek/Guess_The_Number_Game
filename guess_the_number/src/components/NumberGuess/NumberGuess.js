import styler from "./NumberGuess.module.css";
import React, { useState, useEffect, Fragment } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
const NumberGuess = () => {
  const [error, setError] = useState();
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
    if (!userGuess) {
      setUserGuess("");
      setError({
        title: "Empty input",
        message: "please enter a number between 1 and 10",
      });
    } else {
      if (userGuess > 10 || userGuess < 1) {
        setUserGuess("");
        setError({
          title: "Invalid input",
          message: "number should be between 1 and 10",
        });
      } else {
        if (!Number.isInteger(+userGuess)) {
          setUserGuess("");
          setError({
            title: "Decimal number are not Allowed",
            message: "number should be an integer and not decimal!",
          });
        } else {
          if (chances === 0 && +userGuess !== randomNumber) {
            winlost(0, "You've Lost");
            setLivesLeft(`unlucky it was ${randomNumber}! try again!`);
          } else
            +userGuess === randomNumber
              ? winlost(1, "You've Won!!")
              : reduceChances();

          setUserGuess("");
        }
      }
    }
  };
  const reduceChances = () => {
    setChance((prev) => prev - 1);
    setClose(userGuess > randomNumber ? "Lower" : "Higher");
   
  };
  const setUserGuessHandler = (event) => {
    setUserGuess(event.target.value);
  };
  const dismiss = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && (
        <ErrorModal
          message={error.message}
          title={error.title}
          dismiss={dismiss}
        />
      )}
      <Card className={styler.main_Container}>
        <h3>Guess The Number</h3>

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

          <p>{close}</p>

          <label>Please Insert a number between 1 and 10</label>
          <input
            type="number"
            onChange={setUserGuessHandler}
            value={userGuess}
          />

          <Button
            type="submit"
            className={won === 2 ? styler.Btn_Active : ""}
            disabled={won !== 2}
          >
            Submit
          </Button>
          <Button type="reset" className={styler.Btn_Active}>
            Reset
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};
export default NumberGuess;
