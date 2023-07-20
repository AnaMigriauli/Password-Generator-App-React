import { useState } from "react";
import classes from "./MainContainer.module.css";
import copyIcon from "../assets/images/Shape.svg";
import checkBox from "../assets/images/Group 10.svg";
import copy from "copy-to-clipboard";

function MainCotainer() {
  const [charLength, setCharLength] = useState(0);
  const [randomPassword, setRandomPassword] = useState("");
  const [isChaked, setIsChacked] = useState({
    uppercaseLetters: false,
    lowercaseLetters: false,
    number: false,
    symbol: false,
  });
  const [copyPassword, setCopyPassword] = useState(false);

  const copyToClipboard = () => {
    copy(randomPassword);

    setCopyPassword(true);
    setTimeout(() => {
      setCopyPassword(false);
    }, 5000);
  };

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const hasCharactersType = [
    /[A-Z]/,
    /[a-z]/,
    /\d/,
    /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/,
  ];
  let strength = 0;
  hasCharactersType.forEach((regex) => {
    if (regex.test(randomPassword)) {
      strength++;
    }
  });
  // console.log(randomPassword);
  console.log(strength);

  let includeUppercase = false;
  let includeLowercase = false;
  let includeNumbers = false;
  let includeSymbols = false;

  if (strength === 1) {
    includeUppercase = true;
  } else if (strength === 2) {
    includeLowercase = true;
  } else if (strength === 3) {
    includeNumbers = true;
  } else if (strength === 4) {
    includeSymbols = true;
  }

  const GeneratePassword = () => {
    let charSet = "";
    for (let i = 1; i <= charLength; i++) {
      if (isChaked.uppercaseLetters) {
        charSet += GetRendomChart(uppercaseChars);
      }
      if (isChaked.lowercaseLetters) {
        charSet += GetRendomChart(lowercaseChars);
      }
      if (isChaked.number) {
        charSet += GetRendomChart(numbers);
      }
      if (isChaked.symbol) {
        charSet += GetRendomChart(symbols);
      }
    }
    let randomPass = charSet.slice(0, charLength);

    setRandomPassword(randomPass);
  };
  function GetRendomChart(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  console.log(randomPassword);

  const handleChange = (event) => {
    if (event.target.value <= 20) {
      setCharLength(event.target.value);
    }
  };
  return (
    <div>
      <h2>Password Generator</h2>
      <div className={classes["generated-password"]}>
        <p>{randomPassword ? randomPassword : "P4$5W0rD!"}</p>
        <button onClick={copyToClipboard}>
          {copyPassword ? <span>COPIED</span> : ""}
          <img src={copyIcon} alt="copy icon" />
        </button>
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

        <div className={classes["checkbox-container"]}>
          <div>
            {!isChaked.uppercaseLetters ? (
              <div
                className={classes["check-box"]}
                onClick={() =>
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      uppercaseLetters: !isChaked.uppercaseLetters,
                    };
                  })
                }
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      uppercaseLetters: !isChaked.uppercaseLetters,
                    };
                  });
                }}
              >
                <img className={classes["check-img"]} src={checkBox} />
              </div>
            )}
            <span>Include Uppercase Letters </span>
          </div>
          <div>
            {!isChaked.lowercaseLetters ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      lowercaseLetters: !isChaked.lowercaseLetters,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      lowercaseLetters: !isChaked.lowercaseLetters,
                    };
                  });
                }}
              >
                <img className={classes["check-img"]} src={checkBox} />
              </div>
            )}
            <span>Include Lowercase Letters</span>
          </div>
          <div>
            {!isChaked.number ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      number: !isChaked.number,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      number: !isChaked.number,
                    };
                  });
                }}
              >
                <img className={classes["check-img"]} src={checkBox} />
              </div>
            )}
            <span>Include Numbers</span>
          </div>
          <div>
            {!isChaked.symbol ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      symbol: !isChaked.symbol,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChacked((prevState) => {
                    return {
                      ...prevState,
                      symbol: !isChaked.symbol,
                    };
                  });
                }}
              >
                <img className={classes["check-img"]} src={checkBox} />
              </div>
            )}
            <span>Include Symbols</span>
          </div>
        </div>

        <div className={classes["password-strength"]}>
          <span>STRENGTH</span>
          <div className={classes["password-strength-rate"]}>
            <div
              className={
                includeUppercase
                  ? classes["too-weak-password"]
                  : includeLowercase
                  ? classes["weak-password"]
                  : includeNumbers
                  ? classes.medium
                  : includeSymbols
                  ? classes.strong
                  : ""
              }
            ></div>
            <div
              className={
                includeLowercase
                  ? classes["weak-password"]
                  : includeNumbers
                  ? classes.medium
                  : includeSymbols
                  ? classes.strong
                  : ""
              }
            ></div>
            <div
              className={
                includeNumbers
                  ? classes.medium
                  : includeSymbols
                  ? classes.strong
                  : ""
              }
            ></div>
            <div className={includeSymbols ? classes.strong : ""}></div>
          </div>
        </div>

        <button className={classes.btn} onClick={GeneratePassword}>
          GENERATE
        </button>
      </div>
    </div>
  );
}

export default MainCotainer;
