import { Toaster } from 'react-hot-toast';
import { Navbar, Canvas, Dao, Fosset, Members } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }} basename="/">
      <Toaster position="bottom-right" />
      <div className="spacer"></div>
      <Navbar></Navbar>
      <Routes>
        <Route path="" element={<Canvas />} />
        <Route path="dao" element={<Dao />} />
        <Route path="members" element={<Members />} />
        <Route path="fosset" element={<Fosset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
