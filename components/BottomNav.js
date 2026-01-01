import Link from 'next/link';
import styles from './BottomNav.module.css';

export default function BottomNav() {
    const menuItems = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Calendar', path: '/calendar', icon: '📅' },
        { name: 'Tasks', path: '/tasks', icon: '✅' },
        { name: 'Health', path: '/health', icon: '❤️' },
        { name: 'Visits', path: '/visits', icon: '📝' },
        // Vault is less critical for quick mobile access, or can be 5th item. 
        // Let's stick to 5 items for best fit. 'Documents' can be accessed via Dashboard or we swap Visits.
        // Let's keep specific mobile optimized list.
    ];

    return (
        <nav className={styles.bottomNav}>
            {menuItems.map((item) => (
                <Link href={item.path} key={item.name} className={styles.navItem}>
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.name}</span>
                </Link>
            ))}
        </nav>
    );
}
