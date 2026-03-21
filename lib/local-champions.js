import { readFile } from 'node:fs/promises';
import path from 'node:path';

const CHAMPIONS_FILE = path.join(process.cwd(), 'public', 'data', 'champions.json');

export async function getLocalChampions() {
  try {
    const raw = await readFile(CHAMPIONS_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.heroes) ? data.heroes : [];
  } catch {
    return [];
  }
}

export async function getLocalChampionById(heroId) {
  const heroes = await getLocalChampions();
  return heroes.find((hero) => hero.id === heroId) || null;
}
