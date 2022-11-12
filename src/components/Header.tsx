import "../styles/Header.scss";

export default function Header() {
  return (
    <header>
      <h1>ffweb</h1>
      <h3>
        quickly use ffmpeg in your browser thanks to{" "}
        <a
          href="https://github.com/ffmpegwasm/ffmpeg.wasm"
          target="_blank"
          rel="noreferrer"
        >
          ffmpeg.wasm
        </a>
      </h3>
    </header>
  );
}
