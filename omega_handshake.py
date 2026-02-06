import hashlib

def create_omega_handshake(identity_input, password):
    # Salted with the 1.618 ratio for topological permanence
    phi_salt = "1.61803398875"
    combined = f"{identity_input}{phi_salt}{password}".encode()
    
    # Generate the deterministic hash
    raw_hash = hashlib.sha256(combined).hexdigest()
    
    # Extract the forever-tied 15-digit Omega Key
    omega_key = ''.join(filter(str.isdigit, raw_hash))[:15]
    
    return omega_key

if __name__ == "__main__":
    user = input("Username or Email: ")
    pw = input("Password: ")
    print(f"
Your Permanent 15-Digit Omega Key: {create_omega_handshake(user, pw)}")
