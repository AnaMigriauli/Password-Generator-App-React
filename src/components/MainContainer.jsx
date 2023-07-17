import { useState } from "react";
import classes from "./MainContainer.module.css";
import copyIcon from "../assets/images/Shape.svg";

function MainCotainer() {
  const [value, setValue] = useState(0);

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  for (let i = 0; i <= value; i++) {
    const randomChar = uppercaseChars + lowercaseChars + numbers + symbols;
    const randompass = randomChar.charAt(
      Math.floor(Math.random() * randomChar.length)
    );
    password += randompass;
  }
  console.log(password);

  const handleChange = (event) => {
    if (event.target.value <= 20) {
      setValue(event.target.value);
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
          <div>{value}</div>
        </div>
        <input
          className={classes["input-range"]}
          type="range"
          min="0"
          max="20"
          value={value}
          onChange={handleChange}
        ></input>

        <div>
          <div>
            <input type="checkbox"></input>
            <span>Include Uppercase Letters</span>
          </div>
          <div>
            <input type="checkbox"></input>
            <span>Include Lowercase Letters</span>
          </div>
          <div>
            <input type="checkbox"></input>
            <span>Include Numbers</span>
          </div>
          <div>
            <input type="checkbox"></input>
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
