import { useEffect, useState } from "react";
import {
  FileSystemFile,
  FileSystemFolder,
  FileSystemTree,
} from "../utils/fileSystemTree";
import FileSystemRoot from "../components/FileSystemRoot";

export default function FileExplorer() {
  const [fileSystemTree, setFileSystemTree] = useState(
    new FileSystemTree("Root")
  );
  const rootFolder = fileSystemTree.root;

  useEffect(() => {
    const file1 = new FileSystemFile("File1.txt");
    const file2 = new FileSystemFile("File2.txt");
    rootFolder.addFile(file1);
    rootFolder.addFile(file2);

    const subFolder1 = new FileSystemFolder("Subfolder1");
    const subFolder2 = new FileSystemFolder("Subfolder2");
    rootFolder.addFolder(subFolder1);
    rootFolder.addFolder(subFolder2);

    // Add files to subfolders
    const subFile1 = new FileSystemFile("Subfile1.txt");
    const subFile2 = new FileSystemFile("Subfile2.txt");
    subFolder1.addFile(subFile1);
    subFolder2.addFile(subFile2);
  }, []);

  return (
    <div className="px-4 pt-4">
      <FileSystemRoot
        rootFolder={rootFolder}
        setFileSystemTree={setFileSystemTree}
      />
    </div>
  );
}
