"use client"; // Add this directive to indicate a Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import React Bootstrap components

export default function Home() {
  useEffect(() => {
    // Import Bootstrap JS for Carousel functionality
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    // Initialize Tawk.to Live Chat Widget
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/66d45eb9ea492f34bc0c6acf/1i6mp41et'; // Use your Tawk.to property ID
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar Section using React Bootstrap */}
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand className="d-flex align-items-center">
              <Image 
                src="/logo.jpeg" 
                alt="AU Connect Logo" 
                width={40} 
                height={40} 
                priority
                className="rounded-circle me-2"
              />
              AU Connect Dashboard
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/signin" passHref legacyBehavior>
                <Nav.Link>Sign In</Nav.Link>
              </Link>
              <Link href="/signup" passHref legacyBehavior>
                <Nav.Link>Sign Up</Nav.Link>
              </Link>
              <Link href="/call" passHref legacyBehavior>
                <Nav.Link>Contact Admin</Nav.Link>
              </Link>
              <Nav.Link href="#" disabled>
                Disabled Link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Section */}
      <main className="container my-4 flex-grow-1">
        <h2 className="text-center fw-bold fs-3 mb-4">Welcome to AU Connect</h2>
        <div className="row g-4">
          <Link href="/announcements" className="col-md-6 col-lg-3 text-decoration-none">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-danger">Announcements</h3>
                <p className="card-text">Check the latest announcements and updates.</p>
              </div>
            </div>
          </Link>
          <Link href="/contacts" className="col-md-6 col-lg-3 text-decoration-none">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-danger">Contact Management</h3>
                <p className="card-text">Manage your contacts within the university.</p>
              </div>
            </div>
          </Link>
          <Link href="/email" className="col-md-6 col-lg-3 text-decoration-none">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-danger">Email Communication</h3>
                <p className="card-text">Send and receive emails directly through the platform.</p>
              </div>
            </div>
          </Link>
          <Link href="/call" className="col-md-6 col-lg-3 text-decoration-none">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-danger">Contact Admin</h3>
                <p className="card-text">Make direct contact to the school Admin office for Assistance.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Carousel Section for Recent Activities and Announcements */}
        <div id="announcementCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
          <div className="carousel-inner rounded-3 shadow-lg">
            <div className="carousel-item active">
              <div className="p-4">
                <Image 
                  src="/announcement1.jpg" 
                  alt="Announcement 1" 
                  className="d-block w-100 rounded"
                  width={800}
                  height={400}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Assumption University Thailand</h5>
                  <p>Welcome to our AU Connect Intercom. We are at your service for Communication</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="p-4">
                <Image 
                  src="/announcement2.jpg" 
                  alt="Announcement 2" 
                  className="d-block w-100 rounded"
                  width={800}
                  height={400}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Graduation Ceremony</h5>
                  <p>Our Students Graduation ceremony comes up soon. Stay tuned for the date and venue</p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="p-4">
                <Image 
                  src="/announcement3.png" 
                  alt="Announcement 3" 
                  className="d-block w-100 rounded"
                  width={800}
                  height={400}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Announcement 3</h5>
                  <p>Further information on events or announcements.</p>
                </div>
              </div>
            </div>
            {/* New Carousel Item for YouTube Video */}
            <div className="carousel-item">
              <div className="p-4">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe 
                    className="d-block w-100 rounded"
                    width="800"
                    height="400"
                    src="https://www.youtube.com/embed/6BOGyAikrTQ"
                    title="Announcement 4"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Announcement 4</h5>
                  <p>Watch the latest video announcement for more information.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#announcementCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#announcementCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-danger text-white py-3 text-center">
        © {new Date().getFullYear()} Assumption University - All Rights Reserved
      </footer>
    </div>
  );
}


