import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import EnterprisePage from './EnterprisePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterprisePage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
