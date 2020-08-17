import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileUploaderWrapper } from './style'

type TFileUploader = {
  acceptedFiles?: any
  setAcceptedFiles?: any
}

const FileUploader: React.FC<TFileUploader> = (props) => {
  const { acceptedFiles, setAcceptedFiles } = props

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setAcceptedFiles(acceptedFiles)
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
      <div>{`ファイル名: ${acceptedFiles.map((f: any) => f.name)}`}</div>
    </FileUploaderWrapper>
  )
}

export default FileUploader
