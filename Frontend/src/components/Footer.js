import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear(); // Merr vitin aktual
  return (
    <div className='footer-container'> 
        <div className='footer-container-p'> 
            <p>By accessing, continuing to use or navigating throughout this site you accept that we will use certain browser cookies to improve your customer experience with us. Our site only uses cookies which will improve your experience with us and will not interfere with your privacy. Please refer to our Cookies Policy for further information on our use of cookies and how you can disable or manage their use should you wish.</p>
            <p>Gambling can be addictive, please play responsibly. For information on support measures, please visit our Responsible Gambling Help page.</p>
            <p>© {currentYear}. All rights reserved.</p>  
        </div>
    </div>
  )
}

export default Footer;
