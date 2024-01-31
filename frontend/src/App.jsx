import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </div>
  );
}

export default App;
