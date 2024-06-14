import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-auto bg-[#121212] text-white mt-16 px-[2%]">
      <div className="container mx-auto py-16 px-8 flex flex-col space-y-12 md:flex-row md:space-y-0 md:space-x-12 relative">
        {/* Logo */}
        <div className="flex flex-col space-y-4">
          <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
        </div>

        {/* About Section */}
        <div className="w-[326.5px] flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold leading-[21.6px] tracking-[-0.2px] text-left">About Rentaly</h3>
          <p className="font-inter text-[14px] font-normal leading-[27.2px] tracking-[-0.2px] text-justify">
            Where quality meets affordability. Weunderstand the importance of a smooth and enjoyable journey without the burden of
            excessive costs. That's why we have meticulously crafted our offerings to provide you with top-notch vehicles at minimum expense.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="relative w-[326.5px] flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold leading-[21.6px] tracking-[-0.2px] text-left">Contact Info</h3>
          <div className="font-inter text-[14px] font-normal leading-[27.2px] tracking-[-0.2px] text-left">
            <div className="flex items-center space-x-2">
              <img src="/images/location.png" alt="" />
              <span>08 W 36th St, New York, NY 10001</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/phone.png" alt="" />
              <span>+1 333 9296</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/mail.png" alt="" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/pdf.png" alt="" />
              <span>Download Brochure</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="w-[151px] flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold leading-[21.6px] tracking-[-0.2px] text-left">Quick Links</h3>
          <ul className="font-inter text-[14px] font-normal leading-[27.2px] tracking-[-0.2px] text-left space-y-2">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>News</li>
            <li>Partners</li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="absolute top-[80px] right-0 mt-4 mr-4 flex items-center space-x-2 px-[3%]">
          <a href="#"><img src="/images/facebook.png" alt="Facebook" className="w-[40px] h-[40px] left-[1662px]" /></a>
          <a href="#"><img src="/images/x.png" alt="Twitter" className="w-[40px] h-[40px] left-[1712.03px]" /></a>
          <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" className="w-[40px] h-[40px] left-[1762.06px]" /></a>
        </div>

        <div className='py-20'>
          {/* Input with Sign In button */}
          <div className="relative">
            <input
              type="text"
              placeholder="Your email address"
              className="w-[462px] h-[71.75px] top-[53px] left-[969px] px-[30px] gap-0 border-[1px] bg-[#FFFFFF21] border-[#FFFFFF21] text-white rounded-[60px] font-dm-sans text-[15px] font-normal leading-[19.53px] text-left"
            />
            <button className="absolute top-[10px] left-[356.69px] w-[95.31px] h-[51.75px] gap-0 border-[1px] border-[#FFFFFF21] bg-[#1ECB15] rounded-[60px] text-white text-[15px]">Sign In</button>
          </div>
        </div>
        {/* Arrow Section */}
        <div className="absolute top-[350px] right-0 mt-4 mr-4 flex items-center space-x-2 px-[3%]">
          <a href="#"><img src="/images/flech.png" alt="Arrow" className="w-[40px] h-[40px]" /></a>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="w-full bg-[#121212] py-4 ">
        <div className="container mx-auto text-center border-t border-gray-700 pt-4">
          <p className="font-inter text-[15px] font-normal leading-[27.2px] tracking-[-0.2px]">
            &copy; 2023 Rentaly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
