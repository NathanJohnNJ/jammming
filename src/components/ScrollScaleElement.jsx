import { motion } from 'motion/react';

export default function ScrollScaleElement({ 
  children,
  ...props 
}){
  // const elementStyle = {
  //   transform: `scale(${scale}), translate(${translateX}, ${translateY})`,
  //   transition: `transform ${transitionDuration} ease-out`,
  //   transformOrigin: 'center',
  // };

  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
};
