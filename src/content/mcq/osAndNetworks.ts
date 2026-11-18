import { TestQuestion } from '@/types/mockTest';

export const osMCQs: TestQuestion[] = [
  {
    id: 'tech-os-01',
    question: 'What is the main difference between a Process and a Thread?',
    options: [
      'A process has its own isolated virtual address space; threads within the same process share the process address space, heap, and open files while maintaining their own stack and registers',
      'Processes run in user mode, while threads run exclusively in kernel mode',
      'Threads cannot be scheduled by the OS kernel',
      'Processes share memory by default; threads do not',
    ],
    correctOptionIndex: 0,
    explanation:
      'A process is an isolated execution unit with its own memory space. Threads are lightweight execution units within a process sharing code, data, and heap.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-02',
    question: 'Which of the following are the four Coffman conditions necessary for a Deadlock to occur?',
    options: [
      'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'Mutual Exclusion, Race Condition, Paging, Starvation',
      'Preemption, Context Switching, Deadlock Avoidance, Aging',
      'FCFS, Round Robin, Multilevel Feedback, Critical Section',
    ],
    correctOptionIndex: 0,
    explanation:
      'A deadlock can only occur if all four conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-03',
    question: 'What is "Belady’s Anomaly" in Operating Systems?',
    options: [
      'CPU utilization drops when adding more threads',
      'In FIFO page replacement, increasing the number of allocated page frames can paradoxically increase the number of page faults',
      'Disk seeks take longer on modern SSDs',
      'Processes with high priority starve lower priority processes',
    ],
    correctOptionIndex: 1,
    explanation:
      'Belady’s Anomaly describes cases where granting more physical page frames causes more page faults under the FIFO replacement algorithm.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-04',
    question: 'What is "Thrashing" in an operating system?',
    options: [
      'When high disk I/O causes CPU temperature to spike',
      'When a system spends more time swapping pages in and out of virtual memory than executing actual process instructions',
      'A hardware fault where CPU cores desynchronize',
      'Rapid switching between user and kernel modes',
    ],
    correctOptionIndex: 1,
    explanation:
      'Thrashing occurs when the total working sets of active processes exceed available physical RAM, resulting in continuous page faulting and near-zero CPU throughput.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-05',
    question: 'What is the purpose of the Translation Lookaside Buffer (TLB)?',
    options: [
      'To translate C++ code into assembly instructions',
      'A fast hardware cache in the MMU that stores recent virtual-to-physical address translations to avoid multiple memory lookups',
      'To manage network packets arriving on Ethernet ports',
      'To buffer keyboard input before user programs read it',
    ],
    correctOptionIndex: 1,
    explanation:
      'The TLB is a high-speed associative hardware cache. A TLB hit resolves virtual-to-physical addresses in single-digit clock cycles without querying the in-RAM page table.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-06',
    question: 'What is the key difference between a Mutex and a Counting Semaphore?',
    options: [
      'A Mutex has ownership (only the thread that locked it can unlock it) and binary state (0/1); a Counting Semaphore is a signaling mechanism with an integer counter (can be unlocked by any thread)',
      'A Mutex is implemented in software; a semaphore is strictly hardware',
      'Semaphores cannot prevent race conditions',
      'A Mutex allows multiple threads into the critical section simultaneously',
    ],
    correctOptionIndex: 0,
    explanation:
      'A Mutex is a locking mechanism with thread ownership. A Semaphore is a signaling integer mechanism allowing $N$ concurrent permits.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-07',
    question: 'Which CPU scheduling algorithm can suffer from the "Convoy Effect"?',
    options: ['Round Robin (RR)', 'First-Come, First-Served (FCFS)', 'Shortest Job First (SJF)', 'Priority Scheduling'],
    correctOptionIndex: 1,
    explanation:
      'In FCFS, if a long CPU-bound process occupies the CPU first, all subsequent short I/O-bound processes are blocked waiting in the ready queue, lowering utilization.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-08',
    question: 'What is a "Context Switch" in OS scheduling?',
    options: [
      'Switching between two hard disk drives',
      'Saving the state (registers, program counter, stack pointer) of the currently running process and restoring the state of another ready process to resume execution',
      'Converting source code from C to C++',
      'Changing screen resolution on modern GPUs',
    ],
    correctOptionIndex: 1,
    explanation:
      'A context switch stores CPU register states in the Process Control Block (PCB) and loads another process’s PCB so the CPU can multitask.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-09',
    question: 'What is a "Zombie Process" in Unix/Linux?',
    options: [
      'A process that has completed execution, but its exit status remains in the process table because its parent has not yet read it via `wait()`',
      'A process that consumes 100% CPU without doing work',
      'A process whose parent terminated, leaving it adopted by `init` / `systemd`',
      'A process infected by malware',
    ],
    correctOptionIndex: 0,
    explanation:
      'When a child exits, it frees memory but keeps an entry in the process table so the parent can inspect its return code via `wait()`. Until the parent does, it is a Zombie.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-10',
    question: 'What is an "Orphan Process"?',
    options: [
      'A process whose parent process terminated before the child, causing it to be adopted by `init` / PID 1',
      'A process with no assigned priority',
      'A process that has no threads',
      'A process running on a secondary core',
    ],
    correctOptionIndex: 0,
    explanation:
      'If a parent process terminates before its child, the child becomes an orphan and is immediately adopted by the root `init` or `systemd` process (PID 1).',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-11',
    question: 'What is the purpose of "Aging" in CPU scheduling?',
    options: [
      'To decommission old computer hardware',
      'To gradually increase the priority of processes that wait in the system for a long time, preventing Starvation',
      'To delete temporary files after 30 days',
      'To flush the CPU L1 cache periodically',
    ],
    correctOptionIndex: 1,
    explanation:
      'Aging prevents indefinite starvation in priority scheduling by incrementally boosting the priority of waiting processes over time.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-12',
    question: 'Which page replacement algorithm gives the lowest possible page fault rate and is used as a theoretical benchmark?',
    options: ['FIFO (First-In, First-Out)', 'LRU (Least Recently Used)', 'Optimal Page Replacement (OPT / Bélády’s Algorithm)', 'Clock Algorithm'],
    correctOptionIndex: 2,
    explanation:
      'The Optimal algorithm replaces the page that will not be used for the longest period in the future. It is theoretical because future memory references cannot be predicted.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-13',
    question: 'What is Internal Fragmentation in memory management?',
    options: [
      'Wasted memory space when free memory is broken into chunks too small to satisfy requests',
      'Wasted allocated memory space inside a partition when an allocated block is larger than the requested size',
      'Damage to physical RAM circuit boards',
      'Fragmentation of database transaction logs',
    ],
    correctOptionIndex: 1,
    explanation:
      'Internal fragmentation occurs when fixed-size blocks (e.g. 4KB pages) are allocated to processes that need fewer bytes, leaving unused space inside the block.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Medium',
  },
  {
    id: 'tech-os-14',
    question: 'What is the Critical Section Problem in multi-threaded programming?',
    options: [
      'Designing a protocol so that when one process/thread executes code accessing a shared resource, no other process is allowed to execute in its critical section',
      'A hardware error when the power supply drops voltage',
      'A compiler failure during syntax analysis',
      'Handling stack overflow in deep recursion',
    ],
    correctOptionIndex: 0,
    explanation:
      'The Critical Section problem requires Mutual Exclusion, Progress, and Bounded Waiting when accessing shared memory or data structures.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 'tech-os-15',
    question: 'What is Banker’s Algorithm used for?',
    options: ['Deadlock Detection', 'Deadlock Prevention', 'Deadlock Avoidance', 'Memory Compaction'],
    correctOptionIndex: 2,
    explanation:
      'Banker’s algorithm tests for safe states before allocating resources, ensuring that a system will never enter an unsafe state that could lead to a deadlock.',
    category: 'technical',
    subject: 'Operating Systems',
    difficulty: 'Hard',
  },
];

