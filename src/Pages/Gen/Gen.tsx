import { use, useState } from "react";
import "./Gen.css";
import { TextField, Button } from "@mui/material";
import Brief from "../../Components/Brief";

const Gen = () => {
  interface MatsState {
    assets: File | null;
    logo: File | null;
    refImg: File | null;
    copy: string;
    priCol: string;
    secCol: string;
    terCol: string;
  }

  const [mats, setMat] = useState<MatsState>({
    assets: null,
    logo: null,
    refImg: null,
    copy: "",
    priCol: "#000000",
    secCol: "#000000",
    terCol: "#000000",
  });

  const [loading, setLoading] = useState(false);
  const [resLoading, setResLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [landImgUrl, setLandImgUrl] = useState("");
  const [squareImgUrl, setSquareImgUrl] = useState("");

  const [brief, setBrief] = useState("");

  // const [imgUrlResize, setImgUrlResize] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    setMat({ ...mats, [name]: type === "file" && files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (mats.assets && mats.copy && mats.logo) {
      setLoading(true);
      formData.append("assets", mats.assets);
      formData.append("copy", mats.copy);
      formData.append("priCol", mats.priCol);
      formData.append("secCol", mats.secCol);
      formData.append("terCol", mats.terCol);
      if (mats.refImg) formData.append("ref", mats.refImg);
      formData.append("logo", mats.logo);
      formData.append("brief", brief);
      console.log(formData);
    } else alert("Please fill them all out");

    try {
      const res = await fetch("https://img-gen-backend-56454417761.us-central1.run.app/generate", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();

      setImgUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleResize = async (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    setResLoading(true);

    const imgRes = await fetch(imgUrl);
    const img = await imgRes.blob();

    const formData = new FormData();
    if (mats.assets && mats.copy && mats.logo) {
      formData.append("assets", mats.assets);
      formData.append("copy", mats.copy);
      formData.append("priCol", mats.priCol);
      formData.append("secCol", mats.secCol);
      formData.append("terCol", mats.terCol);
      // formData.append("ref", mats.refImg);
      formData.append("logo", mats.logo);
      formData.append("new_ref", img);
      console.log(formData);
    } else alert("Please fill them all out");

    try {
      const landscape = await fetch("https://img-gen-backend-56454417761.us-central1.run.app/resize/1536x1024", {
        method: "POST",
        body: formData,
      });

      const landscapeBlob = await landscape.blob();

      setLandImgUrl(URL.createObjectURL(landscapeBlob));

      const square = await fetch("https://img-gen-backend-56454417761.us-central1.run.app/resize/1024x1024", {
        method: "POST",
        body: formData,
      });

      const squareBlob = await square.blob();

      setSquareImgUrl(URL.createObjectURL(squareBlob));

      setResLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Generate Creative</h1>
        <form onSubmit={handleSubmit}>
          <h2>Brief:</h2>
          <h4>
            This section defines the targeting parameters for your campaign — who you're reaching, where they are, and what success looks like. We will use this to generate a design brief for you. You will be able to request a new brief or edit it directly.
          </h4>
          <Brief brief={brief} setBrief={setBrief} />
          <h2>Copy:</h2>
          <h4>Enter the main advertising or campaign message you want to test or build around. This should be your ad copy — the core text you want to appear in the creative.</h4>
          <TextField style={{margin: "auto"}} type="text" onChange={handleChange} value={mats.copy} name="copy" placeholder="Enter Copy" label="Enter Copy" multiline maxRows={4} className="text-input" />
          <h2>Colors:</h2>
          <h4>
            Choose up to three brand colors to guide the creative design.
            <br />
            Primary: Main brand color <br />
            Secondary: Supporting or accent color <br />
            Tertiary: Optional highlight or background color
          </h4>
          <div className="color-holder">
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
          <h4>
            Upload all brand materials needed for the brief.
            <br />
            Logo: Add your company or campaign logo in .png format.
            <br />
            <strong>Reference (Optional):</strong> Upload any sample creative or reference imagery that shows your desired style. <br />
            Assets: Add any other visuals, product assets, or design elements you want included. These images must be uploaded as a .zip file.
          </h4>
          <div style={{display: "flex" , gap: "10px"}}>
            <Button className="button" variant="outlined" component="label">
              {mats.logo?.name || "Upload Logo"}
              <input style={{ display: "none" }} type="file" onChange={handleChange} name="logo" accept="image/png" />
            </Button>
            <Button className="button" variant="outlined" component="label">
              {mats.refImg?.name || "Upload Reference"}
              <input style={{ display: "none" }} type="file" onChange={handleChange} name="refImg" accept="image/*" />
            </Button>
            <Button className="button" variant="outlined" component="label">
              {mats.assets?.name || "Upload Assets"}
              <input style={{ display: "none" }} type="file" onChange={handleChange} name="assets" accept="application/zip" />
            </Button>
          </div>
          {/* <Button className="button" variant="outlined" component="label">
            {mats.assets?.name || "Upload Assets"}
            <input style={{ display: "none" }} type="file" onChange={handleChange} name="assets" placeholder={"Upload Assets"} />
          </Button> */}
          <Button className="button" variant="contained" type="submit" size="large" loading={loading} disabled={!mats.assets || !mats.copy || !mats.logo}>
            {imgUrl ? "Refresh" : "Submit"}
          </Button>
        </form>
      </div>
      <div className="image-container" style={imgUrl ? {} : { display: "none" }}>
        <div className="top-container">
          <img id="port-image" src={imgUrl} />
          <img id="square-image" src={squareImgUrl} style={squareImgUrl ? {} : { display: "none" }} onClick={handleResize} />
        </div>
        <img id="landscape-image" src={landImgUrl} onClick={handleResize} />
        <div className="button-container">
          <Button className="button" variant="contained" component="label">
            <a href={imgUrl} download="img.png" style={{ color: "inherit", textDecoration: "none" }}>
              Download
            </a>
          </Button>
          <Button className="button" variant="contained" onClick={handleResize} loading={resLoading}>
            {landImgUrl && squareImgUrl ? "Refresh Resize" : "Resize"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gen;
