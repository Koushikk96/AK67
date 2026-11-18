import { HRInterviewQuestion } from '@/types/interview';

export const hrInterviewQuestions: HRInterviewQuestion[] = [
  {
    id: 'hr-01-tell-me-about-yourself',
    number: 1,
    question: 'Tell me about yourself.',
    objective:
      'The interviewer wants a concise, structured 60-90 second professional elevator pitch highlighting your engineering foundation, key technical projects, and career aspiration.',
    answerStructure: [
      '1. Present: Current degree, major, institution, and core technical passion (e.g. software development, problem solving).',
      '2. Past: Meaningful academic/practical milestones—key projects built, DSA proficiency, hackathons, or internships.',
      '3. Future: Why you are excited about fresher software engineering opportunities and this company specifically.',
    ],
    sampleAnswer:
      'Good morning. I am a final-year Computer Science and Engineering student with a strong passion for software systems and algorithmic problem solving. Over the course of my engineering degree, I have honed my foundation in C++, Data Structures, and Database design, having solved 200+ algorithm challenges across platforms.\n\nRecently, I engineered a full-stack web application designed for campus placement preparation that operates completely offline using IndexedDB and modern React, ensuring zero data loss and sub-100ms load times. In my team projects, I naturally gravitate toward writing clean backend logic and well-tested modules.\n\nNow, as I transition toward graduating, I am eager to contribute my problem-solving drive and technical foundations to a software engineering team that values code quality and scalability.',
    mistakesToAvoid: [
      'Reciting your resume line-by-line or listing high school percentages.',
      'Talking endlessly about personal family background or non-technical hobbies.',
      'Speaking for longer than 2 minutes without pausing.',
      'Sounding scripted without genuine energy and conversational flow.',
    ],
    proTips: [
      'Keep it strictly between 60 to 90 seconds.',
      'Mention your strongest technical project by name and impact.',
      'End with a forward-looking transition toward the specific role.',
    ],
  },
  {
    id: 'hr-02-why-should-we-hire-you',
    number: 2,
    question: 'Why should we hire you?',
    objective:
      'The interviewer wants to see if you understand the expectations for a fresher engineer: strong fundamentals, self-reliance, fast learning curve, and proactive team collaboration.',
    answerStructure: [
      '1. Strong core technical alignment: Point to demonstrated DSA and CS fundamentals.',
      '2. Fast learning agility: Give concrete evidence of picking up a new language/framework independently.',
      '3. Reliability and team value: Attitude toward feedback, code quality, and disciplined execution.',
    ],
    sampleAnswer:
      'You should hire me because I combine solid computer science fundamentals with proven learning agility and reliable work ethic.\n\nFirst, my core foundations in C++, algorithms, and relational databases mean I understand how memory, queries, and concurrency work under the hood, allowing me to write performant code rather than just copying frameworks. Second, I have demonstrated independent learning by building end-to-end applications from scratch, taking responsibility from database schema design through to deployment. Finally, I am deeply receptive to feedback and eager to learn from senior engineers, meaning I will rapidly ramp up on your codebase and contribute meaningful value to your product sprint cycles.',
    mistakesToAvoid: [
      'Giving arrogant generic answers like "Because I am the best candidate you will interview today."',
      'Begging or framing it around your personal financial needs instead of business value.',
      'Failing to mention any technical strengths or tangible project results.',
    ],
    proTips: [
      'Emphasize learning agility—for fresher hiring, willingness to learn often trumps specialized framework knowledge.',
    ],
  },
  {
    id: 'hr-03-what-are-your-strengths',
    number: 3,
    question: 'What are your greatest strengths?',
    objective:
      'Assess self-awareness, authenticity, and whether your strengths directly benefit a modern software development environment.',
    answerStructure: [
      '1. Name 2-3 genuine engineering strengths (e.g., disciplined analytical debugging, resilience under technical roadblocks, clear technical communication).',
      '2. Back up each claim with a brief real-world evidence or project anecdote.',
    ],
    sampleAnswer:
      'My greatest technical strength is my methodical approach to debugging and problem decomposition. When faced with a complex bug or algorithmic challenge, rather than randomly tweaking code, I isolate assumptions, write minimal reproducible test cases, and inspect memory or logs systematically.\n\nMy second strength is consistency and discipline. In preparation for placements, I maintained a daily preparation streak, solving algorithmic problems and revising core technical concepts across OS and SQL every single day. This self-discipline allows me to make steady, predictable progress on complex deliverables even with minimal supervision.',
    mistakesToAvoid: [
      'Listing 10 adjectives without providing a single concrete example.',
      'Listing irrelevant traits (e.g. "I am friendly").',
      'Exaggerating or claiming to know every technology.',
    ],
    proTips: [
      'Connect every strength to software delivery or team productivity.',
    ],
  },
  {
    id: 'hr-04-what-are-your-weaknesses',
    number: 4,
    question: 'What is your greatest weakness?',
    objective:
      'Test your honesty, self-awareness, and proactive commitment to personal and professional growth.',
    answerStructure: [
      '1. Acknowledge a genuine, non-fatal professional weakness.',
      '2. Explain the negative impact it had or how you noticed it.',
      '3. Outline the concrete, proactive steps you are taking to overcome it.',
    ],
    sampleAnswer:
      'In the past, I had a tendency to spend too much time trying to solve difficult bugs completely on my own before reaching out for guidance, sometimes spending hours down rabbit holes rather than asking a peer or mentor.\n\nI realized that in a professional engineering environment, time is valuable and team collaboration is key. To address this, I adopted a "30-Minute Rule": if I am blocked on an unfamiliar bug, I dedicate 30 minutes to structured debugging, reading documentation, and testing hypotheses. If I am still stuck, I document what I tried, what failed, and approach a senior or peer with a focused, well-formulated question. This has drastically cut my resolution times.',
    mistakesToAvoid: [
      'Disguising a boast as a weakness (e.g. "I am too much of a perfectionist" or "I work too hard").',
      'Mentioning disqualifying red flags (e.g. "I have trouble waking up on time" or "I get angry when criticized").',
      'Saying "I do not have any weaknesses."',
    ],
    proTips: [
      'The crucial part of the answer is not the weakness itself, but the active system you use to remediate it.',
    ],
  },
  {
    id: 'hr-05-why-join-our-company',
    number: 5,
    question: 'Why do you want to join our company?',
    objective:
      'Determine whether you researched the company culture, engineering stack, and product domain, or whether this is just another shotgun application.',
    answerStructure: [
      '1. Specific product/engineering factor that excites you (scale, domain, engineering excellence).',
      '2. Culture/learning factor: Mentorship, impact, technology adoption.',
      '3. Alignment with your personal career trajectory.',
    ],
    sampleAnswer:
      'I want to join your engineering team because of your company’s focus on high-reliability, large-scale software solutions. In reading your engineering blog and recent product updates, I was particularly impressed by how your teams handle low-latency distributed transaction workloads.\n\nAs a fresher, beginning my career in an environment with robust code review standards, disciplined CI/CD deployment pipelines, and experienced senior mentors is of paramount importance to me. I want to build features that real customers rely on every day, and your technical culture provides the ideal balance of engineering rigor and high-impact challenge.',
    mistakesToAvoid: [
      'Giving generic answers that could apply to any company on earth (e.g. "Because you are a reputed MNC").',
      'Focusing exclusively on salary, campus canteen, or brand name on LinkedIn.',
      'Getting the company’s core business or products completely wrong.',
    ],
    proTips: [
      'Look up at least one specific product, tech stack announcement, or engineering blog post from the company prior to the interview.',
    ],
  },
  {
    id: 'hr-06-describe-a-challenge',
    number: 6,
    question: 'Describe a significant technical or team challenge you faced and how you overcame it.',
    objective:
      'Evaluate your problem-solving resilience, logical thinking, and composure under pressure using the STAR framework.',
    answerStructure: [
      '1. Situation: Set the context briefly (project, deadline, constraint).',
      '2. Task: Clearly state the specific problem or objective you had to solve.',
      '3. Action: Detail the exact technical/interpersonal steps you took.',
      '4. Result: Share the positive outcome with quantifiable impact or key lessons learned.',
    ],
    sampleAnswer:
      'Situation: During our semester project, we were developing a web app that logged student test answers. Two days before our faculty submission deadline, testing revealed that refreshing the browser or encountering a flaky Wi-Fi connection caused users to lose all their test answers.\n\nTask: As the person responsible for the data layer, I needed to make our assessment engine resilient against network drops and page reloads without altering the existing backend API.\n\nAction: I researched client-side storage alternatives and decided to implement an IndexedDB persistence cache using Dexie.js. I decoupled form updates so that every question state change was saved transactionally to local disk before transmitting to the server. I also wrote automated unit tests to verify that simulating browser crashes and reconnections safely restored active tests from disk.\n\nResult: We successfully prevented data loss 100% of the time, achieved a top grade in our project evaluation, and I gained deep first-hand appreciation for local-first software architecture.',
    mistakesToAvoid: [
      'Blaming teammates or speaking negatively about peers or professors.',
      'Giving a vague story without stating what action YOU personally took.',
      'Skipping the "Result" part of the STAR method.',
    ],
    proTips: [
      'Always use "I" for your specific contributions, and "We" for team objectives.',
    ],
  },
  {
    id: 'hr-07-tell-me-about-your-project',
    number: 7,
    question: 'Tell me about your major project.',
    objective:
      'Assess your ability to explain complex technical architecture clearly to non-specialists, understand trade-offs, and defend technical choices.',
    answerStructure: [
      '1. High-level elevator pitch: What real problem does it solve and who is it for?',
      '2. Tech stack: Language, frontend, database, protocols, and why they were chosen.',
      '3. Your personal role and deepest technical contribution.',
      '4. Key challenge overcome and future improvements.',
    ],
    sampleAnswer:
      'For my major project, I built AK67—a zero-cost, local-first placement preparation application designed to help college students prepare systematically for fresher software engineering campus drives without requiring cloud databases or paid subscriptions.\n\nArchitecture: The application is built with React, TypeScript, and Tailwind CSS on the frontend, with local IndexedDB storage managed by Dexie.js. Because privacy and zero hosting overhead were mandatory, each student’s entire preparation history—across 67 DSA problems, C++, SQL, and Aptitude—is stored directly on their own device.\n\nMy Contribution: I designed the relational local database schemas, implemented an automated SM-2 spaced repetition revision queue, and created a transactional JSON backup and diff-merging recovery engine.\n\nThe hardest challenge was ensuring date calculations and revision queues were robust against month rollovers and device reloads, which I verified with automated unit tests across 100+ assertions.',
    mistakesToAvoid: [
      'Describing the UI button colors instead of system architecture and engineering logic.',
      'Claiming technologies you cannot explain when the interviewer asks follow-up questions.',
      'Reading from a memorized script with zero enthusiasm.',
    ],
    proTips: [
      'Be prepared for the immediate technical follow-up: "Why didn’t you use MySQL/MongoDB?" or "What would break at 100,000 users?"',
    ],
  },
  {
    id: 'hr-08-role-in-a-team',
    number: 8,
    question: 'How do you handle conflict or differences of opinion within a project team?',
    objective:
      'Assess emotional maturity, teamwork, professional communication, and ability to prioritize project goals over personal ego.',
    answerStructure: [
      '1. Welcome constructive disagreement as a natural part of engineering design.',
      '2. Shift discussions away from personal opinions toward data, benchmarks, and project requirements.',
      '3. Show willingness to disagree and commit once a decision is made.',
    ],
    sampleAnswer:
      'I view technical disagreement as a healthy and necessary part of building quality software. In a previous hackathon, my teammate and I disagreed on whether to use a document store like MongoDB or a relational database like PostgreSQL for our application.\n\nRather than turning it into an emotional debate, we listed our core application requirements: we had strict foreign key relationships, transactional order requirements, and low tolerance for orphaned records. Once we mapped out the data relationships on a whiteboard, it became obvious that PostgreSQL’s relational schema was the superior choice for our constraints.\n\nMy approach is to ground every technical debate in measurable requirements, listen with genuine curiosity, and once the team agrees on a path, commit 100% to making it successful.',
    mistakesToAvoid: [
      'Claiming you have never had a disagreement in your life (sounds unconvincing).',
      'Portraying yourself as someone who always yields or someone who always fights to win.',
    ],
    proTips: [
      'Emphasize Amazon’s famous leadership principle: "Have Backbone; Disagree and Commit."',
    ],
  },
  {
    id: 'hr-09-five-years-from-now',
    number: 9,
    question: 'Where do you see yourself in five years?',
    objective:
      'Check whether you have realistic career ambitions, commitment to engineering mastery, and whether you intend to stick around and grow with the organization.',
    answerStructure: [
      '1. Years 1-2: Solidify codebase mastery, become a self-reliant developer, deliver reliable features.',
      '2. Years 3-5: Deepen system design expertise, take technical ownership of end-to-end modules, and mentor newer junior engineers.',
    ],
    sampleAnswer:
      'In five years, my goal is to have evolved into a strong, dependable Software Engineer with deep expertise in system architecture and performant software design.\n\nIn the first couple of years, I want to immerse myself completely in your tech stack, learn team best practices, and become someone who takes features from requirements to production deployment with minimal supervision. Over the subsequent years, I aim to take end-to-end technical ownership of key modules, contribute to architectural decisions, and help mentor newer fresher engineers who join the team, just as senior engineers will have mentored me.',
    mistakesToAvoid: [
      'Saying you plan to leave for higher studies (e.g. "I will be studying MS in the US") or start your own business.',
      'Saying "I want to be the CEO of this company."',
      'Sounding aimless (e.g. "I haven’t thought about it").',
    ],
    proTips: [
      'Focus on technical competence, ownership, and value creation within the organization.',
    ],
  },
  {
    id: 'hr-10-questions-for-us',
    number: 10,
    question: 'Do you have any questions for us?',
    objective:
      'Gauge your curiosity, preparation, engagement, and genuine interest in the team you are interviewing for.',
    answerStructure: [
      '1. Ask thoughtful questions about engineering culture, team workflow, or technical challenges.',
      '2. Never say "No, I don’t have any questions."',
    ],
    sampleAnswer:
      'Yes, thank you! I have two questions:\n\n1. "For a fresher engineer joining this team, what does success look like in the first 90 days?"\n\n2. "What are some of the most exciting technical challenges or architectural migrations your engineering team is currently navigating?"',
    mistakesToAvoid: [
      'Saying "No, you covered everything" (signals lack of interest).',
      'Asking immediately about salary, bonuses, paid time off, or vacation leaves in the initial technical round.',
      'Asking questions easily answered by glancing at the company homepage.',
    ],
    proTips: [
      'Prepare at least 3 thoughtful questions in advance so you always have great ones ready.',
    ],
  },
];
