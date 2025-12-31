import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Care Tasks', path: '/tasks', icon: '✅' },
    { name: 'Health', path: '/health', icon: '❤️' },
    { name: 'Documents', path: '/documents', icon: '📄' },
    { name: 'Visit Log', path: '/visits', icon: '📝' },
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
        <div className={styles.avatar}>JS</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>Jane Smith</p>
          <p className={styles.userRole}>Family Manager</p>
        </div>
      </div>
    </aside>
  );
}
