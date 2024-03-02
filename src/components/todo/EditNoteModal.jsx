import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { editNotes } from '../Validation';
import { useFormik } from 'formik';

const EditNoteModal = ({ editModal, setEditModal, notes, setNotes, selectedNote }) => {
  const [title, setTitle] = useState(selectedNote.title);
  const [description, setDescription] = useState(selectedNote.description);

  const handleEditModalCancel = () => {
    setEditModal(false);
  };

  const initialEditValues = {
    title: selectedNote.title,
    description: selectedNote.description,
  };

  const handleUpdateNote = () => {
    const userToken = localStorage.getItem('userToken');

    axios.put(
        `http://192.168.1.55:3000/api/todo/${selectedNote.id}`,
        {
          title: values.title,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        const updatedNotes = notes.map((note) => {
          if (note.id === selectedNote.id) {
            return {
              ...note,
              title: values.title,
              description: values.description,
            };
          }
          return note;
        });
        setNotes(updatedNotes);
        setEditModal(false);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialEditValues,
    validationSchema: editNotes,
    onSubmit: handleUpdateNote,
  });

  const editModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setEditModal(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setEditModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setEditModal]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ${editModal ? '' : 'hidden'}`}>
      <div ref={editModalRef} className="bg-gray-800 text-white rounded-lg p-8">
        <h2 className="text-xl mb-4">Update Notes</h2>

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
            <button
              className="mr-2 border-2 border-indigo-800 p-2 px-6 rounded-md"
              onClick={handleEditModalCancel}
            >
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-l from-indigo-700 to-purple-600 rounded-md p-2 px-6">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
