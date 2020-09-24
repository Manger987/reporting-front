import React, { useRef, useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded
  const handleChange = (e: any) => {
    const file = e.target.files[0]; // accesing file
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();        
    formData.append('file', file); // appending file
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <input type="submit" onClick={uploadFile} value="Subir" />
    </div>
  );
}
export default FileUpload;
