import { Button } from "./ui/shadcn-ui/button";
import { Navigation } from "./Navigation";
import SearchBar from "./ui/search-bar";
import { Link } from "@tanstack/react-router";
import HeaderScroll from "react-headroom";
import { useTranslation } from "react-i18next";
import { SettingsButton } from "./ui/settings-button";
import { HamburgerMenu } from "./ui/hamburger-menu";

export function Header() {
  const { t } = useTranslation("global");

  return (
    <HeaderScroll>
      <header className="duration-600 w-full bg-white/60 py-2 text-pink-600/100 shadow-2xl backdrop-blur-xl transition-all dark:bg-pink-600/50 dark:text-white">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex items-center pl-2 lg:pl-[15%]">
            <HamburgerMenu />
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
