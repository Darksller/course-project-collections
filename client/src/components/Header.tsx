import { Button } from "./ui/button";
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { ProfileButton } from "./ui/profile-button";
import { useTheme } from "./ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Navigation } from "./Navigation";
import SearchBar from "./ui/search-bar";
import { Link } from "@tanstack/react-router";
import HeaderScroll from "react-headroom";
export function Header() {
  const { theme, setTheme } = useTheme();
  function switchTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <HeaderScroll>
      <header className="bg-gray-400/70 py-2 text-pink-600/100 shadow-2xl backdrop-blur dark:bg-pink-600/50 dark:text-white">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <HamburgerMenuIcon className="h-6 w-6 lg:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <Navigation className="mt-3 flex flex-col gap-2" />
                <SearchBar className="mt-4 sm:hidden" />
              </SheetContent>
            </Sheet>
            <Link
              to={"/"}
              className="duration-600 ml-2 flex max-w-28 transition-all hover:tracking-widest "
            >
              <h1 className="text-2xl font-bold drop-shadow-light dark:drop-shadow-dark">
                GrapeVault
              </h1>
              <img src="logo.svg" className="ml-1 h-[30px] w-[30px] " />
            </Link>
          </div>
          <Navigation className="mx-6 hidden items-center space-x-4 lg:block lg:space-x-6 " />

          <div className="flex items-center">
            <SearchBar className="mr-6 hidden sm:block" />
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
            <ProfileButton />
          </div>
        </div>
      </header>
    </HeaderScroll>
  );
}
