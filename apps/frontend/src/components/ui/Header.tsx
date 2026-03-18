type TaskHeaderProps = {
  title: string;
};

export default function Header({ title }: TaskHeaderProps) {
  return (
    <header className="w-full">
      <div className="h-16 bg-gray-200 w-full" />
      <div className="h-20 w-full flex flex-col justify-center">
        <h1 className="text-center text-4xl">{title}</h1>
      </div>
    </header>
  );
}
