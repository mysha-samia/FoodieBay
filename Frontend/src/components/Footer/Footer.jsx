import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.FoodieBay} className="footer-content-left-img"/>
          <p>
            Choose FoodieBay for flavors you love, speed you trust, and
            convenience you deserve. Satisfy your cravings, effortlessly
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </div>

        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+8801768439876</li>
            <li>contact@foodiebay.com</li>
          </ul>
        </div>
      </div>
      <hr className="footer-hr"/>
      <p className="footer-copy-right">
        &copy; 2024 FoodieBay. Discover deliciousness, delivered to your
        doorstep. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
