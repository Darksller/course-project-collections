import {
  HeartFilledIcon,
  HeartIcon,
  InfoCircledIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./button";

export function CollectionCard() {
  const [isLiked, setLiked] = useState(false);
  function onLikeClicked() {
    setLiked(!isLiked);
  }
  //TODO: fix bottom
  //TODO: fix link in link
  return (
    <div className="group relative m-auto h-[250px] w-[225px] scale-95 cursor-pointer overflow-hidden rounded-md  border-purple-300 font-muli transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute right-0 top-0 z-50 h-14 w-11 translate-x-[10px] translate-y-[-22px] rounded-xl border border-white/50 backdrop-blur hover:animate-pulse md:hidden">
        <InfoCircledIcon className="ml-1 mt-[26px] size-6 text-white " />
      </div>
      <Link to="$collection">
        <div className="group/img h-full overflow-hidden rounded-md bg-[url('image.jpg')] bg-cover   transition-all delay-1000 duration-1000">
          <div className="relative h-full w-full rounded-md bg-black/45  text-white opacity-0 transition-all duration-500 max-md:group-hover:opacity-100 md:group-hover/img:opacity-100">
            <div className="relative h-[80%] max-w-[92%] pl-5 ">
              <div className="text-sm italic tracking-wide transition-all duration-1000 group-hover/img:translate-y-[160%] group-hover:translate-y-[160%] group-hover/img:text-2xl group-hover:text-2xl">
                Арбузичи
              </div>
              <div className="absolute bottom-0 max-h-[50%] translate-y-full overflow-hidden text-ellipsis break-all text-sm opacity-0 duration-1000 group-hover/img:translate-y-0 group-hover:translate-y-0 group-hover/img:opacity-100 group-hover:opacity-100">
                <div className="w-0 border-b-2 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full  dark:border-white " />
                Какое-то описание Какое-sто описание Какое-то описание Какое-то
              </div>
            </div>

            <Link
              to="/tags/$tag"
              className="absolute bottom-2 left-3 max-w-[50%] translate-x-[-300%] overflow-hidden truncate rounded-lg border pl-2 pr-2 text-sm opacity-70 backdrop-blur transition-all duration-1000 hover:opacity-100 group-hover/img:translate-x-0 group-hover:translate-x-0 dark:border-white"
            >
              #Овощи
            </Link>
            <Link
              to="/users/$userId"
              className="absolute bottom-2 right-3 max-w-[39%] translate-x-[300%] truncate rounded-lg border pl-2 pr-2 text-sm opacity-70 backdrop-blur transition-all  duration-1000 hover:opacity-100 group-hover/img:translate-x-0 group-hover:translate-x-0 dark:border-white"
            >
              Петр
            </Link>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 flex h-[50px] w-full items-center bg-black/45 font-bold text-white transition-all duration-1000 hover:!bottom-0 group-hover:bottom-[-30%]">
        <LockClosedIcon className="ml-2 mr-1" />
        Арбузы
        <Button
          variant="ghost"
          className="ml-auto hover:text-red-600"
          onClick={onLikeClicked}
        >
          {!isLiked ? (
            <HeartIcon className="size-7 transition-all duration-300 hover:scale-125" />
          ) : (
            <HeartFilledIcon className="size-7 text-red-600 transition-all duration-300 hover:scale-125 hover:text-red-400" />
          )}
        </Button>
      </div>
    </div>
  );
}
