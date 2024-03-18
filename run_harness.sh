#!/usr/bin/env bash
# Test harness: Express API tests (Jest + in-memory Mongo) and the Python board
# analytics tool (pytest), plus the React component tests.
set -euo pipefail
cd "$(dirname "$0")"

echo "== server (jest + mongodb-memory-server) =="
( cd server && npm install --silent && npm test )

echo "== pytools (pytest) =="
python3 -m venv .venv 2>/dev/null || true
./.venv/bin/pip -q install -r pytools/requirements.txt
( cd pytools && ../.venv/bin/python -m pytest -q )

echo "== client (vitest) =="
( cd client && npm install --silent && npm test )

echo "ALL TESTS PASSED ✅"
