// src/data/projects-en.ts

export const portfolioDataEn = {
  profile: {
    name: 'Yudriqul Aulia', // [cite: 11, 48]
    headline:
      'Full Stack Web Developer | Specializing in Business Automation & Scalable Web Solutions', // [cite: 12]
    email: 'yudriqul2nd@gmail.com', // [cite: 22, 50]
    linkedin: 'www.linkedin.com/in/yudriqul-aulia', // [cite: 3]
    about:
      'I am a passionate Full Stack Web Developer with a deep interest in Business Automation and energy management systems. Throughout my journey, I have focused on the intersection of clean, type-safe code and operational efficiency, believing that well-architected software should not only work but also drive real business value.', // [cite: 16, 17]
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'PT Angkasa Pura Indonesia (KC Sultan Thaha Jambi Airport)', // [cite: 24, 26, 61, 62]
      role: 'Full-stack Developer (Internship)', // [cite: 29]
      period: 'August 2025 - October 2025', // [cite: 29, 63]
      description:
        'Developed and implemented an interactive front-end dashboard using React.js for logging, tracking, and visualizing real-time energy consumption data. Built and maintained a scalable REST API using Node.js and TypeScript to efficiently process and store data. Automated the data entry process to minimize human error.', // [cite: 33, 64, 65]
    },
    {
      id: 'exp-2',
      company: 'Binar Academy (MSIB Kampus Merdeka)', // [cite: 35, 36, 38]
      role: 'Full Stack Web Developer', // [cite: 36, 68]
      period: 'September 2024 - December 2024', // [cite: 36, 70]
      description:
        'Gained hands-on experience in building modern web applications using the PERN stack (PostgreSQL, Express.js, React.js, and Node.js). Collaborated in agile teams to deliver end-to-end projects, including flight booking and car rental platforms.', // [cite: 40, 41, 74, 75]
    },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'SENTINEL - Energy Management System', // [cite: 27, 96]
      role: 'Full Stack Developer',
      description:
        'A centralized system to replace manual energy recording at PT Angkasa Pura, built using a microservices architecture. Features a real-time dashboard to visualize monthly energy consumption, helping management monitor usage and reduce operational costs.', // [cite: 30, 31, 32]
      techStack: ['React.js', 'Node.js', 'TypeScript', 'REST API'], // [cite: 99]
      link: 'https://github.com/Team-Magang-Angkasa-Pura-Jambi', // [cite: 100]
    },
    {
      id: 'proj-2',
      title: 'Travelynk - Flight Ticket Booking Platform', // [cite: 104]
      role: 'Full Stack Developer',
      description:
        'Developed and integrated responsive React.js components for the user booking flow and ticket detail pages. Consumed a Node.js-based REST API to manage flight search data, booking processes, and payments.', // [cite: 107, 108]
      techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'], // [cite: 105]
      link: 'https://github.com/travelynk', // [cite: 106]
    },
    {
      id: 'proj-3',
      title: 'Binar Car Rental Platform', // [cite: 110]
      role: 'Frontend Developer',
      description:
        'Implemented the front-end (React.js) for user-facing car search features and an admin dashboard. Integrated CRUD functionalities for car data management by administrators via a REST API.', // [cite: 114, 115]
      techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'], // [cite: 111]
      link: 'https://github.com/pentahead/Team-2-FSW-1-CH-7.git', // [cite: 113]
    },
    {
      id: 'proj-4',
      title: 'E-Commerce Platform for BC HNI 3 Bukittinggi', // [cite: 89]
      role: 'Full Stack Developer',
      description:
        'Designed and implemented the initial landing page for business information using React.js and Tailwind CSS. Structured the backend architecture with Node.js and PostgreSQL to support product management and transactions.', // [cite: 93, 94]
      techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'], // [cite: 93, 94]
      link: '',
    },
    {
      id: 'proj-5',
      title: 'Rossi Cake E-Commerce', // [cite: 117]
      role: 'Frontend Developer',
      description:
        'Designed and implemented a functional e-commerce platform for an end-to-end shopping experience. Contributed to developing the shopping cart, checkout process, and payment system integration.', // [cite: 118, 119]
      techStack: ['React.js', 'Express.js', 'Tailwind CSS', 'ShadcnUI'], // [cite: 117]
      link: 'https://github.com/AdiUsman Dev/E-commerce-RossyCake.git', // [cite: 117]
    },
  ],

  skills: {
    core: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'RESTful APIs'], // [cite: 122]
    tools: ['Tailwind CSS', 'GitHub Actions', 'Microservices Architecture', 'XP Methodology'], // [cite: 124]
    other: ['Google Analytics', 'Agile Collaboration', 'Problem Solving'], // [cite: 126, 128]
  },
};
