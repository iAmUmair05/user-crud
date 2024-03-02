import { useEffect, useState } from 'react';
import axios from 'axios';

const Checkbox = ({ id,status }) => {
  const [checkbox, setCheckbox] = useState(status);

  const handleChange = async (e) => {

    setCheckbox(!checkbox);


    console.log("checkbox status", checkbox)

    try {
      const userToken = localStorage.getItem('userToken');
      await axios.put(
        `http://192.168.1.55:3000/api/todo/${id}`,
        {
          status: !checkbox, 
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ).then (res => {
        console.log("update checkbox api ",res.data);

        localStorage.setItem('Checkbox Value', checkbox)

        console.log("this is my note id ",id)
        // setCheckbox(r)

      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checkbox}
          onChange={handleChange}
          className="form-checkbox h-4 w-5 cursor-pointer text-purple-600 rounded-sm"
        />
      </label>
    </div>
  );
};

export default Checkbox;
