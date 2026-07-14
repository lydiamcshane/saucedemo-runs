# Hybrid Test Automation Framework — Playwright + Cucumber BDD
![CI](https://github.com/lydiamcshane/saucedemo-runs/actions/workflows/playwright.yml/badge.svg)


A single TypeScript project that runs **Playwright-native specs**, **Cucumber BDD scenarios**, and **API tests** against a shared Page Object Model. One set of Page Objects, one set of fixtures — multiple execution surfaces. Change a locator once and everything stays in sync.

Target application: [SauceDemo](https://www.saucedemo.com/)

---

## Why Hybrid?

Most repos pick one style. This one demonstrates that Playwright specs (fast, developer-facing) and Gherkin/BDD scenarios (readable, stakeholder-facing) can coexist without duplicating logic:
```
                  ┌───────────────────────────┐
   Playwright ───▶│   Page Object Model       │◀─── Cucumber BDD
   UI specs       │  Login / Inventory /      │      step definitions
                  │  Cart / Checkout          │
   API specs  ───▶│  + Users fixture          │
                  └───────────────────────────┘
```
- **Playwright UI** injects `page` via its fixture → `tests/*.spec.ts`
- **Cucumber** launches the browser in `CustomWorld` and injects the same `page` → `features/steps/*.ts`
- **API tests** validate endpoints independently → `api/*.spec.ts`
- All UI layers consume identical POMs and test data. **Zero duplication.**

---

## Tech Stack

| Layer               | Tool                              |
|---------------------|-----------------------------------|
| Test runners        | Playwright, Cucumber (BDD)        |
| Language            | TypeScript                        |
| Design pattern      | Page Object Model                 |
| API testing         | Playwright request context        |
| Test data           | Shared `Users` fixture            |
| Multi-environment   | `environments/*.json` (dev/qa/staging) |
| CI/CD               | GitHub Actions                    |
| Transpilation       | ts-node (CommonJS)                |

---

## Environment

Built and validated against a deliberately constrained legacy environment to prove compatibility outside bleeding-edge defaults:

- macOS Big Sur
- Node.js v18.20.8
- Firefox
- TypeScript 5.3.3

---

## Project Structure
```
.
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI pipeline
├── api/
│   └── products.spec.ts         # API-level tests
├── environments/
│   ├── dev.json                 # Environment-specific config
│   ├── qa.json
│   └── staging.json
├── features/                    # Cucumber BDD
│   ├── login.feature            # Gherkin scenarios
│   ├── step_definitions/
│   │   └── login.steps.ts       # Step definitions → POM methods
│   └── support/
│       ├── world.ts             # CustomWorld: launches Firefox, instantiates POMs
│       └── hooks.ts             # Before/After browser lifecycle
├── fixtures/
│   └── users.ts                 # Shared test data
├── pages/                       # Shared Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                       # Playwright-native UI specs
│   ├── login.spec.ts
│   ├── login-fail.spec.ts
│   ├── logout.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── purchase.spec.ts
├── utils/
│   ├── constants.ts             # Shared constants
│   └── helpers.ts               # Reusable helper functions
├── cucumber.js                  # Node 18 / CommonJS config (ts-node/register)
├── playwright.config.ts
├── package.json
└── package-lock.json
```
---

## Coverage

**UI (Playwright specs)**
- Standard user login / logout
- Locked-out user (negative scenario)
- Inventory browsing
- Shopping cart flows
- Checkout and end-to-end purchase flows

**BDD (Cucumber)**
- Standard user login
- Locked-out user (negative scenario)

**API**
- Product endpoint validation

Auto-captured screenshots, traces, and video on failure.

---

## Running Tests

bash
# All Playwright specs (UI + API)
npm test

# Cucumber BDD scenarios
npm run test:bdd

# Single Playwright spec
npx playwright test tests/login.spec.ts

# API tests only
npx playwright test api/

# View Playwright HTML report
npx playwright show-report

---

## CI/CD

Automated test runs are configured via GitHub Actions in `.github/workflows/playwright.yml`, triggering on push and pull request.