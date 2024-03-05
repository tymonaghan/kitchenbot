import { Input, Button, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons"
import axios from "axios"

interface FileUploadInputProps {
  name: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ name, }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSubmit = () => {
    const formData = new FormData();
    file && formData.append('file', file);

    axios.post('/api/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <FormControl>
      <FormLabel htmlFor="file">{name}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <ArrowUpIcon />
        </InputLeftElement>
        <input
          type="file"
          name={name}
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              setFile(file);
            }
          }}
        />
        <Input
          placeholder="upload a file"
          onClick={() => inputRef.current && inputRef.current.click()}
          readOnly
        />
        <Button onClick={handleFileSubmit}>submit</Button>
      </InputGroup>
      <FormErrorMessage>
        {/* Error message */}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FileUploadInput;
