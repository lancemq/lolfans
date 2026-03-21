import { readFile } from 'node:fs/promises';
import path from 'node:path';

const CHAMPIONS_FILE = path.join(process.cwd(), 'public', 'data', 'champions.json');
const SITE_META_FILE = path.join(process.cwd(), 'public', 'data', 'site-meta.json');

let championsCachePromise = null;
let siteMetaCachePromise = null;

async function readJsonFile(filePath, fallback) {
  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function readLocalChampionsPayload() {
  return readJsonFile(CHAMPIONS_FILE, { heroes: [] });
}

async function readSiteMetaPayload() {
  return readJsonFile(SITE_META_FILE, null);
}

export async function getLocalChampions() {
  championsCachePromise ||= readLocalChampionsPayload();
  const data = await championsCachePromise;
  return Array.isArray(data.heroes) ? data.heroes : [];
}

export async function getLocalChampionById(heroId) {
  const heroes = await getLocalChampions();
  return heroes.find((hero) => hero.id === heroId) || null;
}

export async function getSiteMeta() {
  siteMetaCachePromise ||= readSiteMetaPayload();
  return siteMetaCachePromise;
}

export async function getLocalChampionSnapshot() {
  const [heroes, siteMeta] = await Promise.all([getLocalChampions(), getSiteMeta()]);
  return { heroes, siteMeta };
}
