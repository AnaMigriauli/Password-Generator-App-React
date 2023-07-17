import { useState } from "react";
import classes from "./MainContainer.module.css";
import copyIcon from "../assets/images/Shape.svg";

function MainCotainer() {
  const [charLength, setCharLength] = useState(0);
  const [randomChar, setRandomChar] = useState("");

  console.log(charLength);
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const AddUppercaseLetters = () => {
    setRandomChar((prevState) => {
      return prevState ? prevState + uppercaseChars : uppercaseChars;
    });
  };
  const AddLowercaseLetters = () => {
    setRandomChar((prevState) => {
      return prevState ? prevState + lowercaseChars : lowercaseChars;
    });
  };
  const AddNumbers = () => {
    setRandomChar((prevState) => {
      return prevState ? prevState + numbers : numbers;
    });
  };

  const AddSymbols = () => {
    setRandomChar((prevState) => {
      return prevState ? prevState + symbols : symbols;
    });
  };
  console.log(randomChar);
  let password = "";
  for (let i = 1; i <= charLength; i++) {
    const randompass =
      randomChar[Math.floor(Math.random() * randomChar.length)];
    password += randompass;
  }
  console.log(password);

  const handleChange = (event) => {
    if (event.target.value <= 20) {
      setCharLength(event.target.value);
    }
  };
  return (
    <div>
      <h2>Password Generator</h2>
      <div className={classes["generated-password"]}>
        <p>P4$5W0rD!</p>
        <img src={copyIcon} alt="copy icon" />
      </div>
      <div className={classes["password-generator"]}>
        <div className={classes["character-length"]}>
          <span>Character Length</span>
          <div>{charLength}</div>
        </div>
        <input
          className={classes["input-range"]}
          type="range"
          min="0"
          max="20"
          value={charLength}
          onChange={handleChange}
        ></input>

        <div>
          <div>
            <input type="checkbox" onClick={AddUppercaseLetters}></input>
            <span>Include Uppercase Letters </span>
          </div>
          <div>
            <input type="checkbox" onClick={AddLowercaseLetters}></input>
            <span>Include Lowercase Letters</span>
          </div>
          <div>
            <input type="checkbox" onClick={AddNumbers}></input>
            <span>Include Numbers</span>
          </div>
          <div>
            <input type="checkbox" onClick={AddSymbols}></input>
            <span>Include Symbols</span>
          </div>
        </div>

        <div>
          <span>STRENGTH</span>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <button>GENERATE</button>
      </div>
    </div>
  );
}

export default MainCotainer;
