import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "./shadcn-ui/sheet";
import { Navigation } from "../Navigation";
import SearchBar from "./search-bar";

export function HamburgerMenu() {
  return (
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
  );
}
