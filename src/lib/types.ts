export type BloomTaxonomy = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

export type MappingLevel = 'Introductory' | 'Reinforcing' | 'Mastery';

export interface CLO {
  id: string;
  code: string;
  description: string;
  bloomLevel: BloomTaxonomy;
  mappedPloCode: string;
}

export interface Course {
  code: string;
  title: string;
  credits: number;
  creditFormat: string; // e.g., "3 (3-0-6)" = Lecture-Lab-SelfStudy
  lectureHours: number;
  labHours: number;
  selfStudyHours: number;
  category: 'General Education' | 'Core Engineering' | 'Major Elective' | 'Free Elective' | 'Capstone & Co-op';
  year: number;
  semester: number;
  prerequisites: string[];
  description: string;
  clos: CLO[];
  mappedPlos: {
    ploCode: string;
    level: MappingLevel;
  }[];
}

export interface PLO {
  code: string;
  title: string;
  category: 'Technical Competence' | 'Problem Solving & Engineering Design' | 'Ethics & Professionalism' | 'Communication & Leadership' | 'Lifelong Learning & Innovation';
  description: string;
  performanceIndicators: string[];
  abetCriteriaMapping?: string;
}

export interface ProgramStructure {
  id: string;
  name: string;
  degreeName: string;
  faculty: string;
  department: string;
  major: string;
  totalCredits: number;
  durationYears: number;
  accreditedBy: string[];
  overview: string;
  creditBreakdown: {
    category: string;
    credits: number;
    color: string;
  }[];
  plos: PLO[];
  courses: Course[];
}

export interface PublicTrustMetric {
  title: string;
  value: string;
  change?: string;
  badge?: string;
  description: string;
  iconName: string;
}

export interface AccreditationCert {
  body: string;
  fullName: string;
  level: string;
  validUntil: string;
  status: 'Accredited' | 'Certified' | 'Excellence';
  verificationUrl: string;
  description: string;
}

export interface AdvisoryBoardMember {
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  industrySector: string;
  focusArea: string;
}

export interface StudentProject {
  id: string;
  title: string;
  academicYear: number; // 2024, 2025, 2026
  semester: number;
  department: string;
  major: string;
  category: 'AI & Machine Learning' | 'Cybersecurity & Cloud' | 'IoT & Robotics' | 'HealthTech' | 'FinTech & Blockchain' | 'CleanTech & Smart Cities';
  teamMembers: {
    name: string;
    role: string;
  }[];
  advisor: string;
  industryPartner?: string;
  abstract: string;
  problemStatement: string;
  solutionHighlights: string[];
  techStack: string[];
  githubUrl?: string;
  demoVideoUrl?: string;
  paperUrl?: string;
  featured: boolean;
  status: 'Completed' | 'In Progress';
}

export interface StudentProfile {
  id: string;
  name: string;
  studentIdMasked: string;
  avatarUrl: string;
  department: string;
  major: string;
  yearLevel: string; // "Year 3", "Year 4", "M.Sc. Candidate"
  gpa: number;
  skills: string[];
  category: 'internship' | 'research' | 'activity_leader';
  bio: string;
  email: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  
  // Specific to Internship students
  internshipDetails?: {
    availabilityWindow: string; // e.g. "Summer 2026 (June - Aug)" or "Co-op Semester 1 (Aug - Dec)"
    preferredRoles: string[];
    targetIndustry: string;
    status: 'Seeking Placement' | 'Interviewing' | 'Placed';
  };

  // Specific to Research students
  researchDetails?: {
    labName: string;
    advisor: string;
    researchDomain: string;
    publications: {
      title: string;
      venue: string;
      year: number;
    }[];
  };

  // Specific to Activity / Leadership students
  activityDetails?: {
    roles: {
      title: string;
      organization: string;
      year: number;
      achievement: string;
    }[];
  };
}

export interface IndustryAnnouncement {
  id: string;
  companyName: string;
  companyLogoText: string;
  industrySector: string;
  title: string;
  type: 'Full-Time Staff' | 'Internship / Co-op' | 'Sponsored Capstone' | 'Research Grant' | 'Tech Talk / Workshop';
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  stipendOrSalary: string;
  deadline: string;
  description: string;
  requirements: string[];
  contactEmail: string;
  website: string;
  postedDate: string;
  active: boolean;
  applicationCount: number;
}

export type TicketStatus = 'Submitted' | 'Under Review' | 'Committee Review' | 'Action Plan Drafted' | 'Resolved';

export interface IndustryConcernTicket {
  id: string;
  ticketNumber: string;
  companyName: string;
  submitterName: string;
  submitterRole: string;
  submitterEmail: string;
  category: 'Curriculum Skill Gap' | 'Internship Preparedness' | 'Joint R&D Collaboration' | 'Lab Equipment & Tech Stack' | 'General Industry Suggestion';
  priority: 'High' | 'Medium' | 'Low';
  subject: string;
  description: string;
  suggestedAction: string;
  status: TicketStatus;
  createdAt: string;
  assignedCommittee: string;
  committeeResponse?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    href?: string;
    query?: string;
  }[];
}
