import type { Participant } from "@pitch-experiment/types";
import { useState } from "react";
import ParticipantCard from "./components/ui/ParticipantCard";
import { getParticipantById } from "./lib/api";

function App() {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [idSearch, setIdSearch] = useState<string>("3");

  async function fetchParticipant(id: string) {
    try {
      setLoading(true);
      const participantt = await getParticipantById(Number.parseInt(id, 10));
      setParticipant(participantt);
      setError(null);
    } catch (e) {
      console.log("f ", e);
      setError(e instanceof Error ? e.message : "Pas de participant désolé");
    } finally {
      setLoading(false);
    }
  }

  function handleButtonClick() {
    fetchParticipant(idSearch);
  }

  return (
    <div className="w-screen h-screen">
      <input
        type="text"
        name="test"
        value={idSearch}
        className="border-1 border-solid"
        onChange={(e) => setIdSearch(e.target.value)}
      />
      <button type="submit" className="border-1 border-solid w-20 h-8" onClick={handleButtonClick}>
        {" "}
        Submit ID{" "}
      </button>
      <div>
        {!isLoading && !error && participant && <ParticipantCard {...participant} />}
        {isLoading && <div>ca charge</div>}
        {error && <div> ya une erreur ({error}) </div>}
      </div>
    </div>
  );
}

export default App;
