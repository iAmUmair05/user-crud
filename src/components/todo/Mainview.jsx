import Sidebar from "./Sidebar"

const Mainview = ({children}) => {
  return (
    <div>

<Sidebar />

{children}
    </div>
  )
}

export default Mainview