import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../style.css';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About me' },
  { id: 'contact', label: 'Contact me' },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();

    if (!name || !email) {
      setFormMessage({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }

    setFormMessage({
      text: `Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`,
      type: 'success',
    });
    event.currentTarget.reset();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">My Portfolio</div>
          <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
            {sections.map(({ id, label }) => (
              <li className="nav-item" key={id}>
                <a
                  className={`nav-link${activeSection === id ? ' active' : ''}`}
                  href={`#${id}`}
                  onClick={(event) => scrollToSection(event, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      <main>
        <section id="home" className="section home-section">
          <div className="container">
            <div className="home-content">
              <h1 className="hero-title">Hello! I am Alfonso Santino P. Ragadio</h1>
              <button className="cta-button" type="button" onClick={(event) => scrollToSection(event, 'about')}>
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <p className="about-text">
                I&apos;m a motivated and adaptable Computer Engineering student with a passion for technology,
                problem-solving, and web development. I enjoy learning new skills, working on projects, and finding
                practical solutions to challenges. I&apos;m always eager to improve and gain new experiences.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Contact Me</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-input" id="name" name="name" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-input" id="email" name="email" type="email" placeholder="Enter your email address" required />
              </div>
              <button className="submit-button" type="submit">Submit</button>
            </form>
            <div className={`success-message ${formMessage.type}`} role="status" aria-live="polite">
              {formMessage.text}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<Portfolio />);
