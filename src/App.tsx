import { bubbleSort } from "./lib/bubble-sort";
import { generateArray } from "./lib/generate-array";

import { useEffect, useRef, useState } from "react";

function App() {
  const [currentArray, setCurrentArray] = useState([0]);
  const [recNum, setRecNum] = useState(0);
  const [active, setActive] = useState(false);

  function handleClick() {}

  let record = useRef(bubbleSort(generateArray(100)));
  useEffect(() => {
    setRecNum(record.current.length);
    setCurrentArray(record.current[0]);
  }, []);

  useEffect(() => {
    if (active) {
      const interval = setTimeout(() => {
        if (recNum == 0) return clearTimeout(interval);
        setCurrentArray(record.current[record.current.length - recNum]);
        setRecNum(recNum - 1);
      }, 0.1);

      return () => clearTimeout(interval);
    }
  }, [recNum, active]);

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;
      setHeight(newHeight);
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [setHeight, setWidth]);

  if (!record) return <div>loading...</div>;

  return (
    <>
      <p>{recNum}</p>
      <div className="bg-slate-200">
        {currentArray &&
          currentArray.map((el, i) => {
            return <span key={i}>{` ${el} `}</span>;
          })}
      </div>

      <p>height: {height}</p>
      <p>width: {width}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setActive(!active)}
      >
        {!active ? "start" : "stop"}
      </button>
      <div className="bg-white grid place-content-center">
        <div className="bg-black w-content h-[640px] flex items-end justify-center gap-0.5 px-10">
          {currentArray &&
            currentArray.map((x, i) => {
              return (
                <div
                  key={i}
                  className="bg-slate-50"
                  style={{
                    height: x * 4,
                    width: (width / currentArray.length) * 0.5,
                  }}
                ></div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
