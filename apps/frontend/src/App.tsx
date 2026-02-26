import { useState } from "react";
import { getCodeInfo } from "./lib/api";

function App() {
  const [codeActivation, setCodeActivation] = useState<boolean>();
  const [inputCode, setCode] = useState<string>("");

  async function fetchCodeInfo(code: string) {
    try {
      const { isActivated } = await getCodeInfo(code);
      setCodeActivation(isActivated);
    } catch (e) {
      console.log(e);
    }
  }

  function handleValidateCode() {
    fetchCodeInfo(inputCode);
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputCode}
          className="border border-solid px-2 py-1"
          placeholder="12345678"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="button"
          className="border border-solid w-20 h-12"
          onClick={handleValidateCode}
        >
          Validez le code
        </button>
      </div>
      {codeActivation && <div>Le code est activé, next step : lancer l'expé</div>}
      {!codeActivation && <div>Le code est désactivé, l'expé ne peut pas se lancer</div>}
    </div>
  );
}

export default App;
