import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { FileUploaderWrapper } from './style'
import { TStock } from '../..'

type TFileUploader = {
  id: number
  setStock: React.Dispatch<React.SetStateAction<TStock>>
}

const FileUploader: React.FC<TFileUploader> = (props) => {
  const { id, setStock } = props
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
      .patch(`http://localhost:3000/api/v1/stocks/${id}`, params)
      .then(function (response) {
        // 成功時
        setStock(response.data)
      })
      .catch(function (error) {
        // エラー時
      })
  }

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
      <button onClick={upload}>Upload</button>
    </FileUploaderWrapper>
  )
}

export default FileUploader
