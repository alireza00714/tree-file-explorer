import { Dispatch, SetStateAction } from "react";
import {
  FileSystemFolder as FileSystemFolderClass,
  FileSystemTree,
} from "../utils/fileSystemTree";
import FileSystemFileContainer from "./FileSystemFileContainer";
import FileSystemFolder from "./FileSystemFolder";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  parentNode: FileSystemFolderClass;
  setFileSystemTree: Dispatch<SetStateAction<FileSystemTree>>;
}

export default function FileSystemFolderContainer({
  parentNode,
  setFileSystemTree,
}: Readonly<IProps>) {
  const folderList = Array.from(parentNode.folders, ([, folder]) => folder);

  return (
    <div className="flex flex-col gap-2 pl-6">
      <AnimatePresence>
        {folderList.map((folder) => (
          <motion.div
            initial={{ opacity: 0, translateX: "20%" }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: "20%" }}
            key={folder.name}
            className="flex flex-col gap-2 w-fit"
          >
            <FileSystemFolder
              key={folder.name}
              folder={folder}
              parentNode={parentNode}
              setFileSystemTree={setFileSystemTree}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <FileSystemFileContainer
        parentNode={parentNode}
        setFileSystemTree={setFileSystemTree}
      />
    </div>
  );
}
