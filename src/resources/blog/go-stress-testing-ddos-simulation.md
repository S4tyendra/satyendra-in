---
title: Stress Testing Servers with Go - A Practical Guide and Custom Tool
date: February 25, 2025
slug: go-stress-testing-ddos-simulation
status: Published
tags: API, Cybersecurity, DDoS, Flood, Go, Networking, Resilience
type: Post
ogDescription: "Building a high-performance HTTP stress testing tool in Go. Simulating DDoS scenarios to harden your infrastructure against SYN floods and slowloris attacks."
summary: "Building a high-performance HTTP stress testing tool in Go. Simulating DDoS scenarios to harden your infrastructure against SYN floods and slowloris attacks."

---

## Beyond `ab`: Building a Custom Go Tool for Advanced Server Stress Testing

---

As developers and system administrators, we're constantly striving to build robust, resilient systems. I certainly am! I spend a lot of time writing unit tests, integration tests, and end-to-end tests. We monitor performance in production. But I always wondered, how do our systems *really* hold up under extreme pressure? How can we proactively identify bottlenecks and weaknesses *before* they lead to downtime and frustrated users? That's where stress testing comes in, and why I ended up on this little project.

While tools like `ab` (Apache Bench) and `wrk` provide basic HTTP load testing capabilities, I found they often fell short when I needed to simulate more complex, realistic attack scenarios or deeply probe the resilience of my infrastructure. I wanted something more! This led me to develop a custom stress testing tool in Go, designed to go far beyond simple HTTP requests. And, I've made it available on GitHub: [github.com/s4tyendra/stress-test](https://github.com/s4tyendra/stress-test). 

### The Need for Advanced Stress Testing

Traditional load testing often focuses on generating a high volume of "well-behaved" traffic. That's valuable, but it doesn't represent the full spectrum of challenges a server might face. I kept thinking about scenarios like:

- **Malicious Attacks:** Distributed Denial of Service (DDoS) attacks come in so many forms, from simple floods of requests to sophisticated exploits targeting specific vulnerabilities. I wanted to see how my system would fare against a SYN flood, a Slowloris attack, or a UDP flood.
- **Resource Exhaustion:** What happens when my server runs out of memory, file descriptors, or available network connections? Does it gracefully degrade, or does it just... crash?
- **Network Disruptions:** How does my application behave under conditions of high latency, packet loss, or intermittent connectivity? I wanted to be able to simulate those conditions.
- **Complex Application Logic:** Modern applications, especially those using GraphQL or WebSockets, have complex interaction patterns. My usual HTTP testing tools just couldn't replicate those.
- **Vulnerability Testing:** I wanted to simulate attempts at complex attacks to see how well my systems could withstand them.

These are the kinds of questions that I designed my stress testing tool to help answer.

### Setting the Stage: Your Testing Environment

Before you even *think* about running a stress test, you need a suitable environment.  Ideally, this should be a dedicated server or VPS that mirrors your production setup as closely as possible.  If you're starting from scratch, I've previously written a comprehensive guide on setting up a secure and optimized Ubuntu VPS:  [Comprehensive guide for setting up a secure and optimized Ubuntu VPS](https://blog.satyendra.in/ubuntu-vps-setup-guide). That guide covers everything from SSH configuration and Nginx installation to setting up Python environments and using Docker – all essential steps for creating a robust testing environment. My current stress testing tool assumes you have a server to target, so that previous guide might be a good starting point.

### Key Features and Design Considerations

The tool I built, and which you can now find on GitHub, addresses these challenges by incorporating a wide range of features, all configurable through command-line flags:

- **Multi-Protocol Support:** It's not just for HTTP. The tool can generate TCP, UDP, and (with appropriate privileges) even raw SYN packets to simulate various network attacks.
- **Modular Attack Vectors:** It supports a variety of attack simulations. I tried to cover a lot of ground:
    - **HTTP Flood:** Overwhelms the server with HTTP requests.
    - **TCP Flood:** Floods with TCP connection attempts.
    - **UDP Flood:** Sends tons of UDP packets.
    - **SYN Flood:** Initiates TCP connections but doesn't complete the handshake (this one needs raw socket access, so be careful!).
    - **Slowloris:** Keeps many connections open, sending data *really* slowly.
    - **DNS Amplification**
    - **ICMP Flood**
    - **HTTP/2 Rapid Reset**
    - **SSL Renegotiation**
    - **Web Socket Exhaustion**
    - **API Fuzzing**
    - **GraphQL Complexity Attacks:** This one was particularly interesting. It exploits the nested nature of GraphQL queries to overload the server. I even built in functionality to fetch the GraphQL schema via introspection and dynamically generate those complex queries.
- **Evasion Techniques (Optional):** To simulate more realistic attacks, the tool can randomize User-Agents, HTTP headers, and request timings. There's even a placeholder for proxy chaining (though I haven't fully implemented that part yet). *Remember, these features should only be used in authorized testing environments.*
- **Resource Constraint Simulation:** I added the ability to set limits on memory usage, file descriptors, and the number of goroutines. This lets me simulate resource exhaustion scenarios and see how the server behaves.
- **Configurable Test Parameters:** You can control pretty much everything – test duration, number of requests, concurrency, connection timeouts, you name it.
- **Warm-up and Cooldown Periods:** To avoid sudden spikes in load, I added warm-up and cooldown phases.
- **Progressive Load Testing:** The load can be gradually increased over time, which is great for identifying breaking points.
- **Detailed Metrics and Logging:** The tool tracks a bunch of metrics like requests per second, success/failure rates, bytes sent/received, and average response time. There's also detailed logging to help debug any issues.
- **Port Scanning:** I included a built-in port scanner to identify open ports on the target system. This is essential for configuring network-level attacks.
- **GraphQL Schema Introspection:** To make the GraphQL stress-testing work effectively, the tool probes for schema information.

