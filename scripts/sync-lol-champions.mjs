import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildAbilitiesFromChampionDetail,
  buildSkinsFromChampionDetail,
  getRoleEmoji,
  getRolePreset,
  ROLE_CN_MAP,
  sanitizeText,
  toDifficultyLabel,
  toKebabCase
} from '../lib/champion-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT, 'public', 'data', 'champions.json');

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'league-of-legends-website-sync/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${url}`);
  }

  return response.json();
}

function mergeSkins(localSkins = [], officialSkins = []) {
  return officialSkins.map((skin, index) => {
    const localSkin = localSkins[index] || null;
    return {
      ...skin,
      price: localSkin?.price || skin.price,
      tier: localSkin?.tier || skin.tier,
      description: localSkin?.description || skin.description
    };
  });
}

function buildHero(champion, localHero = null) {
  const roles = (champion.tags || []).map((tag) => ROLE_CN_MAP[tag]).filter(Boolean);
  const preset = getRolePreset(roles);

  return {
    ...(localHero?.quote ? { quote: localHero.quote } : {}),
    id: toKebabCase(champion.id),
    name: champion.name,
    title: champion.title,
    roles: roles.length > 0 ? roles : ['战士'],
    difficulty: toDifficultyLabel(champion.info?.difficulty || 5),
    lore: localHero?.lore || sanitizeText(champion.lore || champion.blurb || ''),
    abilities: buildAbilitiesFromChampionDetail(champion),
    playstyle: localHero?.playstyle || preset.playstyle,
    builds: localHero?.builds || preset.builds,
    runes: localHero?.runes || preset.runes,
    image: localHero?.image || getRoleEmoji(roles),
    skins: mergeSkins(localHero?.skins || [], buildSkinsFromChampionDetail(champion.skins || []))
  };
}

async function main() {
  const versions = await fetchJson('https://ddragon.leagueoflegends.com/api/versions.json');
  const latestVersion = Array.isArray(versions) && versions.length > 0 ? versions[0] : '14.1.1';
  const championFull = await fetchJson(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/zh_CN/championFull.json`
  );

  let existing = { heroes: [] };
  try {
    existing = JSON.parse(await readFile(OUTPUT_FILE, 'utf8'));
  } catch {
    existing = { heroes: [] };
  }

  const existingMap = new Map((existing.heroes || []).map((hero) => [hero.id, hero]));
  const heroes = Object.values(championFull.data || {})
    .map((champion) => buildHero(champion, existingMap.get(toKebabCase(champion.id)) || null))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));

  const payload = {
    version: latestVersion,
    name: '英雄联盟英雄资料库',
    heroes
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Synced ${heroes.length} champions from Riot Data Dragon ${latestVersion}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
