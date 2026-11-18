import { TechnicalTopic } from '@/types/technical';

export const osTopics: TechnicalTopic[] = [
  {
    id: 'os-01-process-vs-thread',
    number: 1,
    title: 'Process vs Thread Architecture',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A Process is an executing program with its own dedicated memory address space (Text, Data, Heap, Stack). Processes are isolated by the OS; inter-process communication (IPC) requires pipes, sockets, or shared memory. A Thread is a lightweight unit of execution within a process. Threads in the same process share the text, data, and heap segments, but each thread maintains its own private Program Counter (PC), CPU registers, and Stack.',
    diagram: `Process Memory Layout vs Threads:
+-------------------------------------------------------+
|  PROCESS (Independent Virtual Memory Space)           |
|  [ Code / Text Segment ]    [ Global / Data Segment ] |
|  [ Heap (Shared by all threads) ]                     |
|                                                       |
|  Thread 1: [ Registers | PC | Private Stack ]         |
|  Thread 2: [ Registers | PC | Private Stack ]         |
+-------------------------------------------------------+`,
    interviewQuestions: [
      'What are the core trade-offs between Multi-processing and Multi-threading?',
      'Why is thread context switching faster than process context switching?',
      'What resources are shared between threads of the same process?',
    ],
    commonMistakes: [
      'Believing threads share stack memory (each thread has its own call stack!).',
      'Assuming thread crashes do not affect sibling threads (an unhandled exception in one thread terminates the entire process).',
    ],
    revisionNotes: [
      'Process: Separate memory space, heavy context switch (flushes TLB), high fault isolation.',
      'Thread: Shared heap/data/code, light context switch (TLB preserved), private stack & registers.',
      'Threads communicate via shared memory; processes require IPC.',
    ],
  },
  {
    id: 'os-02-process-states',
    number: 2,
    title: 'Process States & 5-State Life Cycle Model',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A process moves through distinct states managed by the OS Process Control Block (PCB): 1. New: Process being created. 2. Ready: Loaded into RAM, waiting for CPU allocation. 3. Running: Instructions being executed on CPU. 4. Waiting / Blocked: Waiting for I/O completion or an event. 5. Terminated: Execution finished, resources being reclaimed. Transitions are controlled by the Short-Term Scheduler (CPU Scheduler).',
    diagram: `Process 5-State Transition Diagram:
       [ New ] ──(Admitted)──> [ Ready ] <────────(Interrupt / Timer Quantum)
                                  │   ▲
                     (Scheduler   │   │
                      Dispatch)   ▼   │
                               [ Running ] ──(Exit)──> [ Terminated ]
                                  │
                             (I/O or Event Wait)
                                  ▼
                               [ Waiting / Blocked ]
                                  │
                             (I/O Completion)
                                  ▼
                               [ Ready ]`,
    interviewQuestions: [
      'Difference between Long-Term, Short-Term, and Medium-Term Schedulers?',
      'What happens to a process when its time quantum expires in Round Robin scheduling?',
      'What is a Zombie Process and an Orphan Process in Linux?',
    ],
    commonMistakes: [
      'Thinking a process transitions directly from Waiting/Blocked back to Running (it MUST return to Ready first!).',
      'Confusing Zombie process (terminated but PCB not reaped by parent) with Orphan process (parent terminated before child).',
    ],
    revisionNotes: [
      'Blocked process always transitions to Ready before it can run again.',
      'Orphan process is adopted by init / systemd (PID 1).',
      'Zombie process occupies a PCB entry in the process table until parent calls wait().',
    ],
  },
  {
    id: 'os-03-cpu-scheduling',
    number: 3,
    title: 'CPU Scheduling: FCFS, SJF, Round Robin & Priority',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'CPU scheduling selects processes from the Ready queue for CPU execution. Algorithms: 1. FCFS (First-Come, First-Served): Non-preemptive, suffers from Convoy Effect. 2. SJF (Shortest Job First): Optimal minimum average waiting time; preemptive version is SRTF (Shortest Remaining Time First). 3. Round Robin (RR): Preemptive, each process gets fixed time quantum (Q); ideal for time-sharing systems. 4. Priority Scheduling: Process with highest priority runs first; starvation prevented via Aging.',
    diagram: `Gantt Chart Example (Round Robin with Time Quantum Q = 2):
Processes: P1(Burst 5), P2(Burst 3), P3(Burst 1)
|  P1  |  P2  |  P3  |  P1  |  P2  |  P1  |
0      2      4      5      7      8      9`,
    interviewQuestions: [
      'What is the Convoy Effect in FCFS scheduling?',
      'How does Round Robin behavior change when time quantum Q is extremely large vs extremely small?',
      'What is Starvation in Priority Scheduling and how does Aging solve it?',
    ],
    commonMistakes: [
      'Choosing too small a time quantum in Round Robin (causes excessive context switching overhead).',
      'Assuming SJF can be implemented perfectly in real general-purpose OS without past burst history prediction.',
    ],
    revisionNotes: [
      'FCFS: Non-preemptive, simple, suffers from convoy effect.',
      'SJF/SRTF: Minimum average waiting time, risk of starvation for long processes.',
      'Round Robin: Fair, preemptive, responsive, performance depends on quantum size.',
      'Aging: Gradually increases priority of waiting processes to eliminate starvation.',
    ],
  },
  {
    id: 'os-04-context-switching',
    number: 4,
    title: 'Context Switching & Process Control Block (PCB)',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'Context switching is the mechanism of saving the current CPU state (registers, program counter, stack pointer) of a running process into its Process Control Block (PCB) and restoring the saved state of another process. Context switching is pure OS overhead (no useful work is done). Process context switching invalidates the Translation Lookaside Buffer (TLB), whereas thread context switching keeps the same address space and preserves TLB entries.',
    diagram: `Context Switch Timeline:
Process P0        Operating System (Kernel)       Process P1
    │
[Running]
    │──(Interrupt / System Call)──>
    │                         Save state into PCB0
    │                         Schedule next process
    │                         Restore state from PCB1
    │                                  ──> [Running]
    │                                          │`,
    interviewQuestions: [
      'What specific state information is stored inside a Process Control Block (PCB)?',
      'Why is context switching considered pure system overhead?',
      'How does Translation Lookaside Buffer (TLB) flushing affect process context switch performance?',
    ],
    commonMistakes: [
      'Believing CPU executes application instructions during context switching.',
      'Thinking thread switching requires swapping page tables (threads share page tables).',
    ],
    revisionNotes: [
      'PCB stores: PID, Process State, Program Counter, CPU Registers, Memory Limits, Open Files.',
      'Context switch is triggered by timer interrupts, I/O requests, or voluntary yielding.',
      'Thread switch does not flush the MMU/TLB; process switch flushes TLB, making it slower.',
    ],
  },
  {
    id: 'os-05-synchronization',
    number: 5,
    title: 'Process Synchronization & Race Conditions',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A Race Condition occurs when multiple threads or processes concurrently read and write shared data, and the final outcome depends on the non-deterministic order of execution. Process Synchronization ensures concurrent processes cooperate correctly without data corruption using synchronization primitives. Hardware primitives like Test-and-Set and Compare-And-Swap (CAS) provide atomic instructions.',
    diagram: `Race Condition on counter++:
Thread A: Reads counter (5)
Thread B: Reads counter (5)
Thread A: Computes 5 + 1 = 6, writes back counter = 6
Thread B: Computes 5 + 1 = 6, writes back counter = 6
Final counter = 6 (Lost Update! Expected 7)`,
    interviewQuestions: [
      'What is a Race Condition and how can it be reproduced?',
      'What is an Atomic Operation and why are hardware atomic instructions necessary?',
      'What is Peterson’s Algorithm and what are its limitations on modern multi-core CPUs?',
    ],
    commonMistakes: [
      'Assuming counter++ is atomic in C/C++ (it compiles to 3 machine instructions: READ, MODIFY, WRITE).',
      'Relying on volatile keyword for synchronization (volatile prevents compiler caching, not CPU race conditions).',
    ],
    revisionNotes: [
      'Race condition: Concurrent access to shared resource where at least one thread writes.',
      'Atomic operation: Uninterruptible operation that executes completely or not at all.',
      'Hardware instructions (CAS, atomic exchange) are the foundation of locks and semaphores.',
    ],
  },
  {
    id: 'os-06-mutex-vs-semaphore',
    number: 6,
    title: 'Mutex vs Semaphore',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A Mutex (Mutual Exclusion) is a locking mechanism: only the single thread that locked the mutex can unlock it (ownership semantics). A Semaphore is a signaling mechanism using an integer counter: wait() / P() decrements the counter (blocking if <= 0); signal() / V() increments the counter. Counting Semaphores manage access to a finite pool of N resources. Binary Semaphores have values 0 or 1, but lack ownership (any thread can signal).',
    diagram: `Mutex vs Semaphore:
+-------------------+----------------------------+---------------------------------+
| Feature           | Mutex                      | Semaphore                       |
+-------------------+----------------------------+---------------------------------+
| Mechanism         | Locking primitive          | Signaling primitive             |
| Ownership         | Yes (locker must unlock)   | No (any thread can signal)      |
| Capacity          | 1 thread only              | N resources (Counting Semaphore)|
| Use Case          | Exclusive Critical Section | Resource pools, Producer-Consumer|
+-------------------+----------------------------+---------------------------------+`,
    interviewQuestions: [
      'What is the fundamental difference between a Mutex and a Binary Semaphore?',
      'What is Priority Inversion and how does Priority Inheritance resolve it?',
      'What is a Spinlock and when is it preferred over a sleeping Mutex?',
    ],
    commonMistakes: [
      'Unlocking a mutex from a different thread than the one that acquired it (triggers undefined behavior).',
      'Using spinlocks on single-core CPUs (wastes CPU cycles spinning against itself).',
    ],
    revisionNotes: [
      'Mutex: Strict ownership. Only owner can release. Strictly 1 thread.',
      'Semaphore: Counter + queue. Any thread can post/signal. Manages N shared resources.',
      'Priority Inheritance: Dynamically elevates lock-holding lower-priority thread to prevent starvation.',
    ],
  },
  {
    id: 'os-07-critical-section',
    number: 7,
    title: 'Critical Section Problem & Criteria',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A Critical Section is a segment of code that accesses shared resources (variables, files) that must not be accessed concurrently by more than one process. Any valid solution to the Critical Section problem must satisfy 3 mandatory criteria: 1. Mutual Exclusion: At most one process executes in the critical section at any time. 2. Progress: If no process is in the critical section, only processes wanting to enter can participate in deciding who enters next. 3. Bounded Waiting: A bound must exist on how many times other processes can enter before a requesting process is granted access.',
    diagram: `Critical Section Structure:
do {
    [ Entry Section ]   <-- Request permission (acquire lock)
        [ Critical Section ]  <-- Access shared data
    [ Exit Section ]    <-- Release lock / signal others
        [ Remainder Section ] <-- Local independent work
} while (true);`,
    interviewQuestions: [
      'State and explain the three requirements for any valid solution to the Critical Section problem.',
      'What is Bounded Waiting and why is it necessary to prevent starvation?',
      'How does a monitor in modern languages (e.g. Java synchronized) simplify critical sections?',
    ],
    commonMistakes: [
      'Forgetting the Bounded Waiting condition (can cause indefinite postponement/starvation of a process).',
      'Confusing the Critical Section problem with Deadlock.',
    ],
    revisionNotes: [
      'Mutual Exclusion: Only 1 process inside critical section.',
      'Progress: Selection cannot be postponed indefinitely if critical section is free.',
      'Bounded Waiting: No process waits indefinitely (guarantees fairness / anti-starvation).',
    ],
  },
  {
    id: 'os-08-deadlock-handling',
    number: 8,
    title: 'Deadlocks: 4 Coffman Conditions, Prevention & Banker’s Algorithm',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'A Deadlock occurs when every process in a set is waiting for an event that only another process in the set can cause. All 4 Coffman Conditions must hold simultaneously for a deadlock to exist: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait. Breaking ANY one condition prevents deadlock. Deadlock Avoidance uses Banker’s Algorithm to test safe states before granting resources.',
    diagram: `Resource Allocation Graph (RAG) Deadlock:
    [ Process P1 ] ──(Requests)──> [ Resource R1 ]
          ▲                               │
      (Allocated)                     (Allocated)
          │                               ▼
    [ Resource R2 ] <──(Requests)── [ Process P2 ]
    (Circular cycle with single-instance resources = Deadlock!)`,
    interviewQuestions: [
      'What are the 4 Coffman conditions required for a deadlock to occur?',
      'How does ordering all resource acquisitions numerically prevent Circular Wait?',
      'What is Banker’s Algorithm and what is a "Safe State"?',
    ],
    commonMistakes: [
      'Assuming cycles in Resource Allocation Graphs always mean deadlock (with multi-instance resources, a cycle does not guarantee deadlock).',
      'Confusing Deadlock Prevention (breaking 1 of 4 conditions statically) with Deadlock Avoidance (dynamic safety checking via Banker’s Algorithm).',
    ],
    revisionNotes: [
      '4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
      'Break Circular Wait: Enforce strict numerical acquisition order for all locks.',
      'Banker’s Algorithm: Avoids deadlocks by verifying system remains in a Safe State.',
      'Ostrich Algorithm: Ignore deadlocks if they occur rarely (standard approach in modern desktop OS).',
    ],
  },
  {
    id: 'os-09-paging-vs-segmentation',
    number: 9,
    title: 'Memory Management: Paging vs Segmentation',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'Paging divides virtual memory into fixed-size blocks called Pages and physical memory into identical-size frames (typically 4KB). Managed by the Memory Management Unit (MMU) via Page Tables. Paging eliminates external fragmentation but can suffer from internal fragmentation (unused space in the last page). Segmentation divides memory into variable-sized logical segments (code, stack, heap); it eliminates internal fragmentation but causes external fragmentation.',
    diagram: `Paging Address Translation:
Virtual Address = [ Page Number (p) | Offset (d) ]
                         │
                         ▼
                    Page Table
                    [ p -> Frame Number (f) ]
                         │
                         ▼
Physical Address = [ Frame Number (f) | Offset (d) ]`,
    interviewQuestions: [
      'Difference between Internal Fragmentation and External Fragmentation?',
      'Why does Paging eliminate External Fragmentation completely?',
      'What is the Translation Lookaside Buffer (TLB) and what is a TLB Miss?',
    ],
    commonMistakes: [
      'Confusing internal fragmentation (wasted memory INSIDE an allocated frame) with external fragmentation (wasted unallocated scattered memory).',
      'Thinking offsets change during address translation (page offset d maps directly to frame offset d without modification).',
    ],
    revisionNotes: [
      'Paging: Fixed-size blocks (pages -> frames). No external fragmentation. Internal fragmentation possible.',
      'Segmentation: Variable-size logical blocks. No internal fragmentation. External fragmentation possible.',
      'Modern OS uses Paged Segmentation (segments divided into fixed pages).',
    ],
  },
  {
    id: 'os-10-virtual-memory',
    number: 10,
    title: 'Virtual Memory, Demand Paging & Thrashing',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'Virtual Memory allows processes to execute without being fully resident in physical RAM by giving each process an illusion of a massive contiguous memory space. Demand Paging loads pages into physical RAM only when referenced. When an unmapped page is accessed, the hardware triggers a Page Fault interrupt; the OS traps to the kernel, fetches the page from swap/disk into an empty frame, updates the Page Table, and restarts the instruction. Thrashing occurs when the OS spends more time swapping pages than executing code.',
    diagram: `Page Fault Handling Steps:
1. Instruction accesses unmapped page.
2. MMU detects valid-invalid bit = 0 -> Page Fault Trap.
3. OS locates page on backing store (disk/swap).
4. OS reads page into free physical frame.
5. OS updates Page Table (valid bit = 1).
6. Instruction restarts.`,
    interviewQuestions: [
      'What is a Page Fault and what are the exact steps taken by the OS to service it?',
      'What is Thrashing and what is the Working Set Model used to prevent it?',
      'Why is virtual memory larger than physical RAM?',
    ],
    commonMistakes: [
      'Thinking a page fault is an application crash (it is a standard hardware interrupt handled transparently by the OS kernel).',
      'Confusing a Page Fault with a Segmentation Fault (SIGSEGV occurs when accessing illegal/unauthorized addresses).',
    ],
    revisionNotes: [
      'Demand Paging: "Lazy swapper" loads pages into RAM only upon access.',
      'Page Fault: Hardware trap when page is not present in physical RAM.',
      'Thrashing: Occurs when sum of working sets > total physical RAM. Solved by killing processes or adding RAM.',
    ],
  },
  {
    id: 'os-11-page-replacement',
    number: 11,
    title: 'Page Replacement Algorithms: FIFO, LRU, Optimal & Belady’s Anomaly',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'When physical RAM is full and a page fault occurs, a page replacement algorithm selects which victim frame to evict to disk. 1. FIFO (First-In, First-Out): Evicts oldest loaded page; suffers from Belady’s Anomaly. 2. Optimal (OPT / MIN): Evicts page that will not be used for the longest future period (theoretical benchmark). 3. LRU (Least Recently Used): Evicts page that has not been accessed for the longest time (approximated via Clock Algorithm / Second Chance).',
    diagram: `Belady’s Anomaly (FIFO):
More frames can sometimes result in MORE page faults!
Reference String: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5
- With 3 frames: 9 page faults
- With 4 frames: 10 page faults! (Anomaly demonstrated)`,
    interviewQuestions: [
      'What is Belady’s Anomaly and which page replacement algorithms are immune to it?',
      'How is Least Recently Used (LRU) implemented in software and hardware?',
      'Why is Optimal Page Replacement impossible to implement in general-purpose operating systems?',
    ],
    commonMistakes: [
      'Believing LRU or Optimal algorithms suffer from Belady’s Anomaly (stack algorithms are provably immune).',
      'Assuming pure LRU is used directly in modern OS (it is too expensive; the Clock / Second-Chance algorithm is used).',
    ],
    revisionNotes: [
      'FIFO: Simplest, suffers from Belady’s Anomaly.',
      'Optimal: Lowest page fault rate, requires future knowledge (impossible in practice).',
      'LRU: Best practical heuristic, stack algorithm, immune to Belady’s Anomaly.',
      'Clock / Second Chance algorithm approximates LRU using a reference bit.',
    ],
  },
  {
    id: 'os-12-stack-vs-heap',
    number: 12,
    title: 'Stack vs Heap Memory: OS & Architecture Perspective',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'From an OS virtual address perspective, the Stack grows downward from high memory addresses, while the Heap grows upward from low memory addresses toward each other. The Stack allocates fixed call frames containing local variables, return pointers, and saved registers automatically managed by the Stack Pointer (SP). The Heap provides dynamic memory allocated at runtime via system calls (brk, sbrk, mmap in Linux), managed by runtime allocators (malloc/free).',
    diagram: `Virtual Address Space Layout:
High Memory 0xFFFFFFFF
+------------------------------------+
|  Kernel Space                      |
+------------------------------------+
|  User Stack (Grows Downward |)     |
|              v                     |
|                                    |
|              ^                     |
|  Heap (Grows Upward |) (via brk)   |
+------------------------------------+
|  BSS (Uninitialized Globals)       |
|  Data (Initialized Globals)        |
|  Text (Binary Machine Code)        |
+------------------------------------+
Low Memory  0x00000000`,
    interviewQuestions: [
      'How does the OS manage stack growth and detect Stack Overflow?',
      'What system calls are invoked by the OS to allocate heap memory (brk, sbrk, mmap)?',
      'What is a Guard Page in virtual memory protection?',
    ],
    commonMistakes: [
      'Assuming malloc makes a kernel syscall for every single small allocation (it batches via brk/mmap and manages an internal pool).',
      'Confusing the data structure "Heap" (priority queue) with OS "Heap" (dynamic memory region).',
    ],
    revisionNotes: [
      'Stack: LIFO, automatic, fast SP pointer movement, fixed limit (ulimit -s).',
      'Heap: Dynamic runtime sizing, fragmented, managed via brk() and mmap().',
      'A Guard Page at the bottom of the stack triggers SIGSEGV on stack overflow.',
    ],
  },
  {
    id: 'os-13-multithreading',
    number: 13,
    title: 'Multithreading Models & Concurrency Issues',
    category: 'os',
    subject: 'Operating Systems',
    codeLanguage: 'text',
    explanation:
      'Multithreading models map User-Level Threads (ULT, managed by user libraries without kernel awareness) to Kernel-Level Threads (KLT, managed directly by the OS scheduler). Models: 1. Many-to-One: Fast context switches, but if one thread blocks on I/O, the entire process blocks. 2. One-to-One (Standard in Linux/Windows): True parallelism across multi-cores; each thread is scheduled independently. 3. Many-to-Many: Multiplexes user threads onto kernel threads.',
    diagram: `One-to-One Model (Modern Linux / Windows / POSIX):
User Space:   [ User Thread 1 ]  [ User Thread 2 ]  [ User Thread 3 ]
                      │                  │                  │
Kernel Space: [ Kernel Thread 1] [ Kernel Thread 2] [ Kernel Thread 3]
                      │                  │                  │
Hardware:     [ Core 0 ]         [ Core 1 ]         [ Core 2 ]`,
    interviewQuestions: [
      'Difference between User-Level Threads and Kernel-Level Threads?',
      'What is the difference between Concurrency and Parallelism?',
      'What is Thread Pool and why is it preferred over creating threads ad-hoc?',
    ],
    commonMistakes: [
      'Equating Concurrency with Parallelism (Concurrency is dealing with multiple things at once; Parallelism is doing multiple things simultaneously on multiple cores).',
      'Spawning thousands of OS threads without a thread pool, exhausting kernel memory and causing context switch thrashing.',
    ],
    revisionNotes: [
      'Concurrency: Interleaved execution on single or multi cores.',
      'Parallelism: Simultaneous execution on multiple physical cores.',
      'One-to-One model provides true multi-core hardware parallelism in modern OS.',
    ],
  },
];
