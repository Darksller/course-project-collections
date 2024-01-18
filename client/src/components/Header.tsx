import { Button } from "./ui/shadcn-ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/shadcn-ui/sheet";
import { Navigation } from "./Navigation";
import SearchBar from "./ui/search-bar";
import { Link } from "@tanstack/react-router";
import HeaderScroll from "react-headroom";
import { useTranslation } from "react-i18next";
import { SettingsButton } from "./ui/settings-button";

export function Header() {
  const { t } = useTranslation("global");

  return (
    <HeaderScroll>
      <header className="duration-600 w-full bg-white/60 py-2 text-pink-600/100 shadow-2xl backdrop-blur transition-all dark:bg-pink-600/50 dark:text-white">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex items-center pl-2 lg:pl-[15%]">
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

          <Navigation className="hidden items-center lg:block" />

          <div className="flex items-center">
            <SearchBar className="mr-6 hidden sm:block" />

            {/* <ProfileButton /> */}
            <Button
              variant="ghost"
              className="rounded-3xl border border-pink-500 px-5 text-base font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-pink-500 hover:animate-in dark:border-white dark:hover:text-white"
            >
              {t("start")}
            </Button>
          </div>
          <SettingsButton className="mr-3" />
        </div>
      </header>
    </HeaderScroll>
  );
}
