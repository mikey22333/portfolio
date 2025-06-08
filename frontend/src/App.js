import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaCode, FaLaptopCode, FaPalette, FaMobile, FaRocket, FaServer, FaArrowRight, FaArrowLeft, FaDownload, FaPlay, FaHome, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Projects data
const allProjects = [
  {
    id: 1,
    title: "Fine Builders & Interiors",
    description: "A modern, responsive website for Fine Builders & Interiors, a leading interior design company based in Kerala, India. Features cutting-edge web development with focus on user experience, performance, and SEO optimization.",
    longDescription: "Fine Builders & Interiors is a comprehensive business website designed to showcase interior design services, portfolio projects, and facilitate client engagement. The website combines modern design aesthetics with robust functionality, featuring smooth animations, interactive elements, and glass morphism effects. Built with React 18, TypeScript, and Vite for optimal performance.",
    detailedDescription: "Fine Builders & Interiors represents a pinnacle of modern web development, showcasing a leading interior design company based in Kerala, India. This project demonstrates expertise in creating sophisticated business websites that combine aesthetic excellence with functional superiority.\n\nThe website features a comprehensive service showcase, interactive portfolio gallery, and seamless client engagement tools. Built with cutting-edge technologies including React 18, TypeScript, and Vite, it delivers exceptional performance and user experience.\n\nKey technical achievements include responsive design implementation, SEO optimization, smooth animations with Framer Motion, and integration of modern web standards. The project showcases advanced development skills in creating business-focused web solutions.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Wouter"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    category: "Business Website",
    date: "2025",
    status: "Live",
    client: "Fine Builders & Interiors",
    duration: "1 week",
    team: "Solo Developer",
    features: ["Responsive Design", "SEO Optimized", "Contact Integration", "Portfolio Gallery"],
    liveUrl: "https://finebuilders.netlify.app",
    githubUrl: "https://github.com/mikey22333/fine-builders",
    challenges: ["Complex design requirements", "Performance optimization", "SEO implementation", "Mobile responsiveness"],
    solutions: ["Modern React architecture", "Optimized asset delivery", "Structured data markup", "Mobile-first design approach"],
    results: ["95+ Lighthouse score", "100% mobile responsive", "Fast loading times", "Professional online presence"]
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management. Features comprehensive reporting and user-friendly interface.",
    longDescription: "A comprehensive e-commerce admin dashboard built with modern web technologies. Includes real-time sales analytics, inventory management, order processing, customer management, and detailed reporting. The dashboard provides intuitive data visualization and streamlined workflows for business operations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "Material-UI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    category: "Web Application",
    date: "2024",
    status: "In Development",
    client: "Local Business",
    duration: "4 months",
    team: "Solo Developer",
    features: ["Real-time Analytics", "Inventory Management", "Order Processing", "Reporting"]
  },
  {
    id: 3,
    title: "Restaurant Management System",
    description: "Complete restaurant management solution with online ordering, table reservations, menu management, and POS integration. Streamlines restaurant operations with modern technology.",
    longDescription: "A comprehensive restaurant management system designed to modernize food service operations. Features include online ordering system, table reservation management, digital menu displays, inventory tracking, staff scheduling, and integrated POS system. Built with responsive design for use across all devices.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Socket.io"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    category: "Business Application",
    date: "2023",
    status: "Completed",
    client: "Local Restaurant Chain",
    duration: "5 months",
    team: "Solo Developer",
    features: ["Online Ordering", "Table Reservations", "POS Integration", "Inventory Management"]
  },
  {
    id: 4,
    title: "Portfolio Website Template",
    description: "Modern, responsive portfolio website template for creative professionals. Features smooth animations, dark theme, and optimized performance for showcasing work and skills.",
    longDescription: "A sleek and professional portfolio website template designed for developers, designers, and creative professionals. Built with modern React and advanced CSS animations, it features a dark theme, smooth scrolling, interactive elements, and mobile-first responsive design. Includes sections for projects, skills, testimonials, and contact information.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "EmailJS", "React Router"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
    category: "Portfolio",
    date: "2024",
    status: "Live",
    client: "Personal Project",
    duration: "2 months",
    team: "Solo Developer",
    features: ["Responsive Design", "Dark Theme", "Smooth Animations", "Contact Form"]
  },
  {
    id: 5,
    title: "Task Management Application",
    description: "Collaborative task management application with real-time updates, team collaboration features, and project tracking. Designed for productivity and team coordination.",
    longDescription: "A comprehensive task management application built for teams and individuals to organize, track, and collaborate on projects. Features include real-time updates, drag-and-drop task boards, team chat, file sharing, deadline tracking, and progress analytics. Built with modern web technologies for optimal performance and user experience.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    category: "Productivity",
    date: "2023",
    status: "Completed",
    client: "Startup Company",
    duration: "4 months",
    team: "Solo Developer",
    features: ["Real-time Updates", "Team Collaboration", "Project Tracking", "File Sharing"]
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Modern weather application with real-time forecasts, interactive maps, and location-based weather alerts. Features beautiful UI and comprehensive weather data visualization.",
    longDescription: "A comprehensive weather dashboard application that provides real-time weather information, 7-day forecasts, interactive weather maps, and location-based alerts. Built with modern design principles, it features beautiful data visualizations, responsive design, and integration with multiple weather APIs for accurate and up-to-date information.",
    tech: ["React", "JavaScript", "Weather API", "Chart.js", "CSS3", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
    category: "Web Application",
    date: "2023",
    status: "Completed",
    client: "Personal Project",
    duration: "1 month",
    team: "Solo Developer",
    features: ["Real-time Weather", "Interactive Maps", "Weather Alerts", "Data Visualization"]
  }
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const form = useRef();
  const heroRef = useRef();
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaCode />,
      title: "Frontend Development",
      description: "Crafting immersive user experiences with cutting-edge React, Next.js, and modern JavaScript frameworks.",
      color: "from-blue-500 to-cyan-500",
      delay: "0s"
    },
    {
      icon: <FaServer />,
      title: "Full-Stack Development", 
      description: "Building scalable applications with Node.js, Python, databases, and cloud architecture solutions.",
      color: "from-purple-500 to-pink-500",
      delay: "0.1s"
    },
    {
      icon: <FaPalette />,
      title: "UI/UX Design & Development",
      description: "Transforming ideas into stunning, user-centered interfaces with advanced design systems.",
      color: "from-green-500 to-teal-500",
      delay: "0.2s"
    },
    {
      icon: <FaMobile />,
      title: "Mobile-First Solutions",
      description: "Creating responsive, performant applications optimized for every device and screen size.",
      color: "from-orange-500 to-red-500",
      delay: "0.3s"
    },
    {
      icon: <FaLaptopCode />,
      title: "E-Commerce & Business Platforms",
      description: "Building high-converting online stores and business platforms with integrated payment systems.",
      color: "from-indigo-500 to-purple-500",
      delay: "0.4s"
    },
    {
      icon: <FaRocket />,
      title: "Performance & Deployment",
      description: "Optimizing applications for speed and deploying to modern cloud platforms with CI/CD pipelines.",
      color: "from-pink-500 to-rose-500",
      delay: "0.5s"
    }
  ];

  const featuredProjects = allProjects.slice(0, 3);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "CTO & Co-Founder",
      company: "NeuralTech AI",
      image: "https://images.unsplash.com/photo-1657128344786-360c3f8e57e5?w=80&h=80&fit=crop&crop=face",
      quote: "Riyas doesn't just build websites - he creates digital experiences that transform businesses. His innovative approach to our AI platform exceeded every expectation.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Infinity Digital Studios",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
      quote: "Working with Riyas was like watching magic happen. He took our complex vision and turned it into a stunning, functional reality that our users absolutely love.",
      rating: 5
    },
    {
      name: "Elena Vasquez",
      role: "Head of Innovation", 
      company: "TechFlow Ventures",
      image: "https://images.pexels.com/photos/4057039/pexels-photo-4057039.jpeg?w=80&h=80&fit=crop&crop=face",
      quote: "Riyas combines technical brilliance with creative vision. Our platform's user engagement increased by 300% after his redesign. Simply extraordinary work.",
      rating: 5
    }
  ];

  const skills = [
    { name: "Frontend Development", level: 95, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { name: "React & Next.js", level: 92, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Backend Development", level: 88, color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { name: "UI/UX Design", level: 85, color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { name: "Database Design", level: 87, color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { name: "Cloud & DevOps", level: 83, color: "bg-gradient-to-r from-pink-500 to-rose-500" }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      // Parallax effect for hero
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Reveal animations
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial scroll event
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Typewriter effect
    const text = "Freelance Web Developer";
    let index = 0;
    setIsTyping(true);
    
    const typeWriter = () => {
      if (index < text.length) {
        const element = document.getElementById('typewriter');
        if (element) {
          element.textContent = text.slice(0, index + 1);
        }
        index++;
        setTimeout(typeWriter, 100);
      } else {
        setIsTyping(false);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Initialize EmailJS
    try {
      const publicKey = 'NM8qw6T7CM17WbPC9';
      emailjs.init(publicKey);
      console.log('EmailJS initialized with key:', publicKey.slice(0, 4) + '...');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      console.log('Sending email with config:', {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY?.slice(0, 4) + '...'
      });

      // Add timestamp to the form data
      const formData = new FormData(form.current);
      formData.append('timestamp', new Date().toLocaleString());
      
      const result = await emailjs.sendForm(
        'service_ev6f90t',
        'template_l4mpub1',
        form.current,
        'NM8qw6T7CM17WbPC9'
      );

      console.log('EmailJS response:', result);

      if (result.text === 'OK') {
        setMessage("Message sent successfully! I'll get back to you soon.");
        form.current.reset();
      } else {
        console.error('Email sending failed with result:', result);
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage(`Failed to send message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                RIYAS
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20 animate-pulse"></div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'services', 'projects', 'testimonials', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === section 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                    activeSection === section ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="burger-menu">
                <div className={`line ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`line ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`line ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden mobile-menu ${isMenuOpen ? 'open' : 'closed'}`}>
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-lg mt-4 p-6 border border-gray-800">
              {['home', 'about', 'services', 'projects', 'testimonials', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-3 capitalize text-gray-300 hover:text-blue-400 transition-colors border-b border-gray-800 last:border-b-0"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 hero-bg" ref={heroRef}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-gray-900/50"></div>
          <div className="geometric-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <span className="text-blue-400 text-lg font-medium tracking-wide uppercase animate-slide-up">Welcome to my digital universe of</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="inline-block animate-slide-up-delay-1"></span>
                <br />
                <span className="relative inline-block animate-slide-up-delay-2">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                    RIYAS
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse"></div>
                </span>
              </h1>
              
              <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 animate-slide-up-delay-3">
                <span id="typewriter"></span>
                <span className={`inline-block w-0.5 h-8 bg-blue-400 ml-1 ${isTyping ? 'animate-blink' : ''}`}></span>
              </div>
              
              <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay-4">
                Crafting next-generation digital experiences with cutting-edge technologies. 
                I transform complex ideas into stunning, interactive web applications that push the boundaries of what's possible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-delay-5">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Let's Create Something Amazing
                    <FaRocket className="ml-2 group-hover:animate-bounce" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-4 border-2 border-blue-400 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center group-hover:text-gray-900">
                    Explore My Universe
                    <FaPlay className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      I'm not just a developer – I'm a digital architect who brings imagination to life through code. 
                      With a passion for innovation and an eye for perfection, I craft web experiences that don't just function, they inspire.
                    </p>
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      My journey spans across cutting-edge technologies, from AI-powered applications to immersive 3D experiences. 
                      I believe in pushing boundaries and creating solutions that make a real impact.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mt-8">
                      <div className="stat-card">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          150+
                        </div>
                        <div className="text-gray-400">Projects Completed</div>
                      </div>
                      <div className="stat-card">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          5+
                        </div>
                        <div className="text-gray-400">Years Mastering</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="reveal">
                <h3 className="text-2xl font-bold mb-8 text-center">Technical Mastery</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-blue-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className={`skill-fill ${skill.color}`}
                          style={{ '--skill-width': `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center">
                      Download Resume
                      <FaDownload className="ml-2 group-hover:animate-bounce" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Transforming ideas into digital reality with cutting-edge solutions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`service-card reveal`}
                  style={{ animationDelay: service.delay }}
                >
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur" 
                         style={{ background: `linear-gradient(135deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` }}></div>
                    
                    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:border-gray-600">
                      <div className={`text-4xl mb-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                        Learn More <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A showcase of innovative solutions and creative implementations
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="project-card reveal group">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:shadow-2xl">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-sm rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm border border-gray-500/30">
                            +{project.tech.length - 4} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:translate-x-2 duration-300"
                        >
                          View Details <FaArrowRight className="ml-2" />
                        </button>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
                            >
                              <FaGithub className="text-sm" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
                            >
                              <FaExternalLinkAlt className="text-sm" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 reveal">
              <button 
                onClick={() => navigate('/projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center">
                  View All Projects
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                Client <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Testimonials</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                What industry leaders say about working with me
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card reveal group">
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:border-gray-600">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      "
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">⭐</span>
                        ))}
                      </div>
                      <p className="text-gray-300 italic leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        <p className="text-blue-400 text-sm font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <h2 className="text-5xl font-bold mb-6">
                Let's <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Ready to transform your vision into digital reality? Let's create something extraordinary together.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="reveal">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Whether you need a complete digital transformation or want to enhance your existing platform, 
                      I'm here to help bring your ideas to life with cutting-edge technology and creative solutions.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      {[
                        { icon: "📧", title: "Email", value: "riyassajeed03@gmail.com", color: "from-blue-500 to-cyan-500" },
                        { icon: "🚀", title: "Response Time", value: "Within 6 hours", color: "from-purple-500 to-pink-500" },
                        { icon: "💼", title: "Availability", value: "Open for projects", color: "from-green-500 to-teal-500" },
                        { icon: "🌍", title: "Location", value: "Available Worldwide", color: "from-orange-500 to-red-500" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center group">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                            <span className="text-xl">{item.icon}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">{item.title}</p>
                            <p className="text-gray-400">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      {[
                        { icon: <FaLinkedin />, href: "#", color: "hover:bg-blue-600" },
                        { icon: <FaGithub />, href: "#", color: "hover:bg-gray-600" },
                        { icon: <FaTwitter />, href: "#", color: "hover:bg-blue-400" },
                        { icon: <FaInstagram />, href: "#", color: "hover:bg-pink-600" }
                      ].map((social, index) => (
                        <a 
                          key={index}
                          href={social.href} 
                          className={`w-12 h-12 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                        >
                          <span className="text-xl">{social.icon}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-group">
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                          placeholder="Project Inquiry"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                          placeholder="Tell me about your project vision..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <FaRocket className="ml-2 group-hover:animate-bounce" />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </form>
                    
                    {message && (
                      <div className={`mt-6 p-4 rounded-xl border transition-all duration-300 ${
                        message.includes('successfully') 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                          : 'bg-red-500/20 border-red-500/50 text-red-400'
                      }`}>
                        {message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                RIYAS
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Crafting digital experiences that inspire and innovate
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaGithub />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500">
              © 2025 Riyas. All rights reserved. Designed with passion and built with cutting-edge technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Business Website', 'Web Application', 'Business Application', 'Portfolio', 'Productivity'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                RIYAS
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20 animate-pulse"></div>
            </Link>
            
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
            >
              <FaHome className="mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              My <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              A comprehensive showcase of innovative solutions, cutting-edge implementations, and transformative digital experiences
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                      : 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="project-card group">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:shadow-2xl">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 backdrop-blur-sm text-white text-sm rounded-full ${
                          project.status === 'Live' ? 'bg-green-500/80' : 'bg-orange-500/80'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-sm rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <FaCalendarAlt className="mr-1" />
                          {project.date}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      
                      {/* Project Details */}
                      <div className="space-y-2 mb-6 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Client:</span>
                          <span className="text-blue-400">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-gray-300">{project.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team:</span>
                          <span className="text-gray-300">{project.team}</span>
                        </div>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 5).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 5 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs border border-gray-500/30">
                            +{project.tech.length - 5} more
                          </span>
                        )}
                      </div>
                      
                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                          {project.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:translate-x-2 duration-300 text-sm"
                        >
                          View Details <FaArrowRight className="ml-2" />
                        </button>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
                            >
                              <FaGithub className="text-sm" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
                            >
                              <FaExternalLinkAlt className="text-sm" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                RIYAS
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Crafting digital experiences that inspire and innovate
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                { icon: <FaLinkedin />, href: "#" },
                { icon: <FaGithub />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500">
              © 2025 Riyas. All rights reserved. Designed with passion and built with cutting-edge technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Project Detail Page Component
const ProjectDetailPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { id } = useParams();

  const project = allProjects.find(p => p.id === parseInt(id));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!project) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                RIYAS
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20 animate-pulse"></div>
            </Link>

            <div className="flex space-x-6">
              <button
                onClick={() => navigate('/projects')}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Projects
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaHome className="mr-2" />
                Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Project Detail Content */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Project Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  project.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {project.status}
                </span>
                <span className="mx-4 text-gray-400">•</span>
                <span className="text-gray-400">{project.date}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {project.title}
              </h1>

              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                {project.description}
              </p>

              <div className="flex justify-center space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    View Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="mb-16">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              {/* Project Info */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.detailedDescription || project.longDescription}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                {project.challenges && project.solutions && (
                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-red-400">Challenges</h3>
                      <ul className="space-y-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 text-green-400">Solutions</h3>
                      <ul className="space-y-2">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Results */}
                {project.results && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Results & Impact</h3>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-6">Project Details</h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 text-sm">Client</span>
                      <p className="text-blue-400 font-medium">{project.client}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm">Duration</span>
                      <p className="text-white font-medium">{project.duration}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm">Team</span>
                      <p className="text-white font-medium">{project.team}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm">Category</span>
                      <p className="text-white font-medium">{project.category}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-bold mb-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-bold mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <div className="App bg-gray-900 text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;