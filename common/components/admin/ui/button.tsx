import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const adminButtonVariants = cva(
  // Base styles: Monospace, Uppercase, Tracking, Rounded, Transition
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 overflow-hidden backdrop-blur-sm",
  {
    variants: {
      variant: {
        // Eugeo / Blue Rose Theme (Default)
        default:
          'border border-cyan-400/50 bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-sm',

        // Kirito / Night Sky Theme
        secondary:
          'border border-slate-600/50 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:shadow-[0_0_20px_rgba(71,85,105,0.3)]',

        // Alice / Fragrant Olive Theme (New Variant)
        accent:
          'border border-yellow-400/50 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]',

        // System Error / Destructive
        destructive:
          'border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',

        // Minimalist
        ghost: 'border border-transparent hover:bg-slate-800/50 text-slate-500 hover:text-cyan-400',

        outline:
          'border border-slate-700 bg-transparent text-slate-400 hover:text-white hover:border-slate-500',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-[10px]',
        lg: 'h-12 px-8 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof adminButtonVariants> {
  asChild?: boolean;
}

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    // Menentukan apakah efek "Glint" (kilatan cahaya) perlu ditampilkan
    const showGlint = variant !== 'ghost' && variant !== 'outline' && !asChild;

    return (
      <Comp className={cn(adminButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {/* Content Wrapper to ensure z-index above the glint */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Glint Animation Effect (The "Sword Skill" shine) */}
        {showGlint && (
          <div className="group-hover:animate-glint pointer-events-none absolute top-0 left-[-150%] z-0 h-full w-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </Comp>
    );
  },
);
AdminButton.displayName = 'AdminButton';

export { AdminButton, adminButtonVariants };
