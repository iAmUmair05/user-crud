import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import NotesTable from './components/todo/NotesTable';
import Account from './components/todo/Account';


function App() {


  return (
    <>
      <Router>

        <Routes>


          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />}  />


          <Route path='/notes' element={<NotesTable />} ></Route>
          <Route path='/account' element={<Account />} ></Route>


        </Routes>


      </Router>
    </>
  );
}

export default App;