### The Power of Go

Go was, for me, the obvious choice for this project:

- **Concurrency:** Go's goroutines and channels make it *so* easy to manage a huge number of concurrent connections and requests.
- **Performance:** Go is compiled, so the tool is fast and efficient.
- **Networking Libraries:** Go's standard library has fantastic support for networking, even down to low-level socket access.
- **Cross-Compilation:** It's easy to build binaries for different operating systems and architectures.

### Implementation Highlights (Conceptual)

The core of the tool, which you can explore in the GitHub repository, revolves around a few key concepts:

1. **Configuration Parsing:** I used the `flag` package to handle command-line arguments. This allows for a *ton* of customization of the test parameters. You can see how this is set up in the `parseFlags()` function in `main.go`.
2. **Signal Handling:** The tool gracefully handles termination signals (like Ctrl+C) to ensure a clean shutdown. This is handled in the `setupSignalHandling()` function.
3. **Worker Pools:** Goroutines are used to create worker pools that execute the different attack types concurrently. Channels are used to distribute work and collect results. Look for the `go func(workerID int)` sections within each attack function (e.g., `httpFlood`, `tcpFlood`).
4. **Context Management:** I used the `context` package extensively to manage timeouts and cancellations. This ensures that tests don't run forever and can be stopped cleanly. You'll see `context.Context` and `context.WithTimeout` used throughout the code.
5. **Metrics Tracking:** A `sync.Mutex` is used to protect shared metrics data, ensuring accurate reporting. The `Metrics` struct and its associated methods in `main.go` handle this.
6. **Port Scanning:** The port scanner uses a goroutine for each port being checked, with a semaphore to limit resource use. This is all within the `scanPorts()` function.
7. **HTTP Flood:** HTTP clients, with configurable timeouts, are used to launch this attack. Check out the `httpFlood()` function.
8. **TCP/UDP Floods:** Functions from the `net` package are used to establish and manage these connections. See `tcpFlood()` and `udpFlood()`.
9. **SYN Flood:** This one leverages raw sockets (again, emphasizing the need for appropriate privileges and *ethical* use!). I've included a placeholder TCP checksum function, but it's important to understand that a real-world implementation would need a library like `gopacket`. The `synFlood()` function is where this logic resides.
10. **Slowloris:** This attack creates connections, sends headers slowly, and transmits partial data over a long period, consuming server resources. The `slowlorisAttack()` function implements this.
11. **GraphQL Complexity:** I wrote a set of functions to retrieve, parse, and generate highly nested GraphQL queries to attempt a complexity attack. These are in the `graphQLComplexityAttack()`, `getGraphQLSchema()`, `generateComplexGraphQLQuery()`, and related functions.

The structure of the main function, which orchestrates everything, can be found in, well, `main()` in `main.go`!

The attack functions generally follow a similar pattern, which you can see by examining any of the attack functions (like `httpFlood`, `tcpFlood`, etc.) in the `main.go` file. They typically involve setting up worker goroutines, using channels for communication, and handling context cancellation.

### Ethical Considerations and Legal Responsibilities

**I can't stress this enough: this is the most important part of this post.** A tool capable of simulating DDoS attacks is powerful, and therefore, inherently dangerous. It *absolutely must* be used responsibly and ethically. Please, please follow these guidelines:

- **Never, ever target systems you do not own or have explicit, written permission to test.** Unauthorized use of this tool is illegal and can lead to serious consequences. I built this for learning and responsible testing, not for causing harm.
- **Understand the potential impact.** Even when testing your own systems, remember that stress testing can cause disruptions and downtime. Schedule tests during off-peak hours and have a rollback plan.
- **Start small.** Begin with low concurrency and short durations. Gradually increase the load as you gain confidence in your system's stability.
- **Monitor closely.** Keep a close eye on your server metrics during the test to identify bottlenecks and potential problems.
- **Respect rate limits.** If you're testing a third-party API, be mindful of their rate limits and terms of service.
- **Use it for good.** The purpose of this tool is to improve system security and resilience, not to cause damage or disruption.

This tool is provided for educational and authorized testing purposes *only*. I am not responsible for any misuse of this tool. You are solely responsible for ensuring that your use of this tool complies with all applicable laws and regulations. Please be responsible.

### Conclusion

> **Building this custom stress testing tool gave me incredible insights into how my systems behave under extreme conditions. It highlighted vulnerabilities I wouldn't have found with my usual testing methods. While the code is complex and requires careful handling, the underlying concepts – understanding different attack vectors, simulating resource exhaustion, and monitoring system behavior under stress – are essential for anyone building robust and reliable systems. I hope sharing this on GitHub will be helpful to others, but again, please use it responsibly. Proactive testing is a key part of building secure and resilient infrastructure.**
>