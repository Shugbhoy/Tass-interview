import { useState, useRef, useEffect } from "react";

// ─── TASS Brand ───────────────────────────────────────────────────────────────
const NAVY = "#0D1B3E";
const TEAL = "#1A9E8F";
const AMBER = "#F4A623";
const RED = "#C0392B";
const GREEN = "#1A6B3A";

function TASSLogo({ size = "md", theme = "light" }) {
  const scales = {
    sm: { the: 9,  main: 18, sub: 16, tag: 9,  ruleW: 16, ruleH: 1.5, gap: 2 },
    md: { the: 11, main: 24, sub: 22, tag: 11, ruleW: 22, ruleH: 2,   gap: 3 },
    lg: { the: 14, main: 32, sub: 29, tag: 13, ruleW: 28, ruleH: 2,   gap: 4 },
  };
  const s = scales[size] || scales.md;
  const navy  = theme === "dark" ? "#fff" : NAVY;
  const teal  = TEAL;
  const tagCol  = theme === "dark" ? "rgba(255,255,255,0.5)" : "#6B7FA3";
  const tagBold = theme === "dark" ? "rgba(255,255,255,0.75)" : "#3D4F6B";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: s.gap, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: s.ruleW, height: s.ruleH, background: teal, borderRadius: 99 }} />
        <span style={{ color: teal, fontSize: s.the, fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", lineHeight: 1 }}>THE</span>
        <div style={{ width: s.ruleW, height: s.ruleH, background: teal, borderRadius: 99 }} />
      </div>
      <div style={{ color: navy, fontSize: s.main, fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1, marginTop: -1 }}>APPRENTICESHIP</div>
      <div style={{ color: teal, fontSize: s.sub, fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1, marginTop: -3 }}>SUCCESS SYSTEM™</div>
      <div style={{ width: "70%", height: s.ruleH, background: teal, borderRadius: 99 }} />
      <div style={{ color: tagCol, fontSize: s.tag, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400, marginTop: 1 }}>
        Stop Guessing.{" "}<strong style={{ fontWeight: 800, color: tagBold }}>Start Securing.</strong>
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "home",         icon: "🏠", label: "Home" },
  { id: "golden",       icon: "🏅", label: "Golden Rules" },
  { id: "career",       icon: "🎯", label: "Career" },
  { id: "star",         icon: "⭐", label: "STAR" },
  { id: "questions",    icon: "❓", label: "Questions" },
  { id: "respond",      icon: "🗣️", label: "Respond" },
  { id: "formats",      icon: "🏢", label: "Formats" },
  { id: "presentation", icon: "📊", label: "Presentation" },
  { id: "nerves",       icon: "🧠", label: "Nerves" },
  { id: "askus",        icon: "💬", label: "Ask Them" },
  { id: "roadmap",      icon: "🗓️", label: "Roadmap" },
  { id: "edi",          icon: "🤝", label: "EDI" },
  { id: "comms",        icon: "✉️", label: "Comms" },
  { id: "coach",        icon: "🤖", label: "Coach" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTOR_COMPETENCIES = [
  { sector: "Customer Service / Public Sector", skills: ["Empathy and patience with diverse residents", "Problem resolution and case management", "Knowledge of public services", "Confidentiality and data protection", "Multi-channel communication (phone, email, in-person)", "Following procedure accurately"] },
  { sector: "Engineering (Mechanical/Electrical)", skills: ["Safety awareness and PPE compliance", "Numerical reasoning and measurement", "Tool and machinery use", "Technical knowledge (basic engineering principles)", "Careful attention to detail", "Persistence and methodical working"] },
  { sector: "Construction & Trades", skills: ["Health & safety (site rules, PPE)", "Physical stamina and spatial awareness", "Teamwork on site", "Practical aptitude", "Basic planning and sequencing", "Following site protocols"] },
  { sector: "Digital / IT", skills: ["Technical knowledge (networks, coding basics)", "Quick troubleshooting", "Adaptability to new tools", "Security and data awareness", "Customer service for tech support", "Explaining technical concepts simply"] },
  { sector: "Health & Social Care", skills: ["Strong empathy and compassion", "Confidentiality and care standards", "Infection control awareness", "Communication with vulnerable people", "Teamwork across shifts", "Resilience and stress management"] },
  { sector: "Hospitality & Retail", skills: ["Customer service excellence", "Sales skills and upselling", "Flexibility with shift work", "Basic numeracy (cash handling)", "Product and food knowledge", "Attention to detail (cleanliness, presentation)"] },
  { sector: "Creative Industries", skills: ["Creativity and initiative", "Portfolio awareness", "Technical tools (Adobe suite etc.)", "Teamwork on projects", "Client communication", "Time management under deadlines"] },
  { sector: "Transport & Logistics", skills: ["Safety (driving, load handling)", "Planning and organisation", "Punctuality and reliability", "Teamwork (coordinating routes)", "Customer interaction", "Problem solving (delays, changes)"] },
  { sector: "Manufacturing", skills: ["Quality control and inspection", "Machine operation safety", "Health & safety compliance", "Systematic problem-solving", "Process improvement mindset", "Understanding of product lifecycle"] },
];

const INTERVIEW_QUESTIONS = [
  // ── GENERAL ──────────────────────────────────────────────────────────────
  {
    category: "General",
    q: "Tell me about yourself.",
    why: "Your opening pitch. Keep it focused — education, relevant experience, why you're here. 60–90 seconds maximum.",
    weak: "I'm just finishing school and I'm looking for a job. I like working with people and I'm a hard worker. I don't have much experience but I'm keen to learn.",
    good: "I'm 17 and I've just completed my Highers at Westfield Academy. I've been volunteering at my local community centre for the past year helping run youth activities, which gave me a lot of experience working with different people. I'm applying for this apprenticeship because I want to build a proper career rather than just get a job.",
    elite: "I'm currently finishing my Highers at Westfield Academy where my strongest subjects are Maths and English. Alongside school, I've spent the last 14 months volunteering at Westfield Community Centre, where I coordinate the junior sports programme for 25 young people every Saturday. That experience taught me how to communicate with different people, manage competing priorities, and stay reliable under pressure. I'm applying for this apprenticeship specifically because I want structured training in a professional environment — I learn best when I can apply things practically, and this role offers exactly that.",
    commentary: "The elite answer gives specific numbers (14 months, 25 young people), names the skills it developed, and links them directly to why this apprenticeship — not just any apprenticeship. It sounds rehearsed in the right way: prepared, not scripted."
  },
  {
    category: "General",
    q: "Why do you want this apprenticeship?",
    why: "Show research and genuine motivation. Link their values to your goals. Generic enthusiasm fails here.",
    weak: "Because it sounds like a great opportunity and I think I'd be good at it. I want to learn new skills and this seems like a good place to do that.",
    good: "I want this apprenticeship because it gives me the chance to earn while I learn and develop real skills. I've researched the company and I think the values match what I'm looking for in a workplace.",
    elite: "I want this apprenticeship because of the specific combination it offers — structured technical training, a nationally recognised qualification, and the chance to work in a sector I've been interested in since I helped my dad with a rewiring project at home. I've researched this company in particular: I read about your contract with the Glasgow housing regeneration project and your focus on energy-efficient installations, which aligns with where I see the industry going. I want to be trained by people who take that seriously, not just placed in a role and left to figure it out.",
    commentary: "The elite answer shows sector knowledge, company-specific research, and a personal hook that makes it memorable. The housing project reference shows the candidate did real research — not just read the About Us page."
  },
  {
    category: "General",
    q: "What are your strengths and weaknesses?",
    why: "Strength needs evidence. Weakness needs self-awareness and what you're actively doing about it. Never say 'I'm a perfectionist.'",
    weak: "My strength is that I'm a hard worker and I always try my best. My weakness is probably that I care too much and I'm a bit of a perfectionist.",
    good: "My main strength is that I'm reliable — I've never missed a shift at my volunteering role in over a year. My weakness is that I sometimes struggle to ask for help when I'm stuck, but I'm working on that by being more open with team members.",
    elite: "My strongest quality is consistency under pressure. At my part-time job in a busy café, I maintained my accuracy on orders during our peak Saturday shifts even when we were short-staffed — my manager mentioned it specifically in my last review. In terms of weakness, I used to rush tasks when I felt under time pressure, which occasionally meant I'd miss a detail. I recognised this pattern about six months ago and now I use a simple checklist approach before I hand anything over. It's made a measurable difference — I've had no errors flagged since.",
    commentary: "The strength is evidenced with a specific situation and external validation (manager's review). The weakness is real, the self-awareness is genuine, and the fix is concrete and already working. This is the structure that impresses interviewers."
  },
  {
    category: "General",
    q: "Give an example of when you faced a challenge and how you overcame it.",
    why: "Classic STAR question. Choose something real with a clear outcome. Avoid vague 'challenges' like 'working in a group'.",
    weak: "I once had a really hard time with a group project at school. It was difficult but we got through it in the end.",
    good: "In S5, I had to resit my Maths Higher after failing it the first time. I found it really discouraging but I worked with a tutor twice a week for six months and passed with a B in the resit. It taught me that persistence pays off.",
    elite: "In S5 I failed my Maths Higher at the first sitting, which was a real blow because I needed it for this pathway. Rather than waiting and hoping, I identified exactly which areas had cost me marks — algebra and statistics — and arranged tutoring sessions twice a week on top of my other subjects. I also changed how I revised, moving from reading notes to doing timed past papers under exam conditions. When I resit, I passed with a B. The experience taught me two things: that difficulty is worth diagnosing rather than just working harder on everything, and that I'm capable of sustained effort when something matters enough.",
    commentary: "The elite answer turns a setback into a demonstration of analytical thinking, self-direction and resilience — all qualities an engineering or professional employer values. The lesson at the end shows maturity."
  },
  {
    category: "General",
    q: "How do you handle criticism or a mistake?",
    why: "They want honesty, accountability and learning — not perfection. Never claim you don't make mistakes.",
    weak: "I try not to make mistakes. I'm quite careful so it doesn't happen often, but if it does I just try to do better next time.",
    good: "I try to take criticism constructively. If I make a mistake I'll own it, work out what went wrong, and make sure I don't repeat it. I think making mistakes is part of learning.",
    elite: "At my Saturday job I once gave a customer the wrong order and didn't realise until they came back. My first instinct was to feel embarrassed, but I apologised directly, replaced the order immediately and flagged it to my supervisor without being asked. Afterwards I spoke to my manager about what happened — turns out I'd misread the handwriting on the ticket. We introduced a read-back system where I confirm orders verbally before processing them. That system is still in use. I think mistakes are most useful when they change something permanently rather than just being apologised for.",
    commentary: "The elite answer shows accountability (told supervisor unprompted), problem-solving (identified the root cause), and lasting impact (changed the process). The final line shows genuine professional maturity."
  },
  {
    category: "General",
    q: "Describe a time you worked as part of a team.",
    why: "Focus on your specific role and contribution, not the team as a whole. Use 'I' not 'we'.",
    weak: "We did a group project at school and we all worked together to get it done. I think we made a good team.",
    good: "In a school STEM project, I was part of a four-person team building a model bridge. I took responsibility for the calculations and checking measurements. We completed it on time and it passed the load test.",
    elite: "In my S5 STEM project, our team of four was tasked with designing and building a load-bearing bridge within a strict materials budget. I took on the role of lead on calculations and quality checking — specifically, I ran measurements at each stage and flagged two errors before they became structural problems. When one team member fell ill two days before the deadline, I redistributed the remaining tasks, stayed late two evenings to compensate, and we still submitted on time. The bridge passed the load test at first attempt. I learned that my contribution to a team is most valuable when I'm precise in my own work and proactive when someone else is struggling.",
    commentary: "The elite answer shows individual ownership, proactive problem-solving when the team hit difficulty, and a clear result. The final reflection demonstrates self-awareness about what kind of team member they are."
  },
  {
    category: "General",
    q: "What interests you about this sector?",
    why: "Show sector knowledge, not just enthusiasm. Mention something specific about the industry — not just the company.",
    weak: "I've always been interested in this kind of work. I think it's a growing industry and there are good career opportunities in it.",
    good: "I'm interested in engineering because I enjoy problem solving and working with my hands. I've always liked understanding how things work, and I think the skills you build in this sector are ones you can use throughout your whole career.",
    elite: "I'm interested in electrical engineering specifically because of the role it plays in the energy transition — the shift to heat pumps, EV infrastructure and smart grid systems is creating demand for engineers who understand both traditional systems and emerging technologies. I've been following that shift through a podcast called The Energy Gang and through reading about the Scottish Government's net zero targets. What draws me to an apprenticeship rather than a degree is that I want to be building real competence in systems that are actually being installed now, not studying theory for four years and then entering a sector that's already moved on.",
    commentary: "This answer demonstrates genuine sector literacy and a clear reason for choosing an apprenticeship over other routes — both of which are rare and memorable. The specific reference to the podcast and policy context shows the candidate is genuinely engaged."
  },

  // ── TEAMWORK ─────────────────────────────────────────────────────────────
  {
    category: "Teamwork",
    q: "Describe a team project and your specific role in it.",
    why: "Use 'I', not 'we'. Interviewers want to know what YOU did — not what the group did collectively.",
    weak: "We did a charity fundraiser at school. We all worked together to plan it and raise money. It was a team effort and we raised quite a lot.",
    good: "I organised a charity fundraiser with four classmates. I was responsible for the social media promotion and we raised £340 in two weeks. I designed the posts and scheduled them every two days to keep up momentum.",
    elite: "I led the communications for a school charity fundraiser with a team of five. My specific role was designing and managing our social media campaign across Instagram and Twitter. I created a two-week content calendar, posted daily updates, and responded to every comment within 24 hours to keep engagement up. When our original fundraising platform had technical issues on day three, I researched alternatives within an hour and we switched to JustGiving without losing any donations. We raised £340 against a £200 target. My contribution was directly measurable — our social reach was the main driver of donations according to the platform analytics.",
    commentary: "The elite answer is specific about the role, quantified (£340 vs £200 target), includes a problem that arose and how it was handled, and ends with evidence that the individual's contribution was the key factor. This is a complete STAR answer."
  },
  {
    category: "Teamwork",
    q: "Tell me about a time you had a disagreement with a teammate. How did you resolve it?",
    why: "Shows maturity and conflict resolution. Don't badmouth the other person. Show you can hold a position and still work collaboratively.",
    weak: "I had a disagreement with someone in my group about how to do a project. We eventually sorted it out and moved on.",
    good: "During a group assignment, a teammate wanted to use a different approach to mine. I explained my reasoning and listened to theirs, and we decided to combine both ideas. The project went well in the end.",
    elite: "During a group engineering project, I disagreed with a teammate about which material to use for our model. He wanted to use cardboard because it was quicker; I wanted to use balsa wood because it met the load specification more reliably. Rather than escalating it, I sat down with him privately, showed him the load calculation and explained the risk of cardboard failing at the test stage. He hadn't seen the full spec — once he did, he agreed with the approach. We used balsa wood and the model passed first time. I've found that most disagreements in teams come from people working with different information, not different values.",
    commentary: "The elite answer shows the candidate held their position for the right reasons (technical evidence, not ego), resolved it privately and respectfully, and the outcome validated their judgement. The final observation is the kind of thing a senior engineer would say."
  },
  {
    category: "Teamwork",
    q: "Give an example of supporting a team member who was struggling.",
    why: "Demonstrates empathy, reliability and going beyond your own role. Shows the kind of teammate you'd be every day.",
    weak: "I helped a friend with their work when they were having a hard time. I showed them what to do and they got it done.",
    good: "A classmate was really struggling with the data section of our group project. I spent a lunch break going through it with her and she was able to complete her part. It felt good to help and it meant the project stayed on track.",
    elite: "During our group technology project, one team member was significantly behind on her section because she'd been absent for two sessions through illness and didn't understand the brief. I noticed she was becoming quiet in meetings — a sign she wasn't going to flag it herself. I approached her after class, not in front of the group, and asked directly what she needed. We spent two lunch breaks going through the missed content together. I didn't do her work for her — I asked her questions until she could answer them herself. She completed her section on time and it was accurate. The project submitted on schedule. I think supporting someone well means helping them get capable, not just getting them through.",
    commentary: "The elite answer shows emotional intelligence (noticing quietness as a signal), discretion (approached privately), and a healthy approach to helping (questions not answers). The final line is a philosophy, not just a description — it shows maturity."
  },
  {
    category: "Teamwork",
    q: "How do you keep yourself and others motivated on a long project?",
    why: "Shows leadership potential and self-awareness. They want to know how you sustain effort, not just how you start strong.",
    weak: "I try to stay positive and encourage others. I think it's important to keep the energy up in a team.",
    good: "I like to break long projects into smaller goals so it doesn't feel overwhelming. I check in with teammates regularly so we all know where we're up to and can help each other if someone falls behind.",
    elite: "On a twelve-week school enterprise project, I kept my own motivation by tracking weekly milestones against the final deadline — I made a simple spreadsheet with checkpoints so I could see progress even when the end felt distant. For the team, I found that short weekly check-ins worked better than long planning sessions — we'd spend ten minutes every Monday confirming what each person was doing that week and flagging anything they were unsure about. When one teammate started missing those check-ins in week eight, I reached out individually rather than flagging it to the group. She was dealing with something at home and needed a lighter task for two weeks. We redistributed without drama and she re-engaged fully by the final stages. The project was submitted on time and graded highly.",
    commentary: "The elite answer shows personal structure (spreadsheet, milestones), team structure (weekly check-ins), and emotional intelligence (noticing disengagement and handling it quietly). Real leadership is embedded throughout without being claimed directly."
  },

  // ── PROBLEM SOLVING ──────────────────────────────────────────────────────
  {
    category: "Problem Solving",
    q: "Give an example of a problem you identified and solved without being asked.",
    why: "Initiative is rare. If you have a genuine example this is gold. Show you spotted something others missed and acted on it.",
    weak: "I noticed something wasn't working at my volunteering job and I fixed it. My supervisor was pleased.",
    good: "At the community centre where I volunteer, I noticed the sign-in sheet for activities was always being lost or damaged. I suggested we move to a digital sign-in using a shared spreadsheet. My supervisor agreed and we've been using it for three months now.",
    elite: "At the community centre where I volunteer, attendance records for our youth programme were kept on paper sheets that frequently went missing — meaning we couldn't track who had attended or spot patterns in absence. Nobody had complained formally because it had always been done that way. I raised it with my supervisor and proposed a simple Google Form that participants could complete on arrival using a tablet at the door. I designed the form, tested it with two sessions, and trained two other volunteers to manage it. We've had complete attendance records for the past four months. My supervisor mentioned it in the centre's quarterly report as an improvement that came from the volunteer team.",
    commentary: "The candidate spotted a problem nobody had formally raised, proposed and implemented a solution without waiting to be asked, trained others to sustain it, and generated external recognition. Every element of this is initiative — and it's all real."
  },
  {
    category: "Problem Solving",
    q: "Tell me about a time when you had to learn something new quickly.",
    why: "Adaptability and a learning mindset are critical for apprenticeships. Show the process, not just the outcome.",
    weak: "I had to learn how to use a new piece of software at school. It was hard at first but I got used to it.",
    good: "When I started at my part-time job, I had to learn the till system and stock management software in my first week. I asked questions, practised on quiet shifts, and was confident with both by the end of week two.",
    elite: "When I started my Saturday job at the hardware store, I was told I'd be operating the stock management software within my first three shifts — but there was no formal training, just a five-minute walkthrough from a colleague who was leaving. I asked if I could spend the first quiet hour of each shift working through the system manually rather than watching someone else use it. I wrote myself a one-page reference card of the six most common functions. By the end of week two I was the person other new starters came to with questions. My manager mentioned in my probation review that I'd picked it up faster than most. I find I learn faster when I have to produce something — notes, a reference card, a checklist — rather than just observe.",
    commentary: "The elite answer shows active learning strategy (doing rather than watching), initiative (the reference card), measurable outcome (others coming to them for help, manager comment in review), and a self-aware insight about how they learn. That last line is genuinely impressive."
  },
  {
    category: "Problem Solving",
    q: "Describe a complex task you organised from start to finish.",
    why: "Planning, execution and follow-through — all tested in one question. Show the full arc, not just the result.",
    weak: "I organised an event at school. We planned it, did it, and it went well.",
    good: "I organised a sports day for the community centre's youth group. I booked the facilities, arranged the activities, got volunteers to help, and managed the day itself. About 40 young people attended and it ran smoothly.",
    elite: "I took on organising the community centre's annual youth sports day after the usual coordinator moved away. I had six weeks and no budget beyond what we could fundraise. I started by mapping every task that needed to happen — venue booking, equipment, volunteers, parental consent, first aid cover — and worked backwards from the event date. I created a shared task list and assigned roles to four other volunteers. When our first aid volunteer dropped out two weeks before, I contacted the local St John Ambulance branch directly and arranged a replacement within 48 hours. On the day, 47 young people attended — up from 31 the previous year. I wrote a debrief document afterwards so the next person wouldn't have to start from scratch.",
    commentary: "The elite answer demonstrates real project management: backward planning from deadline, delegation, contingency response (first aid replacement), measurable result (47 vs 31), and leaving something behind for the next person. That last detail shows unusual professional maturity."
  },
  {
    category: "Problem Solving",
    q: "How do you approach a task you've never done before?",
    why: "They want to see process and humility, not overconfidence. Show you have a method, not just enthusiasm.",
    weak: "I just try my best and figure it out as I go. I'm a quick learner so I usually manage.",
    good: "I'd start by reading any instructions or guidance available, then ask someone with experience if I'm still unsure. I'd rather ask a question than do it wrong.",
    elite: "My approach is to start by understanding what 'done well' looks like before I start. So if I'm given a new task I'll look for an example of it done correctly — a template, a previous version, or a description from someone who's done it. Then I'll identify the two or three parts I'm least certain about and ask specifically about those, rather than asking general questions. I'd rather make targeted asks than broad ones — it shows I've thought about it and it respects the other person's time. Then I'll do a first attempt and flag it for review before I commit it as final. I'd rather be corrected early than have to redo something that's gone too far in the wrong direction.",
    commentary: "The elite answer describes a method — understanding the standard, targeted questioning, early review — rather than just an attitude. This is exactly what a good apprentice does on the job, and describing it this clearly shows genuine self-awareness."
  },

  // ── RESILIENCE ───────────────────────────────────────────────────────────
  {
    category: "Resilience",
    q: "Talk about a time when you had to cope with change or a setback.",
    why: "Real answer beats a polished one here. Authenticity matters more than a heroic narrative.",
    weak: "I had to deal with a lot of change during lockdown. It was hard but I got through it and came out stronger.",
    good: "When my college moved to online learning during Covid, I really struggled at first. I missed the structure of being in class. I set up a timetable for myself at home and found a study group online which helped me stay on track.",
    elite: "When my school moved to remote learning in 2020, I found it much harder than I expected. I'm someone who learns through discussion and feedback, and sitting alone with a screen removed both. My grades dropped in the first term and I didn't flag it because I assumed everyone was struggling equally. By the second term I recognised I needed to create the structure I was missing: I set a firm start and finish time each day, joined an online study group through school, and started emailing teachers with specific questions rather than waiting to ask in class. My grades recovered in the second term and I finished the year with results I was proud of. The experience taught me that I need to recognise when I'm struggling early enough to do something about it — not after the damage is done.",
    commentary: "The elite answer is honest about the difficulty and the delay in responding, then shows genuine adaptation. The lesson drawn is specific and self-aware, not a generic 'I learned that I'm resilient.' This authenticity is what makes it convincing."
  },
  {
    category: "Resilience",
    q: "Give an example of a stressful situation and how you handled it.",
    why: "Shows coping mechanisms and emotional regulation. They want to know you don't freeze or spiral — you function.",
    weak: "I get stressed sometimes but I just try to stay calm and get on with things. I think staying positive helps.",
    good: "Before my Higher exams I was quite stressed because I had four exams in five days. I made a revision timetable and stuck to it, which helped me feel more in control. I passed all four.",
    elite: "The week of my Higher exams, my gran was taken into hospital and I had four papers in five days. I couldn't process both things at once, so I made a deliberate decision: I would get through the exams and give myself permission to deal with everything else afterwards. I told my mum I needed to stay focused during revision time and she agreed. I kept to my planned revision schedule even when I felt distracted, because I knew that structure was the only thing keeping me functional. I passed all four exams. My gran recovered. Afterwards, I recognised that what helped me most was making a clear decision about what I was going to prioritise and communicating it, rather than trying to manage everything simultaneously.",
    commentary: "The elite answer is genuinely difficult content handled with maturity. It shows clear decision-making under pressure, communication with family, adherence to a plan despite distraction, and a thoughtful post-event reflection. It doesn't claim heroism — it shows how the candidate actually functioned."
  },
  {
    category: "Resilience",
    q: "Describe an instance where you had to adapt your plans at the last minute.",
    why: "Flexibility is highly valued, especially in operational roles. Show you can recalibrate without falling apart.",
    weak: "Something went wrong with a project once and we had to change our plans. We figured it out and it worked out okay.",
    good: "At a community event I was helping to run, the venue double-booked us and we had to move everything to a smaller room with an hour's notice. I helped reorganise the layout and we made it work.",
    elite: "I was running the warm-up session for our community centre's Saturday youth programme when I arrived to find the sports hall had a water leak and was closed. I had 25 young people arriving in 20 minutes and no backup plan. I spoke to the centre manager immediately, identified that the smaller activity room was available, and redesigned the session on the spot — switching from team games to a circuit-based format that worked in a smaller space. I briefed the other volunteers on the change in two minutes and we were ready when the first participants arrived. Nobody knew there had been a problem. My supervisor said afterwards that the speed of my response had prevented what could have been a chaotic morning.",
    commentary: "The elite answer puts the candidate in a real operational situation with a tight timeline and shows fast, clear decision-making: assess, find resource, adapt format, brief team, deliver. No drama, no apology — just function. That is exactly what an employer wants to see."
  },

  // ── CUSTOMER SERVICE ─────────────────────────────────────────────────────
  {
    category: "Customer Service",
    q: "Can you give an example of a time you dealt with a difficult customer or client?",
    why: "Stay calm in your answer — model the behaviour you'd show in the role. Don't criticise the customer.",
    weak: "A customer was really rude to me once at my job. I tried not to get upset and just dealt with it.",
    good: "At the café where I work, a customer complained that her order was wrong. I apologised, confirmed what she'd actually ordered, and replaced it immediately. She left happy.",
    elite: "At the café, a customer came in during a Saturday rush and became quite loud when told her preferred table wasn't available. I could see other customers watching. I spoke to her calmly and quietly, acknowledged that she'd had a specific preference, and offered two alternatives — a different table that had a similar view, or a short wait for her usual spot. She chose to wait. I brought her a complimentary coffee while she waited and when her table became available I seated her personally. By the end she thanked me. I've found that when someone is upset in public, bringing the energy down quietly and privately is usually more effective than trying to resolve the issue in front of an audience.",
    commentary: "The elite answer shows spatial and social awareness (other customers watching), de-escalation technique (quiet and calm), proactive service (complimentary coffee), and a follow-through to resolution. The final observation shows the candidate has derived a transferable principle from the experience."
  },
  {
    category: "Customer Service",
    q: "How would you explain a complex service to someone who doesn't understand it?",
    why: "Communication skill — simplifying without being condescending. Show you can adapt your language to your audience.",
    weak: "I'd explain it clearly and use simple words. I'd make sure they understood before I moved on.",
    good: "I'd try to avoid jargon and use everyday language. I'd check in as I went to make sure they were following and ask if they had any questions at the end.",
    elite: "I'd start by finding out what they already know, so I'm not either talking down to them or assuming knowledge they don't have. Then I'd explain in plain language, using an analogy if the concept is abstract — for example, if I was explaining a waiting list system, I might compare it to a queue at a deli counter. I'd break it into two or three steps rather than one long explanation, and I'd check understanding after each step with an open question like 'does that make sense so far?' rather than 'do you understand?' — because most people will say yes to the second even if they don't. If they were still confused, I'd try a different approach rather than just repeating the same explanation more slowly.",
    commentary: "The elite answer demonstrates a real communication method: assess baseline knowledge, use analogy, chunk information, check understanding with open questions, and adapt if needed. The distinction between 'does that make sense?' and 'do you understand?' is a subtle but impressive detail."
  },
  {
    category: "Customer Service",
    q: "What does excellent customer service look like to you?",
    why: "Your definition should go beyond 'being nice'. Show depth of thinking about what actually makes service excellent.",
    weak: "Excellent customer service means being friendly and helpful and making sure the customer is happy.",
    good: "I think excellent customer service means the person leaves feeling heard and helped. It's about listening properly, communicating clearly, and actually solving the problem rather than just going through the motions.",
    elite: "Excellent customer service means the person leaves feeling that their time was respected and their problem was taken seriously — even if the outcome wasn't what they wanted. The best service I've ever received wasn't when someone said yes to everything; it was when someone was honest with me about what was possible, explained why, and gave me a clear alternative. In a council or public sector context, I think that matters especially — residents are often dealing with stressful situations and they need to feel that the person they're speaking to actually understands what's at stake for them, not just what the procedure requires. Service that's technically correct but emotionally absent isn't excellent — it's adequate.",
    commentary: "The elite answer reframes customer service away from surface behaviour and towards genuine human engagement. The point about honesty being better than saying yes to everything is counterintuitive but true. The public sector observation shows the candidate has thought about the specific context they're applying into."
  },

  // ── SAFETY & TECHNICAL ───────────────────────────────────────────────────
  {
    category: "Safety & Technical",
    q: "What safety precautions would you take in a workshop or site environment?",
    why: "For engineering and construction roles, safety knowledge is non-negotiable. Show you understand why, not just what.",
    weak: "I'd wear the right protective equipment and make sure I followed the rules. Safety is really important.",
    good: "I'd make sure I had the correct PPE for the task — safety glasses, gloves, steel-capped boots where required. I'd check the equipment before using it and make sure my workspace was clear. If I was unsure about anything I'd ask before starting.",
    elite: "Before starting any task I'd carry out a brief visual risk assessment — identify any hazards specific to that area, confirm the correct PPE is in place for the task and is in good condition, and check the equipment I'm about to use. I'd also make sure I knew the location of emergency stops, fire exits and first aid before I needed them rather than after. If anything looked unusual or out of place, I'd stop and raise it with a supervisor rather than making a judgement call on my own. In a training environment I'd be especially careful not to assume I know how something works — I'd always confirm the correct method with the person supervising me before proceeding. Safety culture is built on habits, not intentions — it only works if it's done every time, not when it feels necessary.",
    commentary: "The elite answer moves beyond the checklist into genuine safety culture thinking — risk assessment before starting, knowing emergency procedures proactively, and the crucial point about not assuming knowledge in a training environment. The final line is a mature philosophy that most experienced workers would recognise."
  },
  {
    category: "Safety & Technical",
    q: "Tell me about a time you learned to use a new tool or piece of equipment.",
    why: "Shows practical learning ability and care. Demonstrates respect for the equipment and for safe working.",
    weak: "I learned how to use a drill in a school project. It was fine once I got used to it.",
    good: "In my technology class I learned to use a bench drill for the first time. The teacher showed me the correct technique and safety checks before I started. I practiced on scrap material first and then completed my component accurately.",
    elite: "In S4 technology, I learned to use the bench drill press for a practical project. Before I was allowed to operate it independently, my teacher required me to watch a demonstration, pass a verbal safety check, and complete three supervised practice cuts on scrap material. I deliberately slowed down on the first few real cuts even after I felt confident, because I'd been told that most errors happen when people speed up before they've fully internalised the technique. My component came out to specification and I had zero errors. The experience taught me that the learning period for equipment is not just about getting the result right — it's about building the habit of doing it correctly every time before speed becomes a factor.",
    commentary: "The elite answer shows the candidate actively chose to slow down even when feeling confident — a sign of genuine safety awareness rather than just compliance. The final observation is a principle that a skilled tradesperson would immediately recognise as correct."
  },
  {
    category: "Safety & Technical",
    q: "Have you ever made a mistake on a practical task? What did you do?",
    why: "Honesty and early reporting are both engineering values. Concealing a mistake is always worse than disclosing it.",
    weak: "I made a mistake once in a school project. I tried to fix it and it worked out okay.",
    good: "During a technology project I drilled a hole in the wrong position on a piece of wood. I told my teacher straight away rather than trying to hide it. We worked out that the piece could be recut to a slightly smaller dimension without affecting the overall design.",
    elite: "During a practical project in S5, I cut a piece of aluminium sheet 4mm short of the required dimension — a measuring error I only spotted after the cut was made. My first instinct was to see if I could make the component work anyway, but I recognised that decision wasn't mine to make, especially with material that belonged to the school. I told my teacher immediately, showed him the piece and the spec, and explained exactly what had happened. He confirmed the piece couldn't be used and we ordered a replacement. He also took five minutes to show me a technique for double-checking measurements before cutting that I hadn't been using — I've used it on every cut since. Reporting it felt uncomfortable in the moment, but the consequence of not reporting it — a defective component being used in a load-bearing context — would have been much worse.",
    commentary: "The elite answer shows the candidate almost tried to hide it, recognised that was wrong, reported it, and received additional training as a direct result. The reasoning in the final line — that concealment has downstream consequences — is exactly the safety culture thinking an engineering employer is looking for."
  },

  // ── HEALTH & CARE ────────────────────────────────────────────────────────
  {
    category: "Health & Care",
    q: "How do you show compassion in your everyday life?",
    why: "Authenticity matters more than the 'right' answer. Give a real example rather than describing a quality.",
    weak: "I'm a naturally caring person and I always try to help people when they need it. I think it's important to be kind.",
    good: "I volunteer at a care home every fortnight, spending time with residents who don't get many visitors. I try to actually listen to what they want to talk about rather than leading the conversation.",
    elite: "At the care home where I volunteer, I noticed one resident — a retired teacher in her eighties — rarely joined group activities and ate alone. I started sitting with her during my visits and discovered she found group settings overwhelming since a fall had affected her hearing and she couldn't follow conversations easily. I started visiting her room instead, and we began working through a puzzle book she had. Over about six weeks she started joining one group session per fortnight — a small group, not the full room. The activities coordinator told me she hadn't participated in months before that. I didn't plan for it to go that way — I just paid attention to what she actually needed rather than what the programme offered.",
    commentary: "The elite answer shows compassion through sustained attention and observation rather than a single act. The candidate noticed something, adapted, and achieved a measurable change in the resident's engagement. Crucially, they don't present it as a heroic intervention — they say they just paid attention. That modesty is itself a form of compassion."
  },
  {
    category: "Health & Care",
    q: "Describe a time when you had to listen to and reassure someone who was upset.",
    why: "Active listening and emotional intelligence. Show you can hold space for someone without trying to fix everything immediately.",
    weak: "A friend was upset once and I talked to them and tried to make them feel better. I think they appreciated it.",
    good: "A classmate was very distressed before an important exam. I sat with her, let her talk about what she was worried about, and tried not to jump straight into problem-solving. Just having someone listen seemed to help her calm down.",
    elite: "Before a major presentation at school, a classmate came to me in real distress — she'd lost her notes and was convinced she was going to fail. I could see she wasn't in a state to think practically, so rather than immediately trying to solve the problem I sat down with her, made sure she wasn't going to be overheard, and just let her say what she was feeling for a few minutes. When she started to calm down, I asked one simple question: what part of the presentation could she still do right now, from memory? That redirected her focus. We spent fifteen minutes rebuilding her key points together. She went in and presented. She passed. Afterwards she said the thing that had helped most was that I hadn't immediately tried to fix it — I'd let her feel it first.",
    commentary: "The elite answer shows a sophisticated understanding of emotional support: creating privacy, allowing expression before problem-solving, and asking a single reorienting question rather than overwhelming with solutions. The feedback at the end ('let her feel it first') validates the approach and shows the candidate reflects on what works."
  },
  {
    category: "Health & Care",
    q: "How would you handle a situation where a colleague wasn't following care procedures?",
    why: "Safety and accountability. The right answer prioritises the person in care first, then professional process.",
    weak: "I'd probably tell my manager and let them deal with it. It's not really my place to say something to a colleague.",
    good: "If it was putting someone at risk I'd say something directly. If it wasn't an immediate risk I'd still raise it — either with the colleague first, or with a supervisor if I wasn't comfortable doing that.",
    elite: "It would depend on the urgency. If someone was at immediate risk — for example, a colleague was about to move a resident without using the correct equipment — I'd intervene directly and calmly in the moment, even if that felt uncomfortable. If it was a pattern of shortcuts rather than an immediate danger, I'd speak to the colleague privately first and give them the opportunity to explain or correct it themselves. If it continued, or if I wasn't confident raising it directly, I'd escalate to a supervisor. I'd document what I'd observed and when. I wouldn't ignore it in any scenario — not because I want to create problems for the colleague, but because the person in care doesn't get the option of having procedures followed or not. That decision is already made by the standards we're all supposed to uphold.",
    commentary: "The elite answer is nuanced: immediate risk triggers immediate intervention, pattern triggers private conversation first, and escalation is a last resort rather than a first instinct. The reasoning at the end — that the person in care has no option — shows the candidate has internalised the purpose of care standards, not just the rules."
  },

  // ── DIGITAL / IT ─────────────────────────────────────────────────────────
  {
    category: "Digital / IT",
    q: "How would you explain a technical issue to someone with no tech background?",
    why: "Communication is as important as technical knowledge in IT roles. Show you can translate, not just explain.",
    weak: "I'd use simple language and avoid jargon. I'd go slowly and check they understood.",
    good: "I'd try to find an everyday comparison they could relate to. For example, if I was explaining why a computer is running slowly, I might compare it to a desk that's covered in papers — the more things open, the harder it is to find what you need.",
    elite: "I'd start by asking what they already use and know, so I can frame everything in terms they're already familiar with. Then I'd describe the issue in terms of what's happening from their perspective, before explaining the cause — because people usually need to understand the problem before they can hear the solution. I'd use an analogy if the technical concept is abstract: if I was explaining a network issue, I might describe data as traffic and the router as a junction that's blocked. I'd avoid passive voice — 'the system is experiencing errors' means nothing; 'your computer is trying to send information but the connection keeps dropping' is something you can picture. And I'd confirm understanding with a specific question — 'so if this happens again, what would you do?' — rather than asking if they understood, because people say yes even when they don't.",
    commentary: "The elite answer is itself a demonstration of the skill being described — it's clear, structured, uses analogy, and shows awareness of how people receive information. The distinction between 'do you understand?' and asking a specific confirmatory question is a technique the candidate has clearly thought about and used."
  },
  {
    category: "Digital / IT",
    q: "Tell me about a time you learned a new software or concept on your own.",
    why: "Self-directed learning is crucial in fast-moving tech environments. Show curiosity and method.",
    weak: "I taught myself how to use Photoshop from YouTube videos. It took a while but I got there.",
    good: "I needed to learn basic Python for a school project that was beyond what we'd been taught. I worked through an online tutorial called CS50 for about four weeks, built a small project to test myself, and ended up completing the school assignment as well as the extra work.",
    elite: "When I realised that the school IT curriculum wasn't going to cover anything beyond spreadsheets before I applied for IT apprenticeships, I decided to teach myself Python. I used a structured free course (CS50P from Harvard via edX), committed to one module per week, and kept a learning log where I wrote one paragraph after each session about what I'd understood and what I was still unsure about. When I got stuck, I used the course forums rather than just Googling answers, because working through the reasoning with others embedded the understanding better. After eight weeks I built a small project — a script that pulled bus timetable data from an API and formatted it for SMS — and put it on GitHub. Two interviewers have asked about it since. Self-teaching a technical skill requires you to manufacture your own feedback loop since there's no teacher giving you a grade — the log and the project were how I created that.",
    commentary: "The elite answer shows method (structured course, learning log), active problem-solving strategy (forums over Googling), a tangible output (GitHub project), and real-world validation (interviewers noticed). The final observation about manufacturing feedback is exactly the kind of metacognitive awareness a technical employer values."
  },
  {
    category: "Digital / IT",
    q: "What does good data security mean to you?",
    why: "Shows awareness without needing to be a security expert. Demonstrate you understand why it matters, not just what the rules are.",
    weak: "It means keeping data safe and not sharing passwords. It's important to protect personal information.",
    good: "Good data security means making sure the right people can access the right information and the wrong people can't. That includes things like strong passwords, not leaving screens unlocked, and being careful about what you share and where.",
    elite: "Good data security means treating data as belonging to the person it's about — not to the organisation that holds it. In practice that means only accessing what you need for the task at hand, not storing sensitive information longer than necessary, using appropriate access controls, and being alert to social engineering — which is usually the weakest point in any system, because it targets people rather than software. It also means understanding that most breaches don't come from sophisticated attacks; they come from small lapses — an email sent to the wrong address, a laptop left on a train, a password reused across accounts. In a council or public sector context, the stakes are higher because the data often relates to vulnerable people — housing situations, care needs, financial circumstances. Getting it wrong isn't just a procedural failure; it can have real consequences for real people.",
    commentary: "The elite answer moves from rules to principles (data belongs to the person it describes), identifies the real vulnerability (people, not systems), and grounds it in the specific context of public sector work. This is the kind of data awareness that a GDPR-conscious employer wants to hear — and it doesn't require technical expertise to express."
  },
];


const STAR_EXAMPLES = [
  {
    question: "Tell me about a time you provided excellent customer service.",
    weak: { answer: "I helped customers in my part-time job and they seemed happy.", commentary: "Vague, no specific situation, no action, no measurable result. The interviewer learns nothing about what you actually did." },
    good: { answer: "In my Saturday job at a café, I had a regular customer who was upset because her usual meal wasn't available. I apologised and suggested a new special I thought she'd like, and made her a free drink. She left smiling and said she appreciated my effort.", commentary: "Has a real situation and a result, but lacks specific personal actions and impact detail." },
    elite: { answer: "At my local café where I work weekends, a regular customer who uses a wheelchair came in and couldn't reach her usual table due to a crowded layout. I quickly rearranged a nearby area to accommodate her and engaged her in conversation while I did it. I then brought her favourite coffee and meal personally rather than making her wait at the counter. She thanked me specifically for going the extra mile and my manager later told me she had called ahead to praise my service by name.", commentary: "Uses 'I' throughout, gives specific context (wheelchair, rearranging table), shows initiative and empathy, ends with a concrete observable outcome. This is the standard to aim for." },
  },
  {
    question: "Describe a time you dealt with a difficult situation.",
    weak: { answer: "I once had a really difficult customer who kept complaining. I handled it and they calmed down eventually.", commentary: "No situation, no specific action, no result. 'Eventually' suggests it wasn't fully resolved." },
    good: { answer: "At my volunteering role, a family came in very distressed because they'd been turned away from another service. I listened to their situation, explained what we could offer and helped them register. They left with what they needed.", commentary: "Clear situation and result, but the actions could be more specific and the outcome more quantified." },
    elite: { answer: "At the community food bank where I volunteer, a mother arrived in tears having been told by another charity that her family didn't qualify for their service. She had three children with her and very little food at home. My role was to register new families and assess eligibility. I sat with her privately, listened without interruption, explained our criteria calmly, and confirmed she qualified immediately. I processed her registration, assembled a full weekly parcel myself rather than leaving it to the general queue, and gave her the contact number for a local housing support service she wasn't aware of. She came back the following week and specifically asked to thank me by name.", commentary: "Specific setting, specific actions, specific outcome. The detail about 'privately', 'without interruption' and the housing referral shows professionalism beyond the basic task." },
  },
  {
    question: "Give an example of when you showed initiative.",
    weak: { answer: "I'm quite a self-motivated person and I often take the lead in group situations without being asked.", commentary: "A claim without evidence. Every candidate says they take initiative — none of this is memorable or believable without a specific example." },
    good: { answer: "At the community centre where I volunteer, I noticed the paper sign-in sheets kept getting lost. I suggested moving to a digital spreadsheet instead. My supervisor agreed and we've been using it for three months.", commentary: "Has a real action and a result. Could be stronger with more detail on impact — how much time saved, how many records now accurate?" },
    elite: { answer: "At the community centre where I volunteer, attendance records for our youth programme were kept on paper sheets that frequently went missing — meaning we had no reliable data on participation. Nobody had raised it formally because it had always been done that way. I raised it with my supervisor and proposed a Google Form that participants could complete on arrival using a tablet at the door. I designed the form, ran two test sessions, and trained two other volunteers on how to manage it. We've had complete, accurate attendance records for four months and my supervisor referenced the improvement in the centre's quarterly report.", commentary: "Spotted a problem nobody had formally raised, proposed and built a solution, trained others, and generated external recognition. Every element of this is initiative — not just claiming the quality." },
  },
  {
    question: "Tell me about a time you worked under pressure.",
    weak: { answer: "I work well under pressure. I stay calm and just focus on what needs to be done. I don't really let stress affect me.", commentary: "A claim, not an example. 'I don't really let stress affect me' is either untrue or unexamined — neither reads well." },
    good: { answer: "Before my Higher exams I had four papers in five days. I made a revision timetable and stuck to it even when I felt stressed. I passed all four exams.", commentary: "Real situation, real result, clear method. Could go further on what specifically made the timetable effective and what it felt like to maintain it." },
    elite: { answer: "In the week of my Higher exams, my gran was taken into hospital and I had four papers in five days. I made a deliberate decision: I would get through the exams and give myself permission to deal with everything else afterwards. I told my mum I needed to protect my revision time and she agreed. I kept to my planned schedule even when I felt distracted — because I knew that structure was the only thing keeping me functional. I passed all four exams. What I learned is that pressure is manageable if you make clear decisions about what you're prioritising and communicate them, rather than trying to hold everything at once.", commentary: "Honest about the difficulty, shows clear decision-making under real pressure, maintained structure deliberately, and draws a transferable lesson. The authenticity is what makes it convincing — it doesn't claim heroism, it shows how the candidate actually functioned." },
  },
  {
    question: "Describe a time you made a mistake and what you learned from it.",
    weak: { answer: "I try not to make mistakes. I'm quite careful so it doesn't happen often. But when it does I just try to do better next time.", commentary: "Claiming you rarely make mistakes reads as either dishonest or lacking self-awareness. 'Do better next time' is not a lesson — it's a deflection." },
    good: { answer: "In S5 I submitted the wrong version of an assignment. I realised the next day and told my teacher straight away rather than waiting to see if anyone noticed. I was allowed to resubmit and I passed. I've double-checked everything before submitting since then.", commentary: "Honest, clear action (told teacher), specific lesson. Good foundation — the elite version shows more depth of reflection." },
    elite: { answer: "During a practical project in S5, I cut a piece of aluminium 4mm short of the required dimension and only realised after the cut was made. My first instinct was to see if I could make the component work anyway — but I recognised that decision wasn't mine to make, especially with materials that belonged to the school. I told my teacher immediately, showed him the piece and the specification, and explained exactly what had happened. He confirmed the piece couldn't be used and we ordered a replacement. He also showed me a double-check technique I hadn't been using — I've applied it to every cut since. Reporting it felt uncomfortable in the moment. But the downstream consequence of not reporting it — a defective component used in a load-bearing context — would have been far worse.", commentary: "Shows the candidate almost concealed it, recognised that was wrong, and reported proactively. Received additional coaching as a result. The final reasoning — about downstream consequences — shows safety culture thinking that an engineering or technical employer immediately recognises." },
  },
];

const ROADMAP_WEEKS = [
  { week: "Weeks 1–2", phase: "Research & Planning", focus: "Learn about the organisation — services, values, recent news. Re-read the apprenticeship advert and align your skills to the person spec. Identify your strongest examples.", tasks: ["Research target employer thoroughly", "Re-read the apprenticeship advert", "List 10 experiences that could become STAR answers", "Draft your Career Statement"] },
  { week: "Weeks 3–4", phase: "Research & Planning", focus: "If you have a disability or condition, contact the recruiter early to request reasonable adjustments. Continue gathering examples from school, clubs and volunteering.", tasks: ["Request reasonable adjustments if needed", "Map your experiences to the competency framework", "Identify gaps and how to address them", "Start drafting STAR answers"] },
  { week: "Weeks 5–6", phase: "Skill Building & Practice", focus: "Draft answers to common questions using the STAR template. Practise aloud — to yourself, a friend, or a mirror. Record yourself to spot filler words and posture.", tasks: ["Draft STAR answers for 8+ questions", "Practise aloud daily for 15 minutes", "Record one mock answer and review it", "Work on professional vocabulary"] },
  { week: "Weeks 7–8", phase: "Skill Building & Practice", focus: "Conduct a full mock interview with a friend, family member or coach. Get specific feedback on clarity, examples and body language. Focus on previously weak areas.", tasks: ["Complete first full mock interview", "Get written feedback on each answer", "Work on eye contact and open body language", "Refine weakest answers"] },
  { week: "Weeks 9–10", phase: "Final Preparation", focus: "Finalise your questions to ask the interviewer. Double-check logistics — location, travel time, dress code. If online, test your tech. Review your Career Statement.", tasks: ["Prepare 3 strong questions to ask", "Plan your journey with a backup route", "Confirm interview format (in-person, video, panel)", "Final polish on Career Statement"] },
  { week: "Week 11", phase: "Final Preparation", focus: "Final review of all answers. Confirm you have documents, ID and certificates ready. Practise relaxation and confidence-building techniques.", tasks: ["Final review of all STAR answers", "Prepare documents folder", "Practise breathing or grounding technique", "Get good sleep this week"] },
  { week: "Week 12", phase: "Interview Week", focus: "Rest well the night before. Review your key examples. On the day — arrive early, smile, greet the panel with confidence. Your preparation is already done.", tasks: ["Night before: lay out clothes, pack bag, sleep well", "Morning of: eat, review your Career Statement", "Arrive 10–15 minutes early", "After: send a thank-you email within 24 hours"] },
];

const EDI_CONTENT = [
  { title: "The Equality Act 2010", content: "The Equality Act 2010 protects nine characteristics: age, disability, sex, race, religion or belief, sexual orientation, gender reassignment, marriage or civil partnership, and pregnancy or maternity. No employer can legally discriminate against you on the basis of any of these during a recruitment process." },
  { title: "Reasonable adjustments — your right", content: "If you have a disability, neurodivergent condition, or other need, you have the right to ask for reasonable adjustments at interview. This might include: receiving questions in advance, extra time for written tasks, an accessible venue, a rest break, use of assistive technology, or a support person. Requesting adjustments will not be held against you — Scottish Government policy explicitly reassures candidates that selection is solely on merit." },
  { title: "Guaranteed interview schemes", content: "Some public sector apprenticeships in Scotland offer a guaranteed interview for disabled candidates who meet the minimum criteria. Check the job advert or contact the recruiter to find out if this applies. Scottish Government jobs and many council apprenticeships participate in this scheme." },
  { title: "Cultural awareness in interviews", content: "As an apprentice you will encounter people of all backgrounds. If an interview question involves diversity, equality or inclusion, answer with empathy and reference relevant laws or values. Focus on treating everyone equally and being sensitive to individual needs — avoid generalisations." },
  { title: "Language and inclusion", content: "Use inclusive language in your answers. When discussing experiences, focus on your actions and values rather than assumptions about groups. For example: 'I would treat everyone equally and be sensitive to individual needs' is stronger than any answer that relies on stereotypes or generalisations." },
];

const COMMS_TEMPLATES = [
  {
    title: "Replying to an interview invitation",
    subject: "Interview – [Your Name] – [Position]",
    body: `Dear [Name / HR Team],

Thank you for the invitation to interview for the [Apprentice Position] at [Council / Company]. I am very pleased to hear from you.

I can confirm that I will attend the interview on [Date] at [Time] at [Location]. Please let me know if there is anything specific I should bring or prepare in advance.

Thank you again for this opportunity. I look forward to meeting you.

Kind regards,
[Your Name]
[Phone Number]
[Email Address]`,
    notes: "Keep it brief and professional. Confirm the key details. Show enthusiasm without overdoing it. Proofread before sending.",
  },
  {
    title: "Requesting a reasonable adjustment",
    subject: "Interview Adjustment Request – [Your Name] – [Position]",
    body: `Dear [Name / HR Team],

Thank you for inviting me to interview for the [Apprentice Position] on [Date].

I would like to request a reasonable adjustment to support my participation. I have [briefly describe condition or need — e.g. dyslexia / a hearing impairment / anxiety], and it would help me to [describe adjustment — e.g. receive the interview questions in advance / have extra time for any written task / access a ground floor venue].

I am happy to discuss this further if that would be helpful. I look forward to the interview and thank you for your support.

Kind regards,
[Your Name]`,
    notes: "You do not need to disclose your full medical history. Be specific about what you need. Employers are legally required to consider reasonable adjustments.",
  },
  {
    title: "Thank-you email after interview",
    subject: "Thank you – [Your Name] interview on [Date]",
    body: `Dear [Interviewer Name(s)],

I wanted to thank you for the opportunity to interview for the [Position] today. I enjoyed learning more about [team / role / organisation] and appreciated our discussion about [mention one specific topic from the interview].

I remain very enthusiastic about the possibility of joining [Organisation] and contributing to [something relevant you discussed]. Thank you again for your time and consideration.

I look forward to hearing from you.

Kind regards,
[Your Name]`,
    notes: "Send within 24 hours. Reference something specific from the interview — it shows you were engaged. Keep it under 150 words.",
  },
  {
    title: "Follow-up if you haven't heard back",
    subject: "Follow-up – [Your Name] – [Position] interview on [Date]",
    body: `Dear [Name / HR Team],

I hope you are well. I wanted to follow up regarding my interview for the [Position] on [Date].

I remain very interested in the role and would welcome any update on the timeline for a decision when it is convenient.

Thank you again for the opportunity.

Kind regards,
[Your Name]`,
    notes: "Only send this if the stated decision date has passed, or after two weeks with no contact. Keep it brief and polite — never chasing, always enquiring.",
  },
];

// ─── Helper components ────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ color: NAVY, fontSize: 20, fontWeight: 900, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
        <span>{icon}</span>{title}
      </h2>
      <div style={{ height: 3, width: 40, background: `linear-gradient(90deg, ${TEAL}, #0D8B7D)`, borderRadius: 2, marginBottom: 8 }} />
      {subtitle && <p style={{ color: "#666", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

function Callout({ text, type = "info" }) {
  const styles = {
    info:    { bg: "#F0F8FF", border: TEAL, text: "#2D5A8A" },
    warning: { bg: "#FFF8E7", border: AMBER, text: "#6B4A00" },
    tip:     { bg: "#F0FDF4", border: GREEN, text: "#14532D" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{ background: s.bg, borderLeft: `4px solid ${s.border}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
      <p style={{ color: s.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{text}</p>
    </div>
  );
}

function Checklist({ items, color = TEAL }) {
  const [checked, setChecked] = useState({});
  return (
    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 16 }}>
      {items.map((item, i) => (
        <div key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))}
          style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < items.length - 1 ? "1px solid #E2E8F0" : "none", cursor: "pointer" }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, border: `2px solid ${color}`, background: checked[i] ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
            {checked[i] && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
          </div>
          <span style={{ color: "#333", fontSize: 14, lineHeight: 1.55 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Module: Career Statement ─────────────────────────────────────────────────

function CareerStatementModule() {
  const [revealed, setRevealed] = useState(false);
  const examples = [
    {
      profile: "School leaver (16–18)",
      statement: "I'm a motivated school leaver with a strong interest in engineering and a practical approach to problem solving. I've developed accuracy and teamwork through my STEM coursework and school projects, and I'm now looking to build on that foundation in a structured apprenticeship environment where I can contribute from day one and develop into a skilled professional over time.",
      why: "Opens with identity and interest. Bridges education to workplace readiness. Ends with aspiration that benefits the employer — 'contribute from day one' signals attitude, not just ambition."
    },
    {
      profile: "Adult returner / career changer (19–29)",
      statement: "I have four years of experience in a fast-paced logistics environment where accuracy, safety compliance and working to tight deadlines were non-negotiable. I'm now making a deliberate move into engineering because I want to develop deeper technical skills and build a career in a field where the standards and outcomes are clear. I bring reliability, a strong work ethic and a track record of performing to standard under pressure — and I'm ready to start proving that in a new environment.",
      why: "Doesn't apologise for the career change — frames it as deliberate. Translates logistics into engineering-relevant language. Confidence without arrogance."
    },
    {
      profile: "Graduate apprentice (21–25)",
      statement: "I have a 2:1 in Mechanical Engineering from Strathclyde and practical experience in CAD, FEA analysis and materials testing. I'm pursuing a Graduate Apprenticeship because I want to build applied industry competence alongside a professional qualification — I want to work on real problems with real consequences, not just theoretical ones. I'm looking for an environment where high standards matter and where I can develop into someone who adds measurable value.",
      why: "Leads with credential but pivots quickly to what the employer gets. The phrase 'real problems with real consequences' signals readiness and maturity. Aspiration is employer-focused."
    },
  ];

  return (
    <div>
      <SectionHeader icon="🎯" title="Your Career Statement" subtitle="The most important 90 seconds of any interview. This is not your answer to 'tell me about yourself' — it is your prepared, rehearsed opening that frames every answer that follows." />

      <Callout type="warning" text="Most candidates reply to interview questions. Strong candidates respond to them. The difference is control — a Career Statement lets you set the frame before the first question is even asked." />

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>What a Career Statement is</p>
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>A Career Statement is a prepared, practised 60–90 second summary of who you are, what you bring, and what you want. It is not a rehearsed script — it is a framework you know so well that it comes out naturally.</p>
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, margin: 0 }}>It answers the unspoken question every interviewer has from the moment you walk in: <em>"Why should we invest in this person?"</em></p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>The four elements of a strong Career Statement</p>
        {[
          ["Who you are", "One sentence. Your current position, background or identity — relevant to the role."],
          ["What you bring", "Two to three sentences. Your strongest skills or experiences, evidenced briefly. Use professional language."],
          ["Why this role", "One sentence. What specifically draws you to this opportunity — not generic enthusiasm."],
          ["What you want to achieve", "One sentence. Your aspiration in a way that benefits the employer, not just yourself."],
        ].map(([title, desc], i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #F0F4FF" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 99, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: "0 0 3px" }}>{title}</p>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setRevealed(!revealed)}
          style={{ background: revealed ? NAVY : TEAL, border: "none", color: "#fff", borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 14, fontFamily: "inherit" }}>
          {revealed ? "Hide examples" : "See Career Statement examples by profile"}
        </button>
        {revealed && examples.map((ex, i) => (
          <div key={i} style={{ background: "#fff", border: `2px solid ${TEAL}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ background: TEAL, padding: "10px 16px" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>🎯 {ex.profile}</span>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ color: "#333", fontSize: 14, lineHeight: 1.75, margin: "0 0 12px", fontStyle: "italic", borderLeft: `3px solid ${TEAL}`, paddingLeft: 12 }}>"{ex.statement}"</p>
              <div style={{ background: "#F0F8FF", borderRadius: 8, padding: 12 }}>
                <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>💡 {ex.why}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 14, margin: "0 0 10px" }}>✍️ Draft your Career Statement</p>
        <p style={{ color: "#666", fontSize: 13, margin: "0 0 10px" }}>Write it, read it aloud, time it. Aim for 60–90 seconds. Refine until it sounds natural — not memorised.</p>
        <textarea placeholder="Draft your Career Statement here..." rows={6}
          style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: "#333", fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        <p style={{ color: "#999", fontSize: 12, marginTop: 8, marginBottom: 0 }}>💡 Paste it into the AI Coach tab for personalised feedback.</p>
      </div>
    </div>
  );
}

// ─── Module: Responding vs Replying ──────────────────────────────────────────

function RespondModule() {
  const comparisons = [
    {
      q: "Why do you want to work here?",
      reply: "I want to work here because it's a good company with good values and I think I'd fit in well.",
      response: "I researched this organisation before applying and I was specifically drawn to your focus on [X]. That matters to me because [personal reason]. I also want to be honest — I'm looking for a place where I can develop properly and contribute meaningfully, and from what I've seen of how you approach [Y], this looks like exactly that kind of environment.",
      lesson: "A reply answers the question. A response uses the question as an opening to deliver your Career Statement values and show sector knowledge."
    },
    {
      q: "What are your weaknesses?",
      reply: "I can sometimes be a perfectionist and work too hard.",
      response: "I've had to work on managing my instinct to want everything finished before asking for help. Early on in my volunteering role I was spending too long trying to resolve things independently rather than escalating when I should. I recognised it, spoke to my supervisor, and we agreed a clearer threshold for when to escalate. I've applied that since and it's made me more efficient and more reliable to the people around me.",
      lesson: "The cliché 'perfectionist' answer tells the interviewer nothing. A real weakness with real growth tells them you have self-awareness, can take feedback, and that you improve."
    },
    {
      q: "Tell me about yourself.",
      reply: "I'm 19 and I've just finished college. I did a course in business and I like working with people. I'm quite hardworking and I'm looking for a new opportunity.",
      response: "I'm a recent HNC Business graduate with two years of experience in a customer-facing retail environment where I was responsible for handling complaints, processing refunds and training new staff. I'm making a deliberate move into local government because I want to work somewhere the impact is more direct — where the person I help today is a resident in this community. I bring reliability, communication skills and a track record of working under pressure, and I'm looking for an environment where those qualities can develop into a long-term career.",
      lesson: "The response takes control of the narrative immediately. It frames the career move deliberately, evidences skills briefly, and ends with what you offer the employer — not what you want from them."
    },
  ];

  const [active, setActive] = useState(0);
  const [view, setView] = useState("response");

  return (
    <div>
      <SectionHeader icon="🗣️" title="Responding vs Replying" subtitle="Most candidates reply to interview questions. Responding means using every question as an opportunity to frame your skills, experience and aspirations — on your terms." />

      <Callout type="warning" text="An interviewer asks a question to open a door. A reply walks through the door. A response decides where the conversation goes next. The candidate who responds — not replies — controls the narrative." />

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, margin: "0 0 12px" }}>The three principles of responding</p>
        {[
          ["Acknowledge the question", "Show you understood what was asked. Don't pivot without acknowledging it first — that reads as evasive."],
          ["Use it to deliver evidence", "Every question is an opportunity to surface a skill, experience or value that supports your application. Know your evidence bank before you walk in."],
          ["End with something that serves the employer", "The last sentence of your answer should always point toward what you offer, not what you want. Shift from 'me' to 'what I bring to you'."],
        ].map(([title, desc], i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 2 ? "1px solid #F0F4FF" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 99, background: NAVY, color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: "0 0 3px" }}>{title}</p>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Question selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {comparisons.map((c, i) => (
          <button key={i} onClick={() => { setActive(i); setView("response"); }}
            style={{ background: active === i ? NAVY : "#F0F4FF", color: active === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: active === i ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <p style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 6px" }}>Interview question</p>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 16, margin: 0 }}>"{comparisons[active].q}"</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setView("reply")}
          style={{ flex: 1, padding: "10px", background: view === "reply" ? RED : "#fff", border: `2px solid ${view === "reply" ? RED : "#E2E8F0"}`, color: view === "reply" ? "#fff" : "#666", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          ✗ Reply
        </button>
        <button onClick={() => setView("response")}
          style={{ flex: 1, padding: "10px", background: view === "response" ? GREEN : "#fff", border: `2px solid ${view === "response" ? GREEN : "#E2E8F0"}`, color: view === "response" ? "#fff" : "#666", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          ✓ Response
        </button>
      </div>

      {view === "reply" && (
        <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <p style={{ color: RED, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✗ Reply — passive, no control</p>
          <p style={{ color: "#7F1D1D", fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{comparisons[active].reply}"</p>
        </div>
      )}

      {view === "response" && (
        <div style={{ background: "#F0FDF4", border: "1px solid #10B981", borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <p style={{ color: GREEN, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✓ Response — deliberate, evidence-led</p>
          <p style={{ color: "#14532D", fontSize: 14, lineHeight: 1.7, margin: 0 }}>"{comparisons[active].response}"</p>
        </div>
      )}

      <div style={{ background: "#F0F8FF", borderLeft: `4px solid ${TEAL}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Why this matters</p>
        <p style={{ color: "#2D5A8A", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{comparisons[active].lesson}</p>
      </div>

      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 14, margin: "0 0 10px" }}>✍️ Practise responding</p>
        <p style={{ color: "#666", fontSize: 13, margin: "0 0 10px" }}>Take any question above. Write a reply first. Then rewrite it as a response — using it to surface evidence and end with what you offer.</p>
        <textarea placeholder="Write your response here..." rows={5}
          style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 12, color: "#333", fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

// ─── Module: STAR ─────────────────────────────────────────────────────────────

function StarModule() {
  const [activeEx, setActiveEx] = useState(0);
  const [tier, setTier] = useState("elite");
  const ex = STAR_EXAMPLES[activeEx];
  const answer = ex[tier];

  return (
    <div>
      <SectionHeader icon="⭐" title="The STAR Method" subtitle="Situation · Task · Action · Result. The single most important interview framework — used by every major employer in Scotland." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { letter: "S", word: "Situation", desc: "Set the scene briefly. Where, when, what was happening." },
          { letter: "T", word: "Task", desc: "What was your specific responsibility in that situation." },
          { letter: "A", word: "Action", desc: "What YOU did — use 'I', not 'we'. Be specific." },
          { letter: "R", word: "Result", desc: "What happened as a result. Quantify if you can." },
        ].map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, marginBottom: 8 }}>{item.letter}</div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{item.word}</p>
            <p style={{ color: "#666", fontSize: 12, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <Callout type="info" text="Use 'I', not 'we'. Interviewers are assessing you — not your group, team or class. Even in team situations, describe specifically what YOU did and what difference YOUR actions made." />

      <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Model answers — three tiers</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {STAR_EXAMPLES.map((e, i) => (
          <button key={i} onClick={() => { setActiveEx(i); setTier("elite"); }}
            style={{ background: activeEx === i ? NAVY : "#F0F4FF", color: activeEx === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: activeEx === i ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            {["Customer service", "Difficult situation", "Initiative", "Under pressure", "Mistake & learning"][i]}
          </button>
        ))}
      </div>

      <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 14, marginBottom: 12, border: "1px solid #E2E8F0" }}>
        <p style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 6px" }}>Question</p>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, margin: 0 }}>"{ex.question}"</p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["weak", "good", "elite"].map(t => (
          <button key={t} onClick={() => setTier(t)}
            style={{ flex: 1, padding: "9px", background: tier === t ? (t === "weak" ? RED : t === "good" ? AMBER : GREEN) : "#fff", border: `2px solid ${tier === t ? (t === "weak" ? RED : t === "good" ? AMBER : GREEN) : "#E2E8F0"}`, color: tier === t ? "#fff" : "#666", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            {t === "weak" ? "✗ Weak" : t === "good" ? "~ Good" : "★ Elite"}
          </button>
        ))}
      </div>

      <div style={{ background: tier === "weak" ? "#FEF2F2" : tier === "good" ? "#FFF8E7" : "#F0FDF4", border: `1px solid ${tier === "weak" ? "#EF4444" : tier === "good" ? AMBER : "#10B981"}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <p style={{ color: tier === "weak" ? RED : tier === "good" ? "#92400E" : GREEN, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>
          {tier === "weak" ? "✗ Weak answer" : tier === "good" ? "~ Good answer" : "★ Elite answer"}
        </p>
        <p style={{ color: tier === "weak" ? "#7F1D1D" : tier === "good" ? "#78350F" : "#14532D", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{answer.answer}</p>
      </div>

      <div style={{ background: "#F0F8FF", borderLeft: `4px solid ${TEAL}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Coach commentary</p>
        <p style={{ color: "#2D5A8A", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{answer.commentary}</p>
      </div>

      <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 14, margin: "0 0 10px" }}>✍️ Build your own STAR answer</p>
        {["Situation — set the scene", "Task — your specific responsibility", "Action — what YOU did (use 'I')", "Result — what happened"].map((label, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <p style={{ color: NAVY, fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>{label}</p>
            <textarea rows={2} placeholder={`Write your ${label.split("—")[0].trim().toLowerCase()} here...`}
              style={{ width: "100%", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 10, color: "#333", fontSize: 13, fontFamily: "inherit", resize: "none", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module: Questions ────────────────────────────────────────────────────────

function QuestionsModule() {
  const categories = [...new Set(INTERVIEW_QUESTIONS.map(q => q.category))];
  const [activeCat, setActiveCat] = useState("General");
  const [revealed, setRevealed] = useState({});
  const [view, setView] = useState({});
  const filtered = INTERVIEW_QUESTIONS.filter(q => q.category === activeCat);

  return (
    <div>
      <SectionHeader icon="❓" title="Interview Questions" subtitle="Every question with three-tier model answers — weak, good and elite — plus coach commentary on what the interviewer is really looking for." />

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => { setActiveCat(cat); setRevealed({}); setView({}); }}
            style={{ background: activeCat === cat ? TEAL : "#F0F4FF", color: activeCat === cat ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: activeCat === cat ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.map((q, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, lineHeight: 1.55, margin: "0 0 6px" }}>"{q.q}"</p>
          <div style={{ background: "#F0F8FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
            <p style={{ color: TEAL, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 3px" }}>What they're really asking</p>
            <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{q.why}</p>
          </div>

          {!revealed[i] ? (
            <button onClick={() => setRevealed(p => ({ ...p, [i]: true }))}
              style={{ background: NAVY, border: "none", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Show model answers
            </button>
          ) : (
            <div>
              {/* Toggle buttons */}
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {["weak", "good", "elite"].map(tier => {
                  const colours = { weak: RED, good: "#D97706", elite: GREEN };
                  const labels = { weak: "✗ Weak", good: "◎ Good", elite: "✓ Elite" };
                  const isActive = (view[i] || "elite") === tier;
                  return (
                    <button key={tier} onClick={() => setView(p => ({ ...p, [i]: tier }))}
                      style={{ flex: 1, padding: "8px 6px", background: isActive ? colours[tier] : "#fff", border: `2px solid ${colours[tier]}`, color: isActive ? "#fff" : colours[tier], borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                      {labels[tier]}
                    </button>
                  );
                })}
              </div>

              {/* Answer display */}
              {(() => {
                const tier = view[i] || "elite";
                const colours = { weak: RED, good: "#D97706", elite: GREEN };
                const bgColours = { weak: "#FEF2F2", good: "#FFFBEB", elite: "#F0FDF4" };
                const borderColours = { weak: "#FECACA", good: "#FCD34D", elite: "#BBF7D0" };
                return (
                  <div style={{ background: bgColours[tier], border: `1px solid ${borderColours[tier]}`, borderRadius: 10, padding: 14 }}>
                    <p style={{ color: colours[tier], fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px" }}>
                      {tier === "weak" ? "✗ Weak answer" : tier === "good" ? "◎ Good answer" : "✓ Elite answer"}
                    </p>
                    <p style={{ color: "#1A1A2E", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>"{q[tier]}"</p>
                    <div style={{ borderTop: `1px solid ${borderColours[tier]}`, paddingTop: 10 }}>
                      <p style={{ color: "#555", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Coach commentary</p>
                      <p style={{ color: "#444", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{q.commentary}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Module: Interview Formats ────────────────────────────────────────────────

function FormatsModule() {
  const formats = [
    {
      title: "Competency-based interview",
      icon: "🧑‍💼",
      who: "Most employers — councils, engineering firms, NHS, retail",
      what: "Structured questions asking for real examples. Always uses 'Tell me about a time when…' or 'Give an example of…' format. Scored against a competency framework.",
      tips: ["Prepare 8–10 STAR examples before you go in", "Each example should cover a different competency", "If you blank, ask: 'Could I take a moment to think?' — that's fine", "Never make up examples — panels are trained to spot inconsistencies"],
    },
    {
      title: "Panel interview",
      icon: "👥",
      who: "Public sector, large employers, assessment centres",
      what: "Multiple interviewers in the room — typically 2–3. Each interviewer usually leads on a specific competency area. Can feel intimidating but the structure is actually more predictable.",
      tips: ["Direct your answer to the person who asked, but include eye contact with others", "Address each panellist by name if you know them", "Don't be thrown by note-taking — it means they're engaged", "If unclear who to address, start with the questioner and open out"],
    },
    {
      title: "Video interview (pre-recorded)",
      icon: "📹",
      who: "Large employers, first-stage screening — BAE Systems, BT, NHS digital roles",
      what: "You record answers to set questions with no live interviewer. You may have 1–2 attempts and a time limit per question. Common for high-volume recruitment.",
      tips: ["Treat it exactly like a live interview — dress professionally", "Set up in a quiet, well-lit space with a neutral background", "Look at the CAMERA, not your own face on screen", "Practice recording yourself before the real thing — most people are surprised by their own mannerisms"],
    },
    {
      title: "Assessment centre",
      icon: "🏢",
      who: "BAE Systems, Babcock, Leonardo, ScottishPower, local councils",
      what: "A half or full day with multiple exercises — group task, individual presentation, written exercise, interview, practical test. You are observed throughout — including during breaks.",
      tips: ["You are being assessed from the moment you arrive to the moment you leave", "In group tasks: listen as visibly as you speak", "In presentations: keep within the time limit — running over is penalised", "At lunch or in informal moments: stay professional — this is still the assessment"],
    },
    {
      title: "Telephone interview",
      icon: "📞",
      who: "First-stage screening, remote or dispersed employers",
      what: "Usually 20–30 minutes, structured questions, no visual contact. Often used to screen candidates before inviting them to a face-to-face stage.",
      tips: ["Find a quiet place with good signal before the call", "Have your Career Statement and STAR notes in front of you — you can refer to them", "Smile while you speak — it genuinely changes the tone of your voice", "Speak slightly more slowly than normal — pauses feel longer on phone"],
    },
    {
      title: "Informal chat or 'coffee interview'",
      icon: "☕",
      who: "Smaller employers, some apprenticeship providers",
      what: "Presented as casual but still a structured assessment. The informal setting is designed to see how you behave when you're not 'performing'. Everything you say is noted.",
      tips: ["There is no such thing as an off-the-record comment in an interview setting", "Stay professional even when the interviewer is relaxed", "Use it as an opportunity to ask genuine, researched questions", "The informality is not permission to be casual — it is a test of whether you are professional naturally"],
    },
  ];

  const [active, setActive] = useState(0);
  const f = formats[active];

  return (
    <div>
      <SectionHeader icon="🏢" title="Interview Formats" subtitle="Know what format you're walking into before you arrive. Each format tests the same competencies — but the environment is different." />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {formats.map((fmt, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ background: active === i ? TEAL + "12" : "#fff", border: active === i ? `1px solid ${TEAL}` : "1px solid #E2E8F0", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}>
            <span style={{ fontSize: 20 }}>{fmt.icon}</span>
            <span style={{ color: active === i ? TEAL : NAVY, fontWeight: 700, fontSize: 14 }}>{fmt.title}</span>
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 28 }}>{f.icon}</span>
          <div>
            <p style={{ color: NAVY, fontWeight: 800, fontSize: 16, margin: 0 }}>{f.title}</p>
            <p style={{ color: TEAL, fontSize: 12, margin: "2px 0 0", fontWeight: 600 }}>Used by: {f.who}</p>
          </div>
        </div>
        <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{f.what}</p>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>How to approach it</p>
        {f.tips.map((tip, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, paddingLeft: 4 }}>
            <span style={{ color: TEAL, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>→</span>
            <p style={{ color: "#444", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module: Roadmap ──────────────────────────────────────────────────────────

function RoadmapModule() {
  const [active, setActive] = useState(0);
  const phases = ["Research & Planning", "Skill Building & Practice", "Final Preparation", "Interview Week"];
  const phaseColors = { "Research & Planning": "#3B82F6", "Skill Building & Practice": TEAL, "Final Preparation": AMBER, "Interview Week": GREEN };

  return (
    <div>
      <SectionHeader icon="🗓️" title="12-Week Preparation Roadmap" subtitle="Preparation done over time beats last-minute cramming every time. This roadmap takes you from first research to interview day." />

      <Callout type="tip" text="Candidates who prepare over 8–12 weeks consistently outperform those who prepare over 1–2 weeks — even when the 1–2 week candidates are more naturally confident or more qualified." />

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {phases.map(phase => (
          <button key={phase} onClick={() => setActive(phases.indexOf(phase))}
            style={{ background: active === phases.indexOf(phase) ? phaseColors[phase] : "#F0F4FF", color: active === phases.indexOf(phase) ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            {phase}
          </button>
        ))}
      </div>

      {ROADMAP_WEEKS.filter(w => w.phase === phases[active]).map((week, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 18, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <span style={{ background: phaseColors[phases[active]] + "20", color: phaseColors[phases[active]], fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, textTransform: "uppercase", letterSpacing: 0.5 }}>{week.week}</span>
              <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: "8px 0 0" }}>{week.phase}</p>
            </div>
          </div>
          <p style={{ color: "#555", fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>{week.focus}</p>
          <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 12 }}>
            <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px" }}>This week's tasks</p>
            {week.tasks.map((task, j) => (
              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: TEAL, fontWeight: 800, flexShrink: 0 }}>→</span>
                <span style={{ color: "#444", fontSize: 13, lineHeight: 1.5 }}>{task}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Interview day do's and don'ts</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ background: "#F0FDF4", border: "1px solid #10B981", borderRadius: 12, padding: 14 }}>
          <p style={{ color: GREEN, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✓ Do</p>
          {["Arrive 10–15 minutes early", "Dress neatly and appropriately", "Make eye contact and smile", "Use STAR with clear 'I' statements", "Listen to the full question before answering", "Ask questions at the end"].map((item, i) => (
            <p key={i} style={{ color: "#14532D", fontSize: 13, lineHeight: 1.5, margin: "0 0 4px" }}>• {item}</p>
          ))}
        </div>
        <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 12, padding: 14 }}>
          <p style={{ color: RED, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✗ Don't</p>
          {["Arrive late or underprepared", "Use slang or casual language", "Recite answers like a script", "Lie or exaggerate experience", "Badmouth previous employers", "Leave without asking any questions"].map((item, i) => (
            <p key={i} style={{ color: "#7F1D1D", fontSize: 13, lineHeight: 1.5, margin: "0 0 4px" }}>• {item}</p>
          ))}
        </div>
      </div>

      <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Day-before checklist</p>
      <Checklist items={["Outfit prepared and laid out", "Bag packed — documents, ID, certificates", "Journey planned with a backup route", "Phone charged", "Interview time and location confirmed", "Career Statement reviewed", "Key STAR examples reviewed", "Alarm set — earlier than needed", "Early night planned"]} />
    </div>
  );
}

// ─── Module: EDI ──────────────────────────────────────────────────────────────

function EDIModule() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <SectionHeader icon="🤝" title="Equality, Diversity & Inclusion" subtitle="Your rights as a candidate in Scotland. Understanding EDI is not just about compliance — it is a core competency employers test for." />

      <Callout type="info" text="Scottish apprenticeship programmes and public sector employers are required by law to ensure fair and inclusive recruitment. Knowing your rights — and being able to demonstrate inclusive values — strengthens your application." />

      {EDI_CONTENT.map((item, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, overflow: "hidden", border: "1px solid #E2E8F0" }}>
          <button onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "15px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: NAVY }}>
            <span>{item.title}</span>
            <span style={{ color: TEAL, fontSize: 20, fontWeight: 400 }}>{expanded === i ? "−" : "+"}</span>
          </button>
          {expanded === i && (
            <div style={{ padding: "0 18px 18px", color: "#555", fontSize: 14, lineHeight: 1.7, borderTop: `1px solid ${TEAL}20` }}>
              {item.content}
            </div>
          )}
        </div>
      ))}

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, marginTop: 4 }}>
        <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: "0 0 12px" }}>EDI interview questions — how to answer them</p>
        {[
          ["Tell me about a time you worked with someone from a different background.", "Focus on what you learned, how you adapted your communication, and what the outcome was. Don't make assumptions about the other person — focus on your actions and values."],
          ["How would you handle a colleague who said something discriminatory?", "Show you would address it — either directly if safe to do so, or by reporting it through the correct channel. Reference policy and procedure. Don't say you'd ignore it."],
          ["What does equality mean to you in the workplace?", "Go beyond 'treating everyone the same'. Talk about fairness, removing barriers, respecting differences, and ensuring everyone can participate fully. Reference the Equality Act if you can."],
        ].map(([q, a], i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 16 : 0, paddingBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? "1px solid #F0F4FF" : "none" }}>
            <p style={{ color: NAVY, fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>"{q}"</p>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module: Communications ───────────────────────────────────────────────────

function CommsModule() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const t = COMMS_TEMPLATES[active];

  const copyText = () => {
    navigator.clipboard.writeText(`Subject: ${t.subject}\n\n${t.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <SectionHeader icon="✉️" title="Professional Communications" subtitle="What you write before and after the interview matters as much as what you say during it. These templates show the standard expected." />

      <Callout type="tip" text="A well-written reply to an interview invitation, a request for adjustments, or a thank-you email after the interview — all of these tell the employer something about your professionalism before you've answered a single question." />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {COMMS_TEMPLATES.map((tmpl, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ background: active === i ? TEAL + "12" : "#fff", border: active === i ? `1px solid ${TEAL}` : "1px solid #E2E8F0", borderRadius: 12, padding: "12px 16px", textAlign: "left", cursor: "pointer" }}>
            <p style={{ color: active === i ? TEAL : NAVY, fontWeight: 700, fontSize: 14, margin: 0 }}>{tmpl.title}</p>
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ background: NAVY, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>{t.title}</p>
          <button onClick={copyText}
            style={{ background: copied ? GREEN : TEAL, border: "none", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ color: "#888", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Subject line</p>
          <p style={{ color: NAVY, fontSize: 14, fontWeight: 600, margin: "0 0 16px", background: "#F8FAFC", padding: "8px 12px", borderRadius: 8 }}>{t.subject}</p>
          <p style={{ color: "#888", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Email body</p>
          <pre style={{ color: "#333", fontSize: 13, lineHeight: 1.75, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: "0 0 16px", background: "#F8FAFC", padding: 12, borderRadius: 8 }}>{t.body}</pre>
          <div style={{ background: "#F0F8FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 8, padding: 12 }}>
            <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>Notes</p>
            <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{t.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Module: Sectors ──────────────────────────────────────────────────────────

function SectorsModule() {
  const [active, setActive] = useState(0);
  const s = SECTOR_COMPETENCIES[active];
  return (
    <div>
      <SectionHeader icon="🏭" title="Sector Competency Frameworks" subtitle="All sectors value the same core skills. Each sector then adds its own specific requirements. Know both before you walk in." />

      <Callout type="info" text="Core skills — communication, teamwork, problem solving, reliability, initiative and digital literacy — are expected across every sector. What changes is the emphasis and the specific evidence the employer wants to hear." />

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {SECTOR_COMPETENCIES.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ background: active === i ? TEAL : "#F0F4FF", color: active === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 12px", fontSize: 12, fontWeight: active === i ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            {s.sector.split("(")[0].trim().split("/")[0].trim().split("&")[0].trim()}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <p style={{ color: NAVY, fontWeight: 800, fontSize: 16, margin: "0 0 16px" }}>{s.sector}</p>
        {s.skills.map((skill, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < s.skills.length - 1 ? "1px solid #F0F4FF" : "none" }}>
            <span style={{ color: TEAL, fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</span>
            <p style={{ color: "#444", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module: Nerves & Blank Moments ──────────────────────────────────────────

function NervesModule() {
  const [openTip, setOpenTip] = useState(null);
  const techniques = [
    {
      title: "The 4-7-8 breathing technique",
      when: "Before you go in — in the waiting room or outside the building",
      steps: ["Breathe in through your nose for 4 counts", "Hold for 7 counts", "Breathe out slowly through your mouth for 8 counts", "Repeat three times"],
      why: "Activates your parasympathetic nervous system — the part of your brain that calms the stress response. Used by athletes, surgeons and public speakers before high-pressure situations. Takes under two minutes."
    },
    {
      title: "The grounding technique (5-4-3-2-1)",
      when: "If you feel panic rising before or during the interview",
      steps: ["Name 5 things you can see", "Name 4 things you can touch", "Name 3 things you can hear", "Name 2 things you can smell", "Name 1 thing you can taste"],
      why: "Pulls your attention out of your thoughts and into the physical present. Interrupts the anxiety spiral. Can be done silently during an interview if needed — no one will notice."
    },
    {
      title: "The permission pause",
      when: "When a question catches you off guard or your mind goes blank",
      steps: ["Say: 'That's a good question — could I take a moment to think?'", "Take 5–10 seconds of genuine silence", "Start with the situation — it will unlock the rest", "If you're still blank, say: 'I'm going to come back to that one — can I move on?'"],
      why: "Interviewers expect nerves. Asking for thinking time is a sign of professionalism, not weakness. It is far better than rushing into an incoherent answer. Most interviewers actively appreciate it."
    },
    {
      title: "The anchor example technique",
      when: "When you blank completely on a specific example",
      steps: ["Have one strong, versatile STAR example memorised as your 'anchor'", "This example should demonstrate: teamwork, problem-solving, reliability and communication", "If your mind goes blank, you can adapt this anchor to almost any question", "Then follow up with a more specific example if one comes to you"],
      why: "Having one story you know deeply and can tell from any angle gives you a safety net. It prevents the spiral of 'I can't think of anything' which is what causes most interview failures — not lack of experience, but lack of a retrieval system."
    },
    {
      title: "Pre-interview power posture",
      when: "In private — a toilet cubicle or outside before entering",
      steps: ["Stand tall with feet shoulder-width apart", "Place hands on hips or raise them slightly — open, expansive posture", "Hold for 60–90 seconds", "Breathe slowly and deliberately while holding the position"],
      why: "Research suggests that open body posture — as opposed to closed, hunched posture — can shift both how you feel and how you're perceived. It takes 90 seconds and costs nothing. Many professional athletes, performers and public speakers use a version of this before going on."
    },
    {
      title: "The reframe — nerves as performance",
      when: "Whenever you notice anxiety building",
      steps: ["Notice the physical feeling — racing heart, dry mouth, tension", "Say to yourself (not out loud): 'This is my body preparing me to perform'", "Do not try to suppress the feeling — accept it as useful energy", "Channel it into focus, eye contact and clear speech"],
      why: "Research consistently shows that people who reframe anxiety as excitement perform better than those who try to calm down. The physical symptoms of nerves and excitement are identical — the only difference is the story you tell yourself about them."
    },
  ];

  const blankMoments = [
    { situation: "You can't think of any example at all", response: "Say: 'I want to give you a proper example — could I take a moment?' Then start with where you were (school, work, volunteering) and let the memory follow. The situation unlocks the rest." },
    { situation: "You forget what you were saying mid-answer", response: "Pause. Say: 'Let me just make sure I've covered that properly.' Summarise what you've said so far in one sentence — that usually reconnects you to where you were going." },
    { situation: "The question doesn't make sense to you", response: "Say: 'Just to make sure I understand — are you asking about [your interpretation]?' Clarifying is professional. Answering the wrong question is not." },
    { situation: "You give a weak answer and realise it", response: "Say: 'Actually, I've thought of a better example for that — could I add something?' Interviewers almost always say yes. It shows self-awareness and commitment to giving a proper answer." },
    { situation: "You freeze completely for several seconds", response: "Say: 'I'm going to be honest — I've gone a bit blank on a specific example. Can I come back to this one?' Then move on. Return to it if you think of something. This is far better than fabricating an answer." },
  ];

  return (
    <div>
      <SectionHeader icon="🧠" title="Handling Nerves & Blank Moments" subtitle="Every candidate feels nervous. What separates strong candidates is not the absence of nerves — it's having a plan for what to do when they arrive." />

      <div style={{ background: "#F0F8FF", borderLeft: `4px solid ${TEAL}`, borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <p style={{ color: TEAL, fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>The truth about nerves</p>
        <p style={{ color: "#2D5A8A", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Feeling nervous before an interview is not a problem to solve — it is a signal that you care about the outcome. The physical symptoms of nerves and excitement are physiologically identical. The difference is the story you tell yourself about them. These techniques don't eliminate nerves. They give you something to do with them.</p>
      </div>

      <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Six techniques — tap each one to see how and when to use it</p>

      {techniques.map((t, i) => (
        <div key={i} style={{ background: "#fff", border: `1px solid ${openTip === i ? TEAL : "#E2E8F0"}`, borderRadius: 12, overflow: "hidden", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <button onClick={() => setOpenTip(openTip === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: NAVY, fontWeight: 700, fontSize: 14, margin: 0 }}>{t.title}</p>
              <p style={{ color: "#888", fontSize: 12, margin: "3px 0 0" }}>When: {t.when}</p>
            </div>
            <span style={{ color: TEAL, fontSize: 20, fontWeight: 400, flexShrink: 0, marginLeft: 8 }}>{openTip === i ? "−" : "+"}</span>
          </button>
          {openTip === i && (
            <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${TEAL}20` }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "12px 0 8px" }}>How to do it</p>
              {t.steps.map((step, j) => (
                <div key={j} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{j + 1}</div>
                  <p style={{ color: "#444", fontSize: 13, lineHeight: 1.55, margin: 0, paddingTop: 2 }}>{step}</p>
                </div>
              ))}
              <div style={{ background: "#F0F8FF", borderRadius: 8, padding: 12, marginTop: 12 }}>
                <p style={{ color: "#2D5A8A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>💡 {t.why}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      <p style={{ color: NAVY, fontWeight: 700, fontSize: 15, margin: "24px 0 12px" }}>What to do when your mind goes blank</p>
      <p style={{ color: "#555", fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>Going blank is not failure. It is a retrieval problem, not a knowledge problem. Every experienced interviewer has seen it hundreds of times. What matters is what you do in the next five seconds.</p>

      {blankMoments.map((b, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>Situation: {b.situation}</p>
          <div style={{ background: "#F0FDF4", borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: 12 }}>
            <p style={{ color: GREEN, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 4px" }}>What to say / do</p>
            <p style={{ color: "#14532D", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{b.response}</p>
          </div>
        </div>
      ))}

      <div style={{ background: "#FFF8E7", border: `1px solid ${AMBER}50`, borderLeft: `4px solid ${AMBER}`, borderRadius: 10, padding: 14, marginTop: 8 }}>
        <p style={{ color: "#6B4A00", fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>The most important thing</p>
        <p style={{ color: "#6B4A00", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Confidence in an interview does not come from not being nervous. It comes from having prepared so thoroughly that you trust yourself to recover from anything. The techniques above work — but they work best when the preparation behind them is solid.</p>
      </div>
    </div>
  );
}

// ─── Module: Questions to Ask ─────────────────────────────────────────────────

function AskUsModule() {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    {
      label: "The role",
      icon: "💼",
      intro: "Questions about the role show you've thought beyond getting the job — you're already thinking about doing it well.",
      questions: [
        { q: "What does a typical day look like for an apprentice in this role in the first few months?", why: "Shows you're thinking practically about the reality of the job — not just the title." },
        { q: "What are the most important things you'd want someone in this role to achieve in their first six months?", why: "Tells you what success looks like. Also signals that you're results-oriented from the start." },
        { q: "What does the balance look like between on-the-job training and college or study time?", why: "Practical and relevant — especially important for apprenticeships. Shows you're taking the qualification seriously." },
        { q: "What would a strong apprentice in this role do differently from an average one?", why: "A bold question — but it tells you exactly what they value, and it signals ambition and self-awareness." },
        { q: "Are there any areas where you feel the team currently has gaps that this role could help with?", why: "Shows strategic thinking. Also opens a conversation where you can position your strengths." },
      ]
    },
    {
      label: "The team",
      icon: "👥",
      intro: "Questions about the team show you understand that culture and fit matter — and that you've thought about working with people, not just doing tasks.",
      questions: [
        { q: "How would you describe the culture of the team I'd be working with?", why: "Gives you real insight. Also prompts the interviewer to sell the team to you — which is appropriate." },
        { q: "What do you think makes someone fit in well here?", why: "Tells you what they actually value day-to-day, beyond what's written in the person spec." },
        { q: "How does the team typically support apprentices who are new to the role?", why: "Shows you're thinking about how you'll learn, not just what you'll learn." },
        { q: "Is there anything the team is working on right now that's particularly exciting or challenging?", why: "Shows genuine curiosity about the work — and gives you an opening to connect something you know to their current reality." },
      ]
    },
    {
      label: "Development",
      icon: "📈",
      intro: "Questions about development signal ambition and long-term commitment — both things every employer wants to see in an apprentice.",
      questions: [
        { q: "What does the pathway look like for someone who completes this apprenticeship well?", why: "Shows you're thinking beyond day one. Employers want apprentices who plan to stay." },
        { q: "How is progress measured during the apprenticeship — what does a review process look like?", why: "Shows you welcome feedback and want to know how you're performing. Mature and professional." },
        { q: "Are there opportunities to take on additional responsibility as you develop in the role?", why: "Signals ambition without being presumptuous. Shows you want to grow, not just complete the programme." },
        { q: "What training or development opportunities are available beyond the core apprenticeship?", why: "Shows you're invested in becoming excellent, not just qualified." },
      ]
    },
    {
      label: "The organisation",
      icon: "🏛️",
      intro: "Questions about the organisation show you've done your research and that you're thinking about where this employer is going — not just where you are now.",
      questions: [
        { q: "What do you think makes this organisation different from similar employers in the sector?", why: "Invites them to sell themselves — and helps you assess whether their answer matches your research." },
        { q: "Are there any changes or developments in the organisation that might affect this role over the next few years?", why: "Shows strategic awareness. Also helps you understand any uncertainty or opportunity in the role." },
        { q: "What attracted you personally to working here?", why: "A warm question that shifts the dynamic slightly and often produces a genuine, honest answer about culture." },
      ]
    },
    {
      label: "Never ask",
      icon: "🚫",
      intro: "Some questions will undermine everything you've built in the interview. These are the ones to avoid — and why.",
      questions: [
        { q: "What does the job pay?", why: "You can research salary ranges before you go in. Asking in the interview shifts the conversation to what you want rather than what you offer. If salary hasn't been discussed by the end, it's fine to ask at offer stage." },
        { q: "How many days holiday do I get?", why: "Same principle. This is a benefits question, not a role question. It belongs in the offer conversation, not the interview." },
        { q: "When will I know if I got the job?", why: "They will tell you. Asking this sounds impatient and can undermine the professional impression you've built." },
        { q: "What does your company do?", why: "You should have researched this thoroughly before you arrived. Asking this tells the interviewer you didn't prepare." },
        { q: "Can I work from home?", why: "For most apprenticeships — especially in engineering, construction and public sector — this is not an option. Asking suggests you don't understand the role." },
        { q: "No, I think you've covered everything.", why: "Not asking any questions is a missed opportunity. It signals passivity. Always have at least two questions ready." },
      ]
    },
  ];

  const cat = categories[activeCategory];

  return (
    <div>
      <SectionHeader icon="💬" title="Questions to Ask the Interviewer" subtitle="Asking strong questions at the end of an interview is not optional. It signals curiosity, preparation and genuine interest — all things the interviewer is still assessing." />

      <div style={{ background: "#FFF8E7", border: `1px solid ${AMBER}50`, borderLeft: `4px solid ${AMBER}`, borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <p style={{ color: "#6B4A00", fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>The rule</p>
        <p style={{ color: "#6B4A00", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Always have at least three questions ready. You may only ask two — that's fine. But going in with three means if one gets answered during the interview, you still have two left. Leaving without asking anything signals that you're not genuinely interested in the role.</p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {categories.map((c, i) => (
          <button key={i} onClick={() => setActiveCategory(i)}
            style={{ background: activeCategory === i ? (i === categories.length - 1 ? RED : TEAL) : "#F0F4FF", color: activeCategory === i ? "#fff" : NAVY, border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontWeight: activeCategory === i ? 700 : 400, cursor: "pointer", fontFamily: "inherit" }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: "1px solid #E2E8F0" }}>
        <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{cat.intro}</p>
      </div>

      {cat.questions.map((q, i) => (
        <div key={i} style={{ background: "#fff", border: `1px solid ${activeCategory === categories.length - 1 ? "#FECACA" : "#E2E8F0"}`, borderLeft: `4px solid ${activeCategory === categories.length - 1 ? RED : TEAL}`, borderRadius: 12, padding: 16, marginBottom: 10 }}>
          <p style={{ color: activeCategory === categories.length - 1 ? RED : NAVY, fontWeight: 700, fontSize: 14, lineHeight: 1.5, margin: "0 0 8px" }}>
            {activeCategory === categories.length - 1 ? "✗ " : "💬 "}{q.q}
          </p>
          <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{q.why}</p>
        </div>
      ))}

      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 16, marginTop: 8 }}>
        <p style={{ color: GREEN, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✍️ Plan your questions before every interview</p>
        <p style={{ color: "#14532D", fontSize: 13, lineHeight: 1.65, margin: "0 0 10px" }}>Choose two or three from the lists above that feel most relevant to the specific role and organisation. Adapt the wording to sound natural — not like you're reading from a list. Jot them on a small notepad you can bring in with you.</p>
        <textarea rows={4} placeholder="Write your questions for this specific interview here..."
          style={{ width: "100%", background: "#fff", border: "1px solid #BBF7D0", borderRadius: 8, padding: 10, color: "#333", fontSize: 13, fontFamily: "inherit", resize: "none", boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

function HomeModule({ setTab }) {
  const cards = [
    { id: "golden",       icon: "🏅", title: "Golden Rules",          desc: "10 rules that separate prepared candidates from hopeful ones — plus interactive readiness checklist" },
    { id: "career",       icon: "🎯", title: "Career Statement",      desc: "Build your 90-second opening before the first question is asked" },
    { id: "respond",      icon: "🗣️", title: "Responding vs Replying", desc: "Take control of the narrative — don't just answer, respond" },
    { id: "star",         icon: "⭐", title: "STAR Method",            desc: "5 worked examples — weak, good and elite — with coach commentary" },
    { id: "questions",    icon: "❓", title: "Interview Questions",    desc: "30 questions with three-tier model answers across 7 competency areas" },
    { id: "nerves",       icon: "🧠", title: "Nerves & Blank Moments", desc: "6 practical techniques and what to say when your mind goes blank" },
    { id: "askus",        icon: "💬", title: "Questions to Ask",       desc: "What to ask at the end — and what never to ask" },
    { id: "formats",      icon: "🏢", title: "Interview Formats",      desc: "Competency, panel, video, assessment centre — know what you're facing" },
    { id: "presentation", icon: "📊", title: "Presentation Skills",    desc: "Structure, delivery, PowerPoint essentials and a practice brief for assessment centres" },
    { id: "roadmap",      icon: "🗓️", title: "12-Week Roadmap",        desc: "Week-by-week preparation plan from research to interview day" },
    { id: "edi",          icon: "🤝", title: "EDI & Your Rights",      desc: "Equality Act, reasonable adjustments, guaranteed interview schemes" },
    { id: "comms",        icon: "✉️", title: "Professional Comms",     desc: "Templates for invitation replies, adjustment requests, thank-you emails" },
    { id: "coach",        icon: "🤖", title: "AI Interview Coach",     desc: "Mock interviews, STAR feedback, Career Statement review" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 20px" }}>
        <TASSLogo size="lg" theme="light" />
      </div>

      <div style={{ background: "#F0F8FF", borderRadius: 14, padding: "14px 16px", marginBottom: 20, borderLeft: `3px solid ${TEAL}` }}>
        <p style={{ color: "#2D5A8A", fontSize: 13, margin: 0, lineHeight: 1.65 }}>
          <strong style={{ color: NAVY }}>The Perfect Interview</strong><br />
          A comprehensive module for all apprenticeship candidates across every sector. From your first Career Statement to your thank-you email — everything in one place.
        </p>
      </div>

      <div style={{ background: "#FFF8E7", border: `1px solid ${AMBER}50`, borderLeft: `4px solid ${AMBER}`, borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <p style={{ color: "#6B4A00", fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>Start here</p>
        <p style={{ color: "#6B4A00", fontSize: 13, lineHeight: 1.65, margin: 0 }}>Build your <strong>Career Statement</strong> first. It frames every answer you give. Then work through STAR and the question bank. Use the AI Coach to practise at any stage.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {cards.map((card, i) => (
          <button key={i} onClick={() => setTab(card.id)}
            style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: "14px 12px", textAlign: "left", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.04)", transition: "border-color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, margin: "0 0 3px", lineHeight: 1.3 }}>{card.title}</p>
            <p style={{ color: "#888", fontSize: 11, lineHeight: 1.4, margin: 0 }}>{card.desc}</p>
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", padding: "4px 0 8px", color: "#bbb", fontSize: 11 }}>
        <strong style={{ color: TEAL }}>The Apprenticeship Success System™</strong> · tass.scot
      </div>
    </div>
  );
}

// ─── Module: AI Coach ─────────────────────────────────────────────────────────

function CoachModule() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hi — I'm your TASS Interview Coach.\n\nI can help you with:\n• Mock interview practice — tell me the role and I'll ask you real questions\n• Feedback on your Career Statement or STAR answers\n• Building your evidence bank from your real experiences\n• Handling nerves, blank moments or difficult questions\n• Responding vs replying — how to take control of the narrative\n\nWhat would you like to work on?"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const PROMPTS = [
    "Run a mock interview for a council apprenticeship",
    "Give feedback on my Career Statement",
    "Help me build a STAR answer from my experience",
    "I keep going blank — what do I do?",
    "How do I answer 'what's your weakness?'",
    "What questions should I ask at the end?"
  ];

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages, { role: "user", content: userMsg }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 1000,
          system: `You are the TASS Perfect Interview Coach — a warm, direct and expert careers coach helping apprenticeship candidates (aged 16–29) across all sectors in Scotland prepare for interviews.

Your approach:
- Supportive but honest — you don't offer empty praise
- Practical and specific — give concrete, actionable feedback
- Expert in the STAR method (Situation, Task, Action, Result)
- Familiar with Scottish Modern Apprenticeships and Graduate Apprenticeships
- Aware of all sectors: engineering, local authority, health & care, digital/IT, construction, hospitality, retail, transport

When running mock interviews:
- Ask one question at a time
- After each answer, give specific feedback: what worked, what to improve, then show an elite version
- Push for specific examples — call out vague answers directly

When reviewing Career Statements or STAR answers:
- Be specific about what's strong and what needs work
- Show improved versions with better language
- Flag if answers are too vague, too casual, or lack evidence

Key principles to reinforce:
- Responding vs replying — use every question to frame skills and aspirations
- 'I' not 'we' — interviewers assess individuals
- Evidence over claims — every skill must be proven not just stated
- The career statement is the frame for everything that follows

Keep responses focused — use short paragraphs. Users may be on mobile.`,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue — please try again.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "Connection issue — please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 400 }}>
      <div style={{ background: "#F0F8FF", borderLeft: `3px solid ${TEAL}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
        <p style={{ color: "#2D5A8A", fontSize: 13, margin: 0 }}>💡 Try a mock interview, get STAR feedback, or paste your Career Statement for a review.</p>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
        {PROMPTS.map((p, i) => (
          <button key={i} onClick={() => setInput(p)}
            style={{ background: TEAL + "15", border: `1px solid ${TEAL}40`, color: TEAL, borderRadius: 99, padding: "5px 12px", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}>
            {p}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "11px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? NAVY : "#fff", color: m.role === "user" ? "#fff" : "#333", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", border: m.role === "assistant" ? "1px solid #E2E8F0" : "none" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, background: TEAL, borderRadius: 99, animation: `b 1.2s ${i*0.2}s infinite` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ask your coach anything, or paste your Career Statement / STAR answer for feedback…"
          rows={2}
          style={{ flex: 1, background: "#fff", border: "2px solid #E2E8F0", borderRadius: 12, padding: "11px 14px", color: "#333", fontSize: 14, fontFamily: "inherit", resize: "none", minHeight: 52, maxHeight: 120, boxSizing: "border-box" }} />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ background: input.trim() ? TEAL : "#E2E8F0", border: "none", color: input.trim() ? "#fff" : "#999", borderRadius: 12, padding: "0 18px", cursor: input.trim() ? "pointer" : "default", fontSize: 20 }}>↑</button>
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────


// ─── GOLDEN RULES MODULE ──────────────────────────────────────────────────────
const GOLDEN_RULES = [
  {id:"journey",icon:"🗺️",title:"Plan your journey in advance",priority:"CRITICAL",priorityCol:"#C0392B",
   summary:"Know exactly how you are getting there, how long it takes and what can go wrong — before interview day.",
   detail:"Arriving late to an interview is not recoverable. Even if you are let in, you will spend the first 10 minutes managing embarrassment and trying to settle your nerves rather than performing at your best.\n\nWhat to do:\n• Plan your route at least 2 days before the interview\n• Use Google Maps or Traveline Scotland (travelinescotland.com) at the time of day you will be travelling — not a generic journey time\n• Find the specific building entrance — many large organisations (NHS sites, council offices, Scottish Government buildings) have multiple entrances and the postcode alone will not get you to the right door\n• Check if there is a sign-in process — some organisations require you to be registered with security in advance\n• Plan for delays: if the journey normally takes 30 minutes, leave 60 minutes early",
   tip:"If you have never been to the location before, travel there in advance. What looks straightforward on a map can be confusing in person — particularly on large hospital or government sites."},
  {id:"dummyrun",icon:"🔁",title:"Do a dummy run",priority:"STRONGLY RECOMMENDED",priorityCol:"#F4A623",
   summary:"Travel to the exact location before interview day. What looks simple on a map is often confusing in person.",
   detail:"A dummy run removes one of the biggest sources of interview-day anxiety: uncertainty about the journey.\n\nWhen to do it:\n• The day before the interview, at a similar time of day\n• If the interview is early morning, do your dummy run at that time on a weekday — Sunday afternoon traffic and parking are completely different\n\nWhat to check:\n• Exactly where the building is — many office parks and hospital sites are confusing on foot\n• Where to park if driving — is it free? Does it require a permit?\n• Where the nearest bus stop or train station is relative to the entrance\n• How long the walk from transport to the entrance takes\n• Any planned roadworks or diversions\n\nFor video interviews:\n• Do a dummy run of the technology — test camera, microphone and internet connection at the same time of day\n• Check your background — what will the interviewer see behind you?\n• Have a fallback plan if technology fails — know the interviewer's phone number",
   tip:"If you cannot do a physical dummy run, use Google Street View to familiarise yourself with the building and its surroundings."},
  {id:"earlystart",icon:"⏰",title:"Research travel for early starts",priority:"IMPORTANT",priorityCol:"#B7860B",
   summary:"Early morning interviews require specific travel planning — public transport and parking behave completely differently at 7:30am versus 10:00am.",
   detail:"Many apprenticeship interviews start early — 8:00am, 8:30am or 9:00am. This is common in NHS, hospitality, engineering and contact centre roles.\n\nSpecific things to check:\n• Public transport timetables before 8:00am — many bus routes run less frequently in early morning\n• Whether car parks open before your arrival time — some do not open until 7:00am or 8:00am\n• If you are relying on someone else to drive you, confirm the night before — do not assume\n\nFor roles requiring regular early starts:\nIf you would need to start at 6:00am or 7:00am every day, consider honestly whether you can reliably manage that journey. The interview is testing exactly this.",
   tip:"Build in contingency time at every stage: journey time x1.5, plus 15 minutes for arrival. You will sometimes arrive too early — that is a far better problem than arriving late."},
  {id:"research",icon:"🔍",title:"Research the company thoroughly",priority:"CRITICAL",priorityCol:"#C0392B",
   summary:"Know what the organisation does, why it matters and something specific that you cannot say about any other employer.",
   detail:"Company research is one of the most heavily assessed elements of any interview. 'What do you know about us?' is not a formality — it is a genuine test of commitment and preparation.\n\nWhat to research before any interview:\n1. What does the organisation actually do? Describe it in one sentence.\n2. Who does it serve? Customers, patients, citizens, businesses?\n3. What are its values? Learn them and connect them to your own experience.\n4. What is happening right now? Any recent news, awards, expansions, challenges?\n5. What is specific about this employer that you could not say about its competitors?\n\nFor public sector specifically:\n• Scottish Government — which directorate? What does it do?\n• NHS — which health board? Which service area?\n• Council — which department? What services does it deliver?",
   tip:"Write down five specific facts about the organisation before your interview. If you cannot write five facts, you have not done enough research."},
  {id:"cv",icon:"📄",title:"Tailor your CV for every application",priority:"CRITICAL",priorityCol:"#C0392B",
   summary:"A generic CV is immediately identifiable. Every application deserves a tailored personal profile and relevant emphasis.",
   detail:"Sending the same CV to every employer is one of the most common and most costly mistakes apprenticeship candidates make.\n\nWhat tailoring means:\n1. Personal profile — name the specific employer and role. 'Seeking a Business Administration Apprenticeship with City of Edinburgh Council' not 'Seeking an apprenticeship in administration.'\n2. Relevant experience first — put your most relevant experience highest regardless of chronology\n3. Keyword matching — mirror the language from the job description\n4. Covering letter — always write a specific covering letter naming the organisation and something specific that attracted you\n5. Remove irrelevant content — keep only what is relevant to this specific application\n\nThe test: if you deleted your name, would this CV still be obviously written for this specific role? If yes — it is working. If it could belong to anyone — it is not tailored.",
   tip:"Keep a master CV with everything on it. For each application create a copy, rename it with the employer name, and edit it to be specific. Never send the master version."},
  {id:"devices",icon:"📵",title:"Switch off your phone and devices",priority:"NON-NEGOTIABLE",priorityCol:"#C0392B",
   summary:"Your phone must be completely silent — not vibrate — before you enter the building. A ringing or vibrating phone during interview is very difficult to recover from.",
   detail:"This seems obvious but it is surprisingly common — particularly for candidates who use their phone for navigation and forget to switch it off on arrival.\n\nWhen to switch off:\n• Before you enter the building — not in the waiting room\n• Switch off completely or use Airplane Mode — not silent, not vibrate. Vibration against a table or chair leg is audible and distracting.\n\nApple Watch and smartwatches:\n• Disable notifications on your smartwatch as well\n\nFor video interviews:\n• Switch off notifications on your computer — email popups, Slack, Teams\n• Close all unnecessary browser tabs and applications\n\nIf your phone does ring or vibrate:\n• Do not look at it\n• Apologise briefly: 'I am so sorry — I should have switched that off completely.'\n• Switch it off immediately and move on — prolonged apology makes it worse",
   tip:"The night before your interview, add 'Switch phone off' to your mental checklist for the moment you walk through the door. Making it a deliberate action prevents forgetting."},
  {id:"appearance",icon:"👔",title:"Dress appropriately for the sector",priority:"IMPORTANT",priorityCol:"#B7860B",
   summary:"You cannot overdress for most apprenticeship interviews. When in doubt, dress more formally than you think is required.",
   detail:"Appearance creates an immediate impression that is difficult to override. You do not need expensive clothes — you need clean, well-fitting, appropriate clothes.\n\nGeneral guidance:\n• Smart-casual at minimum for any interview\n• Business smart for professional sectors — financial services, legal, public sector, management\n• Never jeans, trainers or hoodies even if the organisation's culture is casual\n\nSector-specific:\n• Financial services and legal: conservative business dress\n• Public sector and NHS: smart business dress\n• Hospitality: smart-casual to business smart\n• Engineering: if there is a practical element, ask what to wear in advance\n\nThe night before: lay out everything you are going to wear — check for stains, missing buttons, creases.",
   tip:"If unsure what to wear, look at the organisation's website and LinkedIn photos. The people in those photos show you the culture — dress slightly more formally than they appear."},
  {id:"timing",icon:"⏱️",title:"Arrive at the right time",priority:"IMPORTANT",priorityCol:"#B7860B",
   summary:"Arrive 10-15 minutes before your interview. Earlier can inconvenience the employer. Later causes anxiety for you.",
   detail:"The ideal arrival time is 10-15 minutes before your scheduled interview.\n\nEarlier than 15 minutes:\n• Can create an awkward situation for busy reception staff and interviewers\n• If you arrive very early (30+ minutes), wait outside or in a nearby cafe\n\nThe waiting period:\n• Use it to compose yourself — not to cram more preparation\n• Observe the environment — it gives you insight into the culture\n• Be professional from the moment you walk through the door — reception interactions are sometimes noted\n\nIf you are going to be late:\n• Call ahead as soon as you know — do not wait and hope it resolves\n• Have the interviewer's phone number from the invitation email\n• Apologise briefly, give an estimated arrival time, then move forward when you arrive",
   tip:"If something genuinely unavoidable happens, call immediately and ask if the interview can be rescheduled. Most employers will accommodate a genuine emergency communicated promptly and professionally."},
  {id:"followup",icon:"📨",title:"Follow up after the interview",priority:"GOOD PRACTICE",priorityCol:"#1A9E8F",
   summary:"A brief professional follow-up email the same day is good practice that most candidates do not do — and that many interviewers notice positively.",
   detail:"Sending a follow-up email is not expected in most Scottish apprenticeship contexts — but it is noticed positively and demonstrates professional communication skills directly relevant to business administration, customer service and management roles.\n\nWhat to send:\n• A brief email — 4-6 sentences maximum\n• Same day or following morning\n• Thank them for their time\n• Reiterate enthusiasm for the role and organisation briefly\n\nSample:\n\nSubject: Thank you — [Role Title] Interview, [Date]\n\nDear [Name],\n\nThank you for taking the time to interview me today. I enjoyed learning more about [specific thing from the interview] and I remain very interested in the opportunity.\n\nI look forward to hearing from you.\n\nKind regards, [Your name]",
   tip:"Keep the email to 4-6 sentences. Brevity signals professional communication skills. A long email with extensive self-promotion will create a negative impression."},
  {id:"rejection",icon:"💪",title:"Handle rejection and learn from it",priority:"MINDSET",priorityCol:"#64748B",
   summary:"Every rejection is information. Requesting feedback, processing it honestly and using it to improve is how successful candidates distinguish themselves.",
   detail:"Most apprenticeship candidates apply multiple times before securing a place. Rejection is not a verdict on your worth — it is information about one application on one day.\n\nRequesting feedback:\n• Email within 5 working days\n• Sample: 'Thank you for letting me know. I would be grateful for any feedback that would help me improve for future opportunities.'\n\nProcessing feedback honestly:\n• Listen without defending yourself\n• Identify the specific, actionable elements\n• Write down 2-3 things to work on before your next application\n\nStrong candidates apply for their first-choice employer having practised at second and third-choice applications first. The interview anxiety and experience of STAR questions in a real setting improve with every application.",
   tip:"Keep a simple log of every application: employer, role, date, outcome, feedback, what to improve. After 3-4 applications, patterns will emerge. Addressing those patterns is the fastest route to success."},
];

const CHECKLIST_PHASES = [
  {phase:"1 week before",items:["Research the organisation — 5 specific facts minimum","Re-read the job description and identify the 3 most important requirements","Tailor your CV and covering letter to this specific role","Prepare and practise 3 STAR examples relevant to the role","Plan your route — not just look up the address but plan the actual journey"]},
  {phase:"2 days before",items:["Do a dummy run of the journey if you have not been before","Check transport timetables for the time of day you will be travelling","Confirm parking arrangements if driving","Lay out your interview clothes — check for stains, creases, missing buttons","Check if there is anything specific you need to bring (ID, certificates)"]},
  {phase:"Evening before",items:["Pack your bag — CV copies, ID, notepad, pen, any required documents","Set two alarms — not one","Prepare breakfast so the morning is calm","Review your 3 key STAR examples and research notes briefly","Get to bed at a reasonable time — fatigue significantly reduces interview performance"]},
  {phase:"Morning of interview",items:["Eat breakfast — low blood sugar impairs focus","Allow significantly more time than you think you need","Arrive at the building 15 minutes early","Switch your phone completely off before entering the building","Take a slow breath before walking through the door"]},
  {phase:"After the interview",items:["Send a brief follow-up email the same day or following morning","Note 2-3 things that went well and 2-3 things to improve while fresh","If rejected: request feedback professionally within 5 working days","Update your application log with outcome and key learnings"]},
];

function GoldenRulesModule() {
  const [activeRule, setActiveRule] = useState(null);
  const [checklistDone, setChecklistDone] = useState({});
  const [view, setView] = useState("rules");

  const totalItems = CHECKLIST_PHASES.reduce((a, c) => a + c.items.length, 0);
  const doneCount = Object.values(checklistDone).filter(Boolean).length;

  function toggleCheck(pi, ii) {
    const key = `${pi}-${ii}`;
    setChecklistDone(s => ({ ...s, [key]: !s[key] }));
  }

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>🏅</span>
          <h2 style={{ color: "#0D1B3E", fontSize: 20, fontWeight: 900, margin: 0 }}>Golden Rules</h2>
        </div>
        <div style={{ height: 3, width: 40, background: "#F4A623", borderRadius: 2, marginBottom: 8 }} />
        <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6, margin: 0 }}>The rules that separate prepared candidates from hopeful ones. None require talent. All require preparation.</p>
      </div>

      <div style={{ background: "#FFFBEB", borderLeft: "4px solid #F4A623", borderRadius: 8, padding: "10px 13px", marginBottom: 16 }}>
        <p style={{ color: "#92400E", fontSize: 13, lineHeight: 1.65, margin: 0 }}>These rules apply to every apprenticeship interview in every sector at every level. The candidates who follow them consistently outperform candidates who rely on natural ability alone.</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setView("rules")} style={{ flex: 1, padding: "10px 14px", background: view === "rules" ? "#0D1B3E" : "#fff", color: view === "rules" ? "#fff" : "#64748B", border: "1px solid #E2E8F0", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>10 Golden Rules</button>
        <button onClick={() => setView("checklist")} style={{ flex: 1, padding: "10px 14px", background: view === "checklist" ? "#0D1B3E" : "#fff", color: view === "checklist" ? "#fff" : "#64748B", border: "1px solid #E2E8F0", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>
          Readiness Checklist {doneCount > 0 ? `(${doneCount}/${totalItems})` : ""}
        </button>
      </div>

      {view === "rules" && (
        <div>
          {GOLDEN_RULES.map((rule) => (
            <div key={rule.id} style={{ background: "#fff", border: `2px solid ${activeRule === rule.id ? "#F4A623" : "#E2E8F0"}`, borderRadius: 14, overflow: "hidden", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <button onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)} style={{ width: "100%", background: "none", border: "none", padding: "15px 16px", display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                <div style={{ width: 44, height: 44, background: "#0D1B3E", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{rule.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{ color: "#0D1B3E", fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>{rule.title}</span>
                    <span style={{ background: rule.priorityCol + "20", color: rule.priorityCol, fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, padding: "2px 7px", borderRadius: 99 }}>{rule.priority}</span>
                  </div>
                  <p style={{ color: "#64748B", fontSize: 12, margin: 0, lineHeight: 1.4 }}>{rule.summary}</p>
                </div>
                <span style={{ color: "#F4A623", fontSize: 22, flexShrink: 0 }}>{activeRule === rule.id ? "−" : "+"}</span>
              </button>
              {activeRule === rule.id && (
                <div style={{ borderTop: "1px solid #F0F4F8", padding: "0 16px 16px" }}>
                  <div style={{ background: "#FAFBFC", borderRadius: 10, padding: 14, margin: "14px 0 12px" }}>
                    <p style={{ color: "#333", fontSize: 13, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>{rule.detail}</p>
                  </div>
                  <div style={{ background: "#FFFBEB", borderLeft: "3px solid #F4A623", borderRadius: 8, padding: "9px 12px" }}>
                    <p style={{ color: "#92400E", fontSize: 13, lineHeight: 1.6, margin: 0 }}>💡 <strong>Pro tip:</strong> {rule.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "checklist" && (
        <div>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
            <p style={{ color: "#0D1B3E", fontWeight: 800, fontSize: 15, margin: "0 0 8px" }}>Interview Readiness</p>
            <div style={{ height: 8, background: "#F0F4F8", borderRadius: 99, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", width: `${Math.round((doneCount / totalItems) * 100)}%`, background: doneCount === totalItems ? "#1A6B3A" : "#1A9E8F", borderRadius: 99, transition: "width 0.3s" }} />
            </div>
            <p style={{ color: "#64748B", fontSize: 13, margin: 0 }}>{doneCount} of {totalItems} items complete</p>
            {doneCount === totalItems && <p style={{ color: "#1A6B3A", fontWeight: 700, fontSize: 14, margin: "8px 0 0" }}>You are interview-ready. Go get it. 🎯</p>}
          </div>
          {CHECKLIST_PHASES.map((phase, pi) => (
            <div key={pi} style={{ marginBottom: 14 }}>
              <p style={{ color: "#0D1B3E", fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: "#0D1B3E", color: "#fff", width: 22, height: 22, borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900 }}>{pi + 1}</span>
                {phase.phase}
              </p>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
                {phase.items.map((item, ii) => {
                  const key = `${pi}-${ii}`;
                  const done = checklistDone[key];
                  return (
                    <button key={ii} onClick={() => toggleCheck(pi, ii)} style={{ width: "100%", background: done ? "#F0FDF4" : "#fff", border: "none", borderBottom: ii < phase.items.length - 1 ? "1px solid #F0F4F8" : "none", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? "#1A6B3A" : "#CBD5E1"}`, background: done ? "#1A6B3A" : "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {done && <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>✓</span>}
                      </div>
                      <span style={{ color: done ? "#166534" : "#444", fontSize: 13, lineHeight: 1.5, textDecoration: done ? "line-through" : "none", opacity: done ? 0.7 : 1 }}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {doneCount > 0 && (
            <button onClick={() => setChecklistDone({})} style={{ width: "100%", padding: 12, background: "#fff", border: "1px solid #E2E8F0", color: "#64748B", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>Reset checklist</button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── PRESENTATION MODULE ──────────────────────────────────────────────────────
function PresentationModule() {
  const [section, setSection] = useState("overview");
  const NAVY = "#0D1B3E", TEAL = "#1A9E8F", AMBER = "#F4A623", INDIGO = "#4338CA", WHITE = "#FFFFFF", MID = "#64748B";

  const sections = {
    overview: {
      label: "Overview", items: [
        { title: "Why presentations appear in interviews", body: "Many employers — particularly in public sector, financial services, management roles and graduate schemes — include a presentation task as part of their assessment. It tests how you structure and communicate ideas, how you perform under pressure, and how professionally you present yourself.\n\nPresentation tasks are most common in:\n• SCQF Level 6, 7 and 8 apprenticeship assessments\n• Assessment centres for larger employers (Scottish Government, NHS, financial services)\n• Management and supervisory roles\n• Graduate apprenticeship interviews\n• Any role involving client-facing communication\n\nYou will typically be told in advance — often 24-48 hours before, sometimes the same day. The topic is usually related to the role, a challenge facing the sector, or a question about yourself and your motivations.\n\nDuration: usually 5-10 minutes for the presentation, followed by 5-10 minutes of questions from the panel." },
      ]
    },
    structure: {
      label: "Structure", items: [
        { title: "The five-part structure that always works", body: "Regardless of topic, the most effective presentation structure is:\n\n1. OPENING (30-60 seconds)\nState your name, the title and what you are going to cover. Signal the structure clearly: 'I am going to cover three things: the challenge, the opportunity, and my recommendation.'\nDo not start with 'Erm, so...' — start with a statement, a question or a striking fact.\n\n2. CONTEXT (1-2 minutes)\nSet up the situation. What is the background? Keep this brief — it is scene-setting, not the main event.\n\n3. MAIN CONTENT (3-5 minutes)\nCover 2-3 key points. No more than 3. For each point: state it clearly, provide evidence or an example, connect it back to the overall message.\n\n4. CONCLUSION (30-60 seconds)\nSummarise the 2-3 key points briefly. Do not introduce new information. End with a deliberate closing statement — not 'that's it' or 'I've finished'.\n\n5. QUESTIONS\nSay clearly: 'I am happy to take questions.' Treat questions as an opportunity, not a threat." },
        { title: "How many slides — and what should be on them", body: "For a 5-10 minute presentation:\n• 4-6 slides maximum — one slide per minute as a rough guide\n• Title slide, 3-4 content slides, closing slide\n\nWhat goes on slides:\n• Headlines not sentences — each slide title should state the point\n• Bullet points should be fragments, not sentences — maximum 5 bullets, maximum 6 words per bullet\n• One idea per slide\n• Images only if they add meaning\n\nWhat does NOT go on slides:\n• Your entire script — never read directly from slides\n• Dense paragraphs of text\n• Gratuitous animations — they distract and often go wrong\n\nThe test: can someone understand the point of each slide in 3 seconds? If not, simplify." },
      ]
    },
    delivery: {
      label: "Delivery", items: [
        { title: "What assessors actually watch", body: "Assessors evaluating a presentation look at:\n\nEye contact — are you talking to the panel or reading from notes? Good presenters use brief glances at notes but maintain eye contact most of the time. Include all panel members — not just the one who looks most encouraging.\n\nVoice — are you audible? Is your pace appropriate? Most nervous presenters speak too fast. If you feel like you are going too slowly, you are probably at the right pace.\n\nStructure — does the presentation flow logically? Signposting helps: 'Moving on to my second point...' 'To summarise...'\n\nHandling questions — do you listen carefully before answering? It is fine to take a moment. It is not fine to guess or bluff — 'I do not know the answer to that specifically, but I would approach it by...' is an honest and credible response.\n\nProfessional presentation — are you dressed appropriately? Is your manner confident and calm? Not fumbling with technology, not apologising excessively." },
        { title: "Managing nerves — techniques that work", body: "Nervousness before a presentation is normal and can improve performance. These techniques work:\n\nPrepare more than you need to — the most reliable way to feel confident is to know your material so well that the slides are reminders, not scripts.\n\nPractise out loud — thinking through your presentation in your head is not the same as speaking it aloud. Practise standing up, speaking at full volume, at least twice. Time yourself.\n\nSlow your opening — the first 30 seconds are when nerves are highest. Deliberately slow your pace at the start.\n\nBreath control — before you start, take one slow breath. A slow exhalation activates the parasympathetic nervous system and reduces the physical sensation of anxiety.\n\nAccept that some nerves are visible — trying to hide all signs of nervousness increases anxiety. What assessors look for is whether you manage them professionally." },
      ]
    },
    powerpoint: {
      label: "PowerPoint", items: [
        { title: "PowerPoint essentials — what you need to know", body: "Many assessment centre presentations will ask you to use PowerPoint. You need to be able to create and navigate a basic presentation confidently.\n\nEssential skills:\n• Create a new presentation from blank or use a provided template\n• Add, delete and reorder slides\n• Insert text boxes, bullet points, images and shapes\n• Apply consistent fonts and colours across slides\n• Use Slide Master to apply consistent formatting efficiently\n• Present in Slideshow mode — advance slides, return to previous, exit\n• Keyboard shortcuts: F5 (start slideshow), Escape (exit), B (blank screen)\n• Save as both .pptx and .pdf\n\nCommon mistakes to avoid:\n• Default Office theme with no customisation — shows minimal effort\n• Inconsistent fonts or sizes across slides\n• Text too small to read from 2 metres — minimum 24pt for body text\n• Forgetting to spellcheck every slide" },
        { title: "Design principles — professional slides without being a designer", body: "Three principles make slides look professional:\n\n1. Contrast — text must be readable against its background. Dark text on light background or light text on dark background. Never grey text on white.\n\n2. Alignment — all text and objects should align to a consistent grid. Use PowerPoint's alignment tools (Arrange > Align) rather than placing by eye.\n\n3. Space — do not fill every inch of a slide. White space is not wasted — it makes content easier to read.\n\nColour guidance:\n• One primary colour (main accent) and one secondary colour\n• Dark navy or charcoal for headings on white background\n• Avoid bright red, lime green or bright orange — they look amateur\n\nFont guidance:\n• One font for headings, same or complementary font for body text\n• Minimum 28pt for slide titles, minimum 20pt for body text\n• Never more than two font families in one presentation" },
        { title: "Build a practice presentation before the interview", body: "The best preparation is to actually build and deliver a practice presentation.\n\nSuggested practice brief:\n'Prepare a 6-minute presentation on why you are the right candidate for this apprenticeship. Structure it around three reasons, with specific evidence for each.'\n\nThis is excellent practice because:\n• It forces you to identify your three strongest selling points\n• It requires evidence-based arguments\n• The content (you and your motivations) is something you know thoroughly\n• 6 minutes is a realistic interview presentation length\n\nBuild the slides, practise delivering it aloud twice, time yourself, then review:\n• Did you stay within time?\n• Were your three points clear and distinct?\n• Did you have a strong opening and closing?\n\nIf you can confidently deliver this, you are prepared for almost any presentation brief an employer could give you." },
      ]
    },
  };

  const s = sections[section];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>📊</span>
          <h2 style={{ color: NAVY, fontSize: 20, fontWeight: 900, margin: 0 }}>Presentation Skills</h2>
        </div>
        <div style={{ height: 3, width: 40, background: AMBER, borderRadius: 2, marginBottom: 8 }} />
        <p style={{ color: MID, fontSize: 13, lineHeight: 1.6, margin: 0 }}>How to prepare, structure and deliver a presentation at an assessment centre — including PowerPoint essentials.</p>
      </div>

      <div style={{ background: "#EEF2FF", borderLeft: "4px solid #4338CA", borderRadius: 8, padding: "10px 13px", marginBottom: 14 }}>
        <p style={{ color: "#312E81", fontSize: 13, lineHeight: 1.65, margin: 0 }}>Presentations are increasingly common at Level 6, 7 and 8 assessments and in financial services, public sector and management roles. If given 24 hours notice — start immediately. Most candidates spend too long on slide design and not enough time practising delivery.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {Object.entries(sections).map(([k, v]) => {
          const isActive = section === k;
          return <button key={k} onClick={() => setSection(k)} style={{ background: isActive ? NAVY : WHITE, color: isActive ? WHITE : MID, border: `1px solid ${isActive ? NAVY : "#E2E8F0"}`, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: isActive ? 800 : 400, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase" }}>{v.label}</button>;
        })}
      </div>

      {s.items.map((item, i) => (
        <div key={i} style={{ background: WHITE, border: "1px solid #E2E8F0", borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <p style={{ color: NAVY, fontWeight: 800, fontSize: 14, margin: "0 0 10px" }}>{item.title}</p>
          <p style={{ color: "#444", fontSize: 13, lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function TASSInterview() {
  const [tab, setTab] = useState("home");
  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F5F7FA", minHeight: "100vh", color: NAVY }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F5F7FA; } ::-webkit-scrollbar-thumb { background: #D1D9E6; border-radius: 4px; } textarea:focus, button:focus { outline: 2px solid #1A9E8F; outline-offset: 2px; }`}</style>

      {/* Header — inner screens only */}
      {tab !== "home" && (
        <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
          <TASSLogo size="sm" theme="dark" />
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>The Perfect Interview</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>{currentTab?.icon} {currentTab?.label}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 110px" }}>
        {tab === "home"      && <HomeModule setTab={setTab} />}
        {tab === "career"    && <CareerStatementModule />}
        {tab === "respond"   && <RespondModule />}
        {tab === "star"      && <StarModule />}
        {tab === "questions" && <QuestionsModule />}
        {tab === "nerves"    && <NervesModule />}
        {tab === "askus"     && <AskUsModule />}
        {tab === "formats"      && <FormatsModule />}
        {tab === "presentation" && <PresentationModule />}
        {tab === "golden"       && <GoldenRulesModule />}
        {tab === "roadmap"      && <RoadmapModule />}
        {tab === "edi"          && <EDIModule />}
        {tab === "comms"        && <CommsModule />}
        {tab === "coach"        && <CoachModule />}
        {tab === "sectors"      && <SectorsModule />}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "center", padding: "8px 2px 12px", zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.06)", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, maxWidth: 64, minWidth: 44, background: "none", border: "none", cursor: "pointer", padding: "5px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ fontSize: 16, filter: tab === t.id ? "none" : "grayscale(1) opacity(0.45)" }}>{t.icon}</div>
            <div style={{ fontSize: 8, color: tab === t.id ? TEAL : "#999", fontWeight: tab === t.id ? 700 : 400, letterSpacing: "0.02em" }}>{t.label}</div>
            {tab === t.id && <div style={{ width: 14, height: 2.5, background: TEAL, borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
