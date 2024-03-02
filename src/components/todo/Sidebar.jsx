import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  
  const navLinkStyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "bg-gray-700" : "none",
      padding: "8px 70px 8px 10px",
      borderRadius: "10px"
      
    };
  };
  

  return (
    <div>
      <aside
        id="default-sidebar"
      
        className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium text-white">
            <li className="hover:bg-gray-700 cursor-pointer p-2 rounded-md">
              <NavLink to="/notes" style={navLinkStyle}>Notes</NavLink>
            </li>
            <li className="hover:bg-gray-700 cursor-pointer p-2 rounded-md">
              <NavLink to="/account" style={navLinkStyle}>Account</NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
