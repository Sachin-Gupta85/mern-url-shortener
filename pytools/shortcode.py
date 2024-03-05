#!/usr/bin/env python3
"""Base62 short-code codec for the URL shortener.

A deterministic companion to the server's random codes: maps a non-negative
integer id to a compact base62 string and back. Run as:

    python3 shortcode.py encode 125
    python3 shortcode.py decode 21
"""
from __future__ import annotations

import sys

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
BASE = len(ALPHABET)
_INDEX = {c: i for i, c in enumerate(ALPHABET)}


def encode(n: int) -> str:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, rem = divmod(n, BASE)
        out.append(ALPHABET[rem])
    return "".join(reversed(out))


def decode(code: str) -> int:
    if not code:
        raise ValueError("empty code")
    n = 0
    for ch in code:
        if ch not in _INDEX:
            raise ValueError(f"invalid character {ch!r}")
        n = n * BASE + _INDEX[ch]
    return n


def main(argv: list[str]) -> int:
    if len(argv) != 2 or argv[0] not in ("encode", "decode"):
        sys.stderr.write("usage: shortcode.py <encode|decode> <value>\n")
        return 2
    print(encode(int(argv[1])) if argv[0] == "encode" else decode(argv[1]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
