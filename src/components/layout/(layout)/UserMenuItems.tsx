import { TfiDashboard } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const UserMenuItems = ({ setMobileMenuOpen }: { setMobileMenuOpen?: any }) => {
  const path = window.location.pathname;

  const handleMobileMenuClick = () => {
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <ul
      className={cn(
        `flex flex-col gap-5 border-b border-stroke py-4 dark:border-strokedark ${path.includes('admin') ? 'px-6' : 'sm:px-6'}`
      )}
    >
      <li className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-500'>
        <Link
          to='/admin'
          onClick={handleMobileMenuClick}
          className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-500'
        >
          <TfiDashboard size='1.1rem' />
          Admin Dashboard
        </Link>
      </li>
    </ul>
  );
};
