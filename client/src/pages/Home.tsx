import intro from "@/assets/videos/intro.mp4";
import secondImg from "@/assets/images/second.png";
import fourthImg from "@/assets/images/fourth.jpg";
import thirdImg from "@/assets/images/third.jpeg";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import HomeSection from "@/components/ui/home-section";

export function Home() {
  useEffect(() => {}, []);

  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 h-[100dvh] bg-purple-400 ">
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
      <HomeSection imageSrc={secondImg}>Example text</HomeSection>
      <HomeSection imageSrc={thirdImg}>Example text</HomeSection>
      <HomeSection imageSrc={fourthImg}>Example text</HomeSection>
    </div>
  );
}
