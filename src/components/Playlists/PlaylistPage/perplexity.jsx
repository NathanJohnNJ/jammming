import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import './perplexity.css';

const ScrollAnimationComponent = ({ 
  imageComponent, 
  namesList, 
  paragraphText, 
  bigList 
}) => {
  const containerRef = useRef(null);
  const bigListRef = useRef(null);

  // Track scroll progress of the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Track scroll progress specifically for the big list
  const { scrollYProgress: bigListProgress } = useScroll({
    target: bigListRef,
    offset: ["start end", "start start"]
  });

  // Transform scroll progress into animation values
  // Image transformations
  const imageScale = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.8, 0.7]);
  const imageY = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, -50, -100]);
  const imageX = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, -150, -200]);

  // Paragraph transformations
  const paragraphScale = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.8, 0.7]);
  const paragraphY = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, -30, -80]);
  const paragraphX = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 150, 200]);

  // Names list transformations
  const namesScale = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 0.8, 0.7]);
  const namesY = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, -40, -90]);
  const namesX = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, -100, -150]);

  // Big list transformations - moves up and becomes sticky
  const bigListY = useTransform(
    bigListProgress, 
    [0, 0.2, 0.8, 1], 
    [200, 0, 0, -100]
  );
  const bigListOpacity = useTransform(
    bigListProgress, 
    [0, 0.2, 0.8, 1], 
    [0.1, 1, 1, 0.8]
  );

  return (
    <div ref={containerRef} className="scroll-container">
      {/* Initial layout section */}
      <section className="initial-layout">
        {/* Names List - Left side */}
        <motion.div 
          className="names-list"
          style={{
            scale: namesScale,
            y: namesY,
            x: namesX,
          }}
        >
          <h3>Names</h3>
          <ul>
            {namesList.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </motion.div>

        {/* Image - Center, largest */}
        <motion.div 
          className="center-image"
          style={{
            scale: imageScale,
            y: imageY,
            x: imageX,
          }}
        >
          {imageComponent}
        </motion.div>

        {/* Paragraph - Right side */}
        <motion.div 
          className="paragraph-content"
          style={{
            scale: paragraphScale,
            y: paragraphY,
            x: paragraphX,
          }}
        >
          <p>{paragraphText}</p>
        </motion.div>
      </section>

      {/* Big List Section - Starts below, moves up and becomes sticky */}
      <section className="big-list-section" ref={bigListRef}>
        <motion.div 
          className="big-list-container"
          style={{
            y: bigListY,
            opacity: bigListOpacity,
            position: "sticky",
            top: "2rem",
          }}
        >
          <div className="big-list-content">
            {bigList.map((item, index) => (
              <div key={index} className="list-item">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Additional content to enable more scrolling */}
      <section className="bottom-spacer">
        <div style={{ height: '100vh' }}></div>
      </section>
    </div>
  );
};

export default ScrollAnimationComponent;
