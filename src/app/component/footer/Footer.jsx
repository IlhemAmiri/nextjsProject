import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#121212] text-white px-6 md:px-[2%]">
      <div className="container mx-auto py-16 flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
        {/* Logo */}
        <div className="flex flex-col space-y-4">
          <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
        </div>

        {/* About Section */}
        <div className="flex-1 flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold">About Rentaly</h3>
          <p className="font-inter text-[14px] leading-[27.2px] text-justify">
            Where quality meets affordability. We understand the importance of a smooth and enjoyable journey without the burden of excessive costs. That's why we have meticulously crafted our offerings to provide you with top-notch vehicles at minimum expense.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex-1 flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold">Contact Info</h3>
          <div className="font-inter text-[14px] leading-[27.2px]">
            <div className="flex items-center space-x-2">
              <img src="/images/location.png" alt="Location" />
              <span>08 W 36th St, New York, NY 10001</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/phone.png" alt="Phone" />
              <span>+1 333 9296</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/mail.png" alt="Mail" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <img src="/images/pdf.png" alt="PDF" />
              <span>Download Brochure</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex-1 flex flex-col space-y-4 px-4">
          <h3 className="font-outfit text-[18px] font-semibold">Quick Links</h3>
          <ul className="font-inter text-[14px] leading-[27.2px] space-y-2">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>News</li>
            <li>Partners</li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex flex-col items-center space-y-4 px-4 md:mt-0">
          <div className="flex space-x-2">
            <a href="#"><img src="/images/facebook.png" alt="Facebook" className="w-[40px] h-[40px]" /></a>
            <a href="#"><img src="/images/x.png" alt="Twitter" className="w-[40px] h-[40px]" /></a>
            <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" className="w-[40px] h-[40px]" /></a>
          </div>
          {/* Input with Sign In button */}
          <div className="py-20 flex justify-center items-center">
            <div className="flex items-center w-full max-w-lg sm:max-w-md h-[71.75px] bg-[#FFFFFF21] border border-[#FFFFFF21] rounded-[60px] overflow-hidden px-2">
              <input
                type="text"
                placeholder="Your email address"
                className="flex-grow h-full px-4 sm:px-2 text-white bg-transparent font-dm-sans text-[15px] font-normal leading-[19.53px] outline-none rounded-l-[60px]"
              />
              <button className="w-[95.31px] h-[51.75px] bg-[#1ECB15] text-white text-[15px] flex items-center justify-center rounded-[60px]">Sign In</button>
            </div>
          </div>

        </div>
      </div>
      {/* Arrow Section */}
      <div className="container mx-auto flex justify-end px-4 mt-4">
        <a href="#"><img src="/images/flech.png" alt="Arrow" className="w-[40px] h-[40px]" /></a>
      </div>

      {/* Bottom Footer */}
      <div className="w-full py-4 bg-[#121212]">
        <div className="container mx-auto text-center border-t border-gray-700 pt-4">
          <p className="font-inter text-[15px] leading-[27.2px]">
            &copy; 2023 Rentaly. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
