import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect } from "react";

export default function Encoder() {
  const instance = createFFmpeg({
    log: true,
  });

  useEffect(() => {
    (async () => {
      await instance.load();

      //instance.FS('writeFile', )
    })();
  });

  return <p>encoder</p>;
}
