import React, { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import "./footer.css";

const Footer = () => {
  const service = UserService();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchcat = async () => {
      const res = await service.getAllCategories();
      setCategories(res);
    };
    fetchcat();
  }, []);

  return (
    <footer className=" bg-slate-100">
      <div className="footer-first-row">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <ul className="call-email-alt">
                <li>
                  <a href="#" className="callemail">
                    <span
                      className="iconify"
                      data-icon="uil:dialpad-alt"
                    ></span>
                    1800-000-000
                  </a>
                </li>
                <li>
                  <a href="#" className="callemail">
                    <span
                      className="iconify"
                      data-icon="uil:envelope-alt"
                    ></span>
                    <span
                      className="__cf_email__"
                      data-cfemail="0d64636b624d6a6c606f627e787d687f606c7f666879236e6260"
                    >
                      info@abc.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="social-links-footer">
                <ul>
                  <li>
                    <img
                      src="https://viaanmart.herokuapp.com/image/xT09Opz9y"
                      alt=""
                    />
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-second-row">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Categories</h4>
                <ul>
                  {categories?.map((category, index) => (
                    <li key={index}>
                      <a style={{ cursor: "pointer" }}>{category.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <a href="/main-page/terms-&-condition">T&C</a>
                  </li>
                  <li>
                    <a href="/main-page/new-products">New Products</a>
                  </li>
                  <li>
                    <a href="/main-page/contact-us">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="second-row-item">
                <h4>Top Cities</h4>
                <ul>
                  <li>
                    <a>Gurugram</a>
                  </li>
                  <li>
                    <a>New Delhi</a>
                  </li>
                  <li>
                    <a>Bangaluru</a>
                  </li>
                  <li>
                    <a>Mumbai</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="second-row-item-app">
                <h4>Download App</h4>
                <ul>
                  <li>
                    <a href="#">
                      <img
                        className="download-btn"
                        src="assets/images/download-1.svg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        className="download-btn"
                        src="assets/images/download-2.svg"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="second-row-item-payment">
                <h4>Payment Method</h4>
                <div className="footer-payments">
                  <ul id="paypal-gateway" className="financial-institutes">
                    <li className="financial-institutes__logo">
                      <img
                        alt="Visa"
                        title="Visa"
                        src="assets/images/footer-icons/pyicon-6.svg"
                      />
                    </li>
                    <li className="financial-institutes__logo">
                      <img
                        alt="Visa"
                        title="Visa"
                        src="assets/images/footer-icons/pyicon-1.svg"
                      />
                    </li>
                    <li className="financial-institutes__logo">
                      <img
                        alt="MasterCard"
                        title="MasterCard"
                        src="assets/images/footer-icons/pyicon-2.svg"
                      />
                    </li>
                    <li className="financial-institutes__logo">
                      <img
                        alt="American Express"
                        title="American Express"
                        src="assets/images/footer-icons/pyicon-3.svg"
                      />
                    </li>
                    <li className="financial-institutes__logo">
                      <img
                        alt="Discover"
                        title="Discover"
                        src="assets/images/footer-icons/pyicon-4.svg"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-last-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="footer-bottom-links">
                <ul>
                  <li>
                    <a href="about_us.html">About</a>
                  </li>
                  <li>
                    <a href="contact_us.html">Contact</a>
                  </li>
                  <li>
                    <a href="privacy_policy.html">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="term_and_conditions.html">Term & Conditions</a>
                  </li>
                  <li>
                    <a href="refund_and_return_policy.html">
                      Refund & Return Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from 'react'
// import { Button } from "../styles/Button";
// import styled from "styled-components";
// import { NavLink } from 'react-router-dom';
// import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
// const Footer = () => {
//   return (
//     <Wrapper>
//       <section className="contact-short">
//           <div className="grid grid-two-column">
//             <div>
//               <h3>Ready to get started?</h3>
//               <h3>Talk to us today</h3>
//             </div>

//             <div>
//               <Button className="btn hireme-btn">
//                 <NavLink to="/"> Get Started </NavLink>
//               </Button>
//             </div>
//           </div>
//         </section>
// {/* main footer */}

// <footer>
//           <div className="container grid grid-four-column">
//             <div className="footer-about">
//               <h3>Company Name</h3>
//               <p>Welcome to [Your E-Commerce Store], your one-stop destination for all your shopping needs.</p>
//             </div>
//             <div className="footer-subscribe">
//               <h3>Subscribe to get important updates</h3>
//               <form action="#">
//                 <input type="email" name="email" placeholder="YOUR E-MAIL" />

//                 <input type="submit" value="subscribe" />
//               </form>
//             </div>
//             <div className="footer-social">
//               <h3>Follow Us</h3>
//               <div className="footer-social--icons">
//                 <div>
//                   <FaDiscord className="icons" />
//                 </div>
//                 <div>
//                 <a
//                 href="https://www.instagram.com/"
//                 target="_blank">
//                   <FaInstagram className="icons" /></a>
//                 </div>
//                 <div>
//                   <a
//                     href="https://www.youtube.com/"
//                     target="_blank">
//                     <FaYoutube className="icons" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="footer-contact">
//               <h3>Call Us</h3>
//               <h3>+91 12345678845</h3>
//             </div>
//           </div>

//           <div className="footer-bottom--section">
//             <hr />
//             <div className="container grid grid-two-column ">
//               <p>
//                 @{new Date().getFullYear()} Company Name. All Rights Reserved
//               </p>
//               <div>
//                 <p>PRIVACY POLICY</p>
//                 <p>TERMS & CONDITIONS</p>
//               </div>
//             </div>
//           </div>
//         </footer>
//     </Wrapper>
//   )
// }
// const Wrapper = styled.section`
//  background-color:#232F3E;
//   .iSIFGq {
//     margin: 0;
//   }

//   .contact-short {
//     max-width: 60vw;
//     margin: auto;
//     padding: 5rem 10rem;
//     background-color: white;
//     border-radius: 1rem;
//     box-shadow: ${({ theme }) => theme.colors.shadowSupport};
//     transform: translateY(50%);

//     .grid div:last-child {
//       background-color:#232F3E;
//       justify-self: end;
//       align-self: center;
//     }
//   }

//   footer {
//     padding:0;
//     //background-color: #e74c3c;
//     background-color: #232F3E;
//     ${'' /* background-color: ${({ theme }) => theme.colors.footer_bg}; */}
//     h3 {
//       color: black;
//       margin-bottom: 5.4rem;
//     }
//     p {
//       color: black;
//     }
//     .container {
// width: 100%;
//   margin: 0 auto;
//   padding:12rem 0rem;
//    background-color:#232F3E;//FCDAC7;//#af7a6d;//#f8f9fa;
//  // background-color:#3CB371;
// }
//     .footer-social--icons {
//       display: flex;
//       gap: 2rem;

//       div {
//         padding: 1rem;
//         border-radius: 50%;
//         border: 2px solid #803B3F;

//         .icons {
//           color: #803B3F;
//           font-size: 2.4rem;
//           position: relative;
//           cursor: pointer;
//         }
//       }
//     }
//   }

//   .footer-subscribe {

//     form {
//       input[type="submit"] {
//          background-color:#232F3E; /* Or any specific grey color code like #808080 */
//         color: black; /* White text color */
//         border: none; /* Optional: removes border */
//         // Add other styles as needed for padding, font, etc.
//       }
//     }
//   }
//   .footer-bottom--section {
//     padding-top: 2rem;
//     padding-bottom: 4rem;
//     background-color:#232F3E;
//     hr {
//       margin-bottom: 2rem;
//       color: white;
//       height: 0.1px;
//     }
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     .contact-short {
//       max-width: 80vw;
//       margin: 4.8rem auto;
//       transform: translateY(0%);
//       text-align: center;

//       .grid div:last-child {
//         justify-self: center;

//       }
//     }

//     footer {
//       background-color:#232F3E;
//       padding: 9rem 0 9rem 0;
//     }

//     .footer-bottom--section {
//       background-color:#232F3E;
//       padding-top: 4.8rem;
//     }
//   }
// `;

// export default Footer;
