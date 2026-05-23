import { ProjectItem, Achievement } from "./types";

export const projectsData: ProjectItem[] = [
  {
    id: "pulse",
    title: "Pulse",
    description: "A full-stack financial tracker featuring NLP spending analysis, automated anomaly detection, and real-time Telegram notifications.",
    category: "flask-web",
    techStack: ["Flask", "SQLite", "Supabase", "Anime.js", "Telegram Bot"],
    githubLink: "https://github.com/Jsooonx/pulse-financialtracker",
    demoLink: "https://pulse-financialtracker.vercel.app/",
    image: "/images/pulse.png",
    featured: true,
    details: [
      "Built with Flask, SQLite, and Supabase for secure data storage and multi-currency support.",
      "Integrated Telegram OAuth and Telegram Bot for convenient expense logging and instant alerts.",
      "Utilized custom spending pattern forecasting models to predict monthly financial trends."
    ]
  },
  {
    id: "timetable-solver",
    title: "Timetable Solver",
    description: "A Constraint Satisfaction Problem (CSP) solver that automates complex scheduling and avoids timetable conflicts.",
    category: "python",
    techStack: ["Python", "Backtracking", "Constraint Programming", "Heuristics"],
    githubLink: "https://github.com/Jsooonx/timetable-solver",
    image: "/images/timetable_solver.png",
    featured: true,
    details: [
      "Implemented recursive backtracking with MRV-inspired (Minimum Remaining Values) heuristic search.",
      "Ensures 100% conflict-free schedules based on teacher availability, rooms, and group constraints.",
      "Processed bulk schedule configurations efficiently via custom CSV import pipelines."
    ]
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "An optimized Sudoku solver designed to solve hard 9x9 puzzles exponentially faster than brute-force.",
    category: "python",
    techStack: ["Python", "Algorithms", "Backtracking", "Heuristics"],
    githubLink: "https://github.com/Jsooonx/sudoku-solver-python",
    image: "/images/sudoku_solver.png",
    featured: true,
    details: [
      "Utilized recursive backtracking search with constraint validation.",
      "Implemented the MRV (Minimum Remaining Value) heuristic to prioritize cell choices.",
      "Drastically reduced search attempts from ~2,000,000 to ~7,000 on difficult grid layouts."
    ]
  },
  {
    id: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    description: "An interactive grid visualizer comparing the performance and path optimality of different search algorithms.",
    category: "python",
    techStack: ["Python", "Algorithms", "Pygame", "Graph Theory"],
    githubLink: "https://github.com/Jsooonx/pathfinding-algorithm-visualizer-python",
    image: "/images/pathfinding_visualizer_new.png",
    featured: true,
    details: [
      "Implemented Depth-First Search (DFS), Breadth-First Search (BFS), and A* Search algorithms.",
      "Used Manhattan distance heuristic for A* to guarantee shortest path detection.",
      "Visually compares nodes explored and final path length in a custom GUI grid."
    ]
  },
  {
    id: "f1-dashboard",
    title: "F1 2025 Dashboard",
    description: "A centralized Formula 1 dashboard aggregating live standings, schedules, and race results.",
    category: "flask-web",
    techStack: ["Flask", "REST API", "Data Fetching", "JavaScript"],
    githubLink: "https://github.com/Jsooonx/f12025-dashboard",
    demoLink: "https://jsooonx.pythonanywhere.com/",
    image: "/images/f12025-dashboard.png",
    featured: true,
    details: [
      "Aggregated live race statistics and driver standings via the Jolpica F1 API.",
      "Built dynamic tabbed navigation and responsive layouts with Flask and Vanilla JS.",
      "Applied team-specific styling and custom color coding for an immersive dashboard feel."
    ]
  },
  {
    id: "palette-extractor",
    title: "Image Palette Extractor",
    description: "A client-side web application that extracts dominant color palettes from any uploaded image.",
    category: "flask-web",
    techStack: ["JavaScript", "DOM Manipulation", "Pixel Processing", "HTML/CSS"],
    githubLink: "https://github.com/Jsooonx/image-palette-extractor",
    demoLink: "https://jsooonx.github.io/image-palette-extractor/",
    image: "/images/palette_extractor_new.png",
    featured: true,
    details: [
      "Performs local, in-browser RGB pixel analysis to avoid server roundtrips.",
      "Generates highly accurate, cohesive color palettes ranging from 4 to 16 colors.",
      "Allows instant copying of HEX/RGB color codes via an interactive DOM interface."
    ]
  },
  {
    id: "crypto-anomaly-detector",
    title: "Crypto Anomaly Detector",
    description: "An ensemble machine learning pipeline designed to automatically detect technical anomalies in cryptocurrency markets.",
    category: "python",
    techStack: ["Python", "Machine Learning", "scikit-learn", "Technical Analysis"],
    githubLink: "https://github.com/Jsooonx/crypto-anomalies-detector",
    demoLink: "https://crypto-anomalies-detector.vercel.app/",
    image: "/images/crypto_anomaly_detector.png",
    featured: false,
    details: [
      "Engineered an ML pipeline using Isolation Forest and Local Outlier Factor (LOF).",
      "Analyzed 16 technical indicators in real-time to identify unusual market behaviors.",
      "Integrated a live dashboard displaying anomalies with low false-positive rates."
    ]
  },
  {
    id: "trace",
    title: "Trace",
    description: "An editorial content journal and digital archive featuring AI summarization and relational tag visualizations.",
    category: "flask-web",
    techStack: ["Flask", "SQLite", "Google Gemini AI", "D3.js"],
    githubLink: "https://github.com/Jsooonx/trace-log",
    image: "/images/trace_log.png",
    featured: false,
    details: [
      "Developed with Flask and SQLite FTS5 for quick and comprehensive full-text search.",
      "Integrated Google Gemini AI for automated metadata generation and journal summarization.",
      "Built an interactive relational tag graph visualization using D3.js."
    ]
  },
  {
    id: "taste-match",
    title: "Taste Match",
    description: "A transparent recommendation engine mapping cross-media preferences via tag-vector similarity.",
    category: "python",
    techStack: ["Python", "Pandas", "scikit-learn", "Flask"],
    githubLink: "https://github.com/Jsooonx",
    image: "/images/taste_match.png",
    featured: false,
    details: [
      "Calculated preference similarities using Cosine Similarity via scikit-learn.",
      "Processed and structured media taste profiles using Pandas and NumPy.",
      "Shows exact matching tags for recommendations to ensure algorithmic transparency."
    ]
  },
  {
    id: "city-weather-app",
    title: "City Weather App",
    description: "A minimal, ad-free weather dashboard displaying real-time atmospheric data with clean, fast search.",
    category: "flask-web",
    techStack: ["JavaScript", "REST API", "HTML/CSS", "OpenWeatherMap"],
    githubLink: "https://github.com/Jsooonx/city-weather-webapp",
    demoLink: "https://jsooonx.github.io/city-weather-webapp/",
    image: "/images/city_weather_app.png",
    featured: false,
    details: [
      "Connected to OpenWeatherMap API for live temperature, humidity, and condition data.",
      "Built with pure JavaScript for zero-dependency speed and low client overhead.",
      "Designed with a responsive and clean layout avoiding ads or excess bloat."
    ]
  },
  {
    id: "habit-tracker-cli",
    title: "Habit Tracker CLI",
    description: "A modular command-line interface application designed for consistent daily habit tracking and streak analysis.",
    category: "python",
    techStack: ["Python", "CLI", "JSON Storage", "Data Persistence"],
    githubLink: "https://github.com/Jsooonx/habit-tracker-cli-python",
    image: "/images/habit_tracker.png",
    featured: false,
    details: [
      "Persisted habit checklists using locally saved structured JSON databases.",
      "Analyzed checking consistency to calculate streak records and consistency percentages.",
      "Supports CSV exports and automated daily reminder alerts in the terminal."
    ]
  },
  {
    id: "tictactoe-engine",
    title: "Tic Tac Toe Engine",
    description: "A robust C-based game engine featuring modular game state management and an interactive console interface.",
    category: "c-cpp",
    techStack: ["C", "Game Logic", "2D Arrays", "Modular Design"],
    githubLink: "https://github.com/Jsooonx/tic-tac-toe-c-engine",
    image: "/images/tictactoe.png",
    featured: false,
    details: [
      "Built with a modular function architecture and 2D array board state representation.",
      "Supports both player-vs-player (PvP) and player-vs-computer (PvE) configurations.",
      "Designed with reusable C logic easily compileable and integrateable into larger games."
    ]
  },
  {
    id: "odin-recipes",
    title: "Odin Recipes",
    description: "A clean, multi-page recipes directory showcasing responsive layouts and semantic document structures.",
    category: "flask-web",
    techStack: ["HTML", "CSS", "Responsive Design", "Semantic Markup"],
    githubLink: "https://github.com/Jsooonx/Odin-recipes-refactor",
    demoLink: "https://jsooonx.github.io/Odin-recipes-refactor/",
    image: "/images/odin_recipes.png",
    featured: false,
    details: [
      "Constructed using semantic HTML5 to optimize SEO and accessibility.",
      "Designed a responsive fluid layout with pure Vanilla CSS.",
      "Organized structured recipes with navigation menus across pages."
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
