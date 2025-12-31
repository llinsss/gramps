import './globals.css';
import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

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
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
