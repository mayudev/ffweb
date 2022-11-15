import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const instance = createFFmpeg({
  log: true,
});

export function initializeFFmpeg() {
  return instance.load();
}

export async function writeFile(input: File) {
  return instance.FS("writeFile", input.name, await fetchFile(input));
}

export async function run(args: string[]) {
  return instance.run(...args);
}

export function readFile(filename: string) {
  return instance.FS("readFile", filename);
}
