type ProgressBarProps = {
  progressionPercent: number;
  className: string;
};
export default function ProgressBar({ progressionPercent, className }: ProgressBarProps) {
  const progressStyle = {
    width: `${progressionPercent}%`,
  };

  const progressBarBlockClassName = `${className} w-full flex flex-col justify-center items-center`;

  return (
    <div className={progressBarBlockClassName}>
      <p className="text-center">Task completion: {progressionPercent}%</p>
      <div className="h-4 bg-gray-400 w-1/2 rounded-2xl">
        <div className="h-full bg-green-500 rounded-2xl" style={progressStyle} />
      </div>
    </div>
  );
}
