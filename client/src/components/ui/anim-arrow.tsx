import { cn } from "@/lib/utils";
import "@/styles/anim-arrow.css";

type AnimArrowProps = {
  className?: string;
  children: React.ReactNode;
};

export function AnimArrow({ className, children }: AnimArrowProps) {
  return (
    <div className={cn("animated-arrow", className)}>
      <span className="the-arrow -left">
        <span className="shaft" />
      </span>
      <span className="main max-w-max">
        <span className="text ">{children}</span>
        <span className="the-arrow -right">
          <span className="shaft" />
        </span>
      </span>
    </div>
  );
}
