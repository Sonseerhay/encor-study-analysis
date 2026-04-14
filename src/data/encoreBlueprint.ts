export interface BlueprintDomain {
  id: string;
  name: string;
  description: string;
  percentage: number;
  topics: BlueprintTopic[];
}

export interface BlueprintTopic {
  id: string;
  name: string;
  description: string;
  subtopics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  resources: StudyResource[];
}

export interface StudyResource {
  type: 'video' | 'documentation' | 'lab' | 'practice' | 'book';
  title: string;
  url?: string;
  duration?: number; // in minutes
  completed: boolean;
}

export const ENCORE_BLUEPRINT: BlueprintDomain[] = [
  {
    id: 'network-security',
    name: 'Network Security',
    description: 'Implement and maintain network security solutions',
    percentage: 30,
    topics: [
      {
        id: 'firewall-concepts',
        name: 'Firewall Concepts and Technologies',
        description: 'Understanding firewall types, deployment models, and security policies',
        subtopics: [
          'Stateful vs Stateless firewalls',
          'Next Generation Firewalls (NGFW)',
          'Firewall deployment modes',
          'Security policy implementation',
          'NAT and PAT configuration',
          'Zone-based firewalls'
        ],
        difficulty: 'intermediate',
        estimatedHours: 8,
        resources: [
          {
            type: 'video',
            title: 'Cisco Firewall Fundamentals',
            duration: 45,
            completed: false
          },
          {
            type: 'documentation',
            title: 'Cisco Firepower Configuration Guide',
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure ASA Firewall Policies',
            duration: 120,
            completed: false
          }
        ]
      },
      {
        id: 'vpn-technologies',
        name: 'VPN Technologies',
        description: 'Site-to-site and remote access VPN implementations',
        subtopics: [
          'IPsec VPN fundamentals',
          'SSL VPN concepts',
          'DMVPN implementation',
          'GET VPN',
          'Clientless SSL VPN',
          'VPN troubleshooting'
        ],
        difficulty: 'advanced',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'IPsec VPN Deep Dive',
            duration: 60,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Site-to-Site IPsec VPN',
            duration: 180,
            completed: false
          }
        ]
      },
      {
        id: 'ips-ids',
        name: 'IPS/IDS Solutions',
        description: 'Intrusion Prevention and Detection Systems',
        subtopics: [
          'IPS vs IDS concepts',
          'Signature-based detection',
          'Anomaly-based detection',
          'IPS policy configuration',
          'Tuning and false positives',
          'IPS deployment strategies'
        ],
        difficulty: 'advanced',
        estimatedHours: 10,
        resources: [
          {
            type: 'video',
            title: 'Cisco Firepower IPS Configuration',
            duration: 90,
            completed: false
          },
          {
            type: 'practice',
            title: 'IPS Signature Analysis',
            duration: 60,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'security-architectures',
    name: 'Security Architectures',
    description: 'Design and implement security architectures',
    percentage: 25,
    topics: [
      {
        id: 'secure-access',
        name: 'Secure Access',
        description: 'Implement secure network access solutions',
        subtopics: [
          '802.1X authentication',
          'Cisco ISE fundamentals',
          'BYOD policies',
          'Guest access management',
          'Network device admission control',
          'Profiling and posture assessment'
        ],
        difficulty: 'intermediate',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Cisco ISE Deployment Guide',
            duration: 75,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure 802.1X with Cisco ISE',
            duration: 240,
            completed: false
          }
        ]
      },
      {
        id: 'email-security',
        name: 'Email Security',
        description: 'Implement comprehensive email security solutions',
        subtopics: [
          'Email security threats',
          'Cisco ESA configuration',
          'Anti-spam and anti-phishing',
          'Data loss prevention',
          'Email encryption',
          'Content filtering'
        ],
        difficulty: 'intermediate',
        estimatedHours: 8,
        resources: [
          {
            type: 'video',
            title: 'Cisco Email Security Appliance',
            duration: 60,
            completed: false
          },
          {
            type: 'documentation',
            title: 'ESA Configuration Guide',
            completed: false
          }
        ]
      },
      {
        id: 'web-security',
        name: 'Web Security',
        description: 'Implement web security and content filtering',
        subtopics: [
          'Web security threats',
          'Cisco WSA configuration',
          'URL filtering',
          'Malware detection',
          'Application visibility and control',
          'Web proxy concepts'
        ],
        difficulty: 'intermediate',
        estimatedHours: 10,
        resources: [
          {
            type: 'video',
            title: 'Cisco Web Security Appliance',
            duration: 55,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Web Content Filtering',
            duration: 150,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'security-automation',
    name: 'Security Automation and Programmability',
    description: 'Implement security automation and programmability solutions',
    percentage: 20,
    topics: [
      {
        id: 'sdn-security',
        name: 'SDN Security',
        description: 'Software-Defined Networking security concepts',
        subtopics: [
          'SDN fundamentals',
          'Cisco ACI security',
          'Micro-segmentation',
          'Policy-based automation',
          'Network virtualization security',
          'Intent-based networking'
        ],
        difficulty: 'advanced',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'Cisco ACI Security Model',
            duration: 80,
            completed: false
          },
          {
            type: 'documentation',
            title: 'ACI Security Configuration Guide',
            completed: false
          }
        ]
      },
      {
        id: 'api-security',
        name: 'API Security and Automation',
        description: 'Security automation using APIs and scripting',
        subtopics: [
          'REST API fundamentals',
          'Cisco security APIs',
          'Python for network security',
          'Automation workflows',
          'API authentication',
          'Scripting best practices'
        ],
        difficulty: 'advanced',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Cisco Security API Programming',
            duration: 70,
            completed: false
          },
          {
            type: 'practice',
            title: 'Python Security Automation Scripts',
            duration: 180,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence and Defense',
    description: 'Implement threat intelligence and defense solutions',
    percentage: 25,
    topics: [
      {
        id: 'threat-analysis',
        name: 'Threat Analysis and Intelligence',
        description: 'Analyze and respond to security threats',
        subtopics: [
          'Threat intelligence sources',
          'IOC (Indicators of Compromise)',
          'Threat hunting techniques',
          'Malware analysis basics',
          'Security incident response',
          'Threat modeling'
        ],
        difficulty: 'intermediate',
        estimatedHours: 10,
        resources: [
          {
            type: 'video',
            title: 'Threat Intelligence Fundamentals',
            duration: 65,
            completed: false
          },
          {
            type: 'practice',
            title: 'IOC Analysis Exercise',
            duration: 90,
            completed: false
          }
        ]
      },
      {
        id: 'advanced-threat-protection',
        name: 'Advanced Threat Protection',
        description: 'Implement advanced threat protection solutions',
        subtopics: [
          'AMP (Advanced Malware Protection)',
          'Cisco Threat Grid',
          'Sandbox analysis',
          'File reputation',
          'Behavioral analysis',
          'Zero-day protection'
        ],
        difficulty: 'advanced',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'Cisco AMP Configuration',
            duration: 85,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Advanced Threat Protection',
            duration: 200,
            completed: false
          }
        ]
      },
      {
        id: 'incident-response',
        name: 'Security Incident Response',
        description: 'Plan and execute security incident response',
        subtopics: [
          'Incident response lifecycle',
          'CSIRT team structure',
          'Containment strategies',
          'Forensics basics',
          'Recovery procedures',
          'Post-incident analysis'
        ],
        difficulty: 'intermediate',
        estimatedHours: 8,
        resources: [
          {
            type: 'documentation',
            title: 'NIST Incident Response Guide',
            completed: false
          },
          {
            type: 'practice',
            title: 'Incident Response Simulation',
            duration: 120,
            completed: false
          }
        ]
      }
    ]
  }
];

export const STUDY_SCHEDULE = {
  totalWeeks: 12,
  examDate: '2026-05-23',
  startDate: '2026-03-02',
  weeklyGoals: [
    { week: 1, domain: 'network-security', focus: 'firewall-concepts', hours: 15 },
    { week: 2, domain: 'network-security', focus: 'vpn-technologies', hours: 20 },
    { week: 3, domain: 'network-security', focus: 'ips-ids', hours: 18 },
    { week: 4, domain: 'security-architectures', focus: 'secure-access', hours: 22 },
    { week: 5, domain: 'security-architectures', focus: 'email-security', hours: 15 },
    { week: 6, domain: 'security-architectures', focus: 'web-security', hours: 18 },
    { week: 7, domain: 'security-automation', focus: 'sdn-security', hours: 20 },
    { week: 8, domain: 'security-automation', focus: 'api-security', hours: 25 },
    { week: 9, domain: 'threat-intelligence', focus: 'threat-analysis', hours: 18 },
    { week: 10, domain: 'threat-intelligence', focus: 'advanced-threat-protection', hours: 20 },
    { week: 11, domain: 'threat-intelligence', focus: 'incident-response', hours: 15 },
    { week: 12, domain: 'review', focus: 'comprehensive-review', hours: 30 }
  ]
};

export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(STUDY_SCHEDULE.startDate);
  const weeksElapsed = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return Math.min(Math.max(1, weeksElapsed + 1), STUDY_SCHEDULE.totalWeeks);
}

export function getWeeklyGoal(week: number) {
  return STUDY_SCHEDULE.weeklyGoals.find(goal => goal.week === week);
}
