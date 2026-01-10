import Link from 'next/link';
import styles from './Sidebar.module.css';
import WalletConnect from './WalletConnect';
import { Home, Calendar, CheckSquare, Heart, FileText, ClipboardList } from 'lucide-react'; // Using lucide icons for consistency

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Care Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Health', path: '/health', icon: <Heart size={20} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} /> },
    { name: 'Visit Log', path: '/visits', icon: <ClipboardList size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className="gradient-text">Gramps</span>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link href={item.path} key={item.name} className={styles.link}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.profile}>
        <div style={{ marginBottom: '16px', width: '100%' }}>
          <WalletConnect className="w-full" />
        </div>
        <div className={styles.flexRow}>
          <div className={styles.avatar}>JS</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Jane Smith</p>
            <p className={styles.userRole}>Family Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
