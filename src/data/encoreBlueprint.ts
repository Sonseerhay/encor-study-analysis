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
    id: 'architecture',
    name: 'Architecture',
    description: 'Design and implement enterprise network architectures',
    percentage: 15,
    topics: [
      {
        id: 'network-design',
        name: 'Network Design Principles',
        description: 'Enterprise network design methodologies and best practices',
        subtopics: [
          'Hierarchical network design',
          'Enterprise campus design',
          'Data center design',
          'Branch office design',
          'Network segmentation',
          'High availability design'
        ],
        difficulty: 'intermediate',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'Cisco Enterprise Network Design',
            duration: 60,
            completed: false
          },
          {
            type: 'documentation',
            title: 'Cisco Validated Designs Guide',
            completed: false
          },
          {
            type: 'lab',
            title: 'Design Enterprise Campus Network',
            duration: 180,
            completed: false
          }
        ]
      },
      {
        id: 'sd-access',
        name: 'Software-Defined Access',
        description: 'Cisco SD-Access architecture and implementation',
        subtopics: [
          'SD-Access fundamentals',
          'Fabric underlay and overlay',
          'SD-Access components',
          'Policy enforcement',
          'Automation with DNA Center',
          'SD-Access migration strategies'
        ],
        difficulty: 'advanced',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Cisco SD-Access Deep Dive',
            duration: 90,
            completed: false
          },
          {
            type: 'lab',
            title: 'Implement SD-Access Fabric',
            duration: 240,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'virtualization',
    name: 'Virtualization',
    description: 'Implement network virtualization solutions',
    percentage: 10,
    topics: [
      {
        id: 'network-virtualization',
        name: 'Network Virtualization Technologies',
        description: 'Virtual networking concepts and implementations',
        subtopics: [
          'VXLAN fundamentals',
          'EVPN control plane',
          'Multi-tenant networks',
          'Virtual routing and forwarding',
          'Network function virtualization',
          'Service chaining'
        ],
        difficulty: 'advanced',
        estimatedHours: 18,
        resources: [
          {
            type: 'video',
            title: 'VXLAN and EVPN Fundamentals',
            duration: 75,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure VXLAN BGP EVPN',
            duration: 200,
            completed: false
          }
        ]
      },
      {
        id: 'dc-virtualization',
        name: 'Data Center Virtualization',
        description: 'Virtualization in data center environments',
        subtopics: [
          'Nexus switches virtualization',
          'VPC (Virtual Port Channel)',
          'FEX (Fabric Extender)',
          'Virtual device contexts',
          'Multi-chassis EtherChannel',
          'Data center automation'
        ],
        difficulty: 'advanced',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'Nexus Virtualization Technologies',
            duration: 80,
            completed: false
          },
          {
            type: 'practice',
            title: 'Configure VPC and FEX',
            duration: 150,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Implement and manage network infrastructure',
    percentage: 30,
    topics: [
      {
        id: 'routing-protocols',
        name: 'Advanced Routing Protocols',
        description: 'Enterprise routing protocol implementation and optimization',
        subtopics: [
          'OSPFv3 for IPv6',
          'Multi-area OSPF',
          'BGP route reflectors',
          'BGP Confederations',
          'Route redistribution',
          'Policy-based routing'
        ],
        difficulty: 'intermediate',
        estimatedHours: 20,
        resources: [
          {
            type: 'video',
            title: 'Advanced OSPF Configuration',
            duration: 85,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Multi-Area OSPFv3',
            duration: 180,
            completed: false
          }
        ]
      },
      {
        id: 'infrastructure-services',
        name: 'Infrastructure Services',
        description: 'Critical network infrastructure services',
        subtopics: [
          'DHCPv6 and DHCPv4',
          'DNS for IPv6',
          'NTP synchronization',
          'Syslog and network monitoring',
          'SNMPv3',
          'NetFlow and Flexible NetFlow'
        ],
        difficulty: 'intermediate',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Network Infrastructure Services',
            duration: 70,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure DHCPv6 and DNS',
            duration: 120,
            completed: false
          }
        ]
      },
      {
        id: 'infrastructure-security',
        name: 'Infrastructure Security',
        description: 'Secure network infrastructure implementation',
        subtopics: [
          'Device hardening',
          'Control plane policing',
          'Management plane security',
          'Infrastructure protection',
          'Port security',
          'DHCP snooping and IP source guard'
        ],
        difficulty: 'intermediate',
        estimatedHours: 18,
        resources: [
          {
            type: 'video',
            title: 'Infrastructure Security Best Practices',
            duration: 90,
            completed: false
          },
          {
            type: 'practice',
            title: 'Configure Control Plane Policing',
            duration: 150,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'network-assurance',
    name: 'Network Assurance',
    description: 'Implement network monitoring and assurance solutions',
    percentage: 10,
    topics: [
      {
        id: 'network-monitoring',
        name: 'Network Monitoring and Telemetry',
        description: 'Advanced network monitoring and telemetry solutions',
        subtopics: [
          'Telemetry streaming',
          'Streaming analytics',
          'Network assurance',
          'Performance monitoring',
          'Event correlation',
          'Health and performance metrics'
        ],
        difficulty: 'advanced',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Cisco Telemetry and Assurance',
            duration: 80,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Telemetry Streaming',
            duration: 180,
            completed: false
          }
        ]
      },
      {
        id: 'troubleshooting-tools',
        name: 'Advanced Troubleshooting Tools',
        description: 'Enterprise network troubleshooting methodologies',
        subtopics: [
          'Structured troubleshooting',
          'Performance analysis',
          'Packet analysis',
          'Route analysis',
          'Troubleshooting methodologies',
          'Diagnostic tools'
        ],
        difficulty: 'intermediate',
        estimatedHours: 12,
        resources: [
          {
            type: 'video',
            title: 'Advanced Network Troubleshooting',
            duration: 75,
            completed: false
          },
          {
            type: 'practice',
            title: 'Troubleshooting Lab Scenarios',
            duration: 200,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Implement comprehensive network security solutions',
    percentage: 20,
    topics: [
      {
        id: 'network-security',
        name: 'Network Security Implementation',
        description: 'Enterprise network security solutions',
        subtopics: [
          'Firewall technologies',
          'VPN implementations',
          'IPS/IDS deployment',
          'Network access control',
          'Security policies',
          'Threat defense'
        ],
        difficulty: 'intermediate',
        estimatedHours: 18,
        resources: [
          {
            type: 'video',
            title: 'Cisco Network Security Solutions',
            duration: 85,
            completed: false
          },
          {
            type: 'lab',
            title: 'Configure Firepower Threat Defense',
            duration: 200,
            completed: false
          }
        ]
      },
      {
        id: 'security-automation',
        name: 'Security Automation',
        description: 'Automated security operations and responses',
        subtopics: [
          'Security automation',
          'Threat intelligence',
          'Incident response automation',
          'Security analytics',
          'Orchestration workflows',
          'Security APIs'
        ],
        difficulty: 'advanced',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'Security Automation with STEALTHWATCH',
            duration: 70,
            completed: false
          },
          {
            type: 'practice',
            title: 'Security Automation Workflows',
            duration: 160,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'automation-ai',
    name: 'Automation & AI',
    description: 'Implement network automation and AI operations',
    percentage: 15,
    topics: [
      {
        id: 'network-automation',
        name: 'Network Automation',
        description: 'Enterprise network automation solutions',
        subtopics: [
          'Python for network automation',
          'REST API and RESTCONF',
          'NETCONF and YANG',
          'Ansible network automation',
          'Scripting best practices',
          'Automation frameworks'
        ],
        difficulty: 'advanced',
        estimatedHours: 20,
        resources: [
          {
            type: 'video',
            title: 'Network Automation Fundamentals',
            duration: 90,
            completed: false
          },
          {
            type: 'lab',
            title: 'Python Network Automation Scripts',
            duration: 240,
            completed: false
          }
        ]
      },
      {
        id: 'ai-operations',
        name: 'AI Operations',
        description: 'AI-powered network operations and analytics',
        subtopics: [
          'AI/ML in networking',
          'Predictive analytics',
          'Anomaly detection',
          'AI-powered troubleshooting',
          'Cognitive analytics',
          'Machine learning models'
        ],
        difficulty: 'advanced',
        estimatedHours: 15,
        resources: [
          {
            type: 'video',
            title: 'AI Operations in Networking',
            duration: 80,
            completed: false
          },
          {
            type: 'documentation',
            title: 'Cisco AI and Machine Learning Guide',
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
    { week: 1, domain: 'architecture', focus: 'network-design', hours: 18 },
    { week: 2, domain: 'architecture', focus: 'sd-access', hours: 20 },
    { week: 3, domain: 'virtualization', focus: 'network-virtualization', hours: 22 },
    { week: 4, domain: 'virtualization', focus: 'dc-virtualization', hours: 15 },
    { week: 5, domain: 'infrastructure', focus: 'routing-protocols', hours: 25 },
    { week: 6, domain: 'infrastructure', focus: 'infrastructure-services', hours: 20 },
    { week: 7, domain: 'infrastructure', focus: 'infrastructure-security', hours: 22 },
    { week: 8, domain: 'network-assurance', focus: 'network-monitoring', hours: 18 },
    { week: 9, domain: 'network-assurance', focus: 'troubleshooting-tools', hours: 15 },
    { week: 10, domain: 'security', focus: 'network-security', hours: 25 },
    { week: 11, domain: 'security', focus: 'security-automation', hours: 20 },
    { week: 12, domain: 'automation-ai', focus: 'comprehensive-review', hours: 30 }
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
