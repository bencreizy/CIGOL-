import numpy as np

# --- Constants ---
GOLDEN_RATIO = 1.61803398875
NODE_COUNT = 1010

class SingularityEngine:
    """
    A class to simulate a Horn Torus Singularity, collapsing a 3D data
    manifold into a 1D vector stream through a resonance-based process.
    """

    def __init__(self):
        """
        Initializes the SingularityEngine by generating the node coordinates for
        a self-intersecting "pinched" Horn Torus. The singularity point for
        such a torus is the origin (0,0,0).
        """
        # To create a self-intersecting "pinch," the minor radius (r) must be
        # greater than the major radius (R). We use the Golden Ratio for r.
        self.torus_R = 1
        self.torus_r = GOLDEN_RATIO
        
        self.lattice_nodes = self._generate_lattice_nodes()

    def _generate_lattice_nodes(self) -> np.ndarray:
        """
        Generates 1,010 virtual nodes on the surface of the pinched torus.
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

    def vector_stream_pinch(self, data_manifold: np.ndarray) -> np.ndarray:
        """
        Takes a complex 3D data manifold and collapses it into a deterministic
        1D vector stream. The collapse is "anticipated" by calculating the
        total resonance of each 3D point against the entire 1,010-node lattice.

        Args:
            data_manifold: A NumPy array of 3D points (shape: [n, 3]).

        Returns:
            A 1D NumPy array representing the collapsed vector stream.
        """
        vector_stream = []
        
        for point in data_manifold:
            # For each point, calculate its distance to all 1,010 lattice nodes
            distances = np.linalg.norm(self.lattice_nodes - point, axis=1)
            
            # Calculate resonant frequency for each distance.
            # We add a small epsilon to avoid division by zero if a point is identical to a node.
            frequencies = GOLDEN_RATIO / (distances + 1e-9)
            
            # The collapsed 1D value is the sum of all resonant frequencies,
            # representing the point's total resonance with the lattice.
            total_resonance = np.sum(frequencies)
            vector_stream.append(total_resonance)
            
        return np.array(vector_stream)

def self_test():
    """
    Runs a quick internal test to demonstrate the SingularityEngine.
    """
    print("Initializing Singularity Engine...")
    engine = SingularityEngine()
    print(f"Engine created with a {len(engine.lattice_nodes)}-node pinched torus lattice.")
    print(f"Torus Radii (R:r) = {engine.torus_R}:{round(engine.torus_r, 4)}")
    print("-" * 30)

    # Create a sample complex 3D data manifold (e.g., 5 random points)
    sample_manifold = np.random.rand(5, 3) * 10 # 5 points in a 10x10x10 cube
    print("Original 3D Data Manifold (5 points):")
    print(np.round(sample_manifold, 2))
    print("-" * 30)

    # Collapse the manifold through the singularity pinch
    print("Collapsing manifold into 1D vector stream...")
    vector_stream = engine.vector_stream_pinch(sample_manifold)
    print("Resulting 1D Vector Stream:")
    print(np.round(vector_stream, 2))
    print("-" * 30)
    
    # Verify that the output is a 1D array of the correct length
    assert vector_stream.shape == (5,)
    print("Verification PASSED: Output is a 1D vector of the correct dimension.")

if __name__ == "__main__":
    # Note: This script requires the 'numpy' library to be installed.
    # You can install it via pip: pip install numpy
    try:
        self_test()
    except ImportError:
        print("\nERROR: The 'numpy' library is not installed.")
        print("Please install it to run this script: pip install numpy")

