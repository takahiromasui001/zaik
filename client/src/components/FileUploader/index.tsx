import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUploader = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const nameList = acceptedFiles.map((file: any) => file.name)
    setAcceptedFiles(nameList)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {`acceptedFileName: ${acceptedFiles}`}
    </div>
  )
}

export default FileUploader
