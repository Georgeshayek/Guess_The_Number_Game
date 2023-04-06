import classes from "./NumberGuess.module.css";
import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

const NumberGuess = (props) => {
  
  const [userGuess, setUserGuess] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * (10 - 1 + 1)) + 1
  );
  const [chances, setChance] = useState(3);
  const [won, setWon] = useState(2);
  const [result, setResult] = useState("");
  const [close, setClose] = useState("");

  useEffect(() => {
    if(chances===0)
  {winLost(0, "You've Lost");}
  }, [chances]);
  
  const lives=chances?`You still have ${chances} attempts left`:`unlucky it was ${randomNumber}! try again!`
  
  const resetAll = () => {
    setWon(2);
    setRandomNumber(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    setChance(3);
    setResult("");
    setUserGuess("");
    setClose("");
  };

  const winLost = (num, str) => {
    setWon(num);
    setResult(str);
    setClose("");
  };

  const checkResult = (event) => {
    event.preventDefault();

    if (!userGuess) {
      
      props.errorHandler({
        title: "Empty input",
        message: "please enter a number between 1 and 10",
      });
    } 
    else {
      if (userGuess > 10 || userGuess < 1) {
      
        props.errorHandler({
          title: "Invalid input",
          message: "number should be between 1 and 10",
        });
      } 
      else {
        if (!Number.isInteger(+userGuess)) {
          props.errorHandler({
            title: "Decimal number are not Allowed",
            message: "number should be an integer and not decimal!",
          });
        }
         else {
            +userGuess === randomNumber
              ? winLost(1, "You've Won!!")
              : reduceChances();   
        }
      }
    }
    setUserGuess("");
  };
  
  const reduceChances = () => {
    setChance((prev) => prev - 1);
    setClose(userGuess > randomNumber ? "Lower" : "Higher");
  };
  const setUserGuessHandler = (event) => {
    setUserGuess(event.target.value);
  };
  

  return (
    
      
      <Card className={classes.main_Container}>
        <h3>Guess The Number</h3>

        <div
          className={classes.Result_Container}
          style={{ color: won === 1 ? "green" : "red" }}
        >
          {result}
        </div>

        <form onSubmit={checkResult} onReset={resetAll}>
          <div className={classes.Lives_Container}>
            <p>{lives}</p>
          </div>

          <p>{close}</p>

          <label>Please Insert a number between 1 and 10</label>
          <input
            type="number"
            onChange={setUserGuessHandler}
            value={userGuess}
          />

 
          <Button type="reset" className={classes.Btn_Active}>
            Reset
          </Button>
          <Button
            type="submit"
            className={won === 2 ? classes.Btn_Active : ""}
            disabled={won !== 2}
          >
            Submit
          </Button>
        </form>
      </Card>
    
  );
};
export default NumberGuess;
