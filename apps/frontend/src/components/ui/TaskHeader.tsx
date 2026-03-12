type TaskHeaderProps = {
  title: string;
};

export default function TaskHeader({ title }: TaskHeaderProps) {
  return (
    <header className="bg-gray-200 w-screen h-20 border-b border-black flex items-center justify-center">
      <h1 className="text-center text-4xl">{title}</h1>
    </header>
  );
}
