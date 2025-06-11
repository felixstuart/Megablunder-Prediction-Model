import { useState, useRef, useEffect, use } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { motion, useAnimation } from "motion/react";

function App() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 1000);
  const [errorText, setErrorText] = useState("Megablunder Classifier");
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  const controls = useAnimation();

  const [bgColor, setBgColor] = useState("bg-sky-600");
  const [targetColor, setTargetColor] = useState("bg-sky-600");

  const hasBeenRendered = useRef(false);

  const colorErrorMappings = {
    DM: "bg-amber-600",
    MM: "bg-yellow-400",
    CASE: "bg-fuschia-400",
    PAR: "bg-purple-700",
    PR: "bg-rose-500",
    FRAG: "bg-indigo-800",
    AGREE: "bg-teal-300",
    ROS: "bg-cyan-400",
    NONE: "bg-emerald-500",
  };

  useEffect(() => {
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.textContent =
        value || inputRef.current.placeholder || "";
      inputRef.current.style.width = mirrorRef.current.offsetWidth + "px";
    }
  }, [value]);

  const animateCircle = (newColorClass: string) => {
    setTargetColor(newColorClass); // apply new color class to circle immediately
    return controls
      .start({
        scale: 1,
        transition: { type: "spring", bounce: 0.5, duration: 1.5 },
      }) // circle expands
      .then(() => {
        setBgColor(newColorClass); // update container bg color after circle fully expanded
        return controls.start({ scale: 0, transition: { duration: 0.3 } }); // circle shrinks back
      });
  };

  useEffect(() => {
    if (!hasBeenRendered.current) {
      hasBeenRendered.current = true;
    }

    if (debouncedValue.trim() === "") {
      setErrorText("Megablunder Classifier");
      setTargetColor("bg-sky-600");

      animateCircle("bg-sky-600");
      return;
    }

    setErrorText("Loading...");

    fetch("http://localhost:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence: debouncedValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        setErrorText(data.classification);
        const newColor =
          colorErrorMappings[
            data.classification as keyof typeof colorErrorMappings
          ];
        setTargetColor(newColor);
        animateCircle(newColor);
      });
  }, [debouncedValue]);

  return (
    <div
      className={
        `h-screen flex items-center justify-center overflow-hidden ${bgColor}`
      }
    >
      <div className="relative z-10">
        <span
          ref={mirrorRef}
          className="absolute top-0 left-0 invisible whitespace-pre text-4xl px-2 py-1 border-b-2 border-white"
          aria-hidden="true"
        />
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your sentence here..."
            className="h-16 text-2xl px-2 py-1 border-b-2 border-white text-white bg-transparent outline-none min-w-[4ch] w-auto"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <h1 className="py-4 text-center text-white">{errorText}</h1>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 1, scale: 0 }}
        animate={controls}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[200vmax] h-[200vmax] rounded-full ${targetColor}`}
      />
    </div>
  );
}

export default App;
