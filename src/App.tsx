import { bubbleSort } from "./lib/bubble-sort";
import { generateArray } from "./lib/generate-array";

import { ReactEventHandler, useEffect, useRef, useState } from "react";

function App() {
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [fetchedArray, setFetchedArray] = useState(false);
  const [recNum, setRecNum] = useState(0);
  const [active, setActive] = useState(false);
  const [j, setJ] = useState(-1);
  const [j2, setJ2] = useState(-1);
  // const [j3, setJ3] = useState(-1);
  const arraySize = 20;

  function handleStep(e: any) {
    if (e.target.id === "forward") {
      if (recNum == 0) return;
      setCurrentArray(record.current[record.current.length - recNum][1]);
      setRecNum(recNum - 1);
      setJ(record.current[record.current.length - recNum][0][1]);
      setJ2(record.current[record.current.length - recNum][0][0]);
      // setJ3(record.current[record.current.length - recNum + 1][0][0]);
    }

    if (e.target.id === "backward") {
      if (record.current.length - recNum == 1) return;
      setCurrentArray(record.current[record.current.length - recNum - 2][1]);
      setRecNum(recNum + 1);
      setJ(record.current[record.current.length - recNum - 2][0][1]);
      setJ2(record.current[record.current.length - recNum - 2][0][0]);
      // setJ3(record.current[record.current.length - recNum - 1][0][1]);
    }
  }

  let randomArray: number[];
  // only run if no array
  randomArray = !fetchedArray ? generateArray(arraySize) : [];

  const record = useRef(bubbleSort(randomArray));

  useEffect(() => {
    setFetchedArray(true);
    setRecNum(record.current.length - 1);
    setCurrentArray(record.current[0][1]);
  }, []);

  useEffect(() => {
    if (active) {
      const interval = setTimeout(() => {
        if (recNum == 0) {
          setActive(false);
          return clearTimeout(interval);
        }
        setJ(record.current[record.current.length - recNum][0][1]);
        setJ2(record.current[record.current.length - recNum][0][0]);
        // setJ3(record.current[record.current.length - recNum - 10][0][1]);

        setCurrentArray(record.current[record.current.length - recNum][1]);
        setRecNum(recNum - 1);
      }, 100);

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
      <p>
        {j}
        {j2}
      </p>
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
      <div>
        <button
          onClick={handleStep}
          id="backward"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          back step
        </button>
        <button
          id="forward"
          onClick={handleStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          forward step
        </button>
      </div>
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
                    backgroundColor: `${
                      (j === i ? "green" : "") || (j2 === i ? "darkred" : "")
                    }`,
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
