# Category 2: Software Testing Theory & Strategy (10 Questions)

## 1. What is the "Test Pyramid" and how do you apply it?
**Answer:** It's a strategy favoring a large base of Unit tests, fewer API tests, and even fewer UI tests. I apply it by moving validation to the API layer whenever possible, reserving UI tests for critical "Happy Paths" and visual verification.

## 2. Explain the difference between Smoke, Sanity, and Regression testing.
**Answer:** 
- **Smoke:** Critical "showstopper" functions (e.g., "Can I log in?").
- **Sanity:** Verifies a specific bug fix or narrow change.
- **Regression:** Full-scale testing to ensure new changes didn't break existing features.

## 3. What is "Shift-Left Testing"?
**Answer:** It's the practice of moving testing earlier in the SDLC. It involves QAs participating in requirement refinement, early API testing, and pair-testing with developers before a feature is even "finished."

## 4. How do you perform Risk-Based Testing?
**Answer:** I categorize features by **Impact** and **Probability of Failure**. High-risk features (e.g., checkout flows) get 100% automation and deep manual exploratory testing, while low-risk features get minimal smoke coverage.

## 5. Describe your defect management process.
**Answer:** Once a bug is confirmed, I log it in Jira with a clear title, reproduction steps, expected/actual results, and attachments (logs/traces). I track it through the lifecycle: Open -> Fixed -> Re-test -> Closed.

## 6. Difference between Boundary Value Analysis (BVA) and Equivalence Partitioning (EP).
**Answer:** 
- **EP:** Grouping inputs into sets that should behave the same (e.g., age 18-65). I test one value from each group.
- **BVA:** Testing the "edges" of those groups (e.g., testing 17, 18, 65, and 66). Most bugs occur at these boundaries.

## 7. What is Exploratory Testing and when do you use it?
**Answer:** It’s simultaneous learning, test design, and execution. I use it when a feature is new or complex to find "unscripted" bugs that automation might miss, focusing on user behavior and edge cases.

## 8. What are "Quality Metrics" and which ones do you track?
**Answer:** Metrics provide visibility into process health. I track:
- **Defect Detection Percentage (DDP):** Bugs found by QA vs. bugs found in production.
- **Automation Coverage:** % of requirements covered by scripts.
- **Test Execution Time:** To ensure the CI/CD pipeline remains fast.

## 9. Explain TDD vs. BDD.
**Answer:** 
- **TDD (Test-Driven Development):** Write a failing unit test, then write code to pass it. Focuses on implementation.
- **BDD (Behavior-Driven Development):** Uses "Given/When/Then" (Gherkin) to define business behavior. Focuses on communication between stakeholders and devs.

## 10. What is Mutation Testing?
**Answer:** It involves intentionally injecting small errors ("mutations") into the source code to see if your tests fail. If the tests still pass, it means your test suite is weak and needs better coverage or more meaningful assertions.
