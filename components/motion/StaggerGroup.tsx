"use client"

import { motion } from "framer-motion"

type StaggerGroupProps = {
  children: React.ReactNode
  className?: string
  staggerBy?: number
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
