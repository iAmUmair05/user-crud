import { useFormik } from 'formik';
import { addNotes } from '../Validation';
import { useRef, useEffect } from 'react';
import axios from 'axios';

const AddNoteModal = ({ addModal, setAddModal, notes, setNotes }) => {
  const handleAddModalCancel = () => {
    setAddModal(false);
  };

  const initialAddValues = {
    title: '',
    description: '',
  };

  const handleAddNotes = async (values) => {
    const userToken = localStorage.getItem('userToken');

    try {
      const res = await axios.post(
        'http://192.168.1.55:3000/api/todo',
        {
          title: values.title,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      
      setNotes([...notes, res.data]);
      console.log('notes::::::::', notes);
    } catch (error) {
      console.error(error.message);
    }

    setAddModal(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialAddValues,
    validationSchema: addNotes,
    onSubmit: handleAddNotes,
  });

  const addModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setAddModal(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setAddModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setAddModal]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ${addModal ? '' : 'hidden'}`}>
      <div ref={addModalRef} className="bg-gray-800 text-white rounded-lg p-8">
        <h2 className="text-xl mb-4">Add Note</h2>
        <form onSubmit={handleSubmit}>
          {errors.title && touched.title ? <p className="text-red-500">{errors.title}</p> : null}

          <input
            placeholder="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="border border-gray-300 w-full text-black rounded-lg px-4 py-2 mb-4"
          />

          {errors.description && touched.description ? (
            <p className="text-red-500">{errors.description}</p>
          ) : null}

          <textarea
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            className="border border-gray-300 w-full resize-none text-black rounded-lg px-4 py-2 mb-4"
          />

          <div className="flex justify-center">
            <button className="mr-2 border-2 border-indigo-800 p-2 px-6 rounded-md" onClick={handleAddModalCancel}>
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-l from-indigo-700 to-purple-600 rounded-md p-2 px-6">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
