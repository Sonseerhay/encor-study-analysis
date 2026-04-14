export interface CCNPLab {
  id: string;
  name: string;
  filename: string;
  category: 'routing' | 'bgp' | 'high-availability' | 'vpn' | 'monitoring' | 'security' | 'automation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  description: string;
  equipment: string[];
  completed: boolean;
  completedDate?: string;
}

export const CCNP_LABS: CCNPLab[] = [
  {
    id: 'ospfv2-single-area',
    name: 'Implement Single-Area OSPFv2',
    filename: '8.1.2 Lab - Implement Single-Area OSPFv2.docx',
    category: 'routing',
    difficulty: 'beginner',
    estimatedDuration: 90,
    description: 'Configure and verify single-area OSPFv2 routing',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'ospfv2-multi-area',
    name: 'Implement Multi-Area OSPFv2',
    filename: '9.1.2 Lab - Implement Multi-Area OSPFv2.docx',
    category: 'routing',
    difficulty: 'intermediate',
    estimatedDuration: 120,
    description: 'Configure multi-area OSPFv2 with backbone and regular areas',
    equipment: ['3 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'ospfv2-route-summarization',
    name: 'OSPFv2 Route Summarization and Filtering',
    filename: '9.1.3 Lab - OSPFv2 Route Summarization and Filtering.docx',
    category: 'routing',
    difficulty: 'intermediate',
    estimatedDuration: 100,
    description: 'Implement route summarization and filtering in OSPFv2',
    equipment: ['3 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'ospfv3-multiarea',
    name: 'Implement Multiarea OSPFv3',
    filename: '10.1.2 Lab - Implement Multiarea OSPFv3.docx',
    category: 'routing',
    difficulty: 'advanced',
    estimatedDuration: 120,
    description: 'Configure and verify multi-area OSPFv3 for IPv6',
    equipment: ['3 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'bgp-ebgp-ipv4',
    name: 'Implement eBGP for IPv4',
    filename: '11.1.2 Lab - Implement eBGP for IPv4.docx',
    category: 'bgp',
    difficulty: 'intermediate',
    estimatedDuration: 90,
    description: 'Configure external BGP for IPv4 routing',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'bgp-mp-bgp',
    name: 'Implement MP-BGP',
    filename: '11.1.3 Lab - Implement MP-BGP.docx',
    category: 'bgp',
    difficulty: 'advanced',
    estimatedDuration: 110,
    description: 'Configure multiprotocol BGP for IPv4 and IPv6',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'bgp-path-manipulation',
    name: 'Implement BGP Path Manipulation',
    filename: '12.1.2 Lab - Implement BGP Path Manipulation.docx',
    category: 'bgp',
    difficulty: 'advanced',
    estimatedDuration: 100,
    description: 'Manipulate BGP path selection using various attributes',
    equipment: ['3 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'bgp-communities',
    name: 'Implement BGP Communities',
    filename: '12.1.3 Lab - Implement BGP Communities.docx',
    category: 'bgp',
    difficulty: 'advanced',
    estimatedDuration: 95,
    description: 'Configure BGP communities for route control',
    equipment: ['3 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'hsrp',
    name: 'Implement HSRP',
    filename: '15.1.3 Lab - Implement HSRP.docx',
    category: 'high-availability',
    difficulty: 'intermediate',
    estimatedDuration: 80,
    description: 'Configure Hot Standby Router Protocol for first-hop redundancy',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'vrrp',
    name: 'Implement VRRP',
    filename: '15.1.4 Lab - Implement VRRP.docx',
    category: 'high-availability',
    difficulty: 'intermediate',
    estimatedDuration: 80,
    description: 'Configure Virtual Router Redundancy Protocol',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'glbp',
    name: 'Implement GLBP',
    filename: '15.1.5 Lab - Implement GLBP.docx',
    category: 'high-availability',
    difficulty: 'advanced',
    estimatedDuration: 90,
    description: 'Configure Gateway Load Balancing Protocol',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'nat',
    name: 'Implement NAT',
    filename: '15.1.6 Lab - Implement NAT.docx',
    category: 'high-availability',
    difficulty: 'intermediate',
    estimatedDuration: 70,
    description: 'Configure Network Address Translation',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'gre-tunnel',
    name: 'Implement a GRE Tunnel',
    filename: '16.1.2 Lab - Implement a GRE Tunnel.docx',
    category: 'vpn',
    difficulty: 'intermediate',
    estimatedDuration: 60,
    description: 'Configure Generic Routing Encapsulation tunnel',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'ipsec-site-to-site',
    name: 'Implement IPsec Site-to-Site',
    filename: '16.1.3 Lab - Implement IPsec Site-to-Site.docx',
    category: 'vpn',
    difficulty: 'advanced',
    estimatedDuration: 120,
    description: 'Configure IPsec VPN site-to-site tunnel',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'gre-over-ipsec',
    name: 'Implement GRE over IPsec Site-to-Site VPNs',
    filename: '16.1.4 Lab - Implement GRE over IPsec Site-to-Site VPNs.docx',
    category: 'vpn',
    difficulty: 'advanced',
    estimatedDuration: 130,
    description: 'Configure GRE tunnel over IPsec VPN',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'ipsec-vti',
    name: 'Implement IPsec VTI Site-to-Site VPNs',
    filename: '16.1.5 Lab - Implement IPsec VTI Site-to-Site VPNs.docx',
    category: 'vpn',
    difficulty: 'advanced',
    estimatedDuration: 120,
    description: 'Configure IPsec Virtual Tunnel Interface',
    equipment: ['2 routers', '2 switches', '2 PCs'],
    completed: false
  },
  {
    id: 'snmp-syslog',
    name: 'Implement SNMP and Syslog',
    filename: '24.1.3 Lab - Implement SNMP and Syslog.docx',
    category: 'monitoring',
    difficulty: 'intermediate',
    estimatedDuration: 90,
    description: 'Configure SNMPv3 and Syslog for network monitoring',
    equipment: ['2 routers', '2 switches', '1 server'],
    completed: false
  },
  {
    id: 'flexible-netflow',
    name: 'Implement Flexible Netflow',
    filename: '24.1.4 Lab - Implement Flexible Netflow.docx',
    category: 'monitoring',
    difficulty: 'intermediate',
    estimatedDuration: 80,
    description: 'Configure Flexible NetFlow for traffic analysis',
    equipment: ['2 routers', '1 server'],
    completed: false
  },
  {
    id: 'span-technologies',
    name: 'Implement SPAN Technologies',
    filename: '24.1.5 Lab - Implement SPAN Technologies.docx',
    category: 'monitoring',
    difficulty: 'intermediate',
    estimatedDuration: 70,
    description: 'Configure Switched Port Analyzer for traffic monitoring',
    equipment: ['2 switches', '1 server'],
    completed: false
  },
  {
    id: 'ip-sla',
    name: 'Implement IP SLA',
    filename: '24.1.6 Lab - Implement IP SLA.docx',
    category: 'monitoring',
    difficulty: 'intermediate',
    estimatedDuration: 85,
    description: 'Configure IP Service Level Agreement operations',
    equipment: ['2 routers', '1 server'],
    completed: false
  },
  {
    id: 'aaa-authentication',
    name: 'Configure Local and Server-Based AAA Authentication',
    filename: '26.1.4 Lab - Configure Local and Server-Based AAA Authentication.docx',
    category: 'security',
    difficulty: 'intermediate',
    estimatedDuration: 100,
    description: 'Configure AAA authentication using local database and external server',
    equipment: ['2 routers', '1 switch', '1 server'],
    completed: false
  },
  {
    id: 'copp',
    name: 'Implement CoPP',
    filename: '26.1.6 Lab - Implement CoPP.docx',
    category: 'security',
    difficulty: 'advanced',
    estimatedDuration: 90,
    description: 'Configure Control Plane Policing for device protection',
    equipment: ['2 routers', '1 switch'],
    completed: false
  },
  {
    id: 'netconf',
    name: 'Use NETCONF to Access a IOS XE Device',
    filename: '28.1.4 Lab - Use NETCONF to Access a IOS XE Device.docx',
    category: 'automation',
    difficulty: 'advanced',
    estimatedDuration: 85,
    description: 'Configure NETCONF for network device management',
    equipment: ['1 router', '1 server'],
    completed: false
  },
  {
    id: 'restconf',
    name: 'Use RESTCONF to Access an IOS XE Device',
    filename: '28.1.5 Lab - Use RESTCONF to Access an IOS XE Device.docx',
    category: 'automation',
    difficulty: 'advanced',
    estimatedDuration: 85,
    description: 'Configure RESTCONF for network device management',
    equipment: ['1 router', '1 server'],
    completed: false
  }
];

export interface PracticeTest {
  id: string;
  name: string;
  domain: string;
  questions: number;
  duration: number; // in minutes
  passingScore: number;
  attempts: number;
  bestScore?: number;
  completed: boolean;
  completedDate?: string;
}

export const PRACTICE_TESTS: PracticeTest[] = [
  {
    id: 'architecture-assessment',
    name: 'Architecture Domain Assessment',
    domain: 'architecture',
    questions: 30,
    duration: 60,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'virtualization-assessment',
    name: 'Virtualization Domain Assessment',
    domain: 'virtualization',
    questions: 20,
    duration: 45,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'infrastructure-assessment',
    name: 'Infrastructure Domain Assessment',
    domain: 'infrastructure',
    questions: 40,
    duration: 75,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'network-assurance-assessment',
    name: 'Network Assurance Domain Assessment',
    domain: 'network-assurance',
    questions: 20,
    duration: 45,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'security-assessment',
    name: 'Security Domain Assessment',
    domain: 'security',
    questions: 30,
    duration: 60,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'automation-ai-assessment',
    name: 'Automation & AI Domain Assessment',
    domain: 'automation-ai',
    questions: 25,
    duration: 55,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'full-practice-exam-1',
    name: 'Full Practice Exam #1',
    domain: 'comprehensive',
    questions: 100,
    duration: 120,
    passingScore: 85,
    attempts: 0,
    completed: false
  },
  {
    id: 'full-practice-exam-2',
    name: 'Full Practice Exam #2',
    domain: 'comprehensive',
    questions: 100,
    duration: 120,
    passingScore: 85,
    attempts: 0,
    completed: false
  }
];

export interface Lesson {
  id: string;
  title: string;
  domain: string;
  duration: number; // in minutes
  completed: boolean;
  completedDate?: string;
}

export const LESSONS: Lesson[] = [
  // Architecture Lessons
  { id: 'arch-001', title: 'Network Design Fundamentals', domain: 'architecture', duration: 45, completed: false },
  { id: 'arch-002', title: 'Enterprise Campus Design', domain: 'architecture', duration: 60, completed: false },
  { id: 'arch-003', title: 'Data Center Design Principles', domain: 'architecture', duration: 55, completed: false },
  { id: 'arch-004', title: 'SD-Access Architecture Overview', domain: 'architecture', duration: 50, completed: false },
  { id: 'arch-005', title: 'DNA Center Fundamentals', domain: 'architecture', duration: 65, completed: false },
  
  // Virtualization Lessons
  { id: 'virt-001', title: 'VXLAN Fundamentals', domain: 'virtualization', duration: 55, completed: false },
  { id: 'virt-002', title: 'EVPN Control Plane', domain: 'virtualization', duration: 60, completed: false },
  { id: 'virt-003', title: 'Multi-Tenant Networks', domain: 'virtualization', duration: 45, completed: false },
  { id: 'virt-004', title: 'Nexus Virtualization Technologies', domain: 'virtualization', duration: 50, completed: false },
  { id: 'virt-005', title: 'VPC and FEX Configuration', domain: 'virtualization', duration: 55, completed: false },
  
  // Infrastructure Lessons
  { id: 'infra-001', title: 'Advanced OSPFv3 Configuration', domain: 'infrastructure', duration: 65, completed: false },
  { id: 'infra-002', title: 'Multi-Area OSPF Design', domain: 'infrastructure', duration: 70, completed: false },
  { id: 'infra-003', title: 'BGP Route Reflectors', domain: 'infrastructure', duration: 75, completed: false },
  { id: 'infra-004', title: 'BGP Confederations', domain: 'infrastructure', duration: 60, completed: false },
  { id: 'infra-005', title: 'DHCPv6 Implementation', domain: 'infrastructure', duration: 45, completed: false },
  { id: 'infra-006', title: 'Network Infrastructure Services', domain: 'infrastructure', duration: 50, completed: false },
  { id: 'infra-007', title: 'Infrastructure Security Best Practices', domain: 'infrastructure', duration: 55, completed: false },
  
  // Network Assurance Lessons
  { id: 'na-001', title: 'Telemetry Streaming Fundamentals', domain: 'network-assurance', duration: 60, completed: false },
  { id: 'na-002', title: 'Network Assurance Concepts', domain: 'network-assurance', duration: 55, completed: false },
  { id: 'na-003', title: 'Performance Monitoring', domain: 'network-assurance', duration: 50, completed: false },
  { id: 'na-004', title: 'Structured Troubleshooting', domain: 'network-assurance', duration: 65, completed: false },
  { id: 'na-005', title: 'Advanced Troubleshooting Tools', domain: 'network-assurance', duration: 60, completed: false },
  
  // Security Lessons
  { id: 'sec-001', title: 'Firewall Technologies Overview', domain: 'security', duration: 55, completed: false },
  { id: 'sec-002', title: 'VPN Implementation Best Practices', domain: 'security', duration: 60, completed: false },
  { id: 'sec-003', title: 'IPS/IDS Deployment', domain: 'security', duration: 65, completed: false },
  { id: 'sec-004', title: 'Security Automation Fundamentals', domain: 'security', duration: 55, completed: false },
  { id: 'sec-005', title: 'Threat Intelligence Integration', domain: 'security', duration: 50, completed: false },
  
  // Automation & AI Lessons
  { id: 'auto-001', title: 'Python for Network Automation', domain: 'automation-ai', duration: 70, completed: false },
  { id: 'auto-002', title: 'REST API and RESTCONF', domain: 'automation-ai', duration: 65, completed: false },
  { id: 'auto-003', title: 'NETCONF and YANG Modeling', domain: 'automation-ai', duration: 75, completed: false },
  { id: 'auto-004', title: 'Ansible Network Automation', domain: 'automation-ai', duration: 60, completed: false },
  { id: 'auto-005', title: 'AI Operations in Networking', domain: 'automation-ai', duration: 55, completed: false },
  { id: 'auto-006', title: 'Machine Learning for Networks', domain: 'automation-ai', duration: 65, completed: false }
];
