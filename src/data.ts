import { ProjectItem, Achievement } from "./types";

export const projectsData: ProjectItem[] = [
  {
    id: "timetable-solver",
    title: "Timetable Solver",
    description: "Built a CSP-based timetable scheduler using recursive backtracking with hard constraint validation across teacher availability, room capacity, and session overlap rules.",
    category: "python",
    techStack: ["Python", "Constraint Programming", "Algorithms"],
    githubLink: "https://github.com/Jsooonx/timetable-solver",
    details: [
      "Applied MRV-inspired heuristic ordering and a penalty-based scoring engine to rank and select optimal schedules."
    ]
  },
  {
    id: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    description: "Implemented DFS, BFS, and A* with a Manhattan heuristic for grid-based pathfinding.",
    category: "python",
    techStack: ["Python", "Pygame", "Algorithms", "GUI"],
    githubLink: "https://github.com/Jsooonx/pathfinding-algorithm-visualizer-python",
    details: [
      "Built a Pygame visualizer to compare algorithm performance across 10+ maze configurations using nodes explored and path optimality."
    ]
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "Developed a Sudoku solver using recursive backtracking with constraint validation across rows, columns, and 3x3 subgrids.",
    category: "python",
    techStack: ["Python", "Backtracking", "Algorithms"],
    githubLink: "https://github.com/Jsooonx/sudoku-solver-python",
    details: [
      "Applied the Minimum Remaining Value (MRV) heuristic to reduce search attempts from ~2,000,000 to ~7,000 on harder puzzles."
    ]
  },
  {
    id: "scholastic-tracker",
    title: "Scholastic Record Hub",
    description: "A lightweight full-stack web application designed for scholastic record tracking, student task assignments, and progress monitoring.",
    category: "flask-web",
    techStack: ["Flask", "Python", "SQLite", "Tailwind CSS"],
    githubLink: "https://github.com/Jsooonx",
    details: [
      "RESTful API endpoints for user records and progress management",
      "Clean user authentication and secure cookie session handling",
      "Dynamic server-side page rendering with Jinja2 templates"
    ]
  },
  {
    id: "robotics-pid-controller",
    title: "PID Controller & Sensor System",
    description: "Microcontroller software designed to drive multi-sensor robotic chassis, including real-time sensor processing and motor velocity controller PID loop.",
    category: "c-cpp",
    techStack: ["C++", "C", "Arduino/AVR", "PID Control", "Embedded Systems"],
    githubLink: "https://github.com/Jsooonx",
    details: [
      "Optimized PID loops for precise chassis alignment and movement",
      "Ultrasonic and infrared sensor data polling with noise reduction filters",
      "Low-latency interrupts handling for encoder tracking"
    ]
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "cs50",
    year: "01/2026 - 03/2026",
    title: "CS50: Introduction to Computer Science",
    role: "Harvard University (via edX)",
    description: "Completed the full CS50 course content covering algorithms, memory, data structures, SQL, web development, Flask, and AJAX.",
    category: "activity",
    details: [
      "Solved 17+ problem sets using C, Python, SQL, HTML, CSS, and JavaScript.",
      "Practiced problem solving on HackerRank, earning 5★ in Python, 4★ in C++, and 3★ in C.",
      "Repository: github.com/Jsooonx/CS50-2026"
    ]
  },
  {
    id: "high-school",
    year: "08/2022 - 06/2025",
    title: "Senior High School Diploma",
    role: "State Senior High School 2 Surabaya (SMAN 2 Surabaya), Indonesia",
    description: "Science Track (Advanced Mathematics & Physics). Graduated with GPA 93.5/100 (EQF level 4).",
    category: "activity",
    details: [
      "Relevant Coursework: Advanced Mathematics, Physics."
    ]
  },
  {
    id: "musical-drama-2024",
    year: "2024",
    title: "Musical Drama Production",
    role: "Property Staff & Supporting Actor (Surabaya, Indonesia)",
    description: "Contributed as property staff and supporting actor in a school-wide musical drama production involving 50+ participants.",
    category: "activity",
    details: [
      "Supported rehearsal coordination and live performance execution in a school-wide drama competition."
    ]
  },
  {
    id: "kopikat-finance",
    year: "09/2022 - 01/2023",
    title: "Finance Staff",
    role: "Student Company \"KOPIKAT\" (Surabaya, Indonesia)",
    description: "Managed budgeting, transaction tracking, and financial documentation using Excel throughout a semester-long student enterprise.",
    category: "activity",
    details: [
      "Maintained organized revenue and expense records to support daily operations and financial accountability."
    ]
  },
  {
    id: "kopikat-volunteer",
    year: "11/2022",
    title: "Community Service - \"KOPIKAT\" CSR Initiative",
    role: "Surabaya, Indonesia",
    description: "Contributed to the closing CSR initiative of Student Company \"KOPIKAT\" by teaching mathematics to children in the local community.",
    category: "activity",
    details: [
      "Supported the outreach program through direct tutoring and aid distribution activities."
    ]
  },
  {
    id: "pens-robotics-2018",
    year: "03/2018",
    title: "1st Place - Robot Transporter Category",
    role: "Java Robot Contest IX - State Polytechnic of Electronics Surabaya (PENS)",
    description: "Ranked 1st in a national robotics competition involving 150+ participants across elementary to university categories.",
    category: "achievement",
    details: [
      "Awarded Best Time for Mission Completion for achieving the fastest execution in the category."
    ]
  },
  {
    id: "unesa-robotics-2017",
    year: "10/2017",
    title: "1st Place - Beginner Robot Transporter Category",
    role: "LKT UNESA 2017 - State University of Surabaya (UNESA)",
    description: "Ranked 1st among ~30 participants in a competitive beginner robotics challenge.",
    category: "achievement"
  }
];
