import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav.jsx'
import TodayPage from './components/pages/TodayPage.jsx'
import FoodPage from './components/pages/FoodPage.jsx'
import TrainingPage from './components/pages/TrainingPage.jsx'
import MeasurementPage from './components/pages/MeasurementPage.jsx'
import GuidePage from './components/pages/GuidePage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <main className="flex-1 overflow-y-auto page-content">
        <Routes>
          <Route path="/" element={<TodayPage />} />
          <Route path="/kost" element={<FoodPage />} />
          <Route path="/traning" element={<TrainingPage />} />
          <Route path="/matning" element={<MeasurementPage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
