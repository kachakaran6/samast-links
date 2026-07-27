import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  variant: string;
  width: string;
  height: string;
};

const FileUploader = ({
  fieldChange,
  mediaUrl,
  variant,
  height,
  width,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/.png": [".png", ".jpeg", ".jpg"],
      "image/.jpeg": [".png", ".jpeg", ".jpg"],
      "image/.jpg": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={
        variant != "avatar"
          ? "flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer h-max"
          : `h-${height} w-${width} flex-center bg-dark-3 rounded-full cursor-pointer ${
              fileUrl ? "p-0" : " p-3"
            }`
      }
      style={{
        height: parseInt(height) * 4 + "px",
        width: parseInt(width) * 4 + "px",
      }}>
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div
            className={`flex flex-1 justify-center w-full ${
              variant != "avatar" ? "p-5 lg:p-10" : "h-full"
            }`}>
            <img
              src={fileUrl}
              alt="image"
              className={` ${
                variant == "avatar"
                  ? "file_uploader-avatar-img"
                  : "file_uploader-img"
              }`}
            />
          </div>
          {variant != "avatar" && (
            <p className="file_uploader-label">
              Click or drag photo to replace
            </p>
          )}
        </>
      ) : (
        <div className={(variant != "avatar" && "file_uploader-box") || ""}>
          <img
            src={`/assets/icons/${
              variant == "avatar" ? "gallery-add.svg" : "file-upload.svg"
            }`}
            width={variant == "avatar" ? "100%" : 40}
            height={variant == "avatar" ? "100%" : 40}
            alt="file upload"
          />
          {variant != "avatar" && (
            <>
              <h3 className="base-medium text-light-2 mb-2 mt-3 text-center">
                Drag photo here or click to upload
              </h3>
              <p className="text-light-4 small-regular">SVG, PNG, JPG</p>
            </>
          )}

          {variant != "avatar" && (
            <Button type="button" className="shad-button_dark_4">
              Select from computer
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
