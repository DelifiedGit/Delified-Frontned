import { motion } from 'framer-motion'

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const FadeInView = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

export const StaggerParent = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={staggerChildren}>{children}</motion.div>
)

