import { computerEngineeringProgram, studentProjects, studentProfiles, publicTrustMetrics, initialAnnouncements } from './mock-data';

export interface BotResponse {
  text: string;
  suggestedActions?: {
    label: string;
    href?: string;
    query?: string;
  }[];
}

export function generateChatbotReply(userInput: string): BotResponse {
  const query = userInput.toLowerCase().trim();

  // 1. Program Structure / Credits / Degree
  if (
    query.includes('program structure') ||
    query.includes('credit') ||
    query.includes('degree') ||
    query.includes('curriculum') ||
    query.includes('how many credit')
  ) {
    const totalCredits = computerEngineeringProgram.totalCredits;
    const breakdown = computerEngineeringProgram.creditBreakdown
      .map((b) => `• **${b.category}**: ${b.credits} credits`)
      .join('\n');

    return {
      text: `The **${computerEngineeringProgram.name}** requires a total of **${totalCredits} credits** over a 4-year duration.\n\n### Credit Distribution Breakdown:\n${breakdown}\n\nThe curriculum adheres to ABET and AUN-QA guidelines with a mandatory 16-week Co-operative industrial internship (CPE380) and a 2-semester Capstone Senior Design sequence.`,
      suggestedActions: [
        { label: 'View Full Curriculum Structure', href: '/curriculum' },
        { label: 'Explore PLO & CLO Matrix', href: '/curriculum#plo-matrix' },
        { label: 'Check Accreditation Status', href: '/public-trust' },
      ],
    };
  }

  // 2. PLO / CLO (Program Learning Outcomes / Course Learning Outcomes)
  if (
    query.includes('plo') ||
    query.includes('clo') ||
    query.includes('learning outcome') ||
    query.includes('competenc')
  ) {
    const ploSummary = computerEngineeringProgram.plos
      .map((p) => `• **${p.code} (${p.category})**: ${p.title} - *${p.description.slice(0, 90)}...*`)
      .join('\n');

    return {
      text: `The program defines **6 Program Learning Outcomes (PLOs)** aligned with ABET Criterion 3 and international engineering standards:\n\n${ploSummary}\n\nEvery course embeds explicit **CLOs (Course Learning Outcomes)** linked directly to these PLOs at Introductory, Reinforcing, or Mastery levels.`,
      suggestedActions: [
        { label: 'Inspect Interactive PLO/CLO Matrix', href: '/curriculum' },
        { label: 'View Public Trust Metrics', href: '/public-trust' },
      ],
    };
  }

  // 3. Public Trust / Accreditation / Employability / Salary
  if (
    query.includes('public trust') ||
    query.includes('accreditation') ||
    query.includes('abet') ||
    query.includes('aun-qa') ||
    query.includes('employability') ||
    query.includes('salary') ||
    query.includes('satisfaction')
  ) {
    return {
      text: `### Academic Quality & Public Trust Highlights:\n• **Graduate Employability Rate**: 97.4% employed within 6 months.\n• **Employer Satisfaction Score**: 4.88 / 5.0 across 140+ corporate partners.\n• **Accreditations**: ABET EAC (Washington Accord, valid to 2030) and AUN-QA Tier 1.\n• **Average Starting Compensation**: $58,500/year (฿68,000/month local benchmark).\n• **Industry Oversight**: Curriculum overseen by executive leaders from Google Cloud, Agoda, KBTG, and SCG.`,
      suggestedActions: [
        { label: 'View Public Trust & Accreditations', href: '/public-trust' },
        { label: 'See Advisory Board Members', href: '/public-trust#advisory-board' },
        { label: 'Submit Industry Feedback', href: '/industry/feedback' },
      ],
    };
  }

  // 4. Student Projects by Year or Specific Tech Topic
  if (
    query.includes('project') ||
    query.includes('capstone') ||
    query.includes('2024') ||
    query.includes('2025') ||
    query.includes('2026') ||
    query.includes('robot') ||
    query.includes('drone') ||
    query.includes('vision') ||
    query.includes('ai') ||
    query.includes('iot') ||
    query.includes('health') ||
    query.includes('blockchain')
  ) {
    // Check if a specific year was mentioned
    let targetYear: number | undefined;
    if (query.includes('2026')) targetYear = 2026;
    else if (query.includes('2025')) targetYear = 2025;
    else if (query.includes('2024')) targetYear = 2024;

    const filtered = studentProjects.filter((p) => {
      if (targetYear && p.academicYear !== targetYear) return false;
      if (query.includes('drone') || query.includes('agri')) return p.title.toLowerCase().includes('drone');
      if (query.includes('vision') || query.includes('wafer')) return p.title.toLowerCase().includes('vision') || p.title.toLowerCase().includes('defect');
      if (query.includes('health') || query.includes('zk') || query.includes('med')) return p.category === 'HealthTech' || p.title.toLowerCase().includes('health');
      if (query.includes('finance') || query.includes('fintech')) return p.category === 'FinTech & Blockchain';
      return true;
    });

    const projectList = (filtered.length > 0 ? filtered : studentProjects)
      .slice(0, 3)
      .map(
        (p) =>
          `• **[${p.academicYear}] ${p.title}** (${p.category})\n  *Advisor: ${p.advisor} | Partner: ${p.industryPartner || 'Internal Lab'}*\n  *Stack: ${p.techStack.slice(0, 4).join(', ')}*`
      )
      .join('\n\n');

    return {
      text: `Here are highlighted student projects${targetYear ? ` for academic year **${targetYear}**` : ''}:\n\n${projectList}\n\nYou can browse the full multi-year archive with video demos, GitHub repos, and sponsor inquiries in the Project Gallery.`,
      suggestedActions: [
        { label: 'Browse All Projects by Year', href: '/projects' },
        { label: 'Filter 2026 Projects', href: '/projects?year=2026' },
        { label: 'Filter 2025 Projects', href: '/projects?year=2025' },
      ],
    };
  }

  // 5. Internship & Student Talent / Research / Activities
  if (
    query.includes('intern') ||
    query.includes('student') ||
    query.includes('researcher') ||
    query.includes('hire') ||
    query.includes('talent') ||
    query.includes('activity') ||
    query.includes('club')
  ) {
    return {
      text: `### Student Talent Directory Overview:\n• **Internship Students**: Final-year & 3rd-year engineering candidates available for 16-week Co-op or 10-week summer placements.\n• **Research Students**: Masters and Ph.D. researchers working in cutting-edge labs (NLP, Robotics & SLAM, Zero-Knowledge Crypto) with IEEE/ACM publications.\n• **Student Activity Leaders**: Presidents and executive leads of Google Developer Student Club (GDSC), ICPC teams, and campus tech communities.`,
      suggestedActions: [
        { label: 'Browse Student Talent Directory', href: '/students' },
        { label: 'Post Recruitment Announcement', href: '/industry/dashboard' },
      ],
    };
  }

  // 6. Industry Announcements / Recruitment / Post Job
  if (
    query.includes('post announcement') ||
    query.includes('recruit') ||
    query.includes('job') ||
    query.includes('announcement') ||
    query.includes('hire staff') ||
    query.includes('sponsor')
  ) {
    return {
      text: `### Industry Recruitment & Posting Portal:\nAs a corporate partner, you can publish:\n1. **Full-Time Staff Vacancies** for graduating seniors.\n2. **Internship / Co-op Placements** (Summer 2026 or 16-Week Co-op).\n3. **Sponsored Capstone Senior Projects** with targeted industry use-cases.\n4. **Research Grants & Joint Lab Collaboration**.\n\nYou can submit postings directly through the Industry Dashboard with instant live publishing.`,
      suggestedActions: [
        { label: 'Open Industry Dashboard', href: '/industry/dashboard' },
        { label: 'Post a New Announcement', href: '/industry/dashboard?action=new' },
      ],
    };
  }

  // 7. Feedback / Raise Concern
  if (
    query.includes('feedback') ||
    query.includes('concern') ||
    query.includes('race concern') ||
    query.includes('raise concern') ||
    query.includes('suggestion') ||
    query.includes('curriculum gap')
  ) {
    return {
      text: `### Industry Voice & Concern Ticketing System:\nWe welcome direct input from corporate partners to keep our curriculum modern and relevant.\n\n• **Submit a Concern/Feedback**: Report technical skill gaps, recommend new technologies, or request internship framework adjustments.\n• **Transparent Governance**: Every ticket is assigned to the Curriculum Committee or Academic Senate with tracked states (*Submitted* ➔ *Under Review* ➔ *Action Plan Drafted* ➔ *Resolved*).\n\nSee how previous tickets resulted in expanding course CPE380 to 16-week Co-op and integrating Kafka streaming!`,
      suggestedActions: [
        { label: 'Raise an Industry Concern', href: '/industry/feedback' },
        { label: 'Track Existing Tickets', href: '/industry/feedback#tracker' },
      ],
    };
  }

  // Default fallback with helpful prompts
  return {
    text: `Hello! I am **EduTrust Assistant**, your AI guide to the University-Industry Linkage & Public Trust System.\n\nI can assist you with:\n• **Academic Structure**: Total credits, semester plans, and course prerequisites.\n• **Learning Outcomes**: Program Learning Outcomes (PLO) and Course Learning Outcomes (CLO) mappings.\n• **Public Trust & Quality**: Accreditation credentials, graduate employment rate, starting salaries.\n• **Student Projects**: Discover student innovations across **2024, 2025, and 2026**.\n• **Talent Acquisition**: Review internship-seeking students, research fellows, and activity leaders.\n• **Corporate Collaboration**: Post recruitment announcements or submit curriculum feedback/concern tickets.`,
    suggestedActions: [
      { label: 'Show Curriculum & Credits', query: 'Show me the program structure and credits' },
      { label: 'Explain PLO & CLO Mapping', query: 'What are the PLOs and CLOs?' },
      { label: 'View 2026 Student Projects', query: 'Show me 2026 student projects' },
      { label: 'How to recruit students?', query: 'How can our company recruit or post announcements?' },
    ],
  };
}
