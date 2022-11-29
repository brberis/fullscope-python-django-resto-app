import React from 'react';
import './Footer.css';
import { AiOutlineGithub } from "react-icons/ai"; //Adding the react icon //
import { AiOutlineCopyright} from "react-icons/ai";

//Building the footer session for all the pages//
 function Footer() {

  return (
    <section className="content-footer">
      <div className="main-content">
        <div className="footer">
          <p>AI Dream</p>
          <AiOutlineCopyright className='copy'/>
          <br />
          <div className="social-links">
            <a
              href="https://github.com/brberis/ai-dream-io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineGithub className=" social" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
