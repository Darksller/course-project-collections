import intro from "@/assets/videos/intro.mp4";
import secondImg from "@/assets/images/second.png";
import fourthImg from "@/assets/images/fourth.jpg";
import thirdImg from "@/assets/images/third.jpeg";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export function Home() {
  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 h-[100dvh]  bg-purple-400 ">
        <video
          src={intro}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center">
          <Link to="createCollection">
            <Button>Create a new Collection!</Button>
          </Link>
        </div>
      </div>

      <div className="sticky top-0 flex h-[100svh] max-w-full items-center justify-center bg-purple-400">
        <img
          src={secondImg}
          className="absolute left-0 top-0 h-full w-full object-cover  brightness-50"
        />
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center font-bold text-white">
          Example text
        </div>
      </div>
      <div className="sticky top-0 flex h-[100svh] max-w-full items-center justify-center bg-purple-400">
        <img
          src={thirdImg}
          className="absolute left-0 top-0 h-full w-full object-cover  brightness-50"
        />
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center font-bold text-white">
          Example text
        </div>
      </div>
      <div className="sticky top-0 flex h-[100svh] max-w-full items-center justify-center bg-purple-400">
        <img
          src={fourthImg}
          className="absolute left-0 top-0 h-full w-full object-cover  brightness-50"
        />
        <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center font-bold text-white">
          Example text
        </div>
      </div>
    </div>
  );
}
