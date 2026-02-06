import React, { useState, useMemo } from 'react';

// =====================================================================================
// AXIOMATIC SYNC RELIC 01: The Klein Bridge
//
// This file represents a single-sided topological manifold, unifying a client and
// server into a single conceptual space. It eliminates standard fetch requests
// by re-implementing the "kernel" logic directly within the client, creating a
// "zero-latency" bridge where UI state and data state are synchronized through
// direct, resonant mapping.
// =====================================================================================


// --- Constants based on the Golden Ratio ---
const GOLDEN_RATIO = 1.61803398875;
const GOLDEN_ANGLE_RAD = Math.PI * (3 - Math.sqrt(5));


// =====================================================================================
// KERNEL LOGIC: Ported from 'Sloot_Manifold_Alpha.py'
// =====================================================================================

/**
 * Encodes a string into a 3D spatial coordinate using Golden Ratio mapping.
 * This function acts as the "kernel," performing the core data transformation.
 * It uses BigInt to handle arbitrarily large integers from long strings,
 * ensuring the mapping is lossless.
 * @param {string} dataString - The string to encode.
 * @returns {{x: number, y: number, z: bigint}} The spatial coordinate.
 */
const kernelEncode = (dataString) => {
  if (!dataString) {
    return { x: 0.0, y: 0.0, z: 0n };
  }

  // 1. Convert the string to a BigInt representation.
  const textEncoder = new TextEncoder();
  const bytes = textEncoder.encode(dataString);
  let dataInt = 0n;
  for (const byte of bytes) {
    dataInt = (dataInt << 8n) + BigInt(byte);
  }

  // 2. Map the integer to 3D coordinates using the Horn Torus ratio.
  const x = Number(dataInt) * GOLDEN_RATIO;
  const y = Number(dataInt) / GOLDEN_RATIO;
  
  return { x, y, z: dataInt };
};


// =====================================================================================
// UI LOGIC: Adapted from 'MasslessTorque_UI.js'
// =====================================================================================

/**
 * Calculates a fictional "torque" value based on a normalized input.
 * @param {number} normalizedValue - A value between 0 and 1.
 * @returns {string} The calculated torque value.
 */
const calculateTorque = (normalizedValue) => {
  const torque = Math.abs(Math.cos(normalizedValue * Math.PI * GOLDEN_RATIO)) * 100;
  return torque.toFixed(2);
};

/**
 * This component is the Klein Bridge manifold. It renders a UI whose state is
 * directly and instantaneously mapped from the kernel's output, demonstrating a
 * "Topological Handshake."
 */
const KleinBridgeSync = () => {
  const [inputString, setInputString] = useState("Axiomatic Sync");

  // The "Topological Handshake":
  // 1. The kernel encodes the input string into a spatial coordinate.
  // 2. The UI's appearance is derived directly from this coordinate.
  const { z: kernelOutput } = useMemo(() => kernelEncode(inputString), [inputString]);

  // To create a stable and visually pleasing effect, the massive integer from the
  // kernel is normalized to a 0-100 range using the modulo operator. This
  // creates a resonant mapping between the data and the UI state.
  const normalizedValue = Number(kernelOutput % 101n) / 100;

  const torque = useMemo(() => calculateTorque(normalizedValue), [normalizedValue]);
  
  const dynamicStyles = useMemo(() => {
    // --- Light Refraction Logic ---
    const shadowAngle = normalizedValue * GOLDEN_ANGLE_RAD * 5;
    const offsetX = Math.cos(shadowAngle) * 15;
    const offsetY = Math.sin(shadowAngle) * 15;
    const brightness = 0.9 + 0.1 * Math.abs(Math.sin(normalizedValue * Math.PI * GOLDEN_RATIO));

    return {
      boxShadow: `${offsetX}px ${offsetY}px 25px rgba(0, 150, 255, 0.5)`,
      filter: `brightness(${brightness})`,
    };
  }, [normalizedValue]);

  return (
    <div style={styles.manifoldContainer}>
        <div style={styles.inputContainer}>
            <label style={styles.inputLabel}>RESONANCE INPUT</label>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                style={styles.inputField}
            />
        </div>
      <div style={{ ...styles.controlElement, ...dynamicStyles }}>
        <div style={styles.torqueDisplay}>
          <span style={styles.torqueLabel}>TORQUE</span>
          <span style={styles.torqueValue}>{torque}</span>
        </div>
      </div>
      <p style={styles.label}>KLEIN BRIDGE</p>
    </div>
  );
};

// --- Styles ---
const styles = {
    manifoldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1d21',
        padding: '40px',
        borderRadius: '20px',
        fontFamily: 'monospace',
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
    },
    inputLabel: {
        fontSize: '10px',
        color: '#777',
        letterSpacing: '1.5px',
        marginBottom: '8px',
    },
    inputField: {
        width: '90%',
        backgroundColor: '#2c3038',
        border: '1px solid #444',
        color: '#e0e0e0',
        textAlign: 'center',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    controlElement: {
        width: 280,
        height: 280,
        backgroundColor: '#2c3038',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #444',
        transition: 'box-shadow 0.4s ease-out, filter 0.4s ease-out',
    },
    torqueDisplay: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    torqueLabel: {
        fontSize: '12px',
        color: '#00aaff',
        letterSpacing: '2px',
    },
    torqueValue: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    label: {
        marginTop: '30px',
        fontSize: '10px',
        color: '#777',
        letterSpacing: '1.5px',
    }
};

export default KleinBridgeSync;
