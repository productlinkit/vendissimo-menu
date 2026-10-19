import { GAMES } from "../data";
import { useState } from "react";
import { RedeemSheet } from "../components/RedeemSheet";
import { Coach, sudahPernahTur } from "../components/levels/Coach";
import { LevelDetail } from "../components/levels/LevelDetail";
import { LevelMap } from "../components/levels/LevelMap";
import { Icon } from "../components/Icon";
import { gamesOf } from "../lib/levels";
import { useI18n } from "../i18n";
import type { GameGroup, Progress, Reward } from "../types";

/** id -> posisi di GAMES, karena pemutar game dibuka dengan indeks. */
const GAMES_INDEX = new Map(GAMES.map((game, idx) => [game.id, idx]));

// Halaman ini kini hanya berisi gamifikasinya. Daftar hadiah, cara
// mendapat poin, dan riwayat pindah ke Profil; penukaran sendiri pindah
// ke kartu hadiah di halaman level, supaya poin tetap bisa ditukar.
export function RewardsPage({
  S,
  onRedeem,
  onGame,
}: {
  S: Progress;
  onRedeem: (reward: Reward) => void;
  onGame: (idx: number) => void;
}) {
  const { t } = useI18n();
  const [redeeming, setRedeeming] = useState<Reward | null>(null);
  const [levelTerbuka, setLevelTerbuka] = useState<number | null>(null);
  const [tur, setTur] = useState(() => !sudahPernahTur());

  // "GO" membuka game pertama di kelompoknya yang belum pernah diselesaikan
  const mainkan = (group: GameGroup) => {
    const daftar = gamesOf(group);
    const belum = daftar.find((game) => !S.played.includes(game.id));
    const pilih = belum ?? daftar[0];
    const idx = GAMES_INDEX.get(pilih.id);
    if (idx !== undefined) onGame(idx);
  };

  if (levelTerbuka !== null) {
    return (
      <>
        <LevelDetail
          n={levelTerbuka}
          S={S}
          onBack={() => setLevelTerbuka(null)}
          onPlay={mainkan}
          onClaim={setRedeeming}
        />
        {tur && <Coach onClose={() => setTur(false)} />}
      </>
    );
  }

  return (
    <div className="vp-view page-enter">
      <h1 className="vp-sr-only">{t("Rewards")}</h1>
      <button
        type="button"
        className="vp-level-help"
        aria-label={t(`How levels work`)}
        onClick={() => setTur(true)}
      >
        {Icon.info}
      </button>
      <LevelMap S={S} onOpen={setLevelTerbuka} />
      {tur && <Coach onClose={() => setTur(false)} />}
      {redeeming && (
        <RedeemSheet
          reward={redeeming}
          onConfirm={() => onRedeem(redeeming)}
          onClose={() => setRedeeming(null)}
        />
      )}
    </div>
  );
}
