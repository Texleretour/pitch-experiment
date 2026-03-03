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

  // ici il faudra return une sorte de ExperimentConductor ou qqch comme ca,
  // mais je sais pas encore comment ca va gerer l'etat de l'experience globalement
  // overall j'y vois plus clair mtn, ca a pas l'air trop chiant
  return <div>Experiment</div>;
}

export default App;
