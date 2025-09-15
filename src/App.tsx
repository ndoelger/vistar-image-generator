import { useState } from 'react';
import './App.css';

const App = () => {
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
      await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Copy:
        <input
          type="text"
          onChange={handleChange}
          value={mats.copy}
          name="copy"
          placeholder="Enter Copy"
        />
        Brand Book:
        <input
          type="file"
          onChange={handleChange}
          name="brandBook"
          placeholder="Upload BrandBook"
        />
        Assets:
        <input
          type="file"
          onChange={handleChange}
          name="assets"
          placeholder="Upload Assets"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
