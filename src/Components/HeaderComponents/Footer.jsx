
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-light border-top w-100 py-2 px-3 mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 mb-2">
                <h6 className="mb-1">Help</h6>
                <p className="mb-0 small">Customer Support</p>
                <p className="mb-0 small">Terms & Conditions</p>
                <p className="mb-0 small">Privacy Policy</p>
              </div>

              <div className="col-md-4 mb-2 text-center">
                {/* <img src="/logo.png" alt="logo" style={{ width: "50px" }} /> */}
                  <strong>I FOUND</strong>
                <p className="mt-1 mb-0 small">© 2025 Lost and Found</p>
              </div>

              <div className="col-md-4 mb-2">
                <h6 className="mb-1">Contact</h6>
                <p className="mb-0 small">Tel: +91 000000000</p>
                <p className="mb-0 small">Email: project@lostFound.com</p>

                <div className="d-flex gap-2 mt-1">
                  <i className="bi bi-facebook fs-5"></i>
                  <i className="bi bi-instagram fs-5"></i>
                  <i className="bi bi-youtube fs-5"></i>
                </div>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer