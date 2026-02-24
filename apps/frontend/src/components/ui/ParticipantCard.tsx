import type { Participant } from "@pitch-experiment/types";

export default function ParticipantCard({ id, age, createdAt }: Participant) {
  return (
    <div className="bg-slate-200 h-48 w-90 rounded-4xl flex flex-col border-1 border-solid text-xl">
      <div className="w-full flex justify-between p-4 flex-grow bg-red-500 rounded-t-4xl">
        <div>
          <p>Nom: Fonom MONOF</p>
          <p>Age: {age}</p>
        </div>
        ID: {id}
      </div>
      <div className="hline h-px w-full bg-slate-700 rounded-full"></div>
      <div className="w-full flex flex-col justify-center p-2 bg-blue-500 rounded-b-4xl">
        <p className="text-center">Date de création: </p>
        <p className="text-center">{createdAt.toString()}</p>
      </div>
    </div>
  );
}
