import React, { useState, useMemo } from 'react';

// --- Constants based on the Golden Ratio ---
const GOLDEN_RATIO = 1.61803398875;
const GOLDEN_ANGLE_RAD = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees in radians

/**
 * Calculates a fictional "torque" value.
 * The formula uses a sinusoidal function derived from the slider's position
 * and the Golden Ratio to simulate a non-linear, "massless" resistance,
 * inspired by the curvature of a Horn Torus.
 * @param {number} sliderValue - The current value of the slider (0-100).
 * @returns {string} The calculated torque value, formatted to two decimal places.
 */
const calculateTorque = (sliderValue) => {
  const normalizedValue = sliderValue / 100; // Normalize to 0-1
  // Use a cosine wave to create a smooth, oscillating resistance
  const torque = Math.abs(Math.cos(normalizedValue * Math.PI * GOLDEN_RATIO)) * 100;
  return torque.toFixed(2);
};

/**
 * A React component demonstrating a skeuomorphic UI element with "massless" torque
 * and light refraction effects based on the Golden Ratio.
 */
const MasslessTorqueUI = () => {
  const [sliderValue, setSliderValue] = useState(50);

  // Memoize the calculated torque to prevent recalculation on every render
  const torque = useMemo(() => calculateTorque(sliderValue), [sliderValue]);

  // Memoize the dynamic styles for shadow and brightness
  const dynamicStyles = useMemo(() => {
    const normalizedValue = sliderValue / 100;

    // --- Light Refraction: Box Shadow ---
    // The shadow's position rotates around the center based on the Golden Angle.
    const shadowAngle = normalizedValue * GOLDEN_ANGLE_RAD * 5; // Multiply for more visual rotation
    const shadowDistance = 15;
    const offsetX = Math.cos(shadowAngle) * shadowDistance;
    const offsetY = Math.sin(shadowAngle) * shadowDistance;
    const shadowBlur = 25;
    const shadowColor = `rgba(0, 150, 255, 0.5)`;

    // --- Light Refraction: Brightness ---
    // The brightness pulses smoothly using a sine wave.
    const brightness = 0.9 + 0.1 * Math.abs(Math.sin(normalizedValue * Math.PI * GOLDEN_RATIO));

    return {
      boxShadow: `${offsetX}px ${offsetY}px ${shadowBlur}px ${shadowColor}`,
      filter: `brightness(${brightness})`,
    };
  }, [sliderValue]);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.controlElement, ...dynamicStyles }}>
        <div style={styles.torqueDisplay}>
          <span style={styles.torqueLabel}>TORQUE</span>
          <span style={styles.torqueValue}>{torque}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          style={styles.slider}
        />
      </div>
      <p style={styles.label}>AXIOMATIC UI RELIC 01</p>
    </div>
  );
};

// --- Styles ---
// Using CSS-in-JS for component-scoped styling.
const styles = {
  container: {
    width: 350,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1d21',
    borderRadius: '50%',
    fontFamily: 'monospace',
  },
  controlElement: {
    width: 280,
    height: 280,
    backgroundColor: '#2c3038',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #444',
    // Smooth transitions provide the "massless" feel
    transition: 'box-shadow 0.4s ease-out, filter 0.4s ease-out',
  },
  torqueDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    color: '#e0e0e0',
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
  slider: {
    width: '80%',
    cursor: 'pointer',
  },
  label: {
    marginTop: '20px',
    fontSize: '10px',
    color: '#777',
    letterSpacing: '1.5px',
  }
};

export default MasslessTorqueUI;
