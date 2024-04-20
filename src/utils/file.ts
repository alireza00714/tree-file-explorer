import { fileIcons } from "./icons.ts";

export const iconPathGenerator = (svgName: string) => {
  return `/assets/icons/${svgName}.svg`;
};

export function getFileExtension(fileName: string | null | undefined) {
  if (!fileName) {
    return null;
  }
  // Split the file name by '.' to get an array of parts
  const parts = fileName.split(".");

  if (parts.length === 1) {
    return null;
  }

  // Get the last part of the array, which should be the extension
  return parts.pop();
}

export function getFileIconName(extension: string | null | undefined) {
  if (!extension) {
    return "document";
  }
  for (const icon of fileIcons.icons) {
    if (icon.fileExtensions.includes(extension)) {
      return icon.name;
    }
  }
  return fileIcons.defaultIcon.name;
}
