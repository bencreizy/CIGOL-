import React, { useState, useMemo, useCallback, useRef } from 'react';

// =====================================================================================
// AXIOMATIC KINETIC RELIC 01: The Kinetic Handshake
//
// This component simulates the direct, tactile manipulation of a data manifold.
// The user can 'grab' a node and 'pull' it toward conceptual zones of 'Cure' or
// 'Dissonance', receiving real-time sensory feedback through light refraction
// and simulated physical resistance.
// =====================================================================================

// --- Foundational Constants ---
const GOLDEN_RATIO = 1.61803398875;

// --- Conceptual Coordinates within the UI Space (in pixels) ---
const CURE_COORDINATE = { x: 150, y: -150 };
const DISSONANCE_COORDINATE = { x: -150, y: 150 };
const MAX_DRAG_DISTANCE = 200;

const KineticHandshake = () => {
  const [isDragging, setIsDragging] = useState(false);
  // Position of the draggable node relative to its center
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // This callback handles all feedback calculations during the drag
  const handleDrag = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Clamp the position to a maximum drag distance
    const dragVector = { x, y };
    const dragDistance = Math.min(Math.sqrt(x*x + y*y), MAX_DRAG_DISTANCE);
    if (dragDistance === MAX_DRAG_DISTANCE) {
        const angle = Math.atan2(y, x);
        dragVector.x = Math.cos(angle) * MAX_DRAG_DISTANCE;
        dragVector.y = Math.sin(angle) * MAX_DRAG_DISTANCE;
    }
    setPosition(dragVector);
  }, [isDragging]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 }); // Reset position on release
  }, []);

  // Memoize the calculation of sensory feedback
  const sensoryFeedback = useMemo(() => {
    const { x, y } = position;
    const dragDistance = Math.sqrt(x*x + y*y);

    // --- Determine Directional Influence ---
    const distToCure = Math.sqrt((x - CURE_COORDINATE.x)**2 + (y - CURE_COORDINATE.y)**2);
    const distToDissonance = Math.sqrt((x - DISSONANCE_COORDINATE.x)**2 + (y - DISSONANCE_COORDINATE.y)**2);
    // A value from -1 (towards Dissonance) to +1 (towards Cure)
    const directionFactor = (distToDissonance - distToCure) / (MAX_DRAG_DISTANCE * 2);

    // --- Calculate Structural Integrity (Resistance) ---
    // Base resistance increases with drag distance
    let integrity = 10 + (dragDistance / MAX_DRAG_DISTANCE) * 50;
    // Pulling towards Dissonance increases resistance ('High Friction')
    // Pulling towards Cure decreases it
    integrity -= directionFactor * 40;
    integrity = Math.max(0, Math.min(100, integrity));

    // --- Calculate Light Refraction (Brightness & Color) ---
    // Brightness increases towards Cure, darkens towards Dissonance
    const brightness = 0.85 + directionFactor * 0.3;
    // Color shifts from red (Dissonance) to cyan (Cure)
    const red = Math.max(0, 150 - directionFactor * 150);
    const green = 150 + directionFactor * 100;
    const blue = 150 + directionFactor * 100;
    const shadowColor = `rgba(${red}, ${green}, ${blue}, 0.6)`;

    return {
      integrity: integrity.toFixed(2),
      brightness: Math.max(0.4, Math.min(1.2, brightness)),
      shadowColor,
    };
  }, [position]);

  return (
    <div
      ref={containerRef}
      style={styles.container}
      onMouseMove={handleDrag}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div
        style={{
          ...styles.draggableNode,
          transform: `translate(${position.x}px, ${position.y}px)`,
          filter: `brightness(${sensoryFeedback.brightness})`,
          boxShadow: `0 0 35px ${sensoryFeedback.shadowColor}`,
          transition: isDragging ? 'none' : 'transform 0.5s ease-out',
        }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div style={styles.feedbackDisplay}>
          <span style={styles.feedbackLabel}>INTEGRITY</span>
          <span style={styles.feedbackValue}>{sensoryFeedback.integrity}</span>
        </div>
      </div>
      <p style={styles.label}>KINETIC HANDSHAKE</p>
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    width: 400,
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101214',
    borderRadius: '20px',
    fontFamily: 'monospace',
    cursor: 'grab',
    overflow: 'hidden',
  },
  draggableNode: {
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3038',
    borderRadius: '50%',
    border: '1px solid #555',
    position: 'absolute',
    userSelect: 'none',
  },
  feedbackDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
  },
  feedbackLabel: {
    fontSize: '10px',
    color: '#888',
    letterSpacing: '1.5px',
  },
  feedbackValue: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  label: {
    position: 'absolute',
    bottom: '20px',
    fontSize: '10px',
    color: '#777',
    letterSpacing: '1.5px',
  },
};

export default KineticHandshake;
