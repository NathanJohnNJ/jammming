import { motion } from "motion/react";

export default function SlideShow(props){
const { imageArray } = props;

const dotVariants = {
    slide: {
      x: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  }
  return(
    <div>
      { imageArray&& 
        <>
          { imageArray.length = 1 ?
            <motion.img className="rounded-xl" src={imageArray[0].url} alt="Artist image" initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.2}}  />
          :
          <motion.div 
          animate="slide"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="container"
          >
            {
              imageArray.map((image, i) => {
                return(
                  <motion.img key={i} className="dot" variants={dotVariants} src={image.url} />
                )
              })
            }
          </motion.div>
          }
        </>
      }
    </div>
  )
}

export const Slideshow = ({ image }) => (
  <AnimatePresence>
    <motion.img
      key={image.src}
      src={image.src}
      initial={{ x: 300, opacity: 0.25, scale: 0.1 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -300, opacity: 0.25, scale: 0.1 }}
      whileHover={{scale: 1.25}}
    />
  </AnimatePresence>
)