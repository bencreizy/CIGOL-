import math

# The Horn Torus ratio, which is the Golden Ratio.
# This constant is used as the basis for the spatial mapping.
HORN_TORUS_RATIO = 1.61803398875

def encode(data_string: str) -> tuple[float, float, int]:
    """
    Encodes a string into a 3D spatial coordinate.
    The logic is inspired by the concept of a Horn Torus and uses the Golden Ratio
    as a fundamental constant for mapping.
    For simplicity and reversibility, we use a direct mathematical relationship.

    Args:
        data_string: The string to encode.

    Returns:
        A tuple representing the (x, y, z) coordinates, with z being a lossless integer.
    """
    if not data_string:
        return (0.0, 0.0, 0)

    # 1. Convert the string to bytes, then to a large integer.
    data_int = int.from_bytes(data_string.encode('utf-8'), 'big')

    # 2. Map the integer to 3D coordinates using the Horn Torus ratio.
    # The original data is stored in the 'z' coordinate for direct recovery.
    # 'x' and 'y' are derived from 'z' using the ratio, creating a verifiable link.
    x = data_int * HORN_TORUS_RATIO
    y = data_int / HORN_TORUS_RATIO
    z = data_int

    return (x, y, z)

def decode(coordinates: tuple[float, float, int]) -> str:
    """
    Decodes a 3D spatial coordinate back into the original string.

    Args:
        coordinates: The (x, y, z) coordinates, with z being an integer.

    Returns:
        The original string.
    """
    x, y, z = coordinates

    # The original integer is stored in the 'z' coordinate.
    data_int = z


    # Verify the integrity of the coordinates using the Horn Torus ratio.
    # This ensures that the given coordinate is a valid point in our "manifold".
    if not (math.isclose(x, data_int * HORN_TORUS_RATIO) and 
            math.isclose(y, data_int / HORN_TORUS_RATIO)):
        raise ValueError("Invalid coordinate: Does not conform to Horn Torus ratio.")

    if data_int == 0:
        return ""

    # Convert the integer back to bytes, then to a string.
    num_bytes = (data_int.bit_length() + 7) // 8
    data_string = data_int.to_bytes(num_bytes, 'big').decode('utf-8')

    return data_string

def self_test():
    """
    Runs a quick internal test to verify the encode/decode logic.
    """
    print("Running self-test...")
    original_string = "Jan Sloot's Temporal Manifold logic proof."
    
    print(f"Original string: '{original_string}'")

    # Encode the string
    encoded_coords = encode(original_string)
    print(f"Encoded coordinates: {encoded_coords}")

    # Decode the coordinates
    decoded_string = decode(encoded_coords)
    print(f"Decoded string: '{decoded_string}'")

    # Verify the result
    assert original_string == decoded_string
    print("Test PASSED: Original and decoded strings match.")
    print("-" * 20)
    
    # Test empty string
    print("Testing empty string...")
    encoded_empty = encode("")
    assert encoded_empty == (0.0, 0.0, 0)
    decoded_empty = decode(encoded_empty)
    assert decoded_empty == ""
    print("Test PASSED: Empty string handled correctly.")
    print("-" * 20)

if __name__ == "__main__":
    self_test()
