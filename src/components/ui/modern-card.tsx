import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-2xl transition-all duration-300 transform-gpu",
  {
    variants: {
      variant: {
        default: "card-modern",
        interactive: "card-interactive cursor-pointer",
        glow: "card-glow",
        glass: "glass-card",
        elevated: "bg-card hover:bg-card-hover border border-border/50 hover:border-border shadow-lg hover:shadow-xl",
        minimal: "bg-transparent border border-border/30 hover:border-border/60 hover:bg-white/5",
      },
      size: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        xl: "p-12",
      },
      animation: {
        none: "",
        lift: "hover-lift",
        tilt: "hover-tilt",
        scale: "hover:scale-105",
        glow: "hover-glow",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "lift",
    },
  }
)

export interface ModernCardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode
  asMotion?: boolean
  className?: string
  onClick?: () => void
  id?: string
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant, size, animation, asMotion = true, children, onClick, id }, ref) => {
    const cardClass = cn(cardVariants({ variant, size, animation, className }))
    
    if (asMotion) {
      return (
        <motion.div
          ref={ref}
          className={cardClass}
          onClick={onClick}
          id={id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ 
            y: variant === "interactive" ? -4 : 0,
            transition: { duration: 0.3 } 
          }}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cardClass}
        onClick={onClick}
        id={id}
      >
        {children}
      </div>
    )
  }
)

ModernCard.displayName = "ModernCard"

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 pb-4", className)}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = "CardHeader"

// Card Title Component  
interface CardTitleProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, gradient = false }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold leading-tight tracking-tight",
        gradient && "text-gradient-primary",
        className
      )}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = "CardTitle"

// Card Description Component
interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children }, ref) => (
    <p
      ref={ref}
      className={cn("text-foreground-muted leading-relaxed", className)}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = "CardDescription"

// Card Content Component
interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)}>
      {children}
    </div>
  )
)
CardContent.displayName = "CardContent"

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4 border-t border-border/30", className)}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = "CardFooter"

export { 
  ModernCard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  cardVariants 
}