import { useState } from 'react';
import './Gen.css';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormLayout = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

const Gen = () => {
  interface MatsState {
    brandBook: File | null;
    assets: File | null;
    copy: string;
  }

  const [mats, setMat] = useState<MatsState>({
    brandBook: null,
    assets: null,
    copy: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    setMat({ ...mats, [name]: type === 'file' && files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (mats.brandBook && mats.assets && mats.copy) {
      formData.append('brandBook', mats.brandBook);
      formData.append('assets', mats.assets);
      formData.append('copy', mats.copy);
      console.log(formData);
    } else alert('Please fill them all out');

    try {
      await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Genearte Creative</h1>
      <FormLayout onSubmit={handleSubmit}>
        <h2>Copy:</h2>
        <TextField
          type="text"
          onChange={handleChange}
          value={mats.copy}
          name="copy"
          placeholder="Enter Copy"
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
        <h2>Brand Book:</h2>
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
        </Button>
        <h2>Assets:</h2>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload Assets
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={handleChange}
            name="assets"
            placeholder="Upload Assets"
          />
        </Button>
        <Button
          role={undefined}
          variant="contained"
          tabIndex={-1}
          type='submit'
        >
          Submit
        </Button>
      </FormLayout>
    </div>
  );
};

export default Gen;
