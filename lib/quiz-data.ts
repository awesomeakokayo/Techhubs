import type { QuizQuestion } from './guided-path'

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  // ─── FRONTEND (fe-1 to fe-15) ───
  'fe-1': [
    { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correctIndex: 0, explanation: 'HTML stands for Hyper Text Markup Language.' },
    { question: 'Which HTML element defines a paragraph?', options: ['<paragraph>', '<para>', '<p>', '<text>'], correctIndex: 2, explanation: 'The <p> element defines a paragraph.' },
  ],
  'fe-2': [
    { question: 'What is The Odin Project?', options: ['A paid bootcamp', 'A free project-based curriculum', 'A JavaScript library', 'A CSS framework'], correctIndex: 1, explanation: 'The Odin Project is a free, open-source coding curriculum.' },
    { question: 'What learning approach does The Odin Project emphasize?', options: ['Memorizing syntax', 'Building projects', 'Designing logos', 'Managing servers'], correctIndex: 1, explanation: 'The Odin Project emphasizes learning by building real projects.' },
  ],
  'fe-3': [
    { question: 'Which keyword declares a variable that cannot be reassigned?', options: ['var', 'let', 'const', 'static'], correctIndex: 2, explanation: 'const declares a variable that cannot be reassigned.' },
    { question: 'What does typeof return for a number?', options: ['"number"', '"int"', '"float"', '"digit"'], correctIndex: 0, explanation: 'typeof returns the string "number" for numeric values.' },
  ],
  'fe-4': [
    { question: 'What is a React component?', options: ['A CSS class', 'A reusable piece of UI', 'A database table', 'An HTML file'], correctIndex: 1, explanation: 'A React component is a reusable piece of UI that returns JSX.' },
    { question: 'What React hook manages state?', options: ['useEffect', 'useState', 'useReducer', 'useContext'], correctIndex: 1, explanation: 'useState is the primary hook for managing state in React.' },
  ],
  'fe-5': [
    { question: 'What does the <a> tag create?', options: ['Audio player', 'A hyperlink', 'An article', 'An aside'], correctIndex: 1, explanation: 'The <a> tag creates hyperlinks to other pages or resources.' },
    { question: 'Which attribute in <a> specifies the URL?', options: ['src', 'link', 'href', 'url'], correctIndex: 2, explanation: 'The href attribute specifies the destination URL in an anchor tag.' },
  ],
  'fe-6': [
    { question: 'What is the DOM?', options: ['A CSS framework', 'A programming language', 'A browser API for page structure', 'A JavaScript library'], correctIndex: 2, explanation: 'The DOM represents the page structure as objects that JavaScript can manipulate.' },
    { question: 'Which method selects an element by ID?', options: ['querySelector', 'getElementById', 'getElementsByClass', 'findElement'], correctIndex: 1, explanation: 'getElementById() returns the element with the given ID.' },
  ],
  'fe-7': [
    { question: 'What is JSX?', options: ['A database language', 'A syntax extension for JavaScript', 'A CSS preprocessor', 'A build tool'], correctIndex: 1, explanation: 'JSX is a syntax extension that looks like HTML and is used in React.' },
    { question: 'What must a React component return?', options: ['A string', 'An array', 'JSX or null', 'A function'], correctIndex: 2, explanation: 'A React component must return JSX (or null) describing the UI to render.' },
  ],
  'fe-8': [
    { question: 'What does Frontend Mentor provide?', options: ['Web hosting', 'Real HTML/CSS challenges', 'Code editors', 'Database services'], correctIndex: 1, explanation: 'Frontend Mentor provides real-world frontend challenges with professional designs.' },
    { question: 'What skill does Frontend Mentor build?', options: ['Backend logic', 'Implementing designs accurately', 'Database design', 'DevOps'], correctIndex: 1, explanation: 'Frontend Mentor helps build the skill of turning designs into working code.' },
  ],
  'fe-9': [
    { question: 'What does CSS Flexbox do?', options: ['Manages state', 'Controls layout and alignment', 'Handles databases', 'Makes API calls'], correctIndex: 1, explanation: 'Flexbox is a CSS layout module for distributing space and aligning items.' },
    { question: 'Which property enables Flexbox?', options: ['display: block', 'display: flex', 'position: relative', 'float: left'], correctIndex: 1, explanation: 'display: flex creates a flex container.' },
  ],
  'fe-10': [
    { question: 'What is CSS Grid designed for?', options: ['Typography', 'Two-dimensional layouts', 'Button styling', 'Animations'], correctIndex: 1, explanation: 'CSS Grid handles two-dimensional layouts with rows and columns simultaneously.' },
    { question: 'Which property creates a grid container?', options: ['display: flex', 'display: block', 'display: grid', 'display: inline'], correctIndex: 2, explanation: 'display: grid creates a grid container.' },
  ],
  'fe-11': [
    { question: 'What does Full Stack Open teach?', options: ['Only frontend', 'Full-stack web development', 'Only mobile', 'Only machine learning'], correctIndex: 1, explanation: 'Full Stack Open covers modern full-stack JavaScript development.' },
    { question: 'Is Full Stack Open free?', options: ['Fully paid', 'Free to audit, certificate for a fee', 'Free with ads', 'Subscription required'], correctIndex: 1, explanation: 'Full Stack Open is free to access; a certificate costs a fee.' },
  ],
  'fe-12': [
    { question: 'What framework is Next.js built on?', options: ['Vue', 'Angular', 'React', 'Svelte'], correctIndex: 2, explanation: 'Next.js is a React framework for production applications.' },
    { question: 'What key feature does Next.js provide?', options: ['Database management', 'Server-side rendering', 'CSS animations', 'Authentication'], correctIndex: 1, explanation: 'Next.js provides server-side rendering and static site generation.' },
  ],
  'fe-13': [
    { question: 'What is Tailwind CSS?', options: ['A JavaScript library', 'A utility-first CSS framework', 'A database', 'A hosting platform'], correctIndex: 1, explanation: 'Tailwind CSS is a utility-first CSS framework with pre-built classes.' },
    { question: 'How do you style elements with Tailwind?', options: ['Writing CSS files', 'Using utility classes directly in HTML', 'Using inline styles only', 'Using a visual editor'], correctIndex: 1, explanation: 'Tailwind uses utility classes applied directly in HTML/JSX.' },
  ],
  'fe-14': [
    { question: 'What is Eloquent JavaScript?', options: ['A CSS framework', 'A free online book about JavaScript', 'A JavaScript library', 'A code editor'], correctIndex: 1, explanation: 'Eloquent JavaScript is a free online book that teaches JavaScript in depth.' },
    { question: 'Who is the author of Eloquent JavaScript?', options: ['Brendan Eich', 'Marijn Haverbeke', 'Ryan Dahl', 'Dan Abramov'], correctIndex: 1, explanation: 'Eloquent JavaScript was written by Marijn Haverbeke.' },
  ],
  'fe-15': [
    { question: 'What does v0.dev generate?', options: ['Database schemas', 'React + Tailwind UI code', 'CSS animations', 'API endpoints'], correctIndex: 1, explanation: 'v0.dev generates React + Tailwind code from text descriptions.' },
    { question: 'Who created v0.dev?', options: ['Google', 'Microsoft', 'Vercel', 'Meta'], correctIndex: 2, explanation: 'v0.dev was created by Vercel.' },
  ],

  // ─── BACKEND (be-1 to be-10) ───
  'be-1': [
    { question: 'What does CS50 Web Programming cover?', options: ['HTML only', 'Python, Django, SQL, JavaScript', 'Mobile only', 'DevOps only'], correctIndex: 1, explanation: 'CS50 Web covers Python, Django, SQL, JavaScript, and more.' },
    { question: 'Which university offers CS50?', options: ['MIT', 'Stanford', 'Harvard', 'Oxford'], correctIndex: 2, explanation: 'CS50 is Harvard University introductory computer science course.' },
  ],
  'be-2': [
    { question: 'What is FastAPI used for?', options: ['Frontend styling', 'Building Python REST APIs', 'Mobile development', 'Game development'], correctIndex: 1, explanation: 'FastAPI is a modern Python framework for building REST APIs.' },
    { question: 'What does FastAPI auto-generate?', options: ['Database schemas', 'API documentation', 'CSS styles', 'Test cases'], correctIndex: 1, explanation: 'FastAPI automatically generates interactive OpenAPI documentation.' },
  ],
  'be-3': [
    { question: 'What is Node.js used for?', options: ['Client-side animations', 'Server-side JavaScript', 'Database only', 'CSS styling'], correctIndex: 1, explanation: 'Node.js runs JavaScript on the server side.' },
    { question: 'What is Express.js?', options: ['A database', 'A Node.js web framework', 'A CSS library', 'A testing tool'], correctIndex: 1, explanation: 'Express.js is a minimal web framework for Node.js.' },
  ],
  'be-4': [
    { question: 'What type of database is PostgreSQL?', options: ['NoSQL', 'Document', 'Relational (SQL)', 'Graph'], correctIndex: 2, explanation: 'PostgreSQL is a powerful open-source relational database.' },
    { question: 'What does a SQL JOIN do?', options: ['Deletes data', 'Combines rows from tables', 'Creates tables', 'Backs up data'], correctIndex: 1, explanation: 'A JOIN combines rows from two or more tables based on a related column.' },
  ],
  'be-5': [
    { question: 'What is SQLZoo?', options: ['A hosting service', 'An interactive SQL practice platform', 'A SQL certification', 'A code editor'], correctIndex: 1, explanation: 'SQLZoo offers interactive SQL exercises for all skill levels.' },
    { question: 'What skill does SQLZoo help build?', options: ['CSS layout', 'Writing SQL queries', 'JavaScript', 'Python'], correctIndex: 1, explanation: 'SQLZoo focuses on practical SQL query skills.' },
  ],
  'be-6': [
    { question: 'What does JWT stand for?', options: ['Java Web Tool', 'JSON Web Token', 'JavaScript Widget Toolkit', 'Java Wire Transfer'], correctIndex: 1, explanation: 'JWT stands for JSON Web Token.' },
    { question: 'What is JWT commonly used for?', options: ['Styling pages', 'Authentication', 'Database queries', 'File uploads'], correctIndex: 1, explanation: 'JWTs are commonly used for authentication and authorization.' },
  ],
  'be-7': [
    { question: 'What is Docker?', options: ['A programming language', 'A containerization platform', 'A database', 'A CSS framework'], correctIndex: 1, explanation: 'Docker packages applications into isolated containers.' },
    { question: 'What is a Docker image?', options: ['A running container', 'A template for creating containers', 'A virtual machine', 'A database backup'], correctIndex: 1, explanation: 'A Docker image is a lightweight template for creating containers.' },
  ],
  'be-8': [
    { question: 'What database does FastAPI work well with?', options: ['MongoDB only', 'Any database via SQLAlchemy', 'PostgreSQL only', 'MySQL only'], correctIndex: 1, explanation: 'FastAPI works with any database through SQLAlchemy ORM.' },
    { question: 'What is async Python?', options: ['Running code in parallel', 'Writing synchronous code', 'A Python library', 'A database'], correctIndex: 0, explanation: 'Async Python allows concurrent code execution using async/await.' },
  ],
  'be-9': [
    { question: 'What is an index in SQL?', options: ['A table of contents', 'A performance optimization for queries', 'A type of join', 'A backup method'], correctIndex: 1, explanation: 'Indexes speed up data retrieval at the cost of slower writes.' },
    { question: 'What happens if a column lacks an index?', options: ['Queries fail', 'The database performs a full table scan', 'The column is invisible', 'Data is deleted'], correctIndex: 1, explanation: 'Without indexes, PostgreSQL scans every row to find matches.' },
  ],
  'be-10': [
    { question: 'What does Full Stack Open teach?', options: ['Only frontend', 'Full-stack development with Node and React', 'Only mobile', 'Only DevOps'], correctIndex: 1, explanation: 'Full Stack Open covers Node.js, React, databases, and deployment.' },
    { question: 'Which university created Full Stack Open?', options: ['MIT', 'Stanford', 'University of Helsinki', 'Cambridge'], correctIndex: 2, explanation: 'Full Stack Open is created by the University of Helsinki.' },
  ],

  // ─── FULLSTACK (fs-1 to fs-6) ───
  'fs-1': [
    { question: 'What does a full-stack developer work with?', options: ['Only frontend', 'Only backend', 'Both frontend and backend', 'Only databases'], correctIndex: 2, explanation: 'Full-stack developers work on both frontend and backend.' },
    { question: 'Which is a common full-stack combination?', options: ['Python and Excel', 'React and Node.js', 'HTML and CSS', 'MySQL and MongoDB'], correctIndex: 1, explanation: 'React (frontend) + Node.js (backend) is a common full-stack stack.' },
  ],
  'fs-2': [
    { question: 'What learning method does The Odin Project use?', options: ['Lectures only', 'Project-based learning', 'Multiple choice tests', 'Group discussions'], correctIndex: 1, explanation: 'The Odin Project is built around project-based learning.' },
    { question: 'Is The Odin Project free?', options: ['Yes, completely free', 'Free with ads', 'Subscription required', 'One-time payment'], correctIndex: 0, explanation: 'The Odin Project is 100% free and open-source.' },
  ],
  'fs-3': [
    { question: 'What can Next.js API routes do?', options: ['Only handle GET requests', 'Build full backend APIs alongside frontend', 'Only serve static files', 'Manage databases directly'], correctIndex: 1, explanation: 'Next.js API routes let you build backend endpoints in the same project.' },
    { question: 'What deployment model does Next.js primarily use?', options: ['Traditional servers', 'Serverless/Edge deployment', 'Desktop apps', 'Mobile apps'], correctIndex: 1, explanation: 'Next.js is designed for serverless and edge deployment on platforms like Vercel.' },
  ],
  'fs-4': [
    { question: 'What is Supabase?', options: ['A CSS framework', 'An open-source Firebase alternative', 'A code editor', 'A hosting platform'], correctIndex: 1, explanation: 'Supabase provides database, auth, and storage as an open-source alternative to Firebase.' },
    { question: 'What database does Supabase use?', options: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'], correctIndex: 1, explanation: 'Supabase is built on top of PostgreSQL.' },
  ],
  'fs-5': [
    { question: 'What is Stripe used for?', options: ['Database management', 'Payment processing', 'CSS styling', 'Deployment'], correctIndex: 1, explanation: 'Stripe is a payment processing platform for online transactions.' },
    { question: 'What can Stripe handle?', options: ['Only one-time payments', 'Subscriptions and recurring billing', 'Only refunds', 'Only invoices'], correctIndex: 1, explanation: 'Stripe handles subscriptions, recurring billing, and one-time payments.' },
  ],
  'fs-6': [
    { question: 'What is a MERN stack?', options: ['MongoDB, Express, React, Node', 'MySQL, Electron, React, Next', 'MongoDB, Ember, Ruby, Nest', 'MariaDB, Express, React, Native'], correctIndex: 0, explanation: 'MERN stands for MongoDB, Express.js, React, and Node.js.' },
    { question: 'Which YouTube channel created the MERN course?', options: ['freeCodeCamp', 'Traversy Media', 'Fireship', 'The Net Ninja'], correctIndex: 1, explanation: 'Traversy Media created the full MERN stack tutorial.' },
  ],

  // ─── PYTHON (py-1 to py-8) ───
  'py-1': [
    { question: 'What is Python known for?', options: ['Game development only', 'Readability and versatility', 'Mobile apps only', 'Hardware design'], correctIndex: 1, explanation: 'Python is known for its readable syntax and wide range of applications.' },
    { question: 'Who maintains Python?', options: ['Google', 'Python Software Foundation', 'Microsoft', 'Oracle'], correctIndex: 1, explanation: 'Python is maintained by the Python Software Foundation.' },
  ],
  'py-2': [
    { question: 'What is the best way to start Python?', options: ['Read the docs only', 'Watch a beginner course and code along', 'Build a complex app immediately', 'Skip to advanced topics'], correctIndex: 1, explanation: 'The most effective start is following a beginner course while writing code.' },
    { question: 'Which of these is a Python data type?', options: ['Array', 'List', 'Collection', 'Enumerable'], correctIndex: 1, explanation: 'List is a built-in Python data type for ordered collections.' },
  ],
  'py-3': [
    { question: 'What does Automate the Boring Stuff teach?', options: ['Game development', 'Python automation for everyday tasks', 'Web design', 'Mobile development'], correctIndex: 1, explanation: 'The book teaches Python automation for files, PDFs, Excel, emails, and web scraping.' },
    { question: 'What is BeautifulSoup used for?', options: ['Cooking recipes', 'Web scraping and parsing HTML', 'Data visualization', 'API development'], correctIndex: 1, explanation: 'BeautifulSoup is a Python library for parsing HTML and XML documents.' },
  ],
  'py-4': [
    { question: 'What is Real Python?', options: ['A game', 'A Python tutorial website', 'A code editor', 'A database'], correctIndex: 1, explanation: 'Real Python offers high-quality Python tutorials on every topic.' },
    { question: 'What type of content does Real Python publish?', options: ['Only videos', 'Written tutorials on Python topics', 'Only news', 'Only podcasts'], correctIndex: 1, explanation: 'Real Python publishes detailed written Python tutorials.' },
  ],
  'py-5': [
    { question: 'Who runs the Corey Schafer YouTube channel?', options: ['Google', 'Corey Schafer', 'freeCodeCamp', 'Real Python'], correctIndex: 1, explanation: 'Corey Schafer creates in-depth Python and programming tutorials.' },
    { question: 'What level of content does Corey Schafer create?', options: ['Beginner only', 'Professional-level deep dives', 'Only advanced', 'Only news'], correctIndex: 1, explanation: 'Corey Schafer creates professional-level, thorough Python tutorials.' },
  ],
  'py-6': [
    { question: 'What is FastAPI?', options: ['A frontend framework', 'A Python web framework for APIs', 'A database', 'A CSS library'], correctIndex: 1, explanation: 'FastAPI is a modern Python web framework for building APIs.' },
    { question: 'What Python feature does FastAPI leverage for validation?', options: ['Decorators', 'Type hints', 'Generators', 'Comprehensions'], correctIndex: 1, explanation: 'FastAPI uses Python type hints for request validation and serialization.' },
  ],
  'py-7': [
    { question: 'What is Groq?', options: ['A database', 'An ultra-fast LLM inference platform', 'A Python library', 'A CSS framework'], correctIndex: 1, explanation: 'Groq provides extremely fast LLM inference hardware and API.' },
    { question: 'What makes Groq unique?', options: ['It is free', 'Extremely fast inference speed', 'It only runs one model', 'It is a database'], correctIndex: 1, explanation: 'Groq is known for its exceptionally fast LLM inference performance.' },
  ],
  'py-8': [
    { question: 'What is LangChain?', options: ['A programming language', 'A framework for building LLM applications', 'A database', 'A UI library'], correctIndex: 1, explanation: 'LangChain helps build applications powered by large language models.' },
    { question: 'What is a LangChain chain?', options: ['A physical constraint', 'A sequence of LLM calls and logic', 'A database table', 'A UI component'], correctIndex: 1, explanation: 'A chain in LangChain is a sequence of calls to LLMs, tools, or other operations.' },
  ],

  // ─── UI/UX (ux-1 to ux-9) ───
  'ux-1': [
    { question: 'What does UX stand for?', options: ['User Experience', 'Ultra Xtreme', 'Unified Extension', 'Universal XML'], correctIndex: 0, explanation: 'UX stands for User Experience.' },
    { question: 'What does UX focus on?', options: ['Visual aesthetics only', 'How users interact with a product', 'Code performance', 'Database design'], correctIndex: 1, explanation: 'UX focuses on the overall experience and interaction with a product.' },
  ],
  'ux-2': [
    { question: 'What is Figma mainly used for?', options: ['Code editing', 'Interface design and prototyping', 'Database management', 'Video editing'], correctIndex: 1, explanation: 'Figma is the industry-standard interface design and prototyping tool.' },
    { question: 'What makes Figma collaborative?', options: ['It is desktop-only', 'Multiple designers can work simultaneously in the browser', 'It has chat built in', 'It auto-saves'], correctIndex: 1, explanation: 'Figma runs in the browser and supports real-time collaboration.' },
  ],
  'ux-3': [
    { question: 'What does NNGroup specialize in?', options: ['Software development', 'UX research and usability', 'Graphic design', 'Marketing'], correctIndex: 1, explanation: 'Nielsen Norman Group is the world-leading UX research and consulting firm.' },
    { question: 'What type of content does NNGroup publish?', options: ['Video courses', 'Evidence-based UX research articles', 'Design tools', 'Code libraries'], correctIndex: 1, explanation: 'NNGroup publishes authoritative, research-based UX articles.' },
  ],
  'ux-4': [
    { question: 'What does Interaction Design Foundation offer?', options: ['Free software', 'UX courses and resources', 'Job placement', 'Code hosting'], correctIndex: 1, explanation: 'IDF offers comprehensive UX design courses and educational resources.' },
    { question: 'What is the focus of IDF courses?', options: ['Visual design only', 'Theoretical UX foundations', 'Only coding', 'Only marketing'], correctIndex: 1, explanation: 'IDF provides strong theoretical foundations for UX design.' },
  ],
  'ux-5': [
    { question: 'Who runs the DesignCourse YouTube channel?', options: ['Gary Simon', 'Flux Academy', 'Google', 'Adobe'], correctIndex: 0, explanation: 'DesignCourse is run by Gary Simon, a UI/UX designer and educator.' },
    { question: 'What type of content does DesignCourse produce?', options: ['Music production', 'UI design tutorials and Figma walkthroughs', 'Coding tutorials only', 'Marketing advice'], correctIndex: 1, explanation: 'DesignCourse specializes in UI design tutorials and Figma walkthroughs.' },
  ],
  'ux-6': [
    { question: 'What is Mobbin?', options: ['A code editor', 'A collection of real app UI patterns', 'A design tool', 'A hosting platform'], correctIndex: 1, explanation: 'Mobbin curates UI patterns from thousands of real iOS and Android apps.' },
    { question: 'Who should use Mobbin?', options: ['Backend developers', 'UI/UX designers looking for inspiration', 'DevOps engineers', 'Data scientists'], correctIndex: 1, explanation: 'Mobbin is a reference library for designers seeking real-world UI patterns.' },
  ],
  'ux-7': [
    { question: 'What is Coolors?', options: ['A code editor', 'A color palette generator', 'A design tool', 'A hosting platform'], correctIndex: 1, explanation: 'Coolors is a fast color palette generator for designers.' },
    { question: 'How does Coolors help designers?', options: ['Generates code', 'Creates harmonious color schemes quickly', 'Edits images', 'Prototypes apps'], correctIndex: 1, explanation: 'Coolors helps create and explore color palettes in seconds.' },
  ],
  'ux-8': [
    { question: 'What is Material Design?', options: ['A programming language', "Google's comprehensive design system", 'A code editor', 'A database'], correctIndex: 1, explanation: 'Material Design is Google open-source design system for digital products.' },
    { question: 'What does Material Design include?', options: ['Only colors', 'Typography, components, and design patterns', 'Only icons', 'Only animations'], correctIndex: 1, explanation: 'Material Design covers typography, components, icons, and interaction patterns.' },
  ],
  'ux-9': [
    { question: 'What is Dribbble?', options: ['A code hosting platform', 'A design community and portfolio platform', 'A video editor', 'A database'], correctIndex: 1, explanation: 'Dribbble is a community for designers to share and discover work.' },
    { question: 'What can you find on Dribbble?', options: ['Code libraries', 'Design inspiration and portfolios', 'Video tutorials', 'Job offers only'], correctIndex: 1, explanation: 'Dribbble is primarily a design inspiration and portfolio platform.' },
  ],

  // ─── QA (qa-1 to qa-7) ───
  'qa-1': [
    { question: 'What is the main goal of QA?', options: ['Writing code faster', 'Finding bugs before users do', 'Designing interfaces', 'Managing servers'], correctIndex: 1, explanation: 'QA aims to identify and fix bugs before software reaches users.' },
    { question: 'What is regression testing?', options: ['Testing new features only', 'Re-testing after changes to ensure nothing broke', 'Testing performance', 'Testing security'], correctIndex: 1, explanation: 'Regression testing verifies that existing features still work after changes.' },
  ],
  'qa-2': [
    { question: 'What is Guru99?', options: ['A coding bootcamp', 'A comprehensive testing tutorial site', 'A design tool', 'A hosting platform'], correctIndex: 1, explanation: 'Guru99 offers extensive free software testing tutorials.' },
    { question: 'What type of testing does Guru99 cover?', options: ['Only manual', 'Only automation', 'Both manual and automation testing', 'Only performance'], correctIndex: 2, explanation: 'Guru99 covers both manual and automated testing comprehensively.' },
  ],
  'qa-3': [
    { question: 'What is Playwright?', options: ['A code editor', 'A modern browser automation framework', 'A database', 'A CSS library'], correctIndex: 1, explanation: 'Playwright is a modern test automation framework by Microsoft.' },
    { question: 'What browsers does Playwright support?', options: ['Chrome only', 'Chrome, Firefox, Safari, and Edge', 'Firefox only', 'Safari only'], correctIndex: 1, explanation: 'Playwright supports Chromium, Firefox, WebKit, and Edge.' },
  ],
  'qa-4': [
    { question: 'What is Postman primarily used for?', options: ['Database management', 'API testing and development', 'CSS styling', 'Deployment'], correctIndex: 1, explanation: 'Postman is a platform for API testing, development, and documentation.' },
    { question: 'What can you create in Postman?', options: ['Websites', 'API request collections and tests', 'Mobile apps', 'Databases'], correctIndex: 1, explanation: 'Postman lets you organize API requests into collections with tests.' },
  ],
  'qa-5': [
    { question: 'What is Cypress best for?', options: ['Backend testing', 'Frontend end-to-end testing', 'API testing', 'Database testing'], correctIndex: 1, explanation: 'Cypress is built specifically for frontend end-to-end testing.' },
    { question: 'What makes Cypress different from Selenium?', options: ['It is slower', 'It runs directly in the browser with better debugging', 'It only tests APIs', 'It is text-based only'], correctIndex: 1, explanation: 'Cypress runs in the browser with real-time reloading and debugging.' },
  ],
  'qa-6': [
    { question: 'What is the Ministry of Testing?', options: ['A government agency', 'The premier QA community and resource hub', 'A testing tool', 'A certification body'], correctIndex: 1, explanation: 'Ministry of Testing is a global QA community with articles and courses.' },
    { question: 'What does the Ministry of Testing provide?', options: ['Only paid courses', 'Articles, courses, events, and community', 'Only tools', 'Only certifications'], correctIndex: 1, explanation: 'MoT offers articles, courses, events, and a global testing community.' },
  ],
  'qa-7': [
    { question: 'What is k6 used for?', options: ['Unit testing', 'Performance and load testing', 'API testing', 'Security testing'], correctIndex: 1, explanation: 'k6 is a modern load testing tool for performance testing.' },
    { question: 'How do you write k6 tests?', options: ['In a GUI', 'As JavaScript code', 'In YAML', 'In SQL'], correctIndex: 1, explanation: 'k6 tests are written as JavaScript files that define test scenarios.' },
  ],

  // ─── DATA ANALYSIS (da-1 to da-8) ───
  'da-1': [
    { question: 'What does SQL stand for?', options: ['Simple Query Language', 'Structured Query Language', 'Standard Question Language', 'Sequential Query Logic'], correctIndex: 1, explanation: 'SQL stands for Structured Query Language.' },
    { question: 'What SQL clause filters rows?', options: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'], correctIndex: 1, explanation: 'WHERE filters rows based on specified conditions.' },
  ],
  'da-2': [
    { question: 'What is SQLZoo?', options: ['A zoo for SQL animals', 'Interactive SQL exercises', 'A database hosting service', 'A SQL certification'], correctIndex: 1, explanation: 'SQLZoo provides interactive SQL practice exercises.' },
    { question: 'What is the best way to use SQLZoo?', options: ['Read the answers', 'Type queries yourself and learn from errors', 'Watch the videos only', 'Skip to advanced'], correctIndex: 1, explanation: 'The best approach is to actively write and debug your own queries.' },
  ],
  'da-3': [
    { question: 'What is Pandas used for?', options: ['Web development', 'Data manipulation and analysis in Python', 'Mobile development', 'Game development'], correctIndex: 1, explanation: 'Pandas is the primary Python library for data manipulation.' },
    { question: 'What is a DataFrame in Pandas?', options: ['A single value', 'A 2D labeled data structure like a spreadsheet', 'A Python list', 'A database'], correctIndex: 1, explanation: 'A DataFrame is a 2D tabular data structure with rows and columns.' },
  ],
  'da-4': [
    { question: 'What is Kaggle?', options: ['A code editor', 'A data science community with competitions and datasets', 'A database', 'A hosting platform'], correctIndex: 1, explanation: 'Kaggle is a platform for data science competitions, datasets, and learning.' },
    { question: 'What does Kaggle Learn offer?', options: ['Paid degrees', 'Free micro-courses on data science topics', 'Job placement', 'Cloud hosting'], correctIndex: 1, explanation: 'Kaggle Learn offers free courses on Python, SQL, ML, and data viz.' },
  ],
  'da-5': [
    { question: 'What is Excel commonly used for?', options: ['Web development', 'Data analysis and spreadsheets', 'Server management', 'App development'], correctIndex: 1, explanation: 'Excel is primarily used for data analysis, calculations, and spreadsheets.' },
    { question: 'What does a pivot table do?', options: ['Creates charts', 'Summarizes and aggregates data interactively', 'Sorts data', 'Filters rows'], correctIndex: 1, explanation: 'Pivot tables summarize and aggregate large datasets interactively.' },
  ],
  'da-6': [
    { question: 'What is Power BI?', options: ['A code editor', 'A business analytics and visualization tool', 'A database', 'A programming language'], correctIndex: 1, explanation: 'Power BI by Microsoft is for creating interactive data visualizations.' },
    { question: 'What can you build with Power BI?', options: ['Websites', 'Interactive dashboards and reports', 'Mobile apps', 'APIs'], correctIndex: 1, explanation: 'Power BI creates interactive dashboards from connected data sources.' },
  ],
  'da-7': [
    { question: 'What does Kaggle Datasets provide?', options: ['Code editors', 'Thousands of free datasets for practice', 'Video courses', 'Hosting services'], correctIndex: 1, explanation: 'Kaggle hosts thousands of free public datasets for practice.' },
    { question: 'How should beginners use Kaggle Datasets?', options: ['Download and analyze them to practice skills', 'Only browse them', 'Buy them', 'Ignore them'], correctIndex: 0, explanation: 'Downloading and analyzing datasets is excellent practice.' },
  ],
  'da-8': [
    { question: 'What is Select Star SQL?', options: ['A SQL database', 'An interactive SQL learning book', 'A SQL certification', 'A data visualization tool'], correctIndex: 1, explanation: 'Select Star SQL is a free interactive book teaching real analytical SQL.' },
    { question: 'Who is Select Star SQL for?', options: ['Complete beginners to SQL', 'Expert database administrators', 'Only data scientists', 'Only developers'], correctIndex: 0, explanation: 'Select Star SQL is designed for people learning SQL from scratch.' },
  ],

  // ─── DATA SCIENCE (ds-1 to ds-7) ───
  'ds-1': [
    { question: 'What is fast.ai known for?', options: ['Traditional statistics', 'Practical deep learning from the top down', 'Database management', 'Web development'], correctIndex: 1, explanation: 'fast.ai teaches deep learning using a top-down practical approach.' },
    { question: 'Is fast.ai free?', options: ['Yes, completely free', 'Free with ads', 'Paid subscription', 'One-time purchase'], correctIndex: 0, explanation: 'fast.ai courses are completely free and open.' },
  ],
  'ds-2': [
    { question: 'Who created the famous Machine Learning course?', options: ['Geoffrey Hinton', 'Andrew Ng', 'Yann LeCun', 'Fei-Fei Li'], correctIndex: 1, explanation: 'Andrew Ng created the Stanford/Coursera ML course that millions have taken.' },
    { question: 'Is Andrew Ng ML course free?', options: ['Yes, completely', 'Audit for free, certificate for fee', 'Fully paid', 'Free with ads'], correctIndex: 1, explanation: 'The course is free to audit on Coursera; a certificate costs extra.' },
  ],
  'ds-3': [
    { question: 'What does Kaggle Learn ML cover?', options: ['Only statistics', 'ML concepts with hands-on exercises', 'Only deep learning', 'Only data viz'], correctIndex: 1, explanation: 'Kaggle Learn offers practical ML courses with exercises.' },
    { question: 'What is feature engineering?', options: ['Building new features from code', 'Creating better input variables for ML models', 'Designing UI features', 'Managing software features'], correctIndex: 1, explanation: 'Feature engineering creates better input features to improve model performance.' },
  ],
  'ds-4': [
    { question: 'What does ISLR cover?', options: ['Deep learning', 'Statistical learning methods for data science', 'Web development', 'Database design'], correctIndex: 1, explanation: 'Introduction to Statistical Learning covers essential ML statistics and methods.' },
    { question: 'What programming language does ISLR use?', options: ['Python', 'R', 'Julia', 'MATLAB'], correctIndex: 1, explanation: 'ISLR uses R for its examples and exercises.' },
  ],
  'ds-5': [
    { question: 'Who created the ML Full Course video?', options: ['Stanford', 'freeCodeCamp', 'Google', 'MIT'], correctIndex: 1, explanation: 'freeCodeCamp released a comprehensive ML course on YouTube.' },
    { question: 'What level is the freeCodeCamp ML course?', options: ['Beginner', 'Beginner to intermediate covering core algorithms', 'Advanced only', 'Expert only'], correctIndex: 1, explanation: 'The course covers ML algorithms from beginner to intermediate level.' },
  ],
  'ds-6': [
    { question: 'What is PyTorch?', options: ['A database', 'A deep learning framework', 'A web framework', 'A CSS library'], correctIndex: 1, explanation: 'PyTorch is an open-source deep learning framework by Meta.' },
    { question: 'What is a tensor in PyTorch?', options: ['A type of string', 'A multi-dimensional array like NumPy ndarray', 'A database query', 'A CSS class'], correctIndex: 1, explanation: 'Tensors are multi-dimensional arrays similar to NumPy arrays with GPU support.' },
  ],
  'ds-7': [
    { question: 'What is StatQuest?', options: ['A statistics game', 'A YouTube channel explaining statistics and ML clearly', 'A statistical software', 'A data science bootcamp'], correctIndex: 1, explanation: 'StatQuest by Josh Starmer explains stats and ML concepts visually.' },
    { question: 'Who runs the StatQuest channel?', options: ['Google', 'Josh Starmer', 'freeCodeCamp', 'Kaggle'], correctIndex: 1, explanation: 'StatQuest is created and narrated by Josh Starmer.' },
  ],

  // ─── DEVOPS (dv-1 to dv-7) ───
  'dv-1': [
    { question: 'What is the Linux command line?', options: ['A graphical interface', 'A text-based interface for system control', 'A web browser', 'A database'], correctIndex: 1, explanation: 'The Linux command line is a text-based interface for controlling the system.' },
    { question: 'What does cd do in Linux?', options: ['Creates a directory', 'Changes the current directory', 'Copies a directory', 'Deletes a directory'], correctIndex: 1, explanation: 'cd (change directory) navigates to a different directory.' },
  ],
  'dv-2': [
    { question: 'What problem does Docker solve?', options: ['Slow internet', '"It works on my machine" environment issues', 'Expensive hardware', 'Slow code'], correctIndex: 1, explanation: 'Docker solves environment inconsistency by packaging apps with dependencies.' },
    { question: 'What is Docker Compose?', options: ['A single Docker container', 'A tool for running multi-container applications', 'A Docker alternative', 'A monitoring tool'], correctIndex: 1, explanation: 'Docker Compose defines and runs multi-container Docker applications.' },
  ],
  'dv-3': [
    { question: 'What is GitHub Actions?', options: ['A code editor', 'A CI/CD automation platform', 'A database', 'A CSS framework'], correctIndex: 1, explanation: 'GitHub Actions automates builds, tests, and deployments.' },
    { question: 'What is a GitHub Actions workflow?', options: ['A design document', 'An automated process defined in YAML', 'A database migration', 'A code review'], correctIndex: 1, explanation: 'A workflow is an automated process defined in a YAML file in your repo.' },
  ],
  'dv-4': [
    { question: 'What is Kubernetes?', options: ['A programming language', 'A container orchestration platform', 'A database', 'A CSS library'], correctIndex: 1, explanation: 'Kubernetes (K8s) automates deployment and scaling of containers.' },
    { question: 'What is a Kubernetes pod?', options: ['A group of servers', 'The smallest deployable unit containing containers', 'A load balancer', 'A storage volume'], correctIndex: 1, explanation: 'A pod is the smallest deployable unit in Kubernetes, containing one or more containers.' },
  ],
  'dv-5': [
    { question: 'Who runs TechWorld with Nana?', options: ['Google', 'Nana', 'freeCodeCamp', 'Microsoft'], correctIndex: 1, explanation: 'TechWorld with Nana is a popular DevOps channel run by Nana.' },
    { question: 'What topics does TechWorld with Nana cover?', options: ['Only Linux', 'Docker, Kubernetes, CI/CD, and cloud', 'Only databases', 'Only frontend'], correctIndex: 1, explanation: 'Nana covers Docker, Kubernetes, CI/CD, cloud, and DevOps tools.' },
  ],
  'dv-6': [
    { question: 'What is Terraform?', options: ['A testing tool', 'An Infrastructure as Code tool', 'A CI/CD platform', 'A monitoring tool'], correctIndex: 1, explanation: 'Terraform manages infrastructure through declarative configuration files.' },
    { question: 'What does Infrastructure as Code mean?', options: ['Writing infrastructure as text files', 'Managing servers manually', 'Using a GUI to manage servers', 'Writing application code'], correctIndex: 0, explanation: 'IaC means managing infrastructure through machine-readable definition files.' },
  ],
  'dv-7': [
    { question: 'What is AWS?', options: ['A programming language', 'Amazon cloud computing platform', 'A database', 'A frontend framework'], correctIndex: 1, explanation: 'Amazon Web Services is a comprehensive cloud computing platform.' },
    { question: 'What is an EC2 instance?', options: ['A database', 'A virtual server in the cloud', 'A storage bucket', 'A load balancer'], correctIndex: 1, explanation: 'EC2 provides resizable virtual servers in the AWS cloud.' },
  ],

  // ─── CYBERSECURITY (cy-1 to cy-7) ───
  'cy-1': [
    { question: 'What is TryHackMe?', options: ['A coding platform', 'A beginner-friendly cybersecurity training platform', 'A social network', 'A cloud provider'], correctIndex: 1, explanation: 'TryHackMe offers gamified cybersecurity training for beginners.' },
    { question: 'What makes TryHackMe good for beginners?', options: ['It is expensive', 'Guided rooms with step-by-step instructions', 'It requires advanced knowledge', 'It is exam-based'], correctIndex: 1, explanation: 'TryHackMe provides guided, beginner-friendly cybersecurity rooms.' },
  ],
  'cy-2': [
    { question: 'What is HackTheBox?', options: ['A beginner course', 'An intermediate-to-advanced hacking lab platform', 'A coding challenge', 'A cloud service'], correctIndex: 1, explanation: 'HackTheBox provides realistic hacking challenges for intermediate to advanced users.' },
    { question: 'How does HackTheBox differ from TryHackMe?', options: ['It is easier', 'It is more advanced with less guidance', 'It is the same', 'It is paid only'], correctIndex: 1, explanation: 'HackTheBox assumes more knowledge and provides less hand-holding than TryHackMe.' },
  ],
  'cy-3': [
    { question: 'What is PortSwigger Web Security Academy?', options: ['A paid course', 'A free web security training platform', 'A penetration testing tool', 'A certification'], correctIndex: 1, explanation: 'PortSwigger offers free world-class web security training.' },
    { question: 'Who created PortSwigger Web Security Academy?', options: ['Google', 'PortSwigger (Burp Suite creators)', 'OWASP', 'Microsoft'], correctIndex: 1, explanation: 'PortSwigger is the company behind the Burp Suite security testing tool.' },
  ],
  'cy-4': [
    { question: 'Who created the Google Cybersecurity Certificate?', options: ['Microsoft', 'Google', 'IBM', 'Cisco'], correctIndex: 1, explanation: 'Google created a professional cybersecurity certificate on Coursera.' },
    { question: 'Can you audit the Google Cybersecurity Certificate for free?', options: ['No, fully paid', 'Yes, audit for free', 'Only the first course', 'No, subscription required'], correctIndex: 1, explanation: 'Coursera allows auditing the course for free; certificate costs extra.' },
  ],
  'cy-5': [
    { question: 'What type of content does NetworkChuck create?', options: ['Only Linux tutorials', 'Engaging networking and cybersecurity content', 'Only programming', 'Only hardware reviews'], correctIndex: 1, explanation: 'NetworkChuck makes engaging, practical networking and cybersecurity content.' },
    { question: 'What makes NetworkChuck popular?', options: ['Dry lectures', 'Energetic teaching style and practical demos', 'Only theory', 'Only news'], correctIndex: 1, explanation: 'NetworkChuck engaging style makes complex topics accessible.' },
  ],
  'cy-6': [
    { question: 'What is the OWASP Top 10?', options: ['Top 10 programming languages', 'Top 10 web application security risks', 'Top 10 cybersecurity tools', 'Top 10 ethical hackers'], correctIndex: 1, explanation: 'The OWASP Top 10 lists the most critical web application security risks.' },
    { question: 'What does OWASP stand for?', options: ['Open Web Application Security Project', 'Online Web Attack Security Protocol', 'Open World Application Safety Program', 'Online Web App Security Platform'], correctIndex: 0, explanation: 'OWASP is the Open Web Application Security Project, a nonprofit foundation.' },
  ],
  'cy-7': [
    { question: 'What is PicoCTF?', options: ['A paid course', 'A beginner-friendly Capture The Flag competition', 'A security tool', 'A certification'], correctIndex: 1, explanation: 'PicoCTF is a free CTF competition designed for beginners.' },
    { question: 'Who created PicoCTF?', options: ['Google', 'Carnegie Mellon University', 'MIT', 'Stanford'], correctIndex: 1, explanation: 'PicoCTF was created by Carnegie Mellon University security experts.' },
  ],

  // ─── MOBILE DEVELOPMENT (mob-1 to mob-6) ───
  'mob-1': [
    { question: 'What is React Native?', options: ['A native Android framework', 'A framework for building mobile apps with React', 'A web framework', 'A database'], correctIndex: 1, explanation: 'React Native builds cross-platform mobile apps using React and JavaScript.' },
    { question: 'Can React Native code work on both iOS and Android?', options: ['No, separate code needed', 'Yes, with a single codebase', 'Only iOS', 'Only Android'], correctIndex: 1, explanation: 'React Native allows sharing most code between iOS and Android.' },
  ],
  'mob-2': [
    { question: 'What is Expo?', options: ['A database', 'The easiest way to start building React Native apps', 'A CSS framework', 'A cloud service'], correctIndex: 1, explanation: 'Expo simplifies React Native development with tools and managed workflows.' },
    { question: 'What does Expo manage for you?', options: ['Only styling', 'Build, deploy, and update processes', 'Only databases', 'Only auth'], correctIndex: 1, explanation: 'Expo handles build, deployment, and over-the-air updates.' },
  ],
  'mob-3': [
    { question: 'What is covered in the React Native Full Course?', options: ['Only basics', 'Components, navigation, and deployment', 'Only backend', 'Only styling'], correctIndex: 1, explanation: 'The course covers components, navigation, state management, and deployment.' },
    { question: 'What navigation library is commonly used in React Native?', options: ['React Router', 'React Navigation', 'React Router Native', 'Navify'], correctIndex: 1, explanation: 'React Navigation is the most popular navigation library for React Native.' },
  ],
  'mob-4': [
    { question: 'What is Flutter?', options: ['A JavaScript framework', "Google UI toolkit for building cross-platform apps", 'A database', 'A cloud service'], correctIndex: 1, explanation: 'Flutter is Google UI toolkit for building cross-platform apps from a single codebase.' },
    { question: 'What programming language does Flutter use?', options: ['JavaScript', 'Dart', 'Python', 'Kotlin'], correctIndex: 1, explanation: 'Flutter uses the Dart programming language.' },
  ],
  'mob-5': [
    { question: 'What does the Flutter Full Course cover?', options: ['Only basics', 'Widgets, navigation, Firebase, and deployment', 'Only databases', 'Only animation'], correctIndex: 1, explanation: 'The course covers Flutter widgets, navigation, Firebase, and deployment.' },
    { question: 'What is a widget in Flutter?', options: ['A plugin', 'The basic building block of the UI', 'A database connection', 'A server function'], correctIndex: 1, explanation: 'Everything in Flutter is a widget, from layout to UI elements.' },
  ],
  'mob-6': [
    { question: 'What does Firebase provide for mobile apps?', options: ['Only hosting', 'Auth, database, storage, and more', 'Only analytics', 'Only push notifications'], correctIndex: 1, explanation: 'Firebase provides auth, Firestore, storage, functions, and analytics.' },
    { question: 'What type of database is Firestore?', options: ['Relational SQL', 'NoSQL document database', 'Graph database', 'Key-value store'], correctIndex: 1, explanation: 'Firestore is a flexible, scalable NoSQL document database.' },
  ],

  // ─── VIDEO EDITING (vid-1 to vid-6) ───
  'vid-1': [
    { question: 'What is DaVinci Resolve?', options: ['A code editor', 'A professional video editing software', 'A music player', 'A photo editor'], correctIndex: 1, explanation: 'DaVinci Resolve is a professional-grade video editing and color grading software.' },
    { question: 'Is DaVinci Resolve free?', options: ['No, fully paid', 'Yes, with a very capable free version', 'Free trial only', 'Subscription only'], correctIndex: 1, explanation: 'DaVinci Resolve has a powerful free version with professional features.' },
  ],
  'vid-2': [
    { question: 'Who is Casey Faris?', options: ['A Hollywood director', 'The best DaVinci Resolve educator on YouTube', 'A camera manufacturer', 'A software developer'], correctIndex: 1, explanation: 'Casey Faris creates the best DaVinci Resolve tutorials on YouTube.' },
    { question: 'What type of DaVinci Resolve content does Casey Faris make?', options: ['Only for experts', 'Tutorials for all levels from beginner to advanced', 'Only color grading', 'Only audio'], correctIndex: 1, explanation: 'Casey Faris covers DaVinci Resolve for all skill levels.' },
  ],
  'vid-3': [
    { question: 'What is Adobe Premiere Pro?', options: ['A photo editor', 'The industry standard video editing software', 'A music production tool', 'A 3D modeling software'], correctIndex: 1, explanation: 'Premiere Pro is the industry-standard video editing software.' },
    { question: 'What is the pricing model for Premiere Pro?', options: ['Free', 'Subscription via Adobe Creative Cloud', 'One-time purchase', 'Free with ads'], correctIndex: 1, explanation: 'Premiere Pro requires a monthly or annual Creative Cloud subscription.' },
  ],
  'vid-4': [
    { question: 'What is CapCut?', options: ['A professional editing suite', 'A free mobile-first video editing app', 'A code editor', 'A screen recorder'], correctIndex: 1, explanation: 'CapCut is a free, beginner-friendly mobile video editing app.' },
    { question: 'Who created CapCut?', options: ['Adobe', 'ByteDance (TikTok parent)', 'Apple', 'Google'], correctIndex: 1, explanation: 'CapCut was created by ByteDance, the company behind TikTok.' },
  ],
  'vid-5': [
    { question: 'What is Pexels?', options: ['A video editor', 'A free stock video and image library', 'A music production tool', 'A hosting platform'], correctIndex: 1, explanation: 'Pexels offers high-quality free stock videos and images.' },
    { question: 'Can you use Pexels videos for commercial projects?', options: ['No, never', 'Yes, most are free to use', 'Only with attribution', 'Only for personal use'], correctIndex: 1, explanation: 'Pexels offers a generous license allowing most commercial use.' },
  ],
  'vid-6': [
    { question: 'What is Descript?', options: ['A traditional video editor', 'An AI-powered editor where you edit by editing text', 'A code editor', 'A screen recorder'], correctIndex: 1, explanation: 'Descript allows editing video by editing the transcribed text.' },
    { question: 'What unique feature does Descript have?', options: ['3D effects', 'Edit video like editing a document', 'Advanced color grading', 'Multi-cam editing'], correctIndex: 1, explanation: 'Descript unique approach lets you edit video by editing the transcript text.' },
  ],

  // ─── YOUTUBE AUTOMATION (yt-1 to yt-6) ───
  'yt-1': [
    { question: 'Who is Matt Par?', options: ['A Hollywood producer', 'A leading YouTube automation educator', 'A camera reviewer', 'A video editor'], correctIndex: 1, explanation: 'Matt Par is a prominent YouTube automation content creator and educator.' },
    { question: 'What does Matt Par teach?', options: ['Traditional filmmaking', 'YouTube automation systems and strategies', 'Audio engineering', 'Animation'], correctIndex: 1, explanation: 'Matt Par focuses on YouTube automation, niche selection, and channel systems.' },
  ],
  'yt-2': [
    { question: 'What is ElevenLabs?', options: ['A video editor', 'An AI voice generation tool with realistic voices', 'A music producer', 'A screen recorder'], correctIndex: 1, explanation: 'ElevenLabs produces industry-best AI voiceovers.' },
    { question: 'What makes ElevenLabs stand out?', options: ['It is free', 'Voice quality indistinguishable from humans', 'It has video editing', 'It is open source'], correctIndex: 1, explanation: 'ElevenLabs is known for exceptionally realistic AI-generated voices.' },
  ],
  'yt-3': [
    { question: 'What is Canva?', options: ['A code editor', 'A graphic design platform for thumbnails and graphics', 'A video editor', 'A social media platform'], correctIndex: 1, explanation: 'Canva is a user-friendly design tool for creating graphics and thumbnails.' },
    { question: 'Is Canva free?', options: ['No, fully paid', 'Has a generous free tier with paid pro features', 'Free trial only', 'Subscription only'], correctIndex: 1, explanation: 'Canva has a free plan that covers essential design needs.' },
  ],
  'yt-4': [
    { question: 'What is vidIQ?', options: ['A video editor', 'A YouTube SEO and growth tool', 'A camera manufacturer', 'A social network'], correctIndex: 1, explanation: 'vidIQ provides YouTube SEO research and channel growth tools.' },
    { question: 'What does vidIQ help with?', options: ['Video editing', 'Keyword research and channel analytics', 'Thumbnail design', 'Script writing'], correctIndex: 1, explanation: 'vidIQ specializes in keyword research and YouTube analytics.' },
  ],
  'yt-5': [
    { question: 'What is TubeBuddy?', options: ['A video editor', 'A browser extension for YouTube channel management', 'A camera accessory', 'A hosting service'], correctIndex: 1, explanation: 'TubeBuddy is a browser extension for YouTube channel optimization.' },
    { question: 'What feature does TubeBuddy offer?', options: ['Video rendering', 'A/B thumbnail testing tools', 'Camera control', 'Audio mixing'], correctIndex: 1, explanation: 'TubeBuddy offers A/B testing for thumbnails to optimize click rates.' },
  ],
  'yt-6': [
    { question: 'What is Pexels used for in YouTube automation?', options: ['Thumbnail creation', 'Stock footage for B-roll and visuals', 'Audio mixing', 'Channel analytics'], correctIndex: 1, explanation: 'Pexels provides free stock footage for video B-roll and visuals.' },
    { question: 'Is Pexels footage royalty-free?', options: ['No', 'Yes, most footage is free to use', 'Only with subscription', 'Only for personal use'], correctIndex: 1, explanation: 'Pexels offers royalty-free stock footage under a permissive license.' },
  ],

  // ─── DIGITAL MARKETING (mkt-1 to mkt-6) ───
  'mkt-1': [
    { question: 'What is Google Digital Garage?', options: ['A cloud storage service', 'Google free digital marketing certification', 'A social media platform', 'A web hosting service'], correctIndex: 1, explanation: 'Google Digital Garage offers free digital marketing certification.' },
    { question: 'What topics does Google Digital Garage cover?', options: ['Only SEO', 'Digital marketing across all major channels', 'Only social media', 'Only paid ads'], correctIndex: 1, explanation: 'Digital Garage covers SEO, social media, paid ads, analytics, and more.' },
  ],
  'mkt-2': [
    { question: 'What is HubSpot Academy?', options: ['A university', 'Free marketing certifications and courses', 'A social media platform', 'A web builder'], correctIndex: 1, explanation: 'HubSpot Academy provides free marketing, sales, and CRM certifications.' },
    { question: 'What is inbound marketing?', options: ['Spam emails', 'Attracting customers through valuable content', 'Paid advertising only', 'TV commercials'], correctIndex: 1, explanation: 'Inbound marketing attracts customers through helpful content, not interruption.' },
  ],
  'mkt-3': [
    { question: 'What is SEMrush?', options: ['A social media platform', 'An SEO and competitive research tool', 'A code editor', 'A hosting platform'], correctIndex: 1, explanation: 'SEMrush is a comprehensive SEO and competitive research tool.' },
    { question: 'What does SEMrush Academy offer?', options: ['Paid degrees', 'Free SEO and SEM courses', 'Job placement', 'Cloud hosting'], correctIndex: 1, explanation: 'SEMrush Academy offers free courses on SEO, content, and digital marketing.' },
  ],
  'mkt-4': [
    { question: 'What does Moz specialize in?', options: ['Social media', 'SEO software and education', 'Video editing', 'Web hosting'], correctIndex: 1, explanation: 'Moz is a leading SEO software company with extensive learning resources.' },
    { question: 'What is a Moz DA score?', options: ['Download speed', 'Domain Authority, a ranking predictor', 'Design award', 'Data accuracy'], correctIndex: 1, explanation: 'Domain Authority (DA) predicts how likely a domain is to rank in search.' },
  ],
  'mkt-5': [
    { question: 'Who is Neil Patel?', options: ['A Hollywood actor', 'A well-known digital marketing educator', 'A software engineer', 'A musician'], correctIndex: 1, explanation: 'Neil Patel is a prominent digital marketing expert and educator.' },
    { question: 'What type of content does Neil Patel create?', options: ['Only paid ads', 'SEO, content, and digital marketing strategy tutorials', 'Only social media', 'Only email marketing'], correctIndex: 1, explanation: 'Neil Patel covers SEO, content marketing, and digital strategy.' },
  ],
  'mkt-6': [
    { question: 'What does the Ahrefs YouTube channel cover?', options: ['Video editing tips', 'SEO and content marketing tutorials', 'Coding tutorials', 'Music production'], correctIndex: 1, explanation: 'Ahrefs channel provides practical, well-researched SEO content.' },
    { question: 'What is Ahrefs known for?', options: ['Web hosting', 'Backlink analysis and SEO tools', 'Social media management', 'Email marketing'], correctIndex: 1, explanation: 'Ahrefs is one of the most respected SEO tool suites globally.' },
  ],

  // ─── AI FOR WORK (ai-1 to ai-6) ───
  'ai-1': [
    { question: 'What is an LLM?', options: ['A type of database', 'A Large Language Model trained on text', 'A programming language', 'A design tool'], correctIndex: 1, explanation: 'An LLM is a neural network trained on vast text data to generate human-like text.' },
    { question: 'What is a key limitation of LLMs?', options: ['They are always correct', 'They can hallucinate and generate false information', 'They only work in English', 'They cannot process images'], correctIndex: 1, explanation: 'Hallucination is a well-known limitation where LLMs confidently generate false information.' },
  ],
  'ai-2': [
    { question: 'What is zero-shot prompting?', options: ['Giving the AI no instructions', 'Asking AI to perform a task without examples', 'Asking AI with 10 examples', 'Using no context at all'], correctIndex: 1, explanation: 'Zero-shot prompting means asking the model to perform a task without providing examples.' },
    { question: 'What is chain-of-thought prompting?', options: ['Prompting with a chain of keywords', 'Asking the AI to reason step by step', 'A type of encryption', 'A programming technique'], correctIndex: 1, explanation: 'Chain-of-thought prompting encourages step-by-step reasoning for better results.' },
  ],
  'ai-3': [
    { question: 'What is GitHub Copilot?', options: ['A social network', 'An AI code completion tool for editors', 'A database', 'A hosting platform'], correctIndex: 1, explanation: 'GitHub Copilot provides AI-powered code suggestions directly in your editor.' },
    { question: 'What should developers always do with AI-generated code?', options: ['Deploy it immediately', 'Review and verify it for correctness and security', 'Ignore it', 'Only use it for styling'], correctIndex: 1, explanation: 'AI-generated code must always be reviewed by a developer for bugs and security issues.' },
  ],
  'ai-4': [
    { question: 'Who created the DeepLearning.AI short courses?', options: ['Elon Musk', 'Andrew Ng', 'Geoffrey Hinton', 'Yann LeCun'], correctIndex: 1, explanation: 'Andrew Ng created DeepLearning.AI which offers free short courses on AI topics.' },
    { question: 'What is prompt engineering?', options: ['Building hardware prompts', 'The practice of crafting effective AI inputs', 'A programming language', 'A database query'], correctIndex: 1, explanation: 'Prompt engineering is the skill of designing inputs that get the best results from AI.' },
  ],
  'ai-5': [
    { question: 'Who created the 3Blue1Brown Neural Networks video?', options: ['Grant Sanderson', 'Andrew Ng', 'Andrej Karpathy', 'Josh Starmer'], correctIndex: 0, explanation: '3Blue1Brown is created by Grant Sanderson, known for beautiful mathematical visualizations.' },
    { question: 'What does the 3Blue1Brown video explain?', options: ['How to code', 'How neural networks learn, visually', 'Database design', 'CSS styling'], correctIndex: 1, explanation: 'The video provides an intuitive visual explanation of how neural networks learn.' },
  ],
  'ai-6': [
    { question: 'What does the fast.ai ethics course cover?', options: ['Web development ethics', 'AI bias, fairness, and ethical implications', 'Database ethics', 'Design ethics'], correctIndex: 1, explanation: 'fast.ai practical data ethics covers bias, fairness, safety, and societal impact of AI.' },
    { question: 'Why is AI ethics important?', options: ['It is optional', 'AI systems can perpetuate and amplify societal biases', 'It slows down development', 'Only regulators care'], correctIndex: 1, explanation: 'AI ethics is critical because AI systems can amplify existing biases and cause real harm.' },
  ],

  // ─── NO-CODE (nc-1 to nc-5) ───
  'nc-1': [
    { question: 'What is Webflow?', options: ['A code editor', 'A visual website building platform', 'A database', 'A hosting service'], correctIndex: 1, explanation: 'Webflow is a visual web development platform that generates clean HTML/CSS.' },
    { question: 'What does Webflow University offer?', options: ['College degrees', 'Free no-code web building education', 'Job placement', 'Hardware reviews'], correctIndex: 1, explanation: 'Webflow University provides comprehensive free tutorials on web development.' },
  ],
  'nc-2': [
    { question: 'What is Bubble?', options: ['A code editor', 'A no-code web app builder', 'A video editor', 'A social media platform'], correctIndex: 1, explanation: 'Bubble is a no-code platform for building full-featured web applications.' },
    { question: 'What can you build with Bubble?', options: ['Only landing pages', 'Full web apps with databases and user accounts', 'Only mobile games', 'Only blogs'], correctIndex: 1, explanation: 'Bubble allows building web apps with databases, user auth, and complex logic.' },
  ],
  'nc-3': [
    { question: 'What is Framer?', options: ['A code editor', 'A visual tool for React websites', 'A database', 'A hosting platform'], correctIndex: 1, explanation: 'Framer is a visual design tool that generates React-based websites.' },
    { question: 'Is Framer free to use?', options: ['No, fully paid', 'Has a free tier with paid plans for custom domains', 'Free trial only', 'Subscription only'], correctIndex: 1, explanation: 'Framer has a free plan for .framer.site subdomains and paid plans for custom domains.' },
  ],
  'nc-4': [
    { question: 'What is Zapier used for?', options: ['Video editing', 'Connecting apps and automating workflows', 'Web designing', 'Code compiling'], correctIndex: 1, explanation: 'Zapier connects different apps and automates repetitive workflows.' },
    { question: 'What is a Zap in Zapier?', options: ['A bug', 'An automated workflow between apps', 'A design template', 'A database query'], correctIndex: 1, explanation: 'A Zap is an automated workflow that connects two or more apps.' },
  ],
  'nc-5': [
    { question: 'What is Glide?', options: ['A code editor', 'A no-code mobile app builder from spreadsheets', 'A video editor', 'A database'], correctIndex: 1, explanation: 'Glide builds mobile apps from Google Sheets or Airtable without code.' },
    { question: 'What is the best use case for Glide?', options: ['Building complex games', 'Quickly creating data-driven mobile apps', 'Video rendering', 'Server management'], correctIndex: 1, explanation: 'Glide excels at turning structured data into functional mobile apps quickly.' },
  ],

  // ─── TECHNICAL WRITING (tw-1 to tw-4) ───
  'tw-1': [
    { question: 'What does Google Technical Writing course teach?', options: ['How to code', 'Clear documentation writing skills', 'Graphic design', 'Video editing'], correctIndex: 1, explanation: 'Google offers free technical writing courses focused on clarity and concision.' },
    { question: 'Who should take Google Technical Writing?', options: ['Only professional writers', 'Any developer or engineer who writes documentation', 'Only managers', 'Only designers'], correctIndex: 1, explanation: 'The courses are designed for engineers and technical professionals who write docs.' },
  ],
  'tw-2': [
    { question: 'What is Write the Docs?', options: ['A code editor', 'A global community for documentation professionals', 'A writing software', 'A hosting platform'], correctIndex: 1, explanation: 'Write the Docs is a global community focused on software documentation.' },
    { question: 'Does Write the Docs offer a free guide?', options: ['No, it is paid', 'Yes, a community-driven best practices guide', 'Only for members', 'No guide exists'], correctIndex: 1, explanation: 'Write the Docs publishes a free community-driven documentation guide.' },
  ],
  'tw-3': [
    { question: 'What is the Divio Documentation System?', options: ['A code framework', 'A 4-type documentation framework', 'A design system', 'A database schema'], correctIndex: 1, explanation: 'Divio defines 4 documentation types: tutorials, how-tos, explanations, and references.' },
    { question: 'What is the purpose of a tutorial in the Divio system?', options: ['Reference material', 'Learning-oriented step-by-step instruction', 'Technical specification', 'Marketing copy'], correctIndex: 1, explanation: 'Tutorials are learning-oriented and guide the reader through completing a task.' },
  ],
  'tw-4': [
    { question: 'What is Markdown?', options: ['A programming language', 'A lightweight markup language for formatting text', 'A database', 'A design tool'], correctIndex: 1, explanation: 'Markdown is a simple markup language for formatting plain text as structured content.' },
    { question: 'Where is Markdown commonly used?', options: ['Video editing', 'Documentation, README files, and static site generation', 'Database queries', 'Image editing'], correctIndex: 1, explanation: 'Markdown is widely used for documentation, READMEs, and technical writing.' },
  ],

  // ─── CRYPTO & WEB3 (cr-1 to cr-20) ───
  'cr-1': [
    { question: 'Who created Bitcoin?', options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Elon Musk', 'Hal Finney'], correctIndex: 1, explanation: 'Bitcoin was created by the pseudonymous Satoshi Nakamoto in 2008.' },
    { question: 'What does the Bitcoin whitepaper propose?', options: ['A centralized payment system', 'A peer-to-peer electronic cash system without intermediaries', 'A social network', 'A cloud storage service'], correctIndex: 1, explanation: 'The whitepaper proposed a decentralized electronic cash system.' },
  ],
  'cr-2': [
    { question: 'What is Ethereum?', options: ['A type of token', 'A decentralized computing platform with smart contracts', 'A centralized exchange', 'A wallet'], correctIndex: 1, explanation: 'Ethereum is a decentralized platform that runs smart contracts.' },
    { question: 'What is a smart contract?', options: ['A legal document on paper', 'Self-executing code on a blockchain', 'A traditional contract signed digitally', 'A type of NFT'], correctIndex: 1, explanation: 'Smart contracts are self-executing programs stored on a blockchain.' },
  ],
  'cr-3': [
    { question: 'What does CryptoZombies teach?', options: ['Game design', 'Solidity by building a zombie game', 'Token trading', 'Blockchain mining'], correctIndex: 1, explanation: 'CryptoZombies teaches Solidity by having you build a collectible zombie game.' },
    { question: 'Is CryptoZombies free?', options: ['No, fully paid', 'Yes, completely free', 'Free trial only', 'Subscription required'], correctIndex: 1, explanation: 'CryptoZombies is completely free to use and learn Solidity.' },
  ],
  'cr-4': [
    { question: 'Who created the most comprehensive free Solidity course?', options: ['Vitalik Buterin', 'Patrick Collins', 'Ethereum Foundation', 'OpenZeppelin'], correctIndex: 1, explanation: 'Patrick Collins created a 32-hour free Solidity course covering everything from basics to security.' },
    { question: 'What does Foundry provide for Solidity developers?', options: ['A code editor', 'A fast toolkit for compiling, testing, and deploying contracts', 'A wallet', 'An exchange'], correctIndex: 1, explanation: 'Foundry is a modern, fast Solidity development toolkit from Paradigm.' },
  ],
  'cr-5': [
    { question: 'What is ERC-20?', options: ['A type of NFT', 'The standard for fungible tokens on Ethereum', 'A consensus mechanism', 'A wallet address format'], correctIndex: 1, explanation: 'ERC-20 defines the standard interface for fungible tokens on Ethereum.' },
    { question: 'What is ERC-721?', options: ['A fungible token standard', 'The standard for non-fungible tokens (NFTs)', 'A gas optimization technique', 'A smart contract library'], correctIndex: 1, explanation: 'ERC-721 is the standard for non-fungible tokens on Ethereum.' },
  ],
  'cr-6': [
    { question: 'What is OpenZeppelin?', options: ['A cryptocurrency exchange', 'A library of battle-tested smart contracts', 'A blockchain network', 'A wallet provider'], correctIndex: 1, explanation: 'OpenZeppelin provides audited, community-vetted smart contract libraries.' },
    { question: 'Why use OpenZeppelin contracts?', options: ['They are faster to deploy', 'They are audited and follow secure patterns', 'They are cheaper', 'They are guaranteed bug-free'], correctIndex: 1, explanation: 'OpenZeppelin provides audited contracts that follow industry best security practices.' },
  ],
  'cr-7': [
    { question: 'What is a reentrancy attack?', options: ['A DOS attack', 'When a contract is called repeatedly before state updates', 'A frontend bug', 'A database error'], correctIndex: 1, explanation: 'Reentrancy occurs when an external call is made before state updates, allowing re-entry.' },
    { question: 'How can reentrancy be prevented?', options: ['Using more gas', 'Using checks-effects-interactions pattern', 'Removing external calls completely', 'Using newer Solidity versions'], correctIndex: 1, explanation: 'The checks-effects-interactions pattern prevents reentrancy by updating state before external calls.' },
  ],
  'cr-8': [
    { question: 'What is Ethernaut?', options: ['A cryptocurrency exchange', 'Smart contract security challenges by OpenZeppelin', 'A wallet app', 'A blockchain network'], correctIndex: 1, explanation: 'Ethernaut is a gamified smart contract security challenge platform by OpenZeppelin.' },
    { question: 'What skill does Ethernaut build?', options: ['Frontend development', 'Smart contract security and exploit identification', 'Video editing', 'Database design'], correctIndex: 1, explanation: 'Ethernaut teaches you to identify and exploit smart contract vulnerabilities safely.' },
  ],
  'cr-9': [
    { question: 'What is Damn Vulnerable DeFi?', options: ['A DeFi protocol', 'Advanced DeFi exploit challenges for auditors', 'A cryptocurrency', 'A wallet'], correctIndex: 1, explanation: 'Damn Vulnerable DeFi is a set of advanced DeFi exploit challenges for practicing auditing.' },
    { question: 'Who should use Damn Vulnerable DeFi?', options: ['Complete beginners', 'Advanced developers preparing for security auditing', 'Only project managers', 'Only designers'], correctIndex: 1, explanation: 'DVF is designed for experienced developers practicing DeFi security auditing.' },
  ],
  'cr-10': [
    { question: 'What is Cyfrin Updraft?', options: ['A cryptocurrency exchange', 'The best free smart contract security curriculum', 'A wallet app', 'A blockchain network'], correctIndex: 1, explanation: 'Cyfrin Updraft offers a free comprehensive smart contract security and auditing curriculum.' },
    { question: 'Who created Cyfrin Updraft?', options: ['OpenZeppelin', 'Cyfrin, a top audit firm', 'Ethereum Foundation', 'Chainlink'], correctIndex: 1, explanation: 'Cyfrin is a leading smart contract audit firm that created the security curriculum.' },
  ],
  'cr-11': [
    { question: 'What is wagmi?', options: ['A Solidity library', 'React hooks for Ethereum development', 'A blockchain network', 'A wallet'], correctIndex: 1, explanation: 'wagmi provides React hooks for interacting with Ethereum wallets and contracts.' },
    { question: 'What problem does wagmi solve?', options: ['Styling dApps', 'Making Ethereum frontend development cleaner and type-safe', 'Database management', 'Smart contract compilation'], correctIndex: 1, explanation: 'wagmi simplifies Ethereum frontend development with type-safe React hooks.' },
  ],
  'cr-12': [
    { question: 'What does Finematics explain?', options: ['Solidity syntax', 'DeFi concepts with visual animations', 'NFT trading', 'Mining hardware'], correctIndex: 1, explanation: 'Finematics creates visual explanations of DeFi concepts like AMMs and lending protocols.' },
    { question: 'What DeFi concept should you start with on Finematics?', options: ['Flash loans', 'AMMs and lending protocols', 'Governance tokens', 'Oracles'], correctIndex: 1, explanation: 'Finematics recommends starting with AMMs and lending protocols as fundamental DeFi building blocks.' },
  ],
  'cr-13': [
    { question: 'What is Dune Analytics?', options: ['A code editor', 'A platform for writing SQL against blockchain data', 'A wallet', 'An exchange'], correctIndex: 1, explanation: 'Dune Analytics lets you query and visualize blockchain data using SQL.' },
    { question: 'Is Dune Analytics free?', options: ['No, fully paid', 'Yes, with a free tier for building and publishing dashboards', 'Free trial only', 'Enterprise only'], correctIndex: 1, explanation: 'Dune has a free tier for building and sharing public dashboards.' },
  ],
  'cr-14': [
    { question: 'What does Rekt News publish?', options: ['Bitcoin price predictions', 'Post-mortems of major DeFi exploits and hacks', 'NFT minting guides', 'Wallet reviews'], correctIndex: 1, explanation: 'Rekt News publishes detailed post-mortems of every major DeFi security incident.' },
    { question: 'Why is Rekt News valuable for learning?', options: ['It predicts hacks', 'It provides real-world security education through exploit analysis', 'It lists token prices', 'It reviews exchanges'], correctIndex: 1, explanation: 'Reading exploit post-mortems is one of the most effective ways to learn smart contract security.' },
  ],
  'cr-15': [
    { question: 'What is Speedrun Ethereum?', options: ['A blockchain game', 'Project-based Solidity learning with increasing difficulty', 'A mining tool', 'A wallet app'], correctIndex: 1, explanation: 'Speedrun Ethereum offers graded Solidity projects that build in difficulty.' },
    { question: 'Who built Speedrun Ethereum?', options: ['Ethereum Foundation', 'The Scaffold-ETH team (BuidlGuidl)', 'OpenZeppelin', 'ConsenSys'], correctIndex: 1, explanation: 'Speedrun Ethereum was created by the same team behind Scaffold-ETH.' },
  ],
  'cr-16': [
    { question: 'What is ETHGlobal?', options: ['A cryptocurrency exchange', 'The premier Web3 hackathon series', 'A wallet app', 'A blockchain network'], correctIndex: 1, explanation: 'ETHGlobal runs the world largest Web3 hackathons with substantial prizes.' },
    { question: 'What can ETHGlobal hackathons provide?', options: ['Guaranteed jobs', 'Prizes, networking, and portfolio projects', 'Free tokens', 'Mining hardware'], correctIndex: 1, explanation: 'ETHGlobal hackathons offer prizes, connections, and real projects for your portfolio.' },
  ],
  'cr-17': [
    { question: 'What is Code4rena?', options: ['A coding bootcamp', 'A competitive smart contract audit platform', 'A social network', 'A blockchain network'], correctIndex: 1, explanation: 'Code4rena hosts competitive smart contract audits where security researchers find bugs.' },
    { question: 'How do auditors earn on Code4rena?', options: ['Subscription fees', 'Getting paid for valid bug findings in real protocols', 'Selling courses', 'Mining tokens'], correctIndex: 1, explanation: 'Auditors earn by finding and submitting valid vulnerabilities in audit contests.' },
  ],
  'cr-18': [
    { question: 'What does DefiLlama track?', options: ['Cryptocurrency prices only', 'TVL, protocol revenue, and stablecoin data across all chains', 'NFT sales only', 'Mining difficulty'], correctIndex: 1, explanation: 'DefiLlama tracks Total Value Locked and other metrics across all major chains.' },
    { question: 'Is DefiLlama open source?', options: ['No', 'Yes, it is free and open source', 'Only the API is open', 'Paid license required'], correctIndex: 1, explanation: 'DefiLlama is fully open source and community-maintained.' },
  ],
  'cr-19': [
    { question: 'What does Anders Brownworth blockchain demo show?', options: ['How to mine Bitcoin', 'A visual interactive demonstration of hashing and blockchain mechanics', 'How to trade NFTs', 'Smart contract development'], correctIndex: 1, explanation: 'Anders Brownworth demo provides an interactive, visual explanation of how blockchains work.' },
    { question: 'What concept does the demo make easy to understand?', options: ['Tokenomics', 'How hashing connects blocks into a chain', 'DeFi yields', 'Cross-chain bridges'], correctIndex: 1, explanation: 'The demo visually shows how cryptographic hashing links blocks together in a blockchain.' },
  ],
  'cr-20': [
    { question: 'What is the DeFi MOOC?', options: ['A paid course', 'A free UC Berkeley DeFi course with lectures by researchers and founders', 'A DeFi protocol', 'A trading bot'], correctIndex: 1, explanation: 'DeFi MOOC is a free university-level DeFi course from UC Berkeley.' },
    { question: 'Who teaches the DeFi MOOC?', options: ['Only professors', 'Researchers and actual protocol founders', 'Only traders', 'Only developers'], correctIndex: 1, explanation: 'The course features researchers and founders of major DeFi protocols as lecturers.' },
  ],

  // ─── PROJECT MANAGEMENT (pm-1 to pm-9) ───
  'pm-1': [
    { question: 'What is the Google Project Management Certificate?', options: ['A paid degree', 'A free-to-audit PM certification on Coursera', 'A software tool', 'A coding bootcamp'], correctIndex: 1, explanation: 'Google PM certificate is a 6-course program free to audit on Coursera.' },
    { question: 'What is a project charter?', options: ['A legal contract', 'A document that formally authorizes a project', 'A software license', 'A budget report'], correctIndex: 1, explanation: 'A project charter is a document that authorizes the project and defines its scope.' },
  ],
  'pm-2': [
    { question: 'What is the Scrum Guide?', options: ['A software manual', 'The official 13-page Scrum framework document', 'A coding standard', 'A design system'], correctIndex: 1, explanation: 'The Scrum Guide is the official, definitive document describing the Scrum framework.' },
    { question: 'What is a Sprint in Scrum?', options: ['A code review', 'A time-boxed iteration for delivering increments of work', 'A team meeting', 'A deployment'], correctIndex: 1, explanation: 'A Sprint is a time-boxed period (1-4 weeks) during which a usable product increment is created.' },
  ],
  'pm-3': [
    { question: 'What does Atlassian Agile Coach provide?', options: ['Paid coaching', 'Free comprehensive Agile and Scrum learning resources', 'Job placement', 'Certification exams'], correctIndex: 1, explanation: 'Atlassian provides a free Agile Coach resource with practical Scrum and Agile content.' },
    { question: 'What is a user story?', options: ['A story about users', 'A concise description of a feature from the user perspective', 'A bug report', 'A technical specification'], correctIndex: 1, explanation: 'A user story describes a feature from the end user perspective in a concise format.' },
  ],
  'pm-4': [
    { question: 'What does the freeCodeCamp PM course cover?', options: ['Only Agile', 'PM fundamentals, tools, and methodologies', 'Only Waterfall', 'Only certifications'], correctIndex: 1, explanation: 'The freeCodeCamp PM course covers PM fundamentals, tools, and various methodologies.' },
    { question: 'What is a Work Breakdown Structure (WBS)?', options: ['An org chart', 'A hierarchical breakdown of project deliverables', 'A budget spreadsheet', 'A timeline'], correctIndex: 1, explanation: 'A WBS breaks down project deliverables into smaller, manageable components.' },
  ],
  'pm-5': [
    { question: 'What is Jira used for?', options: ['Video editing', 'Project and issue tracking, especially in Agile teams', 'Design prototyping', 'Database management'], correctIndex: 1, explanation: 'Jira is the most widely used tool for Agile project management and issue tracking.' },
    { question: 'What is a Kanban board?', options: ['A meeting agenda', 'A visual workflow management tool showing work stages', 'A budget report', 'A design mockup'], correctIndex: 1, explanation: 'Kanban boards visualize work items moving through stages from start to completion.' },
  ],
  'pm-6': [
    { question: 'What are the 4 values of the Agile Manifesto?', options: ['Process, tools, contracts, plans', 'Individuals, working software, customer collaboration, responding to change', 'Speed, cost, quality, scope', 'Design, code, test, deploy'], correctIndex: 1, explanation: 'The Agile Manifesto values individuals, working software, customer collaboration, and responding to change.' },
    { question: 'How many principles does the Agile Manifesto contain?', options: ['4', '12', '7', '10'], correctIndex: 1, explanation: 'The Agile Manifesto includes 12 principles that guide Agile development.' },
  ],
  'pm-7': [
    { question: 'What is PMP certification?', options: ['A programming language', 'The most recognized project management certification globally', 'A design tool', 'A database system'], correctIndex: 1, explanation: 'Project Management Professional (PMP) is the gold standard PM certification.' },
    { question: 'Who issues the PMP certification?', options: ['Google', 'Project Management Institute (PMI)', 'Microsoft', 'Scrum.org'], correctIndex: 1, explanation: 'PMP is issued by the Project Management Institute (PMI).' },
  ],
  'pm-8': [
    { question: 'What is ProjectLibre?', options: ['A paid PM tool', 'A free open-source alternative to MS Project', 'A certification body', 'A consulting firm'], correctIndex: 1, explanation: 'ProjectLibre is a free, open-source project management software alternative to MS Project.' },
    { question: 'What can you build with ProjectLibre?', options: ['Websites', 'Gantt charts and full project plans', 'Mobile apps', 'Databases'], correctIndex: 1, explanation: 'ProjectLibre allows creating Gantt charts and comprehensive project plans.' },
  ],
  'pm-9': [
    { question: 'What does Notion offer for PM?', options: ['Only notes', 'Free PM templates for sprint boards and project trackers', 'Only databases', 'Only wikis'], correctIndex: 1, explanation: 'Notion provides free project management templates for various PM workflows.' },
    { question: 'Is Notion free for project management?', options: ['No, fully paid', 'Yes, with generous free tier for individuals and small teams', 'Free trial only', 'Enterprise only'], correctIndex: 1, explanation: 'Notion has a free plan that includes PM features and templates.' },
  ],

  // ─── PRODUCT MANAGEMENT (prd-1 to prd-9) ───
  'prd-1': [
    { question: 'Who writes Lenny Newsletter?', options: ['Google', 'Lenny Rachitsky', 'Product School', 'a16z'], correctIndex: 1, explanation: 'Lenny Rachitsky writes the most popular product management newsletter.' },
    { question: 'What kind of content does Lenny Newsletter share?', options: ['Stock tips', 'Essays by top PMs at companies like Airbnb, Uber, and Figma', 'Coding tutorials', 'Design mockups'], correctIndex: 1, explanation: 'Lenny Newsletter features essays and insights from PMs at top tech companies.' },
  ],
  'prd-2': [
    { question: 'What is Product School?', options: ['A college', 'A PM education platform with free resources', 'A coding bootcamp', 'A design tool'], correctIndex: 1, explanation: 'Product School offers PM education, free resources, and certification programs.' },
    { question: 'What does Product School offer for free?', options: ['Full certification', 'PM resources, webinars, and community access', 'Job placement', 'Software tools'], correctIndex: 1, explanation: 'Product School provides free PM resources, webinars, and a community.' },
  ],
  'prd-3': [
    { question: 'What does the freeCodeCamp PM course cover?', options: ['Only strategy', 'PM fundamentals and frameworks from basics to advanced', 'Only coding', 'Only design'], correctIndex: 1, explanation: 'The freeCodeCamp PM course introduces PM concepts, frameworks, and practical skills.' },
    { question: 'What is Jobs To Be Done (JTBD)?', options: ['A hiring framework', 'A theory that people hire products to get jobs done', 'A task list', 'A job board'], correctIndex: 1, explanation: 'JTBD framework focuses on understanding the user goal that drives product adoption.' },
  ],
  'prd-4': [
    { question: 'Who is Shreyas Doshi?', options: ['A venture capitalist', 'An influential PM thinker sharing insights on Twitter/X', 'A designer', 'A developer'], correctIndex: 1, explanation: 'Shreyas Doshi is a well-known PM thinker who shares deep product insights publicly.' },
    { question: 'What should PMs learn from Shreyas Doshi?', options: ['How to code', 'Product influence, strategy, and stakeholder management', 'UI design', 'Database management'], correctIndex: 1, explanation: 'Shreyas Doshi shares insights on PM influence, product strategy, and career growth.' },
  ],
  'prd-5': [
    { question: 'What does OKR stand for?', options: ['Organized Knowledge Review', 'Objectives and Key Results', 'Operational Key Requirements', 'Outcome Key Results'], correctIndex: 1, explanation: 'OKR stands for Objectives and Key Results, a goal-setting framework.' },
    { question: 'Who popularized OKRs?', options: ['Amazon', 'Google', 'Apple', 'Microsoft'], correctIndex: 1, explanation: 'Google popularized OKRs after adopting them from Intel in the early 2000s.' },
  ],
  'prd-6': [
    { question: 'What is Mixpanel used for?', options: ['CSS styling', 'Product analytics to understand user behavior', 'Video editing', 'Server management'], correctIndex: 1, explanation: 'Mixpanel is a product analytics platform for tracking user interactions and behavior.' },
    { question: 'What is DAU/MAU ratio?', options: ['A programming ratio', 'A measure of user engagement and stickiness', 'A design principle', 'A server metric'], correctIndex: 1, explanation: 'DAU/MAU ratio measures the proportion of monthly users who use the product daily.' },
  ],
  'prd-7': [
    { question: 'What does Hotjar provide?', options: ['Code hosting', 'Heatmaps and session recordings for UX analysis', 'Payment processing', 'Email marketing'], correctIndex: 1, explanation: 'Hotjar provides heatmaps and session recordings to see how users interact with pages.' },
    { question: 'What is a heatmap in Hotjar?', options: ['A server temperature map', 'A visual representation of where users click and scroll', 'A network diagram', 'A database schema'], correctIndex: 1, explanation: 'Hotjar heatmaps visualize user clicks, taps, and scrolling behavior on pages.' },
  ],
  'prd-8': [
    { question: 'What is Mind the Product?', options: ['A software tool', 'The largest PM community with events and articles', 'A certification body', 'A design system'], correctIndex: 1, explanation: 'Mind the Product is the largest global product management community.' },
    { question: 'What does Mind the Product offer?', options: ['Only paid courses', 'Articles, events, job board, and Slack community', 'Only conferences', 'Only certifications'], correctIndex: 1, explanation: 'Mind the Product offers articles, events, a job board, and a global Slack community.' },
  ],
  'prd-9': [
    { question: 'What is Product Hunt?', options: ['A code repository', 'A platform where products launch and get discovered', 'A design tool', 'A social network'], correctIndex: 1, explanation: 'Product Hunt is where product launches happen and community members discover new tools.' },
    { question: 'Why is Product Hunt useful for PMs?', options: ['It pays you', 'It helps understand what products and launches resonate with users', 'It hosts your website', 'It stores your database'], correctIndex: 1, explanation: 'Product Hunt helps PMs understand market trends and what makes product launches successful.' },
  ],

  // ─── DART PROGRAMMING (dart-1 to dart-8) ───
  'dart-1': [
    { question: 'What company created Dart?', options: ['Microsoft', 'Google', 'Meta', 'Apple'], correctIndex: 1, explanation: 'Dart was created by Google as a language for building cross-platform applications.' },
    { question: 'What is DartPad?', options: ['A code editor', 'An in-browser Dart editor requiring no setup', 'A database', 'A design tool'], correctIndex: 1, explanation: 'DartPad is Google official in-browser tool for writing and running Dart code.' },
  ],
  'dart-2': [
    { question: 'What is null safety in Dart?', options: ['A security feature', 'A type system feature preventing null reference errors', 'A network protocol', 'A design pattern'], correctIndex: 1, explanation: 'Null safety eliminates null reference errors by making null an explicit type concern.' },
    { question: 'What do null-aware operators include?', options: ['+, -, *, /', '??, ?., and !', '==, !=, <, >', '&&, ||, !'], correctIndex: 1, explanation: 'Dart null-aware operators include ?? (if null), ?. (conditional access), and ! (assert non-null).' },
  ],
  'dart-3': [
    { question: 'What is a Future in Dart?', options: ['A time machine', 'A representation of a delayed computation (async result)', 'A type of loop', 'A data structure'], correctIndex: 1, explanation: 'A Future represents a value that will be available at some point in the future.' },
    { question: 'What keyword is used for async operations in Dart?', options: ['sync', 'async and await', 'parallel', 'defer'], correctIndex: 1, explanation: 'Dart uses async/await keywords for asynchronous programming similar to JavaScript.' },
  ],
  'dart-4': [
    { question: 'Who created the Dart Full Course on YouTube?', options: ['Google', 'freeCodeCamp', 'Dart Team', 'The Net Ninja'], correctIndex: 1, explanation: 'freeCodeCamp released a complete beginner Dart course covering all fundamentals.' },
    { question: 'What does The Net Ninja Dart series offer?', options: ['Only advanced topics', 'Clear, well-paced Dart tutorials for beginners', 'Only Flutter content', 'Only async patterns'], correctIndex: 1, explanation: 'The Net Ninja Dart series provides clear, accessible tutorials for beginners.' },
  ],
  'dart-5': [
    { question: 'What is Effective Dart?', options: ['A code editor', 'Google official style guide for writing idiomatic Dart', 'A Dart framework', 'A testing tool'], correctIndex: 1, explanation: 'Effective Dart is Google guide to writing clean, consistent, idiomatic Dart code.' },
    { question: 'When should you read Effective Dart?', options: ['Before writing any Dart', 'After learning the basics, to develop good habits', 'Never', 'Only for advanced topics'], correctIndex: 1, explanation: 'Effective Dart is best read after learning basics to form good coding habits.' },
  ],
  'dart-6': [
    { question: 'What is the Dart pub.dev site?', options: ['A social network', 'The official package repository for Dart and Flutter', 'A code editor', 'A hosting platform'], correctIndex: 1, explanation: 'pub.dev hosts Dart and Flutter packages that you can use and publish.' },
    { question: 'What is a package in Dart?', options: ['A shipping container', 'A reusable module of Dart code shared via pub.dev', 'A Dart file', 'A configuration file'], correctIndex: 1, explanation: 'A Dart package is reusable code distributed through the pub.dev package repository.' },
  ],
  'dart-7': [
    { question: 'What is a mixin in Dart?', options: ['A type of class', 'A way to reuse code across multiple class hierarchies', 'A data type', 'A loop structure'], correctIndex: 1, explanation: 'Mixins provide a way to reuse code in multiple class hierarchies without inheritance.' },
    { question: 'What keyword defines a mixin?', options: ['class', 'mixin', 'interface', 'abstract'], correctIndex: 1, explanation: 'The mixin keyword declares a mixin in Dart.' },
  ],
  'dart-8': [
    { question: 'What framework is the main destination for Dart developers?', options: ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'], correctIndex: 1, explanation: 'Flutter is Google cross-platform UI framework built with Dart.' },
    { question: 'What platforms does Flutter support?', options: ['Android only', 'Android, iOS, web, and desktop', 'iOS only', 'Web only'], correctIndex: 1, explanation: 'Flutter deploys to Android, iOS, web, Windows, macOS, and Linux from one codebase.' },
  ],

  // ─── SONIC BLOCKCHAIN (son-1 to son-9) ───
  'son-1': [
    { question: 'What is the HackQuest Sonic Learning Track?', options: ['A game', 'The official 8-phase Sonic developer curriculum', 'A trading platform', 'A wallet app'], correctIndex: 1, explanation: 'HackQuest offers a structured 8-phase learning path for Sonic blockchain development.' },
    { question: 'What do you earn by completing the HackQuest Sonic track?', options: ['Tokens', 'An on-chain Sonic certification', 'Money', 'Hardware'], correctIndex: 1, explanation: 'Completing the track earns an on-chain verifiable Sonic certification.' },
  ],
  'son-2': [
    { question: 'What is Sonic?', options: ['A token', 'A high-performance EVM-compatible blockchain', 'A wallet', 'An exchange'], correctIndex: 1, explanation: 'Sonic is a high-performance EVM blockchain evolved from Fantom with 10,000 TPS.' },
    { question: 'What makes Sonic different from other EVM chains?', options: ['It is slower', '10,000 TPS, sub-second finality, and Fee Monetisation', 'It is private', 'It uses a different language'], correctIndex: 1, explanation: 'Sonic offers high throughput, fast finality, and developer fee sharing via FeeM.' },
  ],
  'son-3': [
    { question: 'Where do you get testnet S tokens for Sonic?', options: ['Buy them on an exchange', 'From the Sonic testnet faucet', 'Mine them', 'Trade for them'], correctIndex: 1, explanation: 'The Sonic testnet faucet provides free testnet tokens for contract development.' },
    { question: 'What is the Sonic block explorer?', options: ['A hiking tool', 'A tool to view transactions and verify contracts on Sonic', 'A code editor', 'A messaging app'], correctIndex: 1, explanation: 'The Sonic explorer lets you view on-chain transactions, contracts, and activities.' },
  ],
  'son-4': [
    { question: 'What is the Sonic official documentation?', options: ['A tutorial blog', 'Complete developer docs with APIs, RPC endpoints, and contract addresses', 'A white paper', 'A wiki'], correctIndex: 1, explanation: 'Sonic docs provide complete developer information including APIs and contract addresses.' },
    { question: 'Is Sonic EVM-compatible?', options: ['No', 'Yes, Solidity contracts work on Sonic with minimal changes', 'Only with wrappers', 'Partially'], correctIndex: 1, explanation: 'Sonic is fully EVM-compatible, meaning Solidity contracts deploy seamlessly.' },
  ],
  'son-5': [
    { question: 'What is Foundry used for?', options: ['Frontend development', 'Compiling, testing, fuzzing, and deploying smart contracts', 'Database management', 'Design prototyping'], correctIndex: 1, explanation: 'Foundry is a modern smart contract development toolkit for testing and deploying.' },
    { question: 'What is Foundry fuzzing?', options: ['A type of test', 'Automatically testing contracts with random inputs to find bugs', 'A deployment tool', 'A debugging technique'], correctIndex: 1, explanation: 'Fuzzing automatically generates random inputs to find edge cases and bugs in contracts.' },
  ],
  'son-6': [
    { question: 'Why use OpenZeppelin on Sonic?', options: ['It is required', 'Battle-tested audited contracts are fully compatible with Sonic EVM', 'It is faster', 'It is cheaper'], correctIndex: 1, explanation: 'OpenZeppelin audited contracts work seamlessly on Sonic EVM.' },
    { question: 'What does OpenZeppelin provide?', options: ['A blockchain', 'Audited smart contract implementations of standards like ERC-20', 'A wallet', 'An exchange'], correctIndex: 1, explanation: 'OpenZeppelin provides industry-standard, audited smart contract implementations.' },
  ],
  'son-7': [
    { question: 'What does DefiLlama track for Sonic?', options: ['Token prices only', 'TVL, protocol growth, and ecosystem activity on Sonic', 'Transaction history', 'Wallet balances'], correctIndex: 1, explanation: 'DefiLlama tracks Total Value Locked and other metrics for the Sonic ecosystem.' },
    { question: 'How can you track Sonic ecosystem growth?', options: ['Check social media', 'Use DefiLlama to monitor TVL and protocol activity', 'Ask on forums', 'Guess'], correctIndex: 1, explanation: 'DefiLlama provides real-time data on Sonic ecosystem TVL and protocol metrics.' },
  ],
  'son-8': [
    { question: 'Who teaches the best free Solidity foundation course?', options: ['Ethereum Foundation', 'Patrick Collins', 'OpenZeppelin', 'Sonic Labs'], correctIndex: 1, explanation: 'Patrick Collins 32-hour Solidity course is the best free foundation for Solidity.' },
    { question: 'What should you complete before or alongside the HackQuest Sonic path?', options: ['Nothing', 'Patrick Collins Solidity course for deeper understanding', 'A trading course', 'A design course'], correctIndex: 1, explanation: 'Having Solidity fundamentals from Patrick Collins course helps with the HackQuest path.' },
  ],
  'son-9': [
    { question: 'What is the Sonic Discord for?', options: ['Gaming', 'Official developer community for help and collaboration', 'Trading signals', 'NFT marketplace'], correctIndex: 1, explanation: 'Sonic Discord is the official developer community for getting help and finding collaborators.' },
    { question: 'What can you find in the Sonic developer community?', options: ['Token price predictions', 'Help, collaboration opportunities, and ecosystem updates', 'Job offers only', 'Design resources'], correctIndex: 1, explanation: 'The Sonic Discord community offers developer support, collaboration, and ecosystem news.' },
  ],
  // ─── BACKEND (be-11 to be-13) ───
  'be-11': [
    { question: 'What does Render\'s free tier do after 15 minutes of inactivity?', options: ['Deletes the app', 'Spins down the web service', 'Charges a fee', 'Sends an alert'], correctIndex: 1, explanation: 'Render free web services spin down after 15 minutes without traffic, then spin back up on the next request.' },
    { question: 'Which service type can be deployed for free on Render?', options: ['Kubernetes clusters', 'Web services and static sites', 'Load balancers', 'VPNs'], correctIndex: 1, explanation: 'Render offers free web services and static sites for testing and hobby projects.' },
  ],
  'be-12': [
    { question: 'How does Railway deploy applications?', options: ['Only from Docker Hub', 'From GitHub repos, CLI, or Docker', 'Only via CLI', 'Only from GitLab'], correctIndex: 1, explanation: 'Railway supports deployment from GitHub repositories, the Railway CLI, and Docker.' },
    { question: 'What does Railway provide for databases?', options: ['Only MySQL', 'Managed PostgreSQL databases as services', 'Only SQLite', 'No database support'], correctIndex: 1, explanation: 'Railway offers managed PostgreSQL databases that can be added as services to a project.' },
  ],
  'be-13': [
    { question: 'What is GitHub Actions primarily used for?', options: ['Code editing', 'CI/CD and workflow automation', 'Database management', 'Design prototyping'], correctIndex: 1, explanation: 'GitHub Actions automates CI/CD pipelines, testing, and deployment workflows.' },
    { question: 'What language are GitHub Actions workflows written in?', options: ['JSON', 'YAML', 'XML', 'TOML'], correctIndex: 1, explanation: 'GitHub Actions workflows are defined using YAML syntax.' },
  ],
  // ─── FULLSTACK (fs-7 to fs-9) ───
  'fs-7': [
    { question: 'What is a key architectural pattern for SaaS applications?', options: ['Single-tenant deployment', 'Multi-tenant data isolation', 'Monolithic codebase', 'No database'], correctIndex: 1, explanation: 'Multi-tenant data isolation is a core SaaS pattern where each customer\'s data is separated.' },
    { question: 'Why are webhooks used in SaaS billing?', options: ['For faster page loads', 'To decouple payment processing from application logic', 'To reduce server costs', 'For SEO'], correctIndex: 1, explanation: 'Webhook-based billing decouples payment processing from application logic through event-driven patterns.' },
  ],
  'fs-8': [
    { question: 'What protocol enables real-time two-way communication between client and server?', options: ['HTTP', 'WebSockets', 'FTP', 'SMTP'], correctIndex: 1, explanation: 'WebSockets provide full-duplex communication channels over a single TCP connection.' },
    { question: 'Which library is commonly used for WebSockets in Node.js?', options: ['Axios', 'Socket.io', 'Express', 'Lodash'], correctIndex: 1, explanation: 'Socket.io is the most popular library for WebSocket-based real-time communication in Node.js.' },
  ],
  'fs-9': [
    { question: 'What is Bull used for in Node.js applications?', options: ['Logging', 'Background job and queue processing', 'Authentication', 'Testing'], correctIndex: 1, explanation: 'Bull is a Redis-based queue package for handling background jobs and delayed tasks in Node.js.' },
    { question: 'What does Bull require as a dependency?', options: ['MongoDB', 'Redis', 'MySQL', 'PostgreSQL'], correctIndex: 1, explanation: 'Bull requires Redis as a backing store for its job queues.' },
  ],
  // ─── UI/UX (ux-10 to ux-12) ───
  'ux-10': [
    { question: 'What should a good design case study include?', options: ['Only final screenshots', 'The problem, process, and solution', 'Only sketches', 'Only the color palette'], correctIndex: 1, explanation: 'A compelling case study tells the story of the problem, the design process, and how the solution addresses it.' },
    { question: 'Which platform is specifically built for creating design case studies?', options: ['Instagram', 'Behance', 'Twitter', 'LinkedIn'], correctIndex: 1, explanation: 'Behance is a platform designed for creative portfolios with features tailored for case studies.' },
  ],
  'ux-11': [
    { question: 'How many case studies should a junior UX designer aim for?', options: ['One', 'Two or three', 'Ten or more', 'None'], correctIndex: 1, explanation: 'Junior designers with minimal experience should aim for two or three solid case studies.' },
    { question: 'What is more important than just showing final screens in a portfolio?', options: ['Using many colors', 'Explaining your design process and decisions', 'Adding animations', 'Including every draft'], correctIndex: 1, explanation: 'Employers want to see your problem-solving approach and decision-making, not just final visuals.' },
  ],
  'ux-12': [
    { question: 'What is the first step in a UX case study framework?', options: ['Final design', 'Introduction and project overview', 'User testing results', 'Code snippets'], correctIndex: 1, explanation: 'A UX case study begins with an introduction that sets the project background, problem, and your role.' },
    { question: 'Why is including research important in a UX case study?', options: ['It makes the case study longer', 'It shows the foundation for design decisions', 'It replaces visual design', 'It is optional'], correctIndex: 1, explanation: 'Research demonstrates that design decisions are based on user needs and evidence, not assumptions.' },
  ],
  // ─── DATA ANALYSIS (da-9 to da-10) ───
  'da-9': [
    { question: 'What does the StatQuest channel specialize in?', options: ['Cooking recipes', 'Statistics and ML explained visually', 'Travel vlogging', 'Music production'], correctIndex: 1, explanation: 'StatQuest explains statistics and machine learning concepts with clear visual diagrams.' },
    { question: 'Which statistical concept does StatQuest cover at the fundamentals level?', options: ['Quantum physics', 'Mean, variance, and standard deviation', 'Organic chemistry', 'Literature analysis'], correctIndex: 1, explanation: 'StatQuest fundamentals cover mean, variance, standard deviation, p-values, and other core statistics.' },
  ],
  'da-10': [
    { question: 'What does Khan Academy offer for statistics learners?', options: ['Paid degrees', 'Free structured courses with practice exercises', 'Only video content', 'Only text articles'], correctIndex: 1, explanation: 'Khan Academy provides free statistics courses with video lessons and interactive practice exercises.' },
    { question: 'Which statistics topic is covered in Khan Academy\'s curriculum?', options: ['Nuclear physics', 'Hypothesis testing and probability distributions', 'Astronomy', 'Geology'], correctIndex: 1, explanation: 'Khan Academy covers probability distributions, hypothesis testing, and other core statistics topics.' },
  ],
  // ─── DATA SCIENCE (ds-8 to ds-9) ───
  'ds-8': [
    { question: 'What is MLflow Model Registry used for?', options: ['Data visualization', 'Managing and versioning ML model lifecycles', 'Code compilation', 'Network monitoring'], correctIndex: 1, explanation: 'MLflow Model Registry manages the full lifecycle of ML models, including versioning, staging, and production deployment.' },
    { question: 'How does MLflow package models for deployment?', options: ['As ZIP files', 'As Docker containers with dependencies', 'As plain text files', 'As Excel spreadsheets'], correctIndex: 1, explanation: 'MLflow uses Docker containers to package models with their dependencies for consistent deployment.' },
  ],
  'ds-9': [
    { question: 'Which tools are used together in a typical MLOps pipeline?', options: ['Photoshop, Illustrator', 'MLflow, DVC, FastAPI, Docker', 'Word, Excel, PowerPoint', 'Figma, Sketch, InVision'], correctIndex: 1, explanation: 'A typical MLOps pipeline uses MLflow for tracking, DVC for data versioning, FastAPI for serving, and Docker for packaging.' },
    { question: 'What is a key benefit of MLOps practices?', options: ['Faster internet', 'Reproducible ML workflows and model monitoring', 'Better graphics', 'More storage'], correctIndex: 1, explanation: 'MLOps ensures reproducibility of ML workflows and enables model monitoring in production.' },
  ],
  // ─── DEVOPS (dv-8 to dv-9) ───
  'dv-8': [
    { question: 'What is Prometheus primarily used for?', options: ['Code editing', 'Monitoring and alerting', 'Database management', 'Design prototyping'], correctIndex: 1, explanation: 'Prometheus is an open-source monitoring system for collecting and querying metrics.' },
    { question: 'What visualization tool pairs commonly with Prometheus?', options: ['Tableau', 'Grafana', 'Power BI', 'Excel'], correctIndex: 1, explanation: 'Grafana provides dashboards and visualization for Prometheus metrics.' },
  ],
  'dv-9': [
    { question: 'Which system metrics can Prometheus and Grafana monitor together?', options: ['CPU, memory, disk, network', 'Only CPU', 'Only memory', 'Only disk space'], correctIndex: 0, explanation: 'Prometheus and Grafana can monitor CPU, memory, disk, and network metrics comprehensively.' },
    { question: 'What is Node Exporter used for in the Prometheus ecosystem?', options: ['Database management', 'Exporting system metrics from Linux hosts', 'Code compilation', 'Load balancing'], correctIndex: 1, explanation: 'Node Exporter collects hardware and OS metrics from Linux systems for Prometheus to scrape.' },
  ],
  // ─── CYBERSECURITY (cy-8 to cy-9) ───
  'cy-8': [
    { question: 'What type of tool is Splunk in cybersecurity?', options: ['Firewall', 'SIEM (Security Information and Event Management)', 'Antivirus', 'Password manager'], correctIndex: 1, explanation: 'Splunk is a leading SIEM tool for collecting, analyzing, and correlating security event data.' },
    { question: 'What is Splunk primarily used for in a SOC?', options: ['Social media management', 'Log analysis and threat detection', 'Video editing', 'Web development'], correctIndex: 1, explanation: 'Splunk is used in Security Operations Centers for log analysis, threat detection, and incident investigation.' },
  ],
  'cy-9': [
    { question: 'What does a Splunk SIEM home lab help you practice?', options: ['Video editing', 'Log ingestion, detection queries, and alert creation', 'Game development', 'Music production'], correctIndex: 1, explanation: 'A Splunk home lab teaches log ingestion, writing detection queries, creating alerts, and incident response workflows.' },
    { question: 'What skill does building a Splunk home lab develop?', options: ['Hardware repair', 'SOC analyst and blue team skills', 'Network cabling', 'Graphic design'], correctIndex: 1, explanation: 'Setting up a Splunk home lab develops practical SOC analyst skills essential for blue team roles.' },
  ],
  // ─── MOBILE (mob-7 to mob-8) ───
  'mob-7': [
    { question: 'What format does Google Play require for new apps since August 2021?', options: ['APK', 'Android App Bundle (AAB)', 'ZIP', 'IPA'], correctIndex: 1, explanation: 'Google Play requires Android App Bundle (.aab) format for all new apps since August 2021.' },
    { question: 'What is required before publishing an Android app on Google Play?', options: ['A physical store', 'A developer account ($25 fee)', 'A server', 'A domain name'], correctIndex: 1, explanation: 'To publish on Google Play, you need a developer account which costs a one-time $25 registration fee.' },
  ],
  'mob-8': [
    { question: 'What is required to publish apps on the Apple App Store?', options: ['No fee', 'An Apple Developer Program membership ($99/year)', 'A Windows PC', 'A physical store'], correctIndex: 1, explanation: 'Publishing on the App Store requires an Apple Developer Program membership costing $99 per year.' },
    { question: 'What does Apple review before publishing an app?', options: ['Nothing', 'App content, functionality, and design compliance', 'Only the app icon', 'Only the app name'], correctIndex: 1, explanation: 'Apple reviews apps for content, functionality, design guidelines, and safety compliance before approval.' },
  ],
  // ─── VIDEO EDITING (vid-7 to vid-8) ───
  'vid-7': [
    { question: 'What does YouTube Creator Academy teach?', options: ['Music production', 'Video creation, optimization, and channel growth', 'Graphic design', 'Web development'], correctIndex: 1, explanation: 'YouTube Creator Academy offers free training on video creation, editing, thumbnails, and audience growth.' },
    { question: 'What is a key factor in YouTube video retention?', options: ['Video length', 'Audience retention and engagement', 'Number of comments', 'Upload time'], correctIndex: 1, explanation: 'Audience retention and engagement are critical factors that the YouTube algorithm uses to rank videos.' },
  ],
  'vid-8': [
    { question: 'What is the maximum length for YouTube Shorts?', options: ['30 seconds', '60 seconds', '3 minutes', '10 minutes'], correctIndex: 1, explanation: 'YouTube Shorts can be up to 60 seconds long and are designed for vertical mobile viewing.' },
    { question: 'What format are YouTube Shorts optimized for?', options: ['Horizontal widescreen', 'Vertical (9:16 aspect ratio)', 'Square (1:1)', 'Cinematic (21:9)'], correctIndex: 1, explanation: 'YouTube Shorts use a vertical 9:16 aspect ratio optimized for mobile viewing.' },
  ],
  // ─── YOUTUBE (yt-7 to yt-8) ───
  'yt-7': [
    { question: 'What is a key requirement for YouTube Partner Program monetization?', options: ['1,000 subscribers and 4,000 watch hours', '10,000 subscribers', 'A verified Twitter account', '100 videos'], correctIndex: 0, explanation: 'YPP requires 1,000 subscribers and 4,000 watch hours in the past 12 months.' },
    { question: 'Which program handles YouTube ad revenue payments?', options: ['PayPal', 'AdSense', 'Stripe', 'Apple Pay'], correctIndex: 1, explanation: 'YouTube pays creators through Google AdSense after they join the YouTube Partner Program.' },
  ],
  'yt-8': [
    { question: 'What is affiliate marketing?', options: ['Selling your own products', 'Earning commissions by promoting others\' products', 'Trading stocks', 'Running ads'], correctIndex: 1, explanation: 'Affiliate marketing involves promoting other companies\' products and earning a commission on resulting sales.' },
    { question: 'Where can creators share affiliate links to earn commissions?', options: ['Only on their website', 'In video descriptions, blogs, and social media', 'Only in emails', 'Only on Twitter'], correctIndex: 1, explanation: 'Affiliate links can be shared across video descriptions, blog posts, social media, and email newsletters.' },
  ],
  // ─── MARKETING (mkt-7 to mkt-10) ───
  'mkt-7': [
    { question: 'What does Google Ads allow businesses to do?', options: ['Create websites', 'Display ads on Google Search and partner sites', 'Design logos', 'Host emails'], correctIndex: 1, explanation: 'Google Ads enables businesses to show ads on Google Search results, YouTube, and partner websites.' },
    { question: 'What is a key metric in Google Ads campaigns?', options: ['Page views', 'Click-through rate (CTR)', 'Server uptime', 'Bounce rate'], correctIndex: 1, explanation: 'Click-through rate measures how often people click on your ad after seeing it.' },
  ],
  'mkt-8': [
    { question: 'What is Google Analytics 4 primarily used for?', options: ['Email marketing', 'Website and app analytics and insights', 'SEO keyword research', 'Social media posting'], correctIndex: 1, explanation: 'GA4 tracks website and app user behavior, conversions, and provides analytics insights.' },
    { question: 'What replaces Universal Analytics\' session-based model in GA4?', options: ['Page view model', 'Event-based data model', 'Click model', 'Time-based model'], correctIndex: 1, explanation: 'GA4 uses an event-based data model instead of the session-based model of Universal Analytics.' },
  ],
  'mkt-9': [
    { question: 'Which platforms does Meta Ads cover?', options: ['Google and YouTube', 'Facebook and Instagram', 'Twitter and LinkedIn', 'TikTok and Snapchat'], correctIndex: 1, explanation: 'Meta Ads manages advertising across Facebook and Instagram platforms.' },
    { question: 'What is a key feature of Meta Ads targeting?', options: ['Geographic only', 'Demographic, interest, and behavior targeting', 'Age only', 'Gender only'], correctIndex: 1, explanation: 'Meta Ads offers detailed targeting by demographics, interests, behaviors, and custom audiences.' },
  ],
  'mkt-10': [
    { question: 'What is A/B testing used for in marketing?', options: ['Testing server performance', 'Comparing two versions to determine which performs better', 'Testing email delivery', 'Testing page load speed'], correctIndex: 1, explanation: 'A/B testing compares two versions of a webpage, email, or ad to determine which performs better.' },
    { question: 'Why is statistical significance important in A/B testing?', options: ['It is optional', 'It ensures results are not due to random chance', 'It makes results look better', 'It speeds up testing'], correctIndex: 1, explanation: 'Statistical significance confirms that observed differences in A/B test results are likely not due to random variation.' },
  ],
  // ─── QA (qa-8 to qa-9) ───
  'qa-8': [
    { question: 'What testing framework does Playwright provide?', options: ['Unit testing only', 'Cross-browser end-to-end testing', 'API testing only', 'Load testing only'], correctIndex: 1, explanation: 'Playwright enables cross-browser end-to-end testing across Chromium, Firefox, and WebKit.' },
    { question: 'What programming languages does Playwright support?', options: ['Only JavaScript', 'TypeScript, JavaScript, Python, C#, and Java', 'Only Python', 'Only Java'], correctIndex: 1, explanation: 'Playwright supports TypeScript, JavaScript, Python, C#, and Java.' },
  ],
  'qa-9': [
    { question: 'What does OWASP ZAP help test for?', options: ['Performance issues', 'Web application security vulnerabilities', 'Database performance', 'UI design'], correctIndex: 1, explanation: 'OWASP ZAP is a web app security scanner that helps find vulnerabilities in web applications.' },
    { question: 'Is OWASP ZAP free to use?', options: ['No, it is paid', 'Yes, it is free and open-source', 'Free trial only', 'Subscription required'], correctIndex: 1, explanation: 'OWASP ZAP is a free, open-source web application security scanner.' },
  ],
  // ─── Dart (dart-9 to dart-11) ───
  'dart-9': [
    { question: 'What keyword does Dart use to inherit from a class?', options: ['extends', 'implements', 'inherits', 'with'], correctIndex: 0, explanation: 'Dart uses `extends` for class inheritance, `implements` for interface conformance, and `with` for mixins.' },
    { question: 'What is a mixin in Dart?', options: ['A class that can be instantiated', 'A way to reuse code across multiple class hierarchies', 'A type of interface', 'A built-in function'], correctIndex: 1, explanation: 'Mixins allow code reuse across multiple class hierarchies without using inheritance.' },
  ],
  'dart-10': [
    { question: 'What does the `async` keyword do in Dart?', options: ['Makes a function run faster', 'Marks a function as asynchronous, returning a Future', 'Creates a new isolate', 'Pauses the program'], correctIndex: 1, explanation: 'The `async` keyword marks a function as asynchronous and makes it return a Future.' },
    { question: 'What keyword do you use to wait for a Future in Dart?', options: ['pause', 'wait', 'await', 'delay'], correctIndex: 2, explanation: 'The `await` keyword is used to pause execution until a Future completes.' },
  ],
  'dart-11': [
    { question: 'What is a Stream in Dart?', options: ['A sequence of asynchronous events', 'A file input/output operation', 'A type of list', 'A network connection'], correctIndex: 0, explanation: 'A Stream is a sequence of asynchronous events delivered over time.' },
    { question: 'What is StreamController used for in Dart?', options: ['Managing database connections', 'Creating and controlling a stream of data', 'Controlling program flow', 'Managing HTTP requests'], correctIndex: 1, explanation: 'StreamController creates and controls a Stream, allowing you to add data events to the stream.' },
  ],
  // ─── Project Management (pm-10 to pm-11) ───
  'pm-10': [
    { question: 'What does CPI stand for in Earned Value Management?', options: ['Cost Performance Index', 'Current Performance Indicator', 'Cost Projection Index', 'Comparative Performance Index'], correctIndex: 0, explanation: 'CPI (Cost Performance Index) measures cost efficiency by comparing earned value to actual cost.' },
    { question: 'What does a CPI of 0.8 indicate?', options: ['Over budget', 'Under budget', 'On budget', 'Ahead of schedule'], correctIndex: 0, explanation: 'A CPI less than 1.0 indicates the project is over budget. CPI greater than 1.0 means under budget.' },
  ],
  'pm-11': [
    { question: 'What is the primary purpose of a project status report?', options: ['To assign blame for delays', 'To communicate progress, risks, and blockers to stakeholders', 'To request more budget', 'To document completed work only'], correctIndex: 1, explanation: 'Status reports keep stakeholders informed of progress, upcoming milestones, risks, and blockers.' },
    { question: 'What do traffic light indicators (red/yellow/green) in status reports represent?', options: ['Team mood', 'Budget remaining', 'Status of tasks or milestones (on track, at risk, or blocked)', 'Priority level'], correctIndex: 2, explanation: 'Green means on track, yellow means at risk, red means blocked or behind schedule.' },
  ],
  // ─── Product Management (prd-10 to prd-13) ───
  'prd-10': [
    { question: 'What is the main lesson of The Mom Test?', options: ['Always listen to your mom', 'Ask leading questions to confirm your idea', 'Avoid bad data by not asking if people would buy your idea', 'Only talk to paying customers'], correctIndex: 2, explanation: 'The Mom Test teaches you to avoid asking if people would buy your idea — ask about their life and problems instead.' },
    { question: 'Which of these is a good customer conversation question according to The Mom Test?', options: ['Would you use this product?', 'How do you currently solve this problem?', 'Do you like my idea?', 'How much would you pay for this?'], correctIndex: 1, explanation: 'Ask about current behaviour, not hypothetical future actions. This reveals real problems.' },
  ],
  'prd-11': [
    { question: 'What is user story mapping used for?', options: ['Creating user interface mockups', 'Visualising the user journey and breaking it into stories for development', 'Tracking bugs in production', 'Writing marketing copy'], correctIndex: 1, explanation: 'Story mapping arranges user activities on a horizontal axis and breaks them into detailed stories vertically.' },
    { question: 'What is the horizontal axis in a user story map?', options: ['Priority order', 'The user journey or chronological steps', 'Sprint backlogs', 'Team members assigned'], correctIndex: 1, explanation: 'The horizontal axis represents the user journey steps in chronological order.' },
  ],
  'prd-12': [
    { question: 'What sections should a PRD include?', options: ['Only technical specifications', 'Problem statement, user personas, user stories, acceptance criteria, success metrics', 'Only design mockups', 'Only budget estimates'], correctIndex: 1, explanation: 'A good PRD includes problem, personas, stories, acceptance criteria, and success metrics.' },
    { question: 'Who is the primary audience for a PRD?', options: ['Customers and users', 'Engineers, designers, and QA who need to build the feature', 'Investors and executives', 'Marketing team'], correctIndex: 1, explanation: 'The PRD communicates requirements to the team who will design, build, and test the feature.' },
  ],
  'prd-13': [
    { question: 'What should good acceptance criteria define?', options: ['The budget for the feature', 'The conditions that must be met for a user story to be considered complete', 'The marketing plan for the feature', 'The UI colour scheme'], correctIndex: 1, explanation: 'Acceptance criteria define the conditions a story must meet to be accepted as done.' },
    { question: 'Which format is commonly used for writing acceptance criteria?', options: ['SQL queries', 'Given/When/Then format', 'JSON objects', 'Figma frames'], correctIndex: 1, explanation: 'The Given/When/Then (Gherkin) format is popular for writing clear, testable acceptance criteria.' },
  ],
  // ─── Crypto (cr-21 to cr-22) ───
  'cr-21': [
    { question: 'What is a cold wallet?', options: ['A wallet connected to the internet', 'A wallet stored offline, not connected to the internet', 'A mobile wallet app', 'A wallet with zero balance'], correctIndex: 1, explanation: 'Cold wallets store private keys offline, providing maximum security against online threats.' },
    { question: 'What is a multi-sig wallet?', options: ['A wallet that supports multiple cryptocurrencies', 'A wallet requiring multiple signatures to authorise a transaction', 'A smart contract wallet', 'A hardware wallet brand'], correctIndex: 1, explanation: 'Multi-sig wallets require multiple private key signatures to execute a transaction, adding security.' },
  ],
  'cr-22': [
    { question: 'What is a seed phrase?', options: ['A single password for your wallet', 'A 12-to-24-word phrase that can recover your wallet', 'A crypto trading strategy', 'A type of smart contract'], correctIndex: 1, explanation: 'A seed phrase (or recovery phrase) can restore full wallet access and all its funds on any compatible wallet.' },
    { question: 'How should you store your seed phrase?', options: ['In a cloud document for backup', 'On a piece of paper stored securely offline, never photographed or typed online', 'In a text file on your computer', 'Shared with a trusted friend via email'], correctIndex: 1, explanation: 'Seed phrases should be stored offline, ideally on paper or metal, and never entered into any website or app.' },
  ],
  // ─── New Resources (be-14 to be-15) ───
  'be-14': [
    { question: 'What does the HTTP Crash Course cover?', options: ['Database design patterns', 'How HTTP, URLs, and web servers work', 'CSS layout techniques', 'React component architecture'], correctIndex: 1, explanation: 'The HTTP Crash Course by Traversy Media teaches how HTTP, URLs, and web servers work in a concise 30-minute video.' },
    { question: 'Why is HTTP fundamental for backend developers?', options: ['It compiles JavaScript code', 'It defines the protocol for client-server communication on the web', 'It renders HTML pages', 'It manages database connections'], correctIndex: 1, explanation: 'HTTP is the foundation of data communication on the web, defining how clients request resources and servers respond.' },
  ],
  'be-15': [
    { question: 'What does the "How the Internet Works" video explain?', options: ['Python programming syntax', 'DNS, TCP/IP, and how data moves across the web', 'React component architecture', 'SQL query optimization'], correctIndex: 1, explanation: 'This freeCodeCamp video provides a visual guide to DNS, TCP/IP, and how data moves across the web.' },
    { question: 'What does DNS do?', options: ['Secures network connections', 'Translates domain names into IP addresses', 'Routes data packets', 'Encrypts web traffic'], correctIndex: 1, explanation: 'DNS translates human-readable domain names into IP addresses that computers use to identify each other on networks.' },
  ],
  // ─── New Frontend Resources ───
  'fe-18': [
    { question: 'What does the CSS Crash Course by Traversy Media cover?', options: ['JavaScript ES6 syntax only', 'CSS selectors, box model, flexbox, and responsive design', 'React hooks and state management', 'Node.js backend development'], correctIndex: 1, explanation: 'The CSS Crash Course covers everything from selectors and the box model to flexbox and responsive design in one video.' },
    { question: 'Why should a frontend beginner learn CSS after HTML?', options: ['CSS is optional for web development', 'HTML provides structure, CSS provides styling and layout — both are essential for building websites', 'CSS replaces HTML entirely', 'HTML can style content without CSS'], correctIndex: 1, explanation: 'HTML structures content while CSS controls visual presentation — both are fundamental building blocks of the web.' },
  ],
  'fe-16': [
    { question: 'What does the Git & GitHub Crash Course teach?', options: ['Database management', 'Essential Git commands and GitHub workflow', 'CSS animation techniques', 'React state management'], correctIndex: 1, explanation: 'The Git & GitHub Crash Course covers essential Git commands and GitHub workflow every developer must know.' },
    { question: 'Why is Git essential for frontend developers?', options: ['It replaces CSS frameworks', 'It enables version control, collaboration, and code history tracking', 'It compiles JavaScript code', 'It hosts websites'], correctIndex: 1, explanation: 'Git tracks changes to code, enables collaboration with other developers, and maintains a full history of project changes.' },
  ],
  'fe-17': [
    { question: 'What does Google\'s Web Performance Optimization guide cover?', options: ['Backend server configuration', 'Core Web Vitals, lazy loading, and performance best practices', 'Database query optimization', 'CSS color theory'], correctIndex: 1, explanation: 'Google\'s web.dev guide covers Core Web Vitals, lazy loading, and performance optimization best practices for faster websites.' },
    { question: 'Why is web performance important?', options: ['Only SEO experts care about performance', 'Faster websites provide better user experience, higher conversion rates, and better search rankings', 'Performance only affects mobile users', 'Performance is unrelated to user satisfaction'], correctIndex: 1, explanation: 'Fast-loading websites significantly improve user experience, engagement, conversion rates, and search engine rankings.' },
  ],
  // ─── Mobile New Resource ───
  'mob-9': [
    { question: 'What does the React Native Full Course teach?', options: ['Building iOS apps with Swift', 'Building mobile apps from scratch using React Native', 'Android development with Kotlin', 'Backend API development'], correctIndex: 1, explanation: 'The freeCodeCamp course teaches building a first mobile app from scratch using React Native for absolute beginners.' },
    { question: 'React Native allows developers to:', options: ['Write mobile apps using only Java', 'Build cross-platform mobile apps using JavaScript and React', 'Develop iOS-only applications', 'Create backend APIs'], correctIndex: 1, explanation: 'React Native enables building mobile apps for both iOS and Android using JavaScript and React patterns.' },
  ],
  // ─── Video New Resource ───
  'vid-9': [
    { question: 'What does the Storytelling for Video Editors resource teach?', options: ['Color grading techniques', 'Principles of visual storytelling, pacing, and emotional sequencing', 'Audio mixing fundamentals', 'Animation keyframing'], correctIndex: 1, explanation: 'This video teaches the principles of visual storytelling, pacing, and emotional sequencing for video editors.' },
    { question: 'Why is storytelling important for video editors?', options: ['It only matters for fiction films', 'Good storytelling keeps viewers engaged, conveys messages effectively, and makes content memorable', 'Technical skills are all that matter', 'Storytelling replaces the need for editing skills'], correctIndex: 1, explanation: 'Strong storytelling makes videos more engaging and effective, whether for entertainment, education, or marketing.' },
  ],
  // ─── YouTube New Resource ───
  'yt-9': [
    { question: 'What does the YouTube for Beginners Guide cover?', options: ['Advanced video editing techniques', 'Setting up a channel, choosing a niche, equipment, and filming first video', 'YouTube algorithm manipulation', 'Paid advertising strategies'], correctIndex: 1, explanation: 'Think Media\'s guide covers the complete process of setting up a channel, choosing a niche, equipment, and creating the first video.' },
    { question: 'What is the first step in starting a YouTube channel?', options: ['Buying expensive equipment', 'Choosing your niche and understanding your target audience', 'Uploading multiple videos immediately', 'Applying for monetization'], correctIndex: 1, explanation: 'The first step is choosing a niche and understanding who your content is for, which guides all subsequent decisions.' },
  ],
  // ─── Writing New Resources ───
  'tw-5': [
    { question: 'What does the Technical Writing for Beginners video cover?', options: ['Advanced API documentation', 'Everything needed to start a career in technical writing', 'Fiction writing techniques', 'Book publishing strategies'], correctIndex: 1, explanation: 'This freeCodeCamp video covers everything you need to know to start a career in technical writing.' },
    { question: 'What skills are essential for technical writers?', options: ['Only creative writing skills', 'Clear communication, understanding of technical concepts, and ability to explain complex topics simply', 'Only programming knowledge', 'Graphic design expertise'], correctIndex: 1, explanation: 'Technical writers need to understand technical concepts and communicate them clearly to varied audiences.' },
  ],
  'tw-6': [
    { question: 'What does the GitHub for Technical Writers resource teach?', options: ['Advanced Git internals', 'Using pull requests, branches, and Markdown rendering for documentation workflows', 'Video editing with GitHub', 'Database management'], correctIndex: 1, explanation: 'This resource teaches technical writers how to use GitHub for documentation including pull requests, branches, and Markdown.' },
    { question: 'Why should technical writers learn GitHub?', options: ['GitHub is only for developers', 'Many documentation projects use GitHub for version control and collaboration on docs', 'GitHub replaces all writing tools', 'GitHub is a writing platform'], correctIndex: 1, explanation: 'GitHub enables version control, review workflows, and collaboration on documentation projects, making it essential for modern tech writing.' },
  ],
  'tw-7': [
    { question: 'What does the API Documentation Guide cover?', options: ['Frontend development techniques', 'Best practices for writing API documentation that developers find useful', 'Database schema design', 'UI/UX design principles'], correctIndex: 1, explanation: 'This guide covers best practices for writing API documentation that developers actually want to read and use.' },
    { question: 'What makes good API documentation?', options: ['Listing every endpoint without context', 'Clear examples, consistent structure, error explanations, and getting started guides', 'Only describing authentication methods', 'Copying the source code directly'], correctIndex: 1, explanation: 'Good API docs include practical examples, clear structure, error handling guidance, and onboarding tutorials for new users.' },
  ],
  // ─── Sonic New Resources ───
  'son-10': [
    { question: 'What does the Sonic FeeM Strategy Guide explain?', options: ['How to deploy smart contracts', 'Sonic\'s Fee Monetization mechanism and how to optimize dApp revenue', 'How to run a Sonic node', 'Sonic token economics'], correctIndex: 1, explanation: 'The official guide explains Sonic\'s Fee Monetization (FeeM) mechanism and how to optimize dApp revenue on Sonic.' },
    { question: 'What is unique about Sonic\'s FeeM mechanism compared to other chains?', options: ['It charges no fees at all', 'It allows dApps to earn a portion of network fees, creating a new revenue model', 'It only supports stablecoin transactions', 'Fees are paid to validators only'], correctIndex: 1, explanation: 'Sonic\'s FeeM mechanism shares network transaction fees with dApp developers, creating a sustainable revenue model.' },
  ],
  'son-11': [
    { question: 'What does the Deploying to Sonic Mainnet guide cover?', options: ['Building a Sonic node from scratch', 'Step-by-step process of deploying smart contracts from testnet to Sonic mainnet', 'Creating a Sonic wallet', 'Sonic token trading strategies'], correctIndex: 1, explanation: 'The official guide provides step-by-step instructions for deploying smart contracts to Sonic mainnet from testnet.' },
    { question: 'After testing on a testnet, what should a developer do before deploying to mainnet?', options: ['Deploy immediately without changes', 'Conduct security audits, optimize gas usage, and verify contract functionality', 'Delete the testnet contracts', 'Only change the contract address'], correctIndex: 1, explanation: 'Before mainnet deployment, contracts should be audited, optimized for gas, and thoroughly verified on testnet first.' },
  ],
}