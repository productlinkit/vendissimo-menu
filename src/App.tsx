import { useCallback, useState } from "react";
import { Confetti } from "./components/Confetti";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Toast } from "./components/Toast";
import { isCategoryRoute, TopNav } from "./components/TopNav";
import { Welcome } from "./components/Welcome";
import { EnglishPractice } from "./components/viewers/EnglishPractice";
import { GamePlayer } from "./components/viewers/GamePlayer";
import { MagazineReader } from "./components/viewers/MagazineReader";
import { VideoPlayer } from "./components/viewers/VideoPlayer";
import { useI18n } from "./i18n";
import { ENGLISH_SETS, GAMES, MAGAZINES, POINTS, VIDEOS } from "./data";
import { useProgress } from "./lib/progress";
import { CategoryPage } from "./pages/CategoryPage";
import { ExplorePage } from "./pages/ExplorePage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RewardsPage } from "./pages/RewardsPage";
import type { Reward, Route, Viewer } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [route, setRoute] = useState<Route>(`home`);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const { S: progress, earnOnce, addPts, markOpened } = useProgress();
  const { t } = useI18n();

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const navigate = useCallback((next: Route) => {
    setRoute(next);
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);

  const openMagazine = useCallback(
    (idx: number) => {
      setViewer({
        type: `mag`,
        idx,
      });
      if (!progress.opened.includes(`mag-${idx}`)) {
        markOpened(`mag-${idx}`);
        earnOnce(`mag-${idx}`, POINTS.magazine, `Read a magazine`);
        earnOnce(`mag`, 0, ``);
        showToast(t(`+{n} pts — Magazine`, { n: POINTS.magazine }));
      }
    },
    [progress.opened, markOpened, earnOnce, showToast, t],
  );

  const openVideo = useCallback(
    (idx: number) => {
      setViewer({
        type: `video`,
        idx,
      });
      if (!progress.opened.includes(`vid-${idx}`)) {
        markOpened(`vid-${idx}`);
        earnOnce(`vid-${idx}`, POINTS.video, `Watched a video`);
        earnOnce(`video`, 0, ``);
        showToast(t(`+{n} pts — Video`, { n: POINTS.video }));
      }
    },
    [progress.opened, markOpened, earnOnce, showToast, t],
  );

  const openGame = useCallback(
    (idx: number) => {
      setViewer({
        type: `game`,
        idx,
      });
      if (!progress.opened.includes(`game-${idx}`)) {
        markOpened(`game-${idx}`);
        earnOnce(`game-${idx}`, GAMES[idx].pts, `Played a game`);
        earnOnce(`game`, 0, ``);
        showToast(t(`+{n} pts — Game`, { n: GAMES[idx].pts }));
      }
    },
    [progress.opened, markOpened, earnOnce, showToast, t],
  );

  const openEnglish = useCallback(
    (idx: number) =>
      setViewer({
        type: `eng`,
        idx,
      }),
    [],
  );

  const finishEnglish = useCallback(() => {
    if (viewer?.type === `eng`) {
      earnOnce(`eng-${viewer.idx}`, POINTS.english, `English practice`);
      earnOnce(`english_done`, 0, ``);
      showToast(t(`+{n} pts — English`, { n: POINTS.english }));
      setConfetti(true);
    }
  }, [viewer, earnOnce, showToast, t]);

  const handleSpin = useCallback(
    (pts: number) => {
      earnOnce(`spin`, pts, `Daily spin`);
      showToast(t(`Daily spin: +{n} pts!`, { n: pts }));
      setConfetti(true);
    },
    [earnOnce, showToast, t],
  );

  // Logged under the reward's name; the negative amount shows it was spent.
  const handleRedeem = useCallback(
    (reward: Reward) => addPts(-reward.pts, reward.label),
    [addPts],
  );

  const isCategory = isCategoryRoute(route);
  const playingGame = viewer?.type === `game`;

  return (
    <div
      className="vp-app"
      style={{
        background: `transparent`,
      }}
    >
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && showWelcome && (
        <Welcome
          onPlay={() => {
            setShowWelcome(false);
            navigate(`home`);
          }}
          onExplore={() => setShowWelcome(false)}
        />
      )}
      {!playingGame && (
        <TopNav route={route} onNavigate={navigate} pts={progress.pts} />
      )}
      {!playingGame && (
        <main className="vp-main">
          {route === `home` && (
            <HomePage S={progress} onNavigate={navigate} onSpin={handleSpin} />
          )}
          {route === `explore` && <ExplorePage onNavigate={navigate} />}
          {route === `rewards` && (
            <RewardsPage S={progress} onRedeem={handleRedeem} />
          )}
          {route === `profile` && (
            <ProfilePage S={progress} onNavigate={navigate} />
          )}
          {isCategory && (
            <CategoryPage
              catId={route}
              onBack={() => navigate(`explore`)}
              onMag={openMagazine}
              onVideo={openVideo}
              onGame={openGame}
              onEng={openEnglish}
            />
          )}
          <Footer />
        </main>
      )}
      {viewer?.type === `mag` && (
        <MagazineReader
          mag={MAGAZINES[viewer.idx]}
          onClose={() => setViewer(null)}
        />
      )}
      {viewer?.type === `video` && (
        <VideoPlayer
          video={VIDEOS[viewer.idx]}
          onClose={() => setViewer(null)}
          onOther={openVideo}
        />
      )}
      {viewer?.type === `game` && (
        <GamePlayer game={GAMES[viewer.idx]} onClose={() => setViewer(null)} />
      )}
      {viewer?.type === `eng` && (
        <EnglishPractice
          set={ENGLISH_SETS[viewer.idx]}
          onClose={() => setViewer(null)}
          onEarn={finishEnglish}
          onOtherSet={openEnglish}
        />
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
    </div>
  );
}
