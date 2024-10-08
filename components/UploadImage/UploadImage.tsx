import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { trpcClient } from "@/lib/trpc";
import { wallet } from "@/services/wallet";
import Dropzone from "react-dropzone";

export interface UploadImageProps {
  onUpload: (url: string) => void;
  imagePath: string | null | undefined;
  blobName: string;
  variant?: "icon" | "banner";
}

export function UploadImage(props: UploadImageProps): JSX.Element {
  const fileIn = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await fetch(
        `/api/upload/upload-project-icon?filename=${props.blobName}`,
        {
          method: "POST",
          body: file,
        }
      );

      const newBlob = (await response.json()) as PutBlobResult;

      props.onUpload(newBlob.url);
    }
  };

  const uploadFile = async (file: File) => {
    const response = await fetch(
      `/api/upload/upload-project-icon?filename=${props.blobName}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = (await response.json()) as PutBlobResult;

    props.onUpload(newBlob.url);
  };

  return (
    <Dropzone
      onDrop={(file: File[]) => {
        uploadFile(file[0]);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <Tooltip content="Upload new project icon">
            <div className="flex justify-center items-center">
              {(props.variant === "banner" && (
                <Image
                  src={
                    !!props.imagePath
                      ? props.imagePath
                      : "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"
                  }
                  alt="banner"
                  className="rounded-[11.712px] hover:bg-[#ECC94E20] w-[3rem] h-[3rem] self-center cursor-pointer object-fill"
                  fill
                  onClick={() => fileIn.current?.click()}
                ></Image>
              )) || (
                <Image
                  src={
                    !!props.imagePath
                      ? props.imagePath
                      : "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"
                  }
                  alt="icon"
                  className="rounded-[11.712px] hover:bg-[#ECC94E20] w-[3rem] h-[3rem] self-center cursor-pointer"
                  width={36}
                  height={36}
                  onClick={() => fileIn.current?.click()}
                ></Image>
              )}
            </div>
          </Tooltip>
          <input
            ref={fileIn}
            type="file"
            className="hidden"
            onChange={(e) => {
              handleFileChange(e);
            }}
            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp, image/gif"
            {...getInputProps()}
          />
        </div>
      )}
    </Dropzone>
  );
}
