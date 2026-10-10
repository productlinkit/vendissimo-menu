// Myanmar translations, keyed by the English text used in the code.
// Split per area so each file stays readable; merged here.
import { data } from "./my/data.ts";
import { pages } from "./my/pages.ts";
import { shell } from "./my/shell.ts";
import { viewers } from "./my/viewers.ts";

export const MY: Record<string, string> = { ...shell, ...pages, ...viewers, ...data };
