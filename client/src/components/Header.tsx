import { Button } from "./ui/button";
import { HamburgerMenuIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "./ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Navigation } from "./Navigation";
import SearchBar from "./ui/search-bar";
import { Link } from "@tanstack/react-router";
import HeaderScroll from "react-headroom";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation("global");
  const { theme, setTheme } = useTheme();

  function switchTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <HeaderScroll>
      <header className="duration-600 bg-white/60 py-2 text-pink-600/100 shadow-2xl backdrop-blur transition-all dark:bg-pink-600/50 dark:text-white">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <HamburgerMenuIcon className="h-6 w-6 lg:hidden" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] bg-white/60  text-pink-500 backdrop-blur sm:w-[400px] dark:bg-pink-600/50 dark:text-white"
              >
                <Navigation className="flex flex-col gap-5 font-bold" />
                <SearchBar className="mt-10 sm:hidden" />
              </SheetContent>
            </Sheet>
            <Link
              to={"/"}
              className="duration-600 ml-2 flex max-w-28 transition-all hover:tracking-widest "
            >
              <h1 className="text-2xl font-bold ">DunkVault</h1>
              <img
                src="logo.svg"
                className="ml-3 mt-0.5 h-[30px] w-[30px] text-white "
              />
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
            {/* <ProfileButton /> */}
            <Button
              variant="ghost"
              className="space rounded-3xl border border-pink-500 px-5 text-base tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:animate-in dark:border-white"
            >
              {t("start")}
            </Button>
          </div>
        </div>
      </header>
    </HeaderScroll>
  );
}
