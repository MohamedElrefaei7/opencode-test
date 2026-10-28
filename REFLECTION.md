# Reflection — Local Server Session

## Model / Provider

- **Model:** Flint 40B Free
- **Provider:** opencode

## Useful Prompt

> "Create a local http server for this repo's website."

## Observed Tool Action

- The agent used the shell tool to run `python3 -m http.server 8000 --bind 127.0.0.1`
  inside the project root, then verified the server was responding by running
  `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/` and observed a `200` status.

## Issue / Improvement Checked Before and After a Change

- **Issue:** The README instructed users to open **http://localhost:3000** (the port
  used by `npx serve`), while the locally running server (Python `http.server`) was on
  port **8000** — a mismatch between documented and actual server URL.
- **Improvement:** Updated the Quick Start section to lead with
  `python3 -m http.server 8000`, corrected the browser URL to **http://localhost:8000**,
  and added a "Stopping the Server" section (`Ctrl+C` in the terminal).

## How the Interaction Works

The user asked for a local HTTP server for the static site in this repository. Because the
project is plain HTML/CSS/vanilla JS with no build step or dependencies (per `AGENTS.md`),
the agent chose Python's built-in `http.server` module rather than adding any tooling.
The server was started in the background bound to `127.0.0.1:8000`, serving the repository
root, and was verified with an HTTP request that returned success. The agent then ensured
the supporting documentation (`README.md`, `AGENTS.md`) and an evidence screenshot
(`evidence/site-localhost.png`) were present in the repository before handing control back.
