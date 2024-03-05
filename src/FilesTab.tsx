import { Box, Card, CardHeader, CardBody, Heading } from "@chakra-ui/react"
import { FileViewer, FileUploadInput } from "./"

const FilesTab: React.FC = () => {
  return (
    <Box flex="1">
      <Card marginX={"1rem"}>
        <CardHeader>
          <Heading as="h2">Files</Heading>
        </CardHeader>
        <CardBody>
          <FileViewer />
        </CardBody>
      </Card>
      <FileUploadInput name="Upload more files" />
    </Box>)
}

export default FilesTab
