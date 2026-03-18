import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

export async function listLegacyHtmlPages() {
  const entries = await fs.readdir(ROOT_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name)
    .sort();
}

export async function hasLegacyPage(filename) {
  try {
    await fs.access(path.join(ROOT_DIR, filename));
    return true;
  } catch {
    return false;
  }
}

export async function readLegacyPage(filename) {
  const filePath = path.join(ROOT_DIR, filename);
  const raw = await fs.readFile(filePath, 'utf8');

  return {
    filename,
    title: extractTag(raw, /<title>([\s\S]*?)<\/title>/i) || '英雄联盟爱好者',
    description:
      extractMeta(raw, 'description') ||
      '英雄联盟爱好者网站提供英雄、攻略、模式与训练内容。',
    bodyHtml: sanitizeBodyHtml(extractTag(raw, /<body[^>]*>([\s\S]*?)<\/body>/i) || '')
  };
}

function extractTag(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1].trim() : '';
}

function extractMeta(source, metaName) {
  const pattern = new RegExp(
    `<meta[^>]+name=["']${metaName}["'][^>]+content=["']([^"']*)["'][^>]*>`,
    'i'
  );
  const match = source.match(pattern);
  return match ? match[1].trim() : '';
}

function sanitizeBodyHtml(bodyHtml) {
  return bodyHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\s(?:defer|async)(?=[>\s])/gi, '')
    .trim();
}
