import { useState } from "react";
import { DMA_OPTIONS, KPI_OPTIONS, AUDIENCE_OPTIONS } from "./BriefIndex";
import { TextField, Button } from "@mui/material";
import "./Brief.css";

const Brief = () => {
  const [briefOpts, setBriefOpts] = useState({ dma: "", audience: "", kpi: "" });

  const [brief, setBrief] = useState("");

  const generateBrief = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(JSON.stringify(briefOpts));
    try {
      const res = await fetch("http://127.0.0.1:5000/brief", {
        method: "POST",
        body: JSON.stringify(briefOpts),
        headers: { "Content-Type": "application/json" },
      });

      const brief = await res.text();

      setBrief(brief);
    } catch (error) {}
  };

  return (
    <div>
      <div id="brief-holder">
        <fieldset className="radio-holder">
          <h3>DMAs</h3>
          {DMA_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="dma" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
        <fieldset className="radio-holder">
          <h3>Audience</h3>
          {AUDIENCE_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="audience" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
        <fieldset className="radio-holder">
          <h3>KPI Goals</h3>
          {KPI_OPTIONS.map((opt) => (
            <label key={opt.label}>
              <input type="radio" name="kpi" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
              {opt.label}
            </label>
          ))}
        </fieldset>
      </div>
      <TextField id="brief" value={brief} onChange={(e) => setBrief(e.target.value)} className="text-input" multiline maxRows={20}/>
      <Button className="button" variant="contained" type="submit" size="large" onClick={generateBrief}>
        Generate Brief
      </Button>
    </div>
  );
};

export default Brief;
