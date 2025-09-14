import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "relative",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-12",
        md: "section-padding",
        lg: "py-20 sm:py-32 lg:py-40",
      },
      background: {
        none: "",
        subtle: "bg-background-secondary",
        gradient: "gradient-bg",
        mesh: "gradient-mesh",
      },
      container: {
        none: "",
        default: "container-modern",
        full: "px-4 sm:px-6 lg:px-8",
        narrow: "container-modern max-w-4xl",
      }
    },
    defaultVariants: {
      spacing: "md",
      background: "none", 
      container: "default",
    },
  }
)

export interface ModernSectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode
  asMotion?: boolean
  className?: string
  id?: string
}

const ModernSection = React.forwardRef<HTMLElement, ModernSectionProps>(
  ({ className, spacing, background, container, asMotion = true, children, id }, ref) => {
    const sectionClass = cn(sectionVariants({ spacing, background }), className)
    const contentClass = container !== "none" ? cn(sectionVariants({ container })) : ""
    
    const content = contentClass ? (
      <div className={contentClass}>{children}</div>
    ) : children

    if (asMotion) {
      return (
        <motion.section
          ref={ref}
          className={sectionClass}
          id={id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          {content}
        </motion.section>
      )
    }

    return (
      <section ref={ref} className={sectionClass} id={id}>
        {content}
      </section>
    )
  }
)

ModernSection.displayName = "ModernSection"

// Section Header Component
interface SectionHeaderProps {
  children: React.ReactNode
  centered?: boolean
  className?: string
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, children, centered = true }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "mb-12 sm:mb-16 lg:mb-20",
        centered && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
)
SectionHeader.displayName = "SectionHeader"

// Section Title Component
interface SectionTitleProps {
  children: React.ReactNode
  gradient?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, children, gradient = true, size = "lg" }, ref) => {
    const sizeClasses = {
      sm: "text-3xl sm:text-4xl",
      md: "text-4xl sm:text-5xl",
      lg: "text-5xl sm:text-6xl",
      xl: "text-6xl sm:text-7xl lg:text-8xl",
    }
    
    return (
      <h2
        ref={ref}
        className={cn(
          "font-black leading-tight tracking-tight mb-4",
          sizeClasses[size],
          gradient && "text-gradient-primary",
          className
        )}
      >
        {children}
      </h2>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

// Section Subtitle Component  
interface SectionSubtitleProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

const SectionSubtitle = React.forwardRef<HTMLParagraphElement, SectionSubtitleProps>(
  ({ className, children, size = "md" }, ref) => {
    const sizeClasses = {
      sm: "text-base sm:text-lg",
      md: "text-lg sm:text-xl",
      lg: "text-xl sm:text-2xl",
    }
    
    return (
      <p
        ref={ref}
        className={cn(
          "text-foreground-muted leading-relaxed max-w-3xl mx-auto",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </p>
    )
  }
)
SectionSubtitle.displayName = "SectionSubtitle"

export { 
  ModernSection, 
  SectionHeader, 
  SectionTitle, 
  SectionSubtitle,
  sectionVariants 
}