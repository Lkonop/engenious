# Category 6: CI/CD & DevOps for QA (10 Questions)

## 1. Importance of CI/CD for QA.
**Answer:** Provides immediate feedback. Every code change triggers an automated suite, catching bugs before they reach production.

## 2. Parallel execution and Sharding.
**Answer:** **Parallelism** runs multiple tests on one machine. **Sharding** splits tests across multiple machines. Both reduce execution time significantly.

## 3. Handling Secrets in CI.
**Answer:** Use Environment Variables stored as **Encrypted Secrets** in tools like GitHub Actions or Jenkins. Never commit them to git.

## 4. Role of Docker in Testing.
**Answer:** Ensures environment consistency. We wrap the app, DB, and test runner into containers so "it works on my machine" always translates to CI.

## 5. Integrating Allure Reports.
**Answer:** I add a pipeline step to generate the report from results and host it (e.g., on GitHub Pages) so stakeholders can see visual results and screenshots.

## 6. What are "Deployment Gates"?
**Answer:** Automated checks in the pipeline (e.g., "Pass 100% of Smoke tests") that prevent a build from moving to the next stage if it fails.

## 7. Blue-Green vs. Canary Deployments.
**Answer:** 
- **Blue-Green:** Two identical environments; one is live, one is new. Switch traffic instantly. 
- **Canary:** Roll out changes to a small % of users first, then expand if metrics are stable.

## 8. What is "Infrastructure as Code" (IaC)?
**Answer:** Managing test environments using configuration files (e.g., Terraform, CloudFormation) rather than manual setup. Ensures environments are reproducible.

## 9. How do you handle "Flaky Test Quarantine"?
**Answer:** I tag flaky tests as `@quarantine` and run them separately. They don't block the main pipeline, but I track them until fixed to maintain developer trust.

## 10. What is "Continuous Monitoring"?
**Answer:** Tracking application health in production using logs and metrics (e.g., ELK stack, Datadog). QA uses this to identify production issues before users report them.