export const networkMCQs: TestQuestion[] = [
  {
    id: 'tech-cn-01',
    question: 'At which OSI layer does the IP (Internet Protocol) and routing operate?',
    options: ['Data Link Layer (Layer 2)', 'Network Layer (Layer 3)', 'Transport Layer (Layer 4)', 'Session Layer (Layer 5)'],
    correctOptionIndex: 1,
    explanation:
      'The Network Layer (Layer 3) is responsible for logical addressing (IP addresses) and routing packets across networks.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-02',
    question: 'What are the three steps in the TCP Three-Way Handshake to establish a connection?',
    options: [
      'SYN $\\to$ SYN-ACK $\\to$ ACK',
      'ACK $\\to$ SYN $\\to$ FIN',
      'SYN $\\to$ ACK $\\to$ DATA',
      'HELLO $\\to$ CHALLENGE $\\to$ ACCEPT',
    ],
    correctOptionIndex: 0,
    explanation:
      'Client sends SYN (synchronize seq num), Server replies with SYN-ACK (acknowledging client and sending server seq num), Client sends ACK.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-03',
    question: 'What is the key difference between TCP and UDP at the Transport Layer?',
    options: [
      'TCP is connection-oriented, reliable, orders packets, and has flow/congestion control; UDP is connectionless, lightweight, and does not guarantee delivery',
      'UDP encrypts all packets, while TCP does not',
      'TCP only runs over optical fiber; UDP runs over wireless',
      'UDP packets have larger header sizes than TCP',
    ],
    correctOptionIndex: 0,
    explanation:
      'TCP provides reliable in-order byte streams with retransmission and flow control. UDP provides fast, low-overhead datagrams without delivery guarantees.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-04',
    question: 'What is the role of ARP (Address Resolution Protocol)?',
    options: [
      'Translates human-readable domain names (e.g. google.com) into IP addresses',
      'Translates a known IPv4 address into a physical MAC address on a local network',
      'Assigns dynamic IP addresses to host machines',
      'Encrypts packets passing through routers',
    ],
    correctOptionIndex: 1,
    explanation:
      'ARP broadcasts on the local data link layer to find the physical MAC address corresponding to a target IP address.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cn-05',
    question: 'What protocol resolves human-friendly domain names like `google.com` into numerical IP addresses?',
    options: ['DHCP', 'DNS', 'SNMP', 'BGP'],
    correctOptionIndex: 1,
    explanation:
      'DNS (Domain Name System) maps hostnames to IP addresses using a hierarchical distributed database of root, TLD, and authoritative name servers.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-06',
    question: 'What are the 4 steps of the DHCP (Dynamic Host Configuration Protocol) DORA process?',
    options: [
      'Discover $\\to$ Offer $\\to$ Request $\\to$ Acknowledge',
      'Deliver $\\to$ Obtain $\\to$ Receive $\\to$ Authenticate',
      'Domain $\\to$ Origin $\\to$ Route $\\to$ Address',
      'Detect $\\to$ Open $\\to$ Reserve $\\to$ Allocate',
    ],
    correctOptionIndex: 0,
    explanation:
      'DHCP uses DORA: 1. DHCP Discover (client broadcast), 2. DHCP Offer (server offer), 3. DHCP Request (client request), 4. DHCP Acknowledge (server ACK).',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cn-07',
    question: 'What is the default port number used for HTTPS (HTTP over TLS/SSL)?',
    options: ['80', '8080', '443', '22'],
    correctOptionIndex: 2,
    explanation:
      'Standard HTTP uses port 80; encrypted HTTPS uses port 443; SSH uses port 22.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-08',
    question: 'How many usable host IP addresses are available in a `/24` IPv4 subnet mask (`255.255.255.0`)?',
    options: ['256', '254', '255', '512'],
    correctOptionIndex: 1,
    explanation:
      'A `/24` subnet has $32 - 24 = 8$ host bits ($2^8 = 256$ total addresses). Subtracting 2 (network address and broadcast address) gives $254$ usable host IPs.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cn-09',
    question: 'What is the primary difference between a Network Switch and a Router?',
    options: [
      'A switch forwards frames at Layer 2 based on MAC addresses within a local LAN; a router forwards packets at Layer 3 based on IP addresses between different networks',
      'A switch operates at Layer 7; a router operates at Layer 1',
      'Switches only work with wireless signals',
      'Routers cannot connect to the internet',
    ],
    correctOptionIndex: 0,
    explanation:
      'Switches operate at Layer 2 (Data Link) using MAC address tables. Routers operate at Layer 3 (Network) using routing tables to route across subnets.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-10',
    question: 'In TCP congestion control, what happens during the "Slow Start" phase?',
    options: [
      'The congestion window (cwnd) increases by 1 MSS for every received ACK, effectively doubling exponentially every round-trip time (RTT)',
      'The congestion window is kept strictly constant at 1 MSS',
      'Packets are intentionally delayed by 5 seconds',
      'The sender switches to UDP mode',
    ],
    correctOptionIndex: 0,
    explanation:
      'Despite its name, Slow Start increases `cwnd` exponentially (doubling each RTT) until the slow-start threshold (`ssthresh`) is reached.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Hard',
  },
  {
    id: 'tech-cn-11',
    question: 'How many bits are in an IPv4 address and an IPv6 address, respectively?',
    options: ['32 bits and 64 bits', '32 bits and 128 bits', '64 bits and 128 bits', '16 bits and 32 bits'],
    correctOptionIndex: 1,
    explanation:
      'IPv4 addresses are 32 bits (4 octets, e.g. 192.168.1.1). IPv6 addresses are 128 bits represented in hexadecimal (e.g. 2001:0db8::1).',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-12',
    question: 'What is the purpose of the TTL (Time to Live) field in an IPv4 packet header?',
    options: [
      'To record the total download time of a file',
      'An integer counter decremented by 1 at each router hop to prevent packets from looping endlessly in routing loops',
      'To schedule packet deletion on the receiver disk',
      'To verify the cryptographic signature of the payload',
    ],
    correctOptionIndex: 1,
    explanation:
      'Each router that processes the packet decrements TTL by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is returned.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Medium',
  },
  {
    id: 'tech-cn-13',
    question: 'What does a `403 Forbidden` HTTP status code mean?',
    options: [
      'The requested page was moved permanently',
      'The server understands the request, but refuses to authorize access (insufficient permissions)',
      'The server cannot find the requested resource',
      'An internal server crash occurred',
    ],
    correctOptionIndex: 1,
    explanation:
      '`403 Forbidden` indicates the client identity is known but does not have permission to access the resource. `401 Unauthorized` means authentication is missing.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Easy',
  },
  {
    id: 'tech-cn-14',
    question: 'How does HTTP/2 achieve superior performance compared to HTTP/1.1?',
    options: [
      'By multiplexing multiple requests and responses concurrently over a single TCP connection using binary framing, header compression (HPACK), and server push',
      'By replacing TCP with UDP',
      'By disabling SSL/TLS encryption',
      'By limiting requests to 100 bytes',
    ],
    correctOptionIndex: 0,
    explanation:
      'HTTP/2 eliminates head-of-line blocking at the application layer through multiplexed binary frames over a single persistent TCP socket.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Hard',
  },
  {
    id: 'tech-cn-15',
    question: 'What is NAT (Network Address Translation)?',
    options: [
      'A method that remaps private non-routable IP addresses to one or more public globally routable IP addresses, conserving public IPv4 space',
      'A DNS server extension for caching domain names',
      'A protocol for synchronizing computer clocks',
      'A hardware feature that prevents Ethernet collisions',
    ],
    correctOptionIndex: 0,
    explanation:
      'NAT allows entire home or corporate private LAN networks (e.g. 192.168.x.x) to access the internet using a single public IP address assigned by the ISP.',
    category: 'technical',
    subject: 'Computer Networks',
    difficulty: 'Medium',
  },
];
