import { ChangeEvent } from "react";

type Props = {
  onFile(file: File): void;
};

export default function Picker({ onFile }: Props) {
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const file = fileList[0];
    onFile(file);
  };

  return (
    <div>
      <div>input</div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
