export class FileSystemFile {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class FileSystemFolder {
  name: string;
  files: Map<string, FileSystemFile>;
  folders: Map<string, FileSystemFolder>;

  constructor(name: string) {
    this.name = name;
    this.files = new Map();
    this.folders = new Map();
  }

  // Method to add a file to the folder
  addFile(file: FileSystemFile): void {
    this.files.set(file.name, file);
  }

  // Method to add a subfolder to the folder
  addFolder(folder: FileSystemFolder): void {
    this.folders.set(folder.name, folder);
  }

  // Method to delete a file from the folder
  deleteFile(fileName: string): void {
    this.files.delete(fileName);
  }

  // Method to delete the folder and its contents
  deleteFolder(): void {
    // Recursively delete all files and subfolders
    this.files.clear();
    this.folders.forEach((folder) => folder.deleteFolder());
    this.folders.clear();
  }
}

export class FileSystemTree {
  root: FileSystemFolder;

  constructor(rootName: string) {
    this.root = new FileSystemFolder(rootName);
  }

  setRoot(root: FileSystemFolder): FileSystemFolder {
    this.root = root;
    return this.root;
  }

  // Method to add a file to a folder
  addFileToFolder(
    folder: FileSystemFolder,
    fileName: string
  ): FileSystemFolder {
    const file = new FileSystemFile(fileName);
    folder.addFile(file);
    return this.root;
  }

  // Method to add a subfolder to a folder
  addFolderToFolder(
    parentFolder: FileSystemFolder,
    folderName: string
  ): FileSystemFolder {
    const newFolder = new FileSystemFolder(folderName);
    parentFolder.addFolder(newFolder);
    return this.root;
  }

  // Method to delete a file from a folder
  deleteFileFromFolder(
    folder: FileSystemFolder,
    fileName: string
  ): FileSystemFolder {
    folder.deleteFile(fileName);
    return this.root;
  }

  // Method to delete a subfolder from a folder
  deleteFolderFromFolder(
    parentFolder: FileSystemFolder,
    folderName: string
  ): FileSystemFolder {
    parentFolder.folders.delete(folderName);
    return this.root;
  }
}
