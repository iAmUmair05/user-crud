import { useEffect, useState, useRef } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Mainview from './Mainview';
import EditNoteModal from './EditNoteModal';
import AddNoteModal from './AddNoteModal';
import Checkbox from './Checkbox';
import axios from 'axios';
import { useNavigation } from 'react-router-dom';

const NotesTable = () => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedNote, setSelectedNote] = useState({
    id: null,
    title: "",
    description: ""
  });

  const handleAddModal = () => {
    setAddModal(true);
  };

  const handleEditModal = (id, title, description) => {
    setSelectedNote({
      id: id,
      title: title,
      description: description
    });
    setEditModal(true);
  };


  const handleDeleteModal = (id) => {
    setSelectedNote({
      id: id,
      title: "",
      description: ""
    });
    setDeleteModal(true);
  };

  const getNotes = () => {
    const userToken = localStorage.getItem('userToken');

    axios.get(`http://192.168.1.55:3000/api/todo/`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then((res) => {
      setNotes(res.data);
      console.log("get api response", res.data);
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };

  const handleConfirmDelete = (id) => {

    const userToken = localStorage.getItem('userToken');

    axios.delete(`http://192.168.1.55:3000/api/todo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then(() => {
        getNotes();
      });
    setDeleteModal(false);
  };

  useEffect(() => {
    getNotes();
  }, []);


  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search);
  });


  const deleteModalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div>
      <Mainview>
        <div className="flex bg-gray-700 h-screen">
          <div className="relative overflow-x-auto ml-60 w-full px-4">
            <div className="text-white bg-gray-700 flex justify-between mx-1 py-3">
              <p className="text-xl">Notes</p>
              <button className="outline outline-indigo-800 py-1 px-4 cursor-pointer rounded-md" onClick={handleAddModal}>
                Add Notes
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-white text-xl mb-1">Search</h3>
              <input
                type="text"
                className="p-2 text-white bg-gray-800 rounded-md w-full"
                placeholder="Search.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-800 rounded-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map((note, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-700 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      {note.title}
                    </th>
                    <td className="px-6 py-4 ellipsis">{note.description}</td>
                    <td className="px-6 py-4">

                      <Checkbox
                      status={note.status}

                      id={note.id}

                      
                      />

                    </td>
                    <td className="py-4 px-6 text-white text-md">
                      <div className='flex space-x-2 items-center'>
                        <AiFillEdit onClick={() => handleEditModal(note.id, note.title, note.description)} className="cursor-pointer" />
                        <AiFillDelete data-modal-target="popup-modal" data-modal-toggle="popup-modal" onClick={() => handleDeleteModal(note.id)} className="cursor-pointer" />

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editModal && (
            <EditNoteModal
              editModal={editModal}
              setEditModal={setEditModal}
              notes={notes}
              setNotes={setNotes}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
            />
          )}

          {deleteModal && (
            <div id="popup-modal" tabindex="-1" className='fixed inset-0 flex items-center p-4 justify-center z-50 backdrop-blur-sm'>
              <div className="bg-gray-800 text-white rounded-xl p-8 w-[400px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Delete Notes</h2>
                <p className="text-gray-400 text-center">Are you sure you want to delete?</p>
                <div className="flex justify-center mt-10">
                  <button className="mr-2 border-2 border-indigo-800 p-2 px-6 rounded-md" onClick={handleDeleteCancel}>
                    Cancel
                  </button>
                  <button
                    className="bg-gradient-to-l from-indigo-700 to-purple-600 rounded-md p-2 px-6"
                    onClick={() => handleConfirmDelete(selectedNote.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {addModal && (

            <AddNoteModal
              addModal={addModal}
              handleAddModal={handleAddModal}
              setAddModal={setAddModal}
              notes={notes}
              setNotes={setNotes}
            />


          )}

        </div>
      </Mainview>
    </div>
  );
};

export default NotesTable;
