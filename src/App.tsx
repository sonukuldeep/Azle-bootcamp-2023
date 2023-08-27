import { Toaster } from 'react-hot-toast';
import { Navbar, Canvas, Dao } from './components';
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
        <Route path="fosset" element={<h1>Fosset</h1>} />
        {/* <Route path="login" element={<h1>Hello world 4</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
