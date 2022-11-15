import { useEffect, useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Picker from "./components/Picker";
import { initializeFFmpeg, readFile, run, writeFile } from "./lib/encoder";

import "./styles/App.scss";

function App() {
  const [size, setSize] = useState("");
  const [ready, setReady] = useState(false);
  const [filename, setFilename] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [args, setArgs] = useState("");

  useEffect(() => {
    (async () => {
      await initializeFFmpeg();
      setReady(true);
    })();
  }, []);

  const humanFileSize = (size: number): string => {
    let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i];
  };

  const fileSelected = async (file: File) => {
    setSize(humanFileSize(file.size));
    setFilename(file.name);
    await writeFile(file);
  };

  const ffmpegStart = async () => {
    await run(["-i", filename, args.split(" "), "out.mp4"].flat(1));
    const data = readFile("out.mp4");
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
  };

  return (
    <div className="App">
      <Header />

      {ready ? (
        <>
          {" "}
          <Picker onFile={fileSelected} />
          <div>file size: {size}</div> <button onClick={ffmpegStart}>start</button>
          <input type="text" value={args} onChange={(e) => setArgs(e.target.value)} />
          <video src={videoSrc} controls></video>
        </>
      ) : (
        <div className="loading">
          <Loading />
          <div>please wait, ffmpeg is loading... (see console for details)</div>
        </div>
      )}
    </div>
  );
}

export default App;
