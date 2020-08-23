import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUploaderWrapper } from './style'

type TFileUploader = {
  acceptedFiles?: File[]
  setAcceptedFiles?: React.Dispatch<React.SetStateAction<File[]>>
}

const FileUploader: React.FC<TFileUploader> = (props) => {
  const { acceptedFiles, setAcceptedFiles } = props

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setAcceptedFiles && setAcceptedFiles(acceptedFiles)
    },
    [setAcceptedFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <FileUploaderWrapper>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>クリックして画像を添付してください</p>
        )}
      </div>
      <div>{`ファイル名: ${
        acceptedFiles && acceptedFiles.map((f: File) => f.name)
      }`}</div>
    </FileUploaderWrapper>
  )
}

export default FileUploader
