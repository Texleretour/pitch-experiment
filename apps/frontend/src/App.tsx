import { useState } from "react";
import { getAccessCodeInfo } from "./lib/api";

function App() {
  const [code_existance, setCodeExistance] = useState<boolean>(false);
  const [input_code, setCode] = useState<string>("");

  async function fetchCodeInfo(code: string) {
    try {
      const { existance } = await getAccessCodeInfo(code);
      setCodeExistance(existance);
    } catch (e) {
      console.log(e);
    }
  }

  function handleValidateCode() {
    fetchCodeInfo(input_code);
    return;
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input_code}
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
      {code_existance && <div>Le code est activé, next step : lancer l'expé</div>}
      {!code_existance && <div>Le code est désactivé, l'expé ne peut pas se lancer</div>}
    </div>
  );
}

export default App;
