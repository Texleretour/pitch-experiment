import { initJsPsych } from "jspsych";
import { useEffect, useRef } from "react";

type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];

type ExperimentWrapperProps = {
  timeline: Timeline;
  onFinish: () => void;
};

export default function ExperimentWrapper({ timeline, onFinish }: ExperimentWrapperProps) {
  const containerRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const jsPysch = initJsPsych({
      display_element: containerRef.current,
      on_finish: () => {
        onFinish();
        console.log(jsPysch.data.get().json());
      },
    });

    jsPysch.run(timeline);
  }, [timeline, onFinish]);

  return <div ref={containerRef} />;
}
