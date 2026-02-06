import numpy as np

# --- Constants ---
GOLDEN_RATIO = 1.61803398875
NODE_COUNT = 1010
NUCLEOTIDE_MAP = {'A': 1, 'T': 2, 'C': 3, 'G': 4}

class ResonanceLattice:
    """
    A class to simulate a 1,010-node resonance lattice on a Horn Torus surface,
    designed for mapping DNA sequences to unique spatial coordinates.
    """

    def __init__(self):
        """
        Initializes the ResonanceLattice by generating the node coordinates.
        The torus dimensions are chosen to reflect the Golden Ratio symmetry
        found in the major and minor grooves of a DNA double helix.
        """
        # Major (R) and minor (r) radii of the torus, in Phi-proportion.
        # Approximates the ~21Å major groove and ~13Å minor groove of DNA.
        self.torus_R = 21
        self.torus_r = 13
        
        self.nodes = self._generate_lattice_nodes()
        # Define a reference node for frequency calculations (e.g., the first node)
        self.origin_node = self.nodes[0]

    def _generate_lattice_nodes(self) -> np.ndarray:
        """
        Generates 1,010 virtual nodes mapped across a Horn Torus surface.
        We use 101 steps for the toroidal angle (theta) and 10 for the poloidal (phi).
        """
        nodes = []
        theta_steps = 101
        phi_steps = 10
        
        for i in range(theta_steps):
            for j in range(phi_steps):
                theta = 2 * np.pi * (i / (theta_steps - 1))
                phi = 2 * np.pi * (j / (phi_steps - 1))
                
                x = (self.torus_R + self.torus_r * np.cos(theta)) * np.cos(phi)
                y = (self.torus_R + self.torus_r * np.cos(theta)) * np.sin(phi)
                z = self.torus_r * np.sin(theta)
                nodes.append([x, y, z])
                
        return np.array(nodes)

    def _calculate_resonant_frequency(self, node1: np.ndarray, node2: np.ndarray) -> float:
        """
        Calculates the 'Resonant Frequency' between two nodes based on their
        Euclidean distance, modulated by the Golden Ratio.
        Frequency is inversely proportional to distance.
        """
        distance = np.linalg.norm(node1 - node2)
        if distance == 0:
            return float('inf')
        return GOLDEN_RATIO / distance

    def sequence_smash(self, dna_sequence: str) -> np.ndarray:
        """
        Maps a DNA nucleotide string into the lattice to find its unique
        'Interference Pattern' (the 3D coordinate of highest resonance).

        Args:
            dna_sequence: A string containing DNA nucleotides (A, T, C, G).

        Returns:
            The 3D numpy array coordinate of the node that resonates most
            strongly with the given DNA sequence.
        """
        if not dna_sequence:
            return self.origin_node

        # 1. Convert the DNA sequence into a unique, large integer signature.
        sequence_int = 0
        for char in dna_sequence.upper():
            if char in NUCLEOTIDE_MAP:
                sequence_int = (sequence_int * 4) + NUCLEOTIDE_MAP[char]

        # 2. Find the 'Interference Pattern'.
        # We calculate a 'resonance score' for each node. The node with the
        # highest score is the point of maximum resonance for the sequence.
        max_score = -float('inf')
        resonant_node_index = -1

        for i, node in enumerate(self.nodes):
            # The score is a function of the sequence and the node's frequency
            # relative to the lattice origin. A cosine function creates an
            # interference-like pattern of peaks and troughs.
            frequency = self._calculate_resonant_frequency(node, self.origin_node)
            if frequency == float('inf'):
                score = 1.0 # Max score for the origin node itself
            else:
                score = np.cos(sequence_int / frequency)
            
            if score > max_score:
                max_score = score
                resonant_node_index = i
        
        return self.nodes[resonant_node_index]

def self_test():
    """
    Runs a quick internal test to demonstrate the ResonanceLattice functionality.
    """
    print("Initializing 1,010-Node Resonance Lattice...")
    lattice = ResonanceLattice()
    print(f"Lattice created with {len(lattice.nodes)} nodes.")
    print(f"Torus Radii (R:r) = {lattice.torus_R}:{lattice.torus_r} (Phi-Proportion Symmetry)")
    print("-" * 30)

    # --- Test Case 1 ---
    dna_seq1 = "ATGC"
    print(f"Smashing sequence 1: '{dna_seq1}'")
    interference_pattern1 = lattice.sequence_smash(dna_seq1)
    print(f"Interference Pattern (Coordinate): {np.round(interference_pattern1, 2)}")
    print("-" * 30)

    # --- Test Case 2 (Slightly different sequence) ---
    dna_seq2 = "ATGG"
    print(f"Smashing sequence 2: '{dna_seq2}'")
    interference_pattern2 = lattice.sequence_smash(dna_seq2)
    print(f"Interference Pattern (Coordinate): {np.round(interference_pattern2, 2)}")
    print("-" * 30)
    
    # --- Test Case 3 (Longer sequence) ---
    dna_seq3 = "AGATTACA"
    print(f"Smashing sequence 3: '{dna_seq3}'")
    interference_pattern3 = lattice.sequence_smash(dna_seq3)
    print(f"Interference Pattern (Coordinate): {np.round(interference_pattern3, 2)}")
    print("-" * 30)
    
    # Verify that different sequences produce different patterns
    assert not np.array_equal(interference_pattern1, interference_pattern2)
    print("Verification PASSED: Different sequences yield different interference patterns.")

if __name__ == "__main__":
    self_test()
