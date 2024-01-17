import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GearIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "../ThemeProvider";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type SettingButtonProps = {
  className?: string;
};

export function SettingsButton({ className }: SettingButtonProps) {
  const { theme, setTheme } = useTheme();

  function switchTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "group rounded-full border-pink-500 transition-all duration-500 hover:bg-white/50 hover:text-pink-500 dark:border-white dark:hover:bg-pink-500/50 dark:hover:text-white",
            className,
          )}
        >
          <GearIcon className="size-7 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Button
                variant="ghost"
                className="mr-6"
                aria-label="Toggle Theme"
                onClick={switchTheme}
              >
                <SunIcon className="absolute h-6 w-6 rotate-0 scale-100 transition-all hover:text-yellow-500 dark:-rotate-90 dark:scale-0 " />
                <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all hover:text-blue-500 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
