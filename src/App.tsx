import { useCallback, useMemo, useState } from "react";
import { Confetti } from "./components/Confetti";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Toast } from "./components/Toast";
import { isCategoryRoute, TopNav } from "./components/TopNav";
import { EnglishPractice } from "./components/viewers/EnglishPractice";
import { GamePlayer } from "./components/viewers/GamePlayer";
import { MagazineReader } from "./components/viewers/MagazineReader";
import { VideoPlayer } from "./components/viewers/VideoPlayer";
import { useI18n } from "./i18n";
import { ENGLISH_SETS, GAMES, MAGAZINES, POINTS, VIDEOS } from "./data";
import { useProgress } from "./lib/progress";
import { award } from "./lib/pointsService";
import { CategoryPage } from "./pages/CategoryPage";
import { ExplorePage } from "./pages/ExplorePage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { RewardsPage } from "./pages/RewardsPage";
import type { Reward, Route, Viewer } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<Route>(`home`);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const { S: progress, earnOnce, addPts, markOpened, markPlayed } =
    useProgress();
  const { t } = useI18n();

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const navigate = useCallback((next: Route) => {
    setRoute(next);
    setConfetti(false);
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);

  const points = useMemo(
    () => ({
      earnOnce,
      awarded: progress.awarded,
    }),
    [earnOnce, progress.awarded],
  );

  // Opening only records that the item was seen. Points are granted by the
  // finish* handlers below, so open-and-close earns nothing.
  const openMagazine = useCallback(
    (idx: number) => {
      setViewer({
        type: `mag`,
        idx,
      });
      markOpened(`mag-${idx}`);
    },
    [markOpened],
  );

  const openVideo = useCallback(
    (idx: number) => {
      setViewer({
        type: `video`,
        idx,
      });
      markOpened(`vid-${idx}`);
    },
    [markOpened],
  );

  const openGame = useCallback(
    (idx: number) => {
      setViewer({
        type: `game`,
        idx,
      });
      markOpened(`game-${idx}`);
    },
    [markOpened],
  );

  const openEnglish = useCallback(
    (idx: number, from?: `education`) =>
      setViewer({
        type: `eng`,
        idx,
        from,
      }),
    [],
  );

  const finishMagazine = useCallback(
    (idx: number) => {
      const got = award(points, `magazine`, String(idx), POINTS.magazine);
      if (got) showToast(t(`+{n} pts — Magazine`, { n: got.pts }));
    },
    [points, showToast, t],
  );

  const finishVideo = useCallback(
    (idx: number) => {
      const got = award(points, `video`, String(idx), POINTS.video);
      if (got) showToast(t(`+{n} pts — Video`, { n: got.pts }));
    },
    [points, showToast, t],
  );

  const finishGame = useCallback(
    (idx: number) => {
      // dicatat seumur hidup supaya kemajuan level bertahan; `awarded`
      // direset tiap hari dan tidak bisa dipakai untuk itu
      markPlayed(GAMES[idx].id);
      const got = award(points, `game`, String(idx), GAMES[idx].pts);
      if (got) showToast(t(`+{n} pts — Game`, { n: got.pts }));
    },
    [markPlayed, points, showToast, t],
  );

  const finishEnglish = useCallback(() => {
    if (viewer?.type !== `eng`) return;
    // Education cards advertise POINTS.lesson, so finishing one pays that.
    const fromCourse = viewer.from === `education`;
    const got = award(
      points,
      fromCourse ? `education` : `english`,
      String(viewer.idx),
      fromCourse ? POINTS.lesson : POINTS.english,
    );
    if (got) {
      showToast(
        fromCourse
          ? t(`+{n} pts — Course`, { n: got.pts })
          : t(`+{n} pts — English`, { n: got.pts }),
      );
      setConfetti(true);
    }
  }, [viewer, points, showToast, t]);

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
      {!playingGame && (
        <TopNav route={route} onNavigate={navigate} pts={progress.pts} />
      )}
      {!playingGame && (
        <main className="vp-main">
          {route === `home` && (
            <HomePage S={progress} onNavigate={navigate} />
          )}
          {route === `explore` && <ExplorePage onNavigate={navigate} />}
          {route === `rewards` && (
            <RewardsPage
              S={progress}
              onRedeem={handleRedeem}
              onGame={openGame}
            />
          )}
          {route === `profile` && (
            <ProfilePage S={progress} onNavigate={navigate} />
          )}
          {isCategory && (
            <CategoryPage
              catId={route}
              onBack={() => navigate(`home`)}
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
          onFinish={() => finishMagazine(viewer.idx)}
        />
      )}
      {viewer?.type === `video` && (
        <VideoPlayer
          video={VIDEOS[viewer.idx]}
          onClose={() => setViewer(null)}
          onOther={openVideo}
          onFinish={() => finishVideo(viewer.idx)}
        />
      )}
      {viewer?.type === `game` && (
        <GamePlayer
          game={GAMES[viewer.idx]}
          onClose={() => setViewer(null)}
          onFinish={() => finishGame(viewer.idx)}
        />
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
