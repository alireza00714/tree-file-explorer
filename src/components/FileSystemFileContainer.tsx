import { MdDelete } from "react-icons/md";
import { FileSystemFolder, FileSystemTree } from "../utils/fileSystemTree";
import FileSystemNode from "./FileSystemNode";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  parentNode: FileSystemFolder;
  setFileSystemTree: Dispatch<SetStateAction<FileSystemTree>>;
}

export default function FileSystemFileContainer({
  parentNode,
  setFileSystemTree,
}: Readonly<IProps>) {
  const fileList = Array.from(parentNode.files, ([, file]) => file);

  const handleDeleteFile = (parentNode: FileSystemFolder, fileName: string) => {
    setFileSystemTree((prevFileSystemTree) => {
      const updatedRoot = prevFileSystemTree.deleteFileFromFolder(
        parentNode,
        fileName
      );
      const updatedTree = new FileSystemTree("Root");
      updatedTree.setRoot(updatedRoot);
      return updatedTree;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {fileList.map((file) => (
          <motion.div
            initial={{ opacity: 0, translateX: "20%" }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: "20%" }}
            key={file.name}
            className="group flex items-center gap-2 w-fit"
          >
            <FileSystemNode type="File" nodeName={file.name} />
            <div className="w-8">
              <span className="opacity-0 gap-2 flex group-hover:opacity-100 text-xl transition-opacity">
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => handleDeleteFile(parentNode, file.name)}
                />
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
