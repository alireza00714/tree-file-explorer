import { TAddStatus } from "./FileSystemRoot.tsx";
import {
  iconPathGenerator,
  getFileExtension,
  getFileIconName,
} from "../utils/file.ts";

interface IProps {
  nodeName: string;
  type: TAddStatus;
  isOpen?: boolean;
}

export default function FileSystemNode(props: Readonly<IProps>) {
  const { nodeName, type, isOpen } = props;
  const folderSvgName = "folder-base" + (isOpen ? "-open" : "");
  const fileSvgName = getFileIconName(getFileExtension(nodeName));
  const svgIconPath = iconPathGenerator(
    type === "File" ? fileSvgName : folderSvgName
  );

  return (
    <span className="rounded-md shadow-lg p-2 flex items-center justify-center gap-1 w-fit select-none cursor-pointer border border-gray-300 border-solid">
      <img alt={nodeName} className="w-5 h-5" src={svgIconPath} />
      <span>{nodeName}</span>
    </span>
  );
}
