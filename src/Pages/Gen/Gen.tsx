import { useState, useRef } from "react";
import "./Gen.css";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormLayout = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const Gen = () => {
  interface MatsState {
    brandBook: File | null;
    assets: File | null;
    copy: string;
    priCol: string;
    secCol: string;
    terCol: string;
  }

  const [mats, setMat] = useState<MatsState>({
    brandBook: null,
    assets: null,
    copy: "",
    priCol: "#000000",
    secCol: "#000000",
    terCol: "#000000",
  });

  const [loading, setLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    setMat({ ...mats, [name]: type === "file" && files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (mats.assets && mats.copy) {
      setLoading(true);
      // formData.append('brandBook', mats.brandBook);
      formData.append("assets", mats.assets);
      formData.append("copy", mats.copy);
      formData.append("priCol", mats.priCol);
      formData.append("secCol", mats.secCol);
      formData.append("terCol", mats.terCol);
      console.log(formData);
    } else alert("Please fill them all out");

    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        body: formData,
      });

      const url = await res.text();

      setImgUrl(url);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Generate Creative</h1>
      <FormLayout onSubmit={handleSubmit}>
        <h2>Copy:</h2>
        <TextField
          type="text"
          onChange={handleChange}
          value={mats.copy}
          name="copy"
          placeholder="Enter Copy"
          id="outlined-multiline-flexible"
          label="Enter Copy"
          multiline
          maxRows={4}
        />
        {/* <h2>Brand Book:</h2>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload Brand Book
          <input
            type="file"
            onChange={handleChange}
            name="brandBook"
            placeholder="Upload BrandBook"
            style={{ display: 'none' }}
          />
        </Button> */}
        <h2>Colors:</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>Primary</h3>
            <input className="color-input" type="color" name="priCol" value={mats.priCol} onChange={handleChange} />
          </div>
          <div>
            <h3>Secondary</h3>
            <input className="color-input" type="color" name="secCol" value={mats.secCol} onChange={handleChange} />
          </div>
          <div>
            <h3>Tertiary</h3>
            <input className="color-input" type="color" name="terCol" value={mats.terCol} onChange={handleChange} />
          </div>
        </div>
        <h2>Assets:</h2>
        <Button component="label" role={undefined} variant="outlined" tabIndex={-1}>
          {mats.assets?.name || "Upload Assets"}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={handleChange}
            name="assets"
            placeholder={"Upload Assets"}
          />
        </Button>
        <Button
          variant="contained"
          tabIndex={-1}
          type="submit"
          size="large"
          loading={loading}
          disabled={!mats.assets || !mats.copy}
        >
          Submit
        </Button>
      </FormLayout>
      <img src={imgUrl} />
    </div>
  );
};

export default Gen;
