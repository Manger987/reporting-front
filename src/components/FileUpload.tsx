import React, { useRef, useState } from "react";
import { uploadFileService } from "./../services/sistemService";

function FileUpload(props: any) {
  const [file, setFile] = useState(""); // storing the uploaded
  const [uploaded, setUploaded] = useState(0); 

  const handleChange = (e: any) => {
    let filesData = e.target.files; // accesing file
    // console.log("before:", filesData);
    // for (var x = 0; x < filesData.length; x++) {
    //   console.log("zzz",removeAccents(filesData[x].name));
    //   filesData[x].name = removeAccents(filesData[x].name);//removeAccents(file[x].name);
    // }
    // console.log("after:", filesData); //QUITAR ACENTOS O CARACTERES.
    setFile(filesData); // storing file
  };

  const removeAccents = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
  
  const uploadFile = async () => {
    const formData = new FormData();
    // formData.append('file', file); // appending file
    for (var x = 0; x < file.length; x++) {
      formData.append("file", file[x]);
    }
    const returnUpload = await uploadFileService(formData);
    console.log("EEEEE:",returnUpload);
    if (returnUpload) 
      props.uploadedFiles(returnUpload);//Pasando Informacion a create.tsx
      
  };

  return (
    <div>
      <input
        type="file"
        className="form-control"
        name="file"
        multiple
        onChange={handleChange}
      />
      <input type="button" onClick={uploadFile} value="Subir" />
    </div>
  );
}
export default FileUpload;
