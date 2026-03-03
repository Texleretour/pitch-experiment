import { initJsPsych } from "jspsych";
import { useEffect, useRef } from "react";

type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];

type ExperimentWrapperProps = {
  timeline: Timeline;
  onFinish: (task: "learning" | "inm") => void;
  task: "learning" | "inm";
};

export default function ExperimentWrapper({ timeline, onFinish, task }: ExperimentWrapperProps) {
  const containerRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const jsPysch = initJsPsych({
      display_element: containerRef.current,
      on_finish: () => {
        onFinish(task);
        console.log(jsPysch.data.get().json());
      },
    });

    jsPysch.run(timeline);
  }, [timeline, onFinish, task]);

  return <div ref={containerRef} />;
}
