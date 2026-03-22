# Category 4: SQL & Database Testing (10 Questions)

## 1. INNER, LEFT, RIGHT, and FULL JOIN.
**Answer:**
- **INNER:** Only matching records.
- **LEFT:** All from left + matches from right.
- **RIGHT:** All from right + matches from left.
- **FULL:** All records when there's a match in either.

## 2. WHERE vs. HAVING.
**Answer:** 
- **WHERE:** Filters rows *before* grouping.
- **HAVING:** Filters groups *after* grouping.

## 3. Database Transactions (ACID).
**Answer:** Work units that are all-or-nothing. ACID: Atomicity, Consistency, Isolation, Durability. Useful in testing for ROLLBACKs to keep data clean.

## 4. How do you handle DB seeding?
**Answer:** I use custom API endpoints (like `/testData/seed`) to reset the app state. It’s faster and more reliable than direct SQL scripts for automation.

## 5. What are SQL Indexes?
**Answer:** Structures that speed up data retrieval (SELECT) but can slow down writes (INSERT). I test them by running performance checks on large datasets.

## 6. What is a Subquery and when do you use it?
**Answer:** A query within another query. I use them when I need to filter data based on a dynamic set of results (e.g., "Find users who made a transaction larger than the average").

## 7. Explain SQL Injection and how to test for it.
**Answer:** A vulnerability where an attacker executes malicious SQL via input fields. I test for it by entering patterns like `' OR '1'='1` into forms to ensure the backend uses prepared statements.

## 8. What are Window Functions (e.g., RANK, ROW_NUMBER)?
**Answer:** Functions that perform calculations across a set of table rows related to the current row. Useful for complex reports (e.g., "Find the top 3 transactions for each user").

## 9. SQL vs. NoSQL: When to choose which?
**Answer:** 
- **SQL (Relational):** Best for structured data and complex joins (e.g., banking systems). 
- **NoSQL (Document/Key-Value):** Best for unstructured, rapidly changing data or massive scaling (e.g., real-time logs).

## 10. How do you ensure Data Integrity during automation?
**Answer:** I use constraints (Primary Keys, Foreign Keys) and verify them by attempting to insert invalid data (e.g., duplicate IDs) to ensure the database correctly rejects the operation.
