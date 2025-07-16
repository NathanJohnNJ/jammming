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