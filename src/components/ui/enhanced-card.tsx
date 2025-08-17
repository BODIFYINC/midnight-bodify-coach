import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "clay" | "glass" | "gradient"
    hover?: "lift" | "glow" | "tilt" | "scale"
  }
>(({ className, variant = "default", hover = "lift", ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground border border-border",
    clay: "clay-card border-0",
    glass: "glass-effect",
    gradient: "bg-gradient-to-br from-card/90 to-muted/50 border border-border/50"
  }

  const hovers = {
    lift: "hover-lift",
    glow: "hover-glow", 
    tilt: "hover-tilt",
    scale: "hover-scale"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl shadow-sm transition-all duration-500",
        variants[variant],
        hovers[hover],
        className
      )}
      {...props}
    />
  )
})
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export { EnhancedCard, EnhancedCardHeader, EnhancedCardFooter, EnhancedCardTitle, EnhancedCardDescription, EnhancedCardContent }