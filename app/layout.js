import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Gramps - Senior Care Coordinator',
  description: 'Coordinate care for your aging parents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
