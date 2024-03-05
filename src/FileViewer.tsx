import { useState, useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import axios from 'axios'
import FileThumbnail from './FileThumbnail'


const FileViewer = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    axios.get('/api/files').then((res) => {
      setFiles(res.data);
    })
  }, [])
  // useEffect(() => { console.dir(files) }, [files])

  return (
    <Container>{files.length == 0 ? 'no files yet' :
      files.map((file, reactKey) => {
        return (
          <FileThumbnail file={file} key={reactKey} />
        )
      })

    }</Container>
  )
}

export default FileViewer
