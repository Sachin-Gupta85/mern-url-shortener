import pytest
from shortcode import encode, decode, BASE


def test_known_values():
    assert encode(0) == "0"
    assert encode(61) == "Z"
    assert encode(BASE) == "10"


def test_roundtrip():
    for n in [0, 1, 61, 62, 1000, 125, 999999, 2**40]:
        assert decode(encode(n)) == n


def test_rejects_negative_and_bad_chars():
    with pytest.raises(ValueError):
        encode(-1)
    with pytest.raises(ValueError):
        decode("ab-cd")
    with pytest.raises(ValueError):
        decode("")
