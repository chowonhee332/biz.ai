import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import NewsPage from './NewsPage.tsx';
import NewsDetailPage from './NewsDetailPage.tsx';
import UseCasePage from './UseCasePage.tsx';
import UseCaseDetailPage from './UseCaseDetailPage.tsx';
import AiAgentsPage from './AiAgentsPage.tsx';
import AiSolutionsPage from './AiSolutionsPage.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ai-agents" element={<AiAgentsPage />} />
        <Route path="/ai-solutions" element={<AiSolutionsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/use-cases" element={<UseCasePage />} />
        <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
