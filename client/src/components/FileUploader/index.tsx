import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const FileUploader = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setAcceptedFiles(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const upload = () => {
    var params = new FormData()

    params.append('file', acceptedFiles[0])
    axios
      .patch('http://localhost:3000/api/v1/stocks/1', params)
      .then(function (response) {
        // 成功時
      })
      .catch(function (error) {
        // エラー時
      })
  }

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
      <div>{`acceptedFileName: ${acceptedFiles.map((f: any) => f.name)}`}</div>
      <button onClick={upload}>Upload</button>
    </div>
  )
}

export default FileUploader
