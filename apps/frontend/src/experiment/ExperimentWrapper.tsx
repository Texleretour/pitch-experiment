import { initJsPsych } from "jspsych";
import { useEffect, useRef } from "react";

type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];

type ExperimentWrapperProps = {
  timeline: Timeline;
};

export default function ExperimentWrapper({ timeline }: ExperimentWrapperProps) {
  const containerRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const jsPysch = initJsPsych({
      display_element: containerRef.current,
      on_finish: () => {
        console.log(jsPysch.data.get().json());
      },
    });

    jsPysch.run(timeline);
  }, [timeline]);

  return <div ref={containerRef} />;
}
