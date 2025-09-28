import React, { useState } from 'react';

const Resizing = () => {
  interface FormState {
    image: File | null;
    sizes: string;
  }

  const [formData, setFormData] = useState<FormState>({
    image: null,
    sizes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'file' && files ? files[0] : value,
    });
  };



  return (
    <div>
      Resize
      <form >
        Sizes:
        <input
          type="text"
          onChange={handleChange}
          value={formData.sizes}
          name="copy"
          placeholder="Enter Sizes"
        />
        Image:
        <input
          type="file"
          onChange={handleChange}
          name="image"
          placeholder="Upload Image"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Resizing;
