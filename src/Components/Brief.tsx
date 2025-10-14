import { useState } from "react";
import { DMA_OPTIONS, KPI_OPTIONS, AUDIENCE_OPTIONS } from "./BriefIndex";

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

      console.log(brief);
    } catch (error) {}
  };

  return (
    <div>
      <fieldset>
        <h2>DMAs</h2>
        {DMA_OPTIONS.map((opt) => (
          <label key={opt.label}>
            <input type="radio" name="dma" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
            {opt.label}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h2>Audience</h2>
        {AUDIENCE_OPTIONS.map((opt) => (
          <label key={opt.label}>
            <input type="radio" name="audience" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
            {opt.label}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <h2>KPI Goals</h2>
        {KPI_OPTIONS.map((opt) => (
          <label key={opt.label}>
            <input type="radio" name="kpi" value={opt.label} onChange={(e) => setBriefOpts({ ...briefOpts, [e.target.name]: e.target.value })} />
            {opt.label}
          </label>
        ))}
      </fieldset>
      <input type="text" value={brief} onChange={(e) => setBrief(e.target.value)} />
      <button onClick={generateBrief}>Generate Brief</button>
    </div>
  );
};

export default Brief;
