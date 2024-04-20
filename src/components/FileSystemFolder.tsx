import { Dispatch, SetStateAction, useState } from "react";
import {
  FileSystemFolder as FileSystemFolderClass,
  FileSystemTree,
} from "../utils/fileSystemTree";
import FileSystemNode from "./FileSystemNode";
import FileSystemFolderContainer from "./FileSystemFolderContainer";
import { RiFileAddFill, RiFolderAddFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { TAddStatus } from "./FileSystemRoot.tsx";
import FileSystemInputBox from "./FileSystemInputBox.tsx";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  folder: FileSystemFolderClass;
  parentNode: FileSystemFolderClass;
  setFileSystemTree: Dispatch<SetStateAction<FileSystemTree>>;
}

export default function FileSystemFolder({
  folder,
  parentNode,
  setFileSystemTree,
}: Readonly<IProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [typeOfAdding, setTypeOfAdding] = useState<TAddStatus | null>(null);
  const folderList = Array.from(folder.folders, ([, folder]) => folder);
  const fileList = Array.from(folder.files, ([, file]) => file);

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
          ? prevFileSystemTree.addFileToFolder(folder, nodeName)
          : prevFileSystemTree.addFolderToFolder(folder, nodeName);
      const updatedTree = new FileSystemTree("Root");
      updatedTree.setRoot(updatedRoot);
      return updatedTree;
    });
    setTypeOfAdding(null);
  };

  const handleCancel = () => {
    setTypeOfAdding(null);
  };

  const onDelete = (parentNode: FileSystemFolderClass) => {
    setFileSystemTree((prevFileSystemTree) => {
      const updatedRoot = prevFileSystemTree.deleteFolderFromFolder(
        parentNode,
        folder.name
      );
      const updatedTree = new FileSystemTree("Root");
      updatedTree.setRoot(updatedRoot);
      return updatedTree;
    });
  };

  return (
    <>
      <div key={folder.name} className="flex items-center gap-2 group w-fit">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <FileSystemNode
            nodeName={folder.name}
            type="Folder"
            isOpen={isOpen}
          />
        </span>
        <div className="w-24">
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
            <MdDelete
              className="cursor-pointer"
              onClick={() => onDelete(parentNode)}
            />
          </span>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <FileSystemFolderContainer
              parentNode={folder}
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
    </>
  );
}
