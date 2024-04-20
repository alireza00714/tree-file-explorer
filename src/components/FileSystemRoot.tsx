import { Dispatch, SetStateAction, useState } from "react";
import { FileSystemFolder, FileSystemTree } from "../utils/fileSystemTree";
import FileSystemNode from "./FileSystemNode";
import FileSystemFolderContainer from "./FileSystemFolderContainer";
import { RiFileAddFill, RiFolderAddFill } from "react-icons/ri";
import FileSystemInputBox from "./FileSystemInputBox.tsx";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  rootFolder: FileSystemFolder;
  setFileSystemTree: Dispatch<SetStateAction<FileSystemTree>>;
}

export type TAddStatus = "File" | "Folder";

export default function FileSystemRoot({
  rootFolder,
  setFileSystemTree,
}: Readonly<IProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [typeOfAdding, setTypeOfAdding] = useState<TAddStatus | null>(null);
  const folderList = Array.from(rootFolder.folders, ([, folder]) => folder);
  const fileList = Array.from(rootFolder.files, ([, file]) => file);

  const handleSubmit = (nodeName: string) => {
    if (!nodeName) {
      toast.error("Empty value is NOT allowed.");
      return;
    }
    if (
      folderList.map((folder) => folder.name).includes(nodeName) ||
      fileList.map((file) => file.name).includes(nodeName)
    ) {
      toast.error("Duplicate files are NOT allowed");
      return;
    }
    setFileSystemTree((prevFileSystemTree) => {
      const updatedRoot =
        typeOfAdding === "File"
          ? prevFileSystemTree.addFileToFolder(rootFolder, nodeName)
          : prevFileSystemTree.addFolderToFolder(rootFolder, nodeName);
      const updatedTree = new FileSystemTree("Root");
      updatedTree.setRoot(updatedRoot);
      return updatedTree;
    });
    setTypeOfAdding(null);
  };

  const handleCancel = () => {
    setTypeOfAdding(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="group flex items-center gap-2 w-fit">
        <div onClick={() => setIsOpen(!isOpen)}>
          <FileSystemNode
            nodeName={rootFolder.name}
            isOpen={isOpen}
            type="Folder"
          />
        </div>
        <div className="w-20">
          <span className="opacity-0 gap-2 flex group-hover:opacity-100 text-xl transition-opacity">
            <RiFileAddFill
              className="cursor-pointer"
              onClick={() => {
                if (!isOpen) setIsOpen(true);
                setTypeOfAdding("File");
              }}
            />
            <RiFolderAddFill
              className="cursor-pointer"
              onClick={() => {
                if (!isOpen) setIsOpen(true);
                setTypeOfAdding("Folder");
              }}
            />
          </span>
        </div>
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <FileSystemFolderContainer
              parentNode={rootFolder}
              setFileSystemTree={setFileSystemTree}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {typeOfAdding && (
          <motion.div
            className="pl-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <FileSystemInputBox
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              typeOfAdding={typeOfAdding}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
