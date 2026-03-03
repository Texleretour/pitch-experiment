import { useState } from "react";
import CodeValidator from "./components/CodeValidator";
import ExplanationsWelcome from "./components/ExplanationsWelcome";

// Default test code: 323jf92d
function App() {
  const [code, setCode] = useState<string | null>(null);
  const [experimentStarted, setExperimentStarted] = useState<boolean>(false);

  const handleCodeValidation = (code: string | null) => {
    setCode(code);
  };

  const handleExperimentStart = () => {
    setExperimentStarted(true);
  };

  if (!code) {
    return <CodeValidator onCodeChange={handleCodeValidation} />;
  }

  if (!experimentStarted) {
    return <ExplanationsWelcome onExperimentStart={handleExperimentStart} />;
  }

  return <div>Experiment</div>;
}

export default App;
