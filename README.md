# Playwright Automation – Assignment 1

## Tools Used
- Playwright (Node.js)
- XLSX (Excel handling)

## How to Run

1. Install dependencies:
npm install

2. Install browser:
npx playwright install chromium

3. Run script:
node test.js

## Description
This script automates Singlish to Sinhala translation testing.

- Reads test cases from Excel
- Inputs data into translator
- Captures Sinhala output
- Compares with expected results
- Writes Actual Output and Status back to Excel

## Notes
- Only failing test cases are included as per assignment requirement
- Covers 24 different input types

## Note on Technology Choice

The assignment originally provided a Python-based Playwright script.
However, during implementation, the Python environment setup encountered multiple issues, including:

* Dependency installation delays and failures (Playwright browser installation)
* Environment configuration problems with pip and Python path
* Execution instability during automation

To ensure reliable and timely completion of the assignment, the solution was implemented using **Playwright with Node.js (JavaScript)** instead.

This approach still fully satisfies the assignment requirements because:

* Playwright is used for browser automation
* Test cases are read from an Excel file
* Outputs are captured and written back to Excel
* Automation logic is implemented and executed correctly

The JavaScript implementation provided a more stable runtime environment and ensured successful completion of all required test scenarios.
