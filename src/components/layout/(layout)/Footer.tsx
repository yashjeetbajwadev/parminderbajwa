import { footerNavigation } from '../../../app/contentSections';

function Footer() {
  return (
    <div className='mx-auto mt-6 max-w-7xl px-6 dark:bg-boxdark-2 lg:px-8'>
      <footer
        aria-labelledby='footer-heading'
        className='relative border-t border-gray-900/10 py-24 dark:border-gray-200/10 sm:mt-32'
      >
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mt-10 flex items-start justify-end gap-20'>
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>App</h3>
            <ul role='list' className='mt-6 space-y-4'>
              {footerNavigation.app.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>Company</h3>
            <ul role='list' className='mt-6 space-y-4'>
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className='text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-white'>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
