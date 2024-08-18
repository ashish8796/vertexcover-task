# Project Notes: Trade-offs and Scalability

## Introduction

This document highlights key decisions made during the development of the Coupon Code Service, along with the trade-offs involved and potential scalability challenges as we grow.

## Trade-offs

### 1. **In-Memory Data Storage**

- **Pros:** Simple and fast for small-scale use; easy to implement.
- **Cons:** No data persistence; limited by server memory; not suitable for large-scale applications.

### 2. **Self-Incrementing IDs**

- **Pros:** Ensures unique IDs with minimal complexity.
- **Cons:** Not scalable in a distributed system; might need a switch to UUIDs or centralized ID generation.

### 3. **Basic Error Handling**

- **Pros:** Straightforward, sufficient for a basic API.
- **Cons:** Lacks granularity; might need more detailed handling and logging as the system grows.

## Scalability Challenges

### 1. **Data Persistence**

- **Challenge:** In-memory storage doesn’t scale; data is lost on server restart.
- **Solution:** Transition to a persistent database (e.g., PostgreSQL, MongoDB).

### 2. **Distributed Systems**

- **Challenge:** Managing unique IDs across multiple servers.
- **Solution:** Adopt UUIDs or implement a centralized ID service.

### 3. **Concurrency**

- **Challenge:** Risk of race conditions with simultaneous coupon applications.
- **Solution:** Use database transactions or queue requests to manage concurrency.

### 4. **Performance**

- **Challenge:** Potential slowdowns with growing data volume.
- **Solution:** Optimize with caching, better data structures, and database-backed storage.
