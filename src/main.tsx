import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.tsx';
import PageSkeleton from './components/PageSkeleton.tsx';
import './index.css';

const App = lazy(() => import('./App.tsx'));
const NewsPage = lazy(() => import('./NewsPage.tsx'));
const NewsDetailPage = lazy(() => import('./NewsDetailPage.tsx'));
const UseCasePage = lazy(() => import('./UseCasePage.tsx'));
const UseCaseDetailPage = lazy(() => import('./UseCaseDetailPage.tsx'));
const AiAgentsPage = lazy(() => import('./AiAgentsPage.tsx'));
const AiSolutionsPage = lazy(() => import('./AiSolutionsPage.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/ai-agents" element={<AiAgentsPage />} />
            <Route path="/ai-solutions" element={<AiSolutionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/use-cases" element={<UseCasePage />} />
            <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
