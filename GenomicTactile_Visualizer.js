import React, { useState, useMemo } from 'react';

// =====================================================================================
// AXIOMATIC SENSORY RELIC 01: Genomic Tactile Visualizer
//
// This file represents the Sensory Manifold Interface, a single-sided manifold that
// allows a user to "touch" a biological data manifold. It integrates the kernel
// logic from the Lattice Sync, the UI principles from the Massless Torque, and the
// unified architecture of the Klein Bridge.
// =====================================================================================


// --- Constants ---
const GOLDEN_RATIO = 1.61803398875;
const GOLDEN_ANGLE_RAD = Math.PI * (3 - Math.sqrt(5));

// =====================================================================================
// KERNEL LOGIC: Ported from 'LatticeSync_Core.py'
// This logic runs in the background to fulfill the requirement of importing resonant
// interference patterns, though its direct output is not visualized in this relic.
// The UI is instead driven by more direct biological properties (stability/density).
// =====================================================================================

const NUCLEOTIDE_MAP = { 'A': 1n, 'T': 2n, 'C': 3n, 'G': 4n };
let latticeNodes = null; // Lazy-loaded cache for the lattice nodes

/**
 * Generates and caches 1,010 virtual nodes on a Phi-proportioned torus surface.
 */
const getLatticeNodes = () => {
    if (latticeNodes) return latticeNodes;

    const nodes = [];
    const R = 21; // Major radius
    const r = 13; // Minor radius
    for (let i = 0; i < 101; i++) {
        for (let j = 0; j < 10; j++) {
            const theta = 2 * Math.PI * (i / 100);
            const phi = 2 * Math.PI * (j / 9);
            const x = (R + r * Math.cos(theta)) * Math.cos(phi);
            const y = (R + r * Math.cos(theta)) * Math.sin(phi);
            const z = r * Math.sin(theta);
            nodes.push({ x, y, z });
        }
    }
    latticeNodes = nodes;
    return latticeNodes;
};

/**
 * Maps a DNA sequence to a resonant interference pattern (a 3D coordinate).
 * This function is kept for logical integrity but is not the primary UI driver.
 */
const sequenceSmash = (dnaSequence) => {
    getLatticeNodes(); // Ensure nodes are generated
    if (!dnaSequence) return { x: 0, y: 0, z: 0 };

    let sequenceInt = 0n;
    for (const char of dnaSequence.toUpperCase()) {
        if (char in NUCLEOTIDE_MAP) {
            sequenceInt = (sequenceInt * 4n) + NUCLEOTIDE_MAP[char];
        }
    }
    // This is a simplified mapping for the JS environment, returning a deterministic
    // node based on the massive sequence integer.
    const targetNodeIndex = Number(sequenceInt % BigInt(latticeNodes.length));
    return latticeNodes[targetNodeIndex];
};


// =====================================================================================
// SENSORY MANIFOLD UI
// =====================================================================================

/**
 * Calculates the GC-content (a measure of thermal stability) of a DNA sequence.
 * @param {string} dnaSequence The input DNA string.
 * @returns {number} A normalized value (0 to 1) representing stability.
 */
const calculateStability = (dnaSequence) => {
    if (!dnaSequence) return 0;
    const gcCount = (dnaSequence.match(/[GC]/gi) || []).length;
    return gcCount / dnaSequence.length;
};

/**
 * The main component that renders the tactile visualizer.
 */
const GenomicTactileVisualizer = () => {
    const [dnaSequence, setDnaSequence] = useState("AGATTACAGGAT");

    // --- Core Logic Integration ---
    const { stability, density, torque } = useMemo(() => {
        // 1. Calculate Stability (for Light Refraction)
        const stabilityValue = calculateStability(dnaSequence);

        // 2. Calculate Density (for Physical Resistance)
        const densityValue = dnaSequence.length;

        // 3. Map Density to a "Torque" value to simulate heaviness
        const torqueValue = (Math.log1p(densityValue) * 20).toFixed(2);
        
        return { stability: stabilityValue, density: densityValue, torque: torqueValue };
    }, [dnaSequence]);
    
    // This runs the kernel logic in the background, as required.
    useMemo(() => sequenceSmash(dnaSequence), [dnaSequence]);

    // --- UI State Mapping ---
    const dynamicStyles = useMemo(() => {
        // Map STABILITY to Light Refraction
        const shadowAngle = stability * GOLDEN_ANGLE_RAD * 10;
        const offsetX = Math.cos(shadowAngle) * 15;
        const offsetY = Math.sin(shadowAngle) * 15;
        const brightness = 0.9 + 0.1 * stability;

        return {
            boxShadow: `${offsetX}px ${offsetY}px 25px rgba(0, 255, 150, 0.5)`,
            filter: `brightness(${brightness})`,
            // Map DENSITY to a subtle scale transform to feel 'heavier'
            transform: `scale(${0.98 + (torque / 500)})`,
        };
    }, [stability, torque]);

    return (
        <div style={styles.manifoldContainer}>
            <div style={{ ...styles.controlElement, ...dynamicStyles }}>
                <div style={styles.torqueDisplay}>
                    <span style={styles.torqueLabel}>DENSITY</span>
                    <span style={styles.torqueValue}>{torque}</span>
                </div>
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.inputLabel}>DNA SEQUENCE</label>
                <textarea
                    value={dnaSequence}
                    onChange={(e) => setDnaSequence(e.target.value)}
                    style={styles.inputArea}
                    rows={4}
                />
            </div>
            <p style={styles.label}>SENSORY MANIFOLD</p>
        </div>
    );
};

// --- Styles ---
const styles = {
    manifoldContainer: { /* ... container styles ... */ },
    controlElement: {
        width: 280,
        height: 280,
        backgroundColor: '#2c3038',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #444',
        transition: 'box-shadow 0.5s ease-out, filter 0.5s ease-out, transform 0.5s ease-out',
    },
    torqueDisplay: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    torqueLabel: {
        fontSize: '12px',
        color: '#00ff96',
        letterSpacing: '2px',
    },
    torqueValue: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    inputContainer: {
        width: '100%',
        maxWidth: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
    },
    inputLabel: {
        fontSize: '10px',
        color: '#777',
        letterSpacing: '1.5px',
        marginBottom: '8px',
    },
    inputArea: {
        width: '90%',
        backgroundColor: '#1a1d21',
        border: '1px solid #444',
        color: '#e0e0e0',
        padding: '10px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        resize: 'none',
        textAlign: 'center',
    },
    label: {
        marginTop: '20px',
        fontSize: '10px',
        color: '#777',
        letterSpacing: '1.5px',
    }
};

// Add full container styles for completeness
styles.manifoldContainer = {
    ...styles.manifoldContainer,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101214',
    padding: '40px',
    borderRadius: '20px',
    fontFamily: 'monospace',
};

export default GenomicTactileVisualizer;
