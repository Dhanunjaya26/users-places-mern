import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [filePreviewUrl, setfilePreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setfilePreviewUrl(fileReader.result);
      };
    }
  }, [file]);

  const selectImageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target?.files.length === 1) {
      pickedFile = event.target.files[0];
      fileIsValid = true;
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        id={props.id}
        style={{ display: "none" }}
        ref={filePickerRef}
        onChange={selectImageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {filePreviewUrl && <img src={filePreviewUrl} alt="preview" />}
          {!filePreviewUrl && <p>Please select an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
