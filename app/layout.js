import './globals.css';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from 'sonner';
import AIAssistant from '@/components/AIAssistant';

export const metadata = {
  title: 'Gramps - Senior Care Coordinator',
  description: 'Coordinate care for your aging parents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="layout-container">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
            <AIAssistant />
            <BottomNav />
            <Toaster position="top-center" theme="dark" />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
