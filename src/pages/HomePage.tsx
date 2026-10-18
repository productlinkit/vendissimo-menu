import { Bento } from "../components/home/Bento";
import { CategoryTiles } from "../components/CategoryTiles";
import { HeroCarousel } from "../components/home/HeroCarousel";
import type { Progress, Route } from "../types";

type HomePageProps = {
  S: Progress;
  onNavigate: (route: Route) => void;
};

export function HomePage({ S, onNavigate }: HomePageProps) {
  return (
    <div className="vp-home page-enter">
      <div className="vp-desktop-only">
        <Bento S={S} onNavigate={onNavigate} />
      </div>
      <div className="vp-mobile-only">
        <HeroCarousel onNavigate={onNavigate} />
        <CategoryTiles onNavigate={onNavigate} />
      </div>
    </div>
  );
}
