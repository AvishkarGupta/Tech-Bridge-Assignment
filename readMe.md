Live at: https://project-tracker-assignment.onrender.com/
creds: avi@gmail.com/123

Full Stack Test Case Management System - Assignment

##Project Overview
Create a Test Case Management application that allows teams to create, manage, and track test cases, test suites, and test execution results for software projects.

Tech Stack Requirements

- Frontend: React 18+

- Backend: Node.js with Express.js

- Database: PostgreSQL

- Caching: Redis

- Charts: Chart.js or Recharts

Features to Implement

1. User Authentication

- User registration and login

- JWT-based authentication

- Protected routes

- Role-Based Access Control (RBAC)

- Support for multiple user roles:

  - admin: full access to all features, including user management, project settings, and all test data

  - test-lead: can create/edit/delete test cases and suites, assign tests, and view all reports for their projects

  - tester: can execute tests, update test results, and create defects

  - read-only: can only view test cases, test results, and reports but cannot add, edit, delete, or execute anything

- Backend middleware to restrict routes based on role

- Frontend conditional rendering (e.g., disabling execution buttons for read-only users)

2. Project Management

- Create and manage multiple test projects

- Project details (name, description, version, status)

- Assign team members to projects

- Only admin and test-lead can create/modify projects

3. Test Case Management

- Create, edit, delete test cases (admin and test-lead only)

- Test case attributes:

  - Title, Description

  - Priority (Low, Medium, High, Critical)

  - Type (Functional, Integration, Regression, Smoke, UI, API)

  - Pre-conditions and Post-conditions

  - Test Steps with expected results

  - Tags/Labels for categorization

- Organize test cases into test suites

- Search and filter test cases by multiple criteria

- Bulk operations (delete, update priority, assign to suite)

- read-only users can view test case details only

4. Test Execution

- Execute test cases (tester, test-lead, and admin only)

- Record test results (Pass, Fail, Blocked, Skipped)

- Add comments and attachments to test runs

- Create defects/bugs directly from failed tests

- Test execution history and audit trail

- Assign test cases to testers

- Track execution progress

5. Dashboard with Analytics

- Test execution summary (total, passed, failed, blocked, pending)

- Test coverage metrics

- Pass/Fail rate trends over time

- Priority-wise test distribution

- Test execution progress by tester

- Defect density metrics

- Interactive charts and graphs

- All users, including read-only, can access dashboards

6. Test Suite Management

- Create and manage test suites

- Add/remove test cases from suites

- Execute entire test suites

- Suite-level reporting

7. Performance Features

- Lazy loading for different pages/components

- Pagination for test case lists

- Caching for frequently accessed data

- Rate limiting for API endpoints

- Virtual scrolling for large test case lists

Technical Requirements
Frontend Requirements (React)

1. React Hooks Implementation

- useContext:

  - Create contexts for user authentication and theme management

  - Implement global state for current project and user permissions

- useCallback:

  - Optimize event handlers in test case forms

  - Prevent unnecessary re-renders in test execution components

- useMemo:

  - Optimize expensive calculations (test statistics, pass rates, coverage)

  - Memoize filtered/sorted test case lists

2. Lazy Loading Implementation

- Use React.lazy() for route-based code splitting

- Use React.Suspense for loading states

- Implement virtual scrolling for large test case lists

- Lazy load test execution history

3. Charts Integration

- Use Chart.js or Recharts for data visualization

- Implement at least 3 different chart types:

  - Pie chart for test status distribution

  - Line chart for test execution trends over time

  - Bar chart for pass/fail rates by priority or type

Backend Requirements (Node.js)

1. Caching Implementation

- Use Redis for caching frequently accessed data

- Cache test execution analytics for 15 minutes

- Cache test suite lists for 30 minutes

- Cache project metadata for 1 hour

- Implement cache invalidation on data updates

2. Rate Limiting

- Use express-rate-limit middleware

- Set different limits for different endpoints:

  - Auth endpoints: 5 requests per 15 minutes

  - Test case CRUD endpoints: 100 requests per hour

  - Test execution endpoints: 200 requests per hour

  - Analytics endpoints: 50 requests per hour

3. Security

- Implement method to prevent from attacks like XSS and SQL Injection

- Input validation and sanitization for test case data

- Implement token based API calling mechanism

- Secure file upload for test attachments

4. Role-Based Access Control (RBAC)

- Add a role field in the users table (default: 'tester')

- Roles:

  - admin: full privileges including user and project management

  - test-lead: can manage test cases, suites, and execute tests for assigned projects

  - tester: can execute tests and update results

  - read-only: can only view test cases, results, and analytics

- Middleware to verify and enforce permissions based on role from JWT claims

- Example route protections:

  - GET /api/testcases - accessible to all roles

  - POST/PUT/DELETE /api/testcases - restricted to admin and test-lead

  - POST /api/testexecutions - restricted to admin, test-lead, and tester

  - GET /api/analytics - accessible to all roles

  - GET /api/users - admin only

  - POST /api/projects - admin and test-lead only

Database Schema Requirements

- Users table (with role field)

- Projects table

- Test Cases table

- Test Suites table

- Test Suite Cases (mapping table)

- Test Executions table

- Test Steps table

- Proper foreign key relationships

- Indexes on frequently queried fields

Deliverables
Code Repository

- Well-organized GitHub repository with clear README

- Proper commit history showing development progress

- Separate folders for frontend and backend

- Environment configuration examples

Documentation

- API documentation (using Swagger/OpenAPI)

- Setup instructions for local development

- Database schema documentation

- User guide for different roles

Live Demo

- Working application with full functionality

- Demo credentials for admin, test-lead, tester, and read-only roles

- Sample test project with pre-populated test cases

- Performance metrics showing caching effectiveness

Bonus Features (Optional)

- Export test cases to CSV/Excel

- Import test cases from CSV/Excel

- Email notifications for test assignments

- Test case versioning

- Integration with CI/CD pipelines

- Test run scheduling

- Collaborative comments on test cases

- Dark mode theme toggle
