import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssistantPage from './pages/AssistantPage';
import GamesPage from './pages/GamesPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import TutorialsPage from './pages/TutorialsPage';
import ToolsPage from './pages/ToolsPage';
import CoursesPage from './pages/CoursesPage';
import AutomationPage from './pages/AutomationPage';
import './index.css';

export function App() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Clean up on unmount
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white font-['Inter',sans-serif]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogPostPage />} />
            <Route path="/tutorials" element={<TutorialsPage/>}/>
            <Route path='/tools' element={<ToolsPage/>}/>
            <Route path='/courses' element={<CoursesPage/>}/>
            <Route path='/automations' element={<AutomationPage/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
