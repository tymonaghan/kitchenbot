import { useEffect, useState } from "react"
import axios from "axios"
import { AttachmentIcon } from "@chakra-ui/icons"
import { Card, VStack } from "@chakra-ui/react"


interface FileThumbnailProps {
  file: {
    assistant_id: string;
    created_at: number;
    id: string;
    object: string;
  }
}


const FileThumbnail: React.FC<FileThumbnailProps> = ({ file }) => {
  const [filename, setFilename] = useState("loading")

  useEffect(() => {
    axios.get(`/api/file_details/${file.id}`).then((resp) => {
      setFilename(resp.data.filename);
      // console.dir(resp.data)
    })
  }, [])

  return <Card>
    <VStack>
      <AttachmentIcon />
      <div>
        {filename}</div>
    </VStack>
  </Card>
}

export default FileThumbnail
