import { useState } from "react";
import { getCodeInfo } from "../lib/api";

type CodeValidatorProps = {
  onCodeChange: (code: string | null) => void;
};

export default function CodeValidator({ onCodeChange }: CodeValidatorProps) {
  const [codeActivation, setCodeActivation] = useState<"activated" | "default" | "error">(
    "default",
  );
  const [inputCode, setInputCode] = useState<string>("");

  async function fetchCodeInfo(code: string) {
    if (code === "") {
      return;
    }

    try {
      const { isActivated } = await getCodeInfo(code);
      setCodeActivation("activated");

      if (isActivated) {
        onCodeChange(code);
        console.info(`[Code] Logged in as ${code}`);
      }
    } catch (error) {
      setCodeActivation("error");
      console.error(`Could not fetch code: ${error}`);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-4">
      <h1>Please enter your participant code to start the experiment.</h1>
      <p>As a reminder, your code should be:</p>
      <ol>
        <li>First letter of your first name</li>
        <li>First letter of your last name</li>
        <li>Last letter of your first name</li>
        <li>Last letter of your last name</li>
        <li>Your birth day (DD)</li>
        <li>First letter of your city of birth</li>
        <li>Last letter of your city of birth</li>
      </ol>
      <p>
        For instance, if you were Abraham Maslow, born in Brooklyn on the 1st of April, 1908, your
        code would be: ammw01bn{" "}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputCode}
          className="border border-solid px-2 py-1"
          placeholder="ammw01bn"
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button
          type="button"
          className="border border-solid w-36 h-12"
          onClick={() => fetchCodeInfo(inputCode)}
        >
          Validate code
        </button>
      </div>
      {!codeActivation && (
        <div>
          Code unknown! Please make sure you typed it right. This could also be a problem on our
          end.
        </div>
      )}
    </div>
  );
}
