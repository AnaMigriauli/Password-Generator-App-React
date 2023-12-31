import { useState } from "react";
import classes from "./MainContainer.module.css";
import checkBox from "../assets/images/Group 10.svg";
import copy from "copy-to-clipboard";

function MainCotainer() {
  const [charLength, setCharLength] = useState(0);
  const [randomPassword, setRandomPassword] = useState("");
  const [isCheked, setIsChecked] = useState({
    uppercaseLetters: false,
    lowercaseLetters: false,
    number: false,
    symbol: false,
  });
  const [copyPassword, setCopyPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });

  const copyToClipboard = () => {
    copy(randomPassword);

    setCopyPassword(true);
    setTimeout(() => {
      setCopyPassword(false);
    }, 3000);
  };

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const hasCharactersType = [
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/,
  ];

  const PasswordSthrengthHandler = () => {
    let strength = 0;
    if (randomPassword.length > 0) {
      hasCharactersType.forEach((regex) => {
        if (regex.test(randomPassword)) {
          strength++;
        }
      });
      if (strength === 1 && randomPassword.length) {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeUppercase: true };
        });
      } else {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeUppercase: false };
        });
      }
      if (strength === 2) {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeLowercase: true };
        });
      } else {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeLowercase: false };
        });
      }
      if (strength === 3) {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeNumbers: true };
        });
      } else {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeNumbers: false };
        });
      }
      if (strength === 4) {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeSymbols: true };
        });
      } else {
        setPasswordStrength((prevState) => {
          return { ...prevState, includeSymbols: false };
        });
      }
    }
  };

  console.log(passwordStrength);
  const GeneratePassword = () => {
    let randomPass = "";
    let charSet = "";
    for (let i = 1; i <= charLength; i++) {
      if (isCheked.uppercaseLetters) {
        charSet += GetRendomChart(uppercaseChars);
      }
      if (isCheked.lowercaseLetters) {
        charSet += GetRendomChart(lowercaseChars);
      }
      if (isCheked.number) {
        charSet += GetRendomChart(numbers);
        console.log(charSet);
      }
      if (isCheked.symbol) {
        charSet += GetRendomChart(symbols);
      }
    }

    randomPass += charSet.slice(0, charLength);

    setRandomPassword(randomPass);
    PasswordSthrengthHandler();
  };
  function GetRendomChart(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  const handleChange = (event) => {
    if (event.target.value <= 20) {
      setCharLength(event.target.value);
    }
  };
  return (
    <div>
      <h2 className={classes.header}>Password Generator</h2>
      <div className={classes["generated-password"]}>
        <p className={randomPassword ? classes.password : ""}>
          {randomPassword ? randomPassword : "P4$5W0rD!"}
        </p>
        <button onClick={copyToClipboard}>
          {copyPassword ? <span>COPIED</span> : ""}
          <svg
            width="17.5"
            height="20"
            viewBox="0 0 21 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.909 0.659016L20.341 3.09098C20.763 3.51294 21 4.08523 21 4.68197V17.25C21 18.4926 19.9926 19.5 18.75 19.5H15V21.75C15 22.9926 13.9926 24 12.75 24H2.25C1.00734 24 0 22.9926 0 21.75V6.75C0 5.50734 1.00734 4.5 2.25 4.5H6V2.25C6 1.00734 7.00734 0 8.25 0H16.3181C16.9147 3.12036e-06 17.4871 0.237058 17.909 0.659016ZM2.53126 21.75H12.4687C12.5434 21.75 12.6149 21.7204 12.6677 21.6677C12.7204 21.6149 12.75 21.5434 12.75 21.4687V19.5H8.25C7.00734 19.5 6 18.4926 6 17.25V6.75H2.53126C2.45665 6.75 2.38512 6.77963 2.33238 6.83238C2.27963 6.88512 2.25 6.95665 2.25 7.03126V21.4687C2.25 21.5434 2.27963 21.6149 2.33238 21.6677C2.38512 21.7204 2.45665 21.75 2.53126 21.75ZM18.4687 17.25H8.53126C8.45665 17.25 8.38512 17.2204 8.33238 17.1677C8.27963 17.1149 8.25 17.0434 8.25 16.9687V2.53126C8.25 2.45665 8.27963 2.38512 8.33238 2.33238C8.38512 2.27963 8.45665 2.25 8.53126 2.25H13.5V6.375C13.5 6.99632 14.0036 7.5 14.625 7.5H18.75V16.9687C18.75 17.0434 18.7204 17.1149 18.6677 17.1677C18.6149 17.2204 18.5434 17.25 18.4687 17.25ZM15.75 5.25H18.75V4.7985C18.75 4.76156 18.7427 4.72499 18.7286 4.69086C18.7145 4.65673 18.6937 4.62572 18.6677 4.59961L16.4004 2.33236C16.3476 2.27963 16.2761 2.25 16.2014 2.25H15.75V5.25Z"
              fill="#A4FFAF"
            />
          </svg>
        </button>
      </div>
      <div className={classes["password-generator"]}>
        <div className={classes["character-length"]}>
          <span>Character Length</span>
          <div>{charLength}</div>
        </div>
        <input
          // className={classes["input-range"]}
          type="range"
          min="0"
          max="20"
          value={charLength}
          onChange={handleChange}
        ></input>

        <div className={classes["checkbox-container"]}>
          <div>
            {!isCheked.uppercaseLetters ? (
              <div
                className={classes["check-box"]}
                onClick={() =>
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      uppercaseLetters: !isCheked.uppercaseLetters,
                    };
                  })
                }
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      uppercaseLetters: !isCheked.uppercaseLetters,
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
            {!isCheked.lowercaseLetters ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      lowercaseLetters: !isCheked.lowercaseLetters,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      lowercaseLetters: !isCheked.lowercaseLetters,
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
            {!isCheked.number ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      number: !isCheked.number,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      number: !isCheked.number,
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
            {!isCheked.symbol ? (
              <div
                className={classes["check-box"]}
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      symbol: !isCheked.symbol,
                    };
                  });
                }}
              ></div>
            ) : (
              <div
                onClick={() => {
                  setIsChecked((prevState) => {
                    return {
                      ...prevState,
                      symbol: !isCheked.symbol,
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
          <div>
            <span className={classes["strength-text"]}>
              {passwordStrength.includeUppercase
                ? "TOO WEAK!"
                : passwordStrength.includeLowercase
                ? "WEAK"
                : passwordStrength.includeNumbers
                ? "MEDIUM"
                : passwordStrength.includeSymbols
                ? "STRONG"
                : ""}
            </span>
            <div className={classes["password-strength-rate"]}>
              <div
                className={
                  passwordStrength.includeUppercase
                    ? classes["too-weak-password"]
                    : passwordStrength.includeLowercase
                    ? classes["weak-password"]
                    : passwordStrength.includeNumbers
                    ? classes.medium
                    : passwordStrength.includeSymbols
                    ? classes.strong
                    : ""
                }
              ></div>
              <div
                className={
                  passwordStrength.includeLowercase
                    ? classes["weak-password"]
                    : passwordStrength.includeNumbers
                    ? classes.medium
                    : passwordStrength.includeSymbols
                    ? classes.strong
                    : ""
                }
              ></div>
              <div
                className={
                  passwordStrength.includeNumbers
                    ? classes.medium
                    : passwordStrength.includeSymbols
                    ? classes.strong
                    : ""
                }
              ></div>
              <div
                className={
                  passwordStrength.includeSymbols ? classes.strong : ""
                }
              ></div>
            </div>
          </div>
        </div>
        <button className={classes.btn} onClick={GeneratePassword}>
          GENERATE
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.10547 12L11.1054 6.00002L5.10547 0L3.84045 1.26501L7.68094 5.10547L0 5.10547V6.8946L7.68094 6.8946L3.84045 10.735L5.10547 12Z"
              fill="#24232C"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MainCotainer;
