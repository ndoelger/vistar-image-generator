import { useState } from "react";
import { DMA_OPTIONS, KPI_OPTIONS, AUDIENCE_OPTIONS } from "./BriefIndex";
import { TextField, Button } from "@mui/material";
import "./Brief.css";

type Props = { brief?: string; setBrief: React.Dispatch<React.SetStateAction<string>> };

const Brief: React.FC<Props> = ({ brief, setBrief }) => {
  const [briefOpts, setBriefOpts] = useState({ dma: "", audience: "", kpi: "" });

  const [briefLoading, setBriefLoading] = useState(false)

  const generateBrief = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setBriefLoading(true)

    console.log(JSON.stringify(briefOpts));
    try {
      const res = await fetch("https://img-gen-backend-56454417761.us-central1.run.app/brief", {
        method: "POST",
        body: JSON.stringify(briefOpts),
        headers: { "Content-Type": "application/json" },
      });

      const brief = await res.text();

      setBrief(brief);
      setBriefLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="brief-holder">
        <fieldset className="radio-holder">
          <h3>DMAs</h3>
          <h4>Select the city/region where your campaign will run.</h4>
          {DMA_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="dma" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
        <fieldset className="radio-holder">
          <h3>Audience</h3>
          <h4>Select your target customer groups.</h4>
          {AUDIENCE_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="audience" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
        <fieldset className="radio-holder">
          <h3>KPI Goals</h3>
          <h4>Choose the main performance objectives for your campaign.</h4>
          {KPI_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="kpi" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
      </div>
      <TextField style={{marginBottom:"30px"}} id="brief" value={brief} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrief(e.target.value)} className="text-input" multiline maxRows={20} />
      
      <Button  loading={briefLoading} className="button" variant="contained" type="submit" size="large" onClick={generateBrief}>
        {brief ? "Refresh Brief": "Generate Brief"}
      </Button>
    </div>
  );
};

export default Brief;
