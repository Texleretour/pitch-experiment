import Header from "./ui/Header";

type ExplanationsWelcomeProps = {
  onExperimentStart: () => void;
};

export default function ExplanationsWelcome({ onExperimentStart }: ExplanationsWelcomeProps) {
  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header title="Explanations" />
      <main className="flex flex-col items-center gap-4 py-10">
        <p className="mx-72">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat at orci eu
          suscipit. Phasellus convallis mi eget velit molestie sagittis. Fusce dignissim augue diam,
          sit amet tincidunt sapien tincidunt ac. Morbi viverra odio nec libero sollicitudin
          aliquam. Sed placerat, eros non feugiat pellentesque, arcu ipsum vulputate nibh, ac
          lacinia nisl mi ac nulla. Praesent et mauris venenatis, laoreet quam eu, condimentum quam.
          Aliquam quis odio aliquam, mattis libero et, scelerisque neque. Nulla mattis, sapien in
          pellentesque sagittis, nisl dui placerat dui, eget ultrices orci tellus eget purus.
          Aliquam porttitor feugiat pretium. Praesent aliquam eget odio a placerat. Donec vel
          porttitor arcu. Morbi eu ipsum mattis, fermentum libero quis, mollis lacus. Mauris finibus
          erat et tortor ornare pulvinar vel eu urna. Sed eleifend maximus laoreet. In non porta
          sapien.
        </p>
        <p className="mx-72">
          Integer nec blandit nibh. Vivamus mollis interdum imperdiet. Integer nec neque sed sem
          varius cursus congue sit amet arcu. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia curae; Suspendisse potenti. Nullam et enim blandit, porta diam
          in, scelerisque magna. Sed elit augue, maximus ac mi in, blandit rhoncus turpis. Fusce
          facilisis quis ante luctus ornare. Pellentesque tempor vehicula elit in efficitur. Nullam
          euismod a sapien in sodales. Nam viverra, lorem quis finibus ultrices, leo erat gravida
          nisl, et consectetur arcu ipsum eu ipsum. Morbi vitae augue eget erat aliquam sagittis.
          Quisque ligula tellus, vehicula in lacinia lacinia, varius quis eros. Vivamus venenatis
          dui a est efficitur, tincidunt accumsan neque consectetur. Pellentesque eget eros a tortor
          porta porta. Praesent non lectus ex.{" "}
        </p>
        <button type="button" onClick={() => onExperimentStart()}>
          Start the experiment
        </button>
      </main>
    </div>
  );
}
