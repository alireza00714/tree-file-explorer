import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { TAddStatus } from "./FileSystemRoot.tsx";
import { getFileIconName, getFileExtension } from "../utils/file.ts";

interface IProps {
  typeOfAdding: TAddStatus;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function FileSystemInputBox({
  typeOfAdding,
  onSubmit,
  onCancel,
}: Readonly<IProps>) {
  const [name, setName] = useState("");

  const handleKeyboard = (key: string) => {
    if (key === "Enter") onSubmit(name);

    if (key === "Escape") onCancel();
  };

  return (
    <span className="rounded-md shadow-lg p-2 flex items-center justify-center gap-2 w-fit select-none cursor-pointer border border-gray-300 border-solid">
      <img
        alt={name}
        className="w-5 h-5"
        src={`/src/assets/icons/${
          typeOfAdding === "File"
            ? getFileIconName(getFileExtension(name))
            : "folder-base"
        }.svg`}
      />
      <input
        className="border border-gray-200 border-solid"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={(e) => handleKeyboard(e.key)}
      />
      <FaCheck onClick={() => onSubmit(name)} />
      <MdOutlineCancel onClick={onCancel} />
    </span>
  );
}
