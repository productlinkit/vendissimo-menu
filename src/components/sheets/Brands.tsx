import { BRANDS, type BrandKey } from "../../lib/products";

export default function Brands({ keys }: { keys: BrandKey[] }) {
  return (
    <span className="brands">
      {keys.map((k) => {
        const b = BRANDS[k];
        return (
          <span key={k} className="bchip" style={{ ["--bbg" as string]: b.bg, ["--bfg" as string]: b.fg }}>
            {b.name}
          </span>
        );
      })}
    </span>
  );
}
