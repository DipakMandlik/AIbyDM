# Security Policy

## Reporting a Vulnerability

AIByDM is a static site with no backend, no user data collection, and no authentication. The attack surface is minimal.

If you discover a security issue (for example, XSS in rendered content, dependency vulnerability, or supply chain concern), do not open a public issue.

Use GitHub private vulnerability reporting when enabled:

https://github.com/DipakMandlik/AIByDM/security/advisories/new

If private reporting is unavailable, contact a project maintainer directly through the GitHub organization before sharing details publicly.

## Supported Versions

AIByDM is pre-1.0. Security fixes are applied to the `main` branch.

## Maintainer Response

- Maintainers aim to acknowledge private reports within 3 business days.
- Confirmed vulnerabilities should receive a fix plan or mitigation note before public disclosure.
- Public advisories should be published after a fix is available, when appropriate.

## Scope

- Content injection via malicious PRs
- XSS through rendered MDX content
- Dependency vulnerabilities
- CI/CD pipeline security

## Out of Scope

- Social engineering of contributors
- Issues in third-party services we link to
- Denial of service against GitHub Pages
