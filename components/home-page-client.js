'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  getChampionSplashUrl,
  getDifficultyClass,
  getRoleClass,
  summarizeText
} from '../lib/champion-data';

const DATA_DRAGON_VERSION = '16.6.1';
const HOT_CHAMPION_IDS = ['yasuo', 'ahri', 'lee-sin', 'jinx', 'ezreal', 'thresh', 'zed', 'lux', 'vayne', 'yone', 'akali', 'darius'];
const HERO_BANNER_SKIN_MAP = {
  yasuo: 8,
  ahri: 8,
  'lee-sin': 9,
  jinx: 7,
  ezreal: 7,
  thresh: 8,
  zed: 9,
  lux: 16,
  vayne: 9,
  yone: 6,
  akali: 9,
  darius: 6
};

const INFO_SLIDES = [
  {
    label: '版本焦点',
    title: '本周上分节奏',
    desc: '优先控前两条小龙与先锋，15 分钟前建立地图资源优势。',
    link: '/items-runes.html',
    linkText: '查看符文装备'
  },
  {
    label: '实战攻略',
    title: '团战执行四步',
    desc: '先站位再开团，统一集火目标，结束后立刻转龙或推塔。',
    link: '/strategy-center.html',
    linkText: '进入攻略中心'
  },
  {
    label: '新手推荐',
    title: '三局训练模板',
    desc: '一局练补刀，一局练视野，一局练团战目标选择，稳步提升。',
    link: '/guide.html',
    linkText: '查看新手指南'
  }
];

function getFeaturedHeroes(heroes) {
  const heroMap = new Map(heroes.map((hero) => [hero.id, hero]));
  return HOT_CHAMPION_IDS.map((id) => heroMap.get(id)).filter(Boolean);
}

export function HomeHeroExperience({ heroes = [] }) {
  const featured = useMemo(() => getFeaturedHeroes(heroes), [heroes]);
  const carouselSlides = featured.slice(0, 6);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    if (carouselSlides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setHeroSlide((value) => (value + 1) % carouselSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [carouselSlides.length]);

  const activeHero = carouselSlides[heroSlide];

  return (
    <>
      <div className="hero-carousel" aria-hidden="true">
        <div className="hero-carousel-track">
          {carouselSlides.map((hero, index) => {
            const skinIndex = HERO_BANNER_SKIN_MAP[hero.id] || 0;
            return (
              <div
                className={`hero-carousel-slide ${index === heroSlide ? 'active' : ''}`}
                key={hero.id}
                style={{ backgroundImage: `url('${getChampionSplashUrl(DATA_DRAGON_VERSION, hero, skinIndex)}')` }}
              ></div>
            );
          })}
        </div>
        <div className="hero-carousel-overlay"></div>
        <div className="hero-carousel-controls">
          {carouselSlides.map((hero, index) => (
            <button
              type="button"
              className={`hero-carousel-dot ${index === heroSlide ? 'active' : ''}`}
              key={hero.id}
              aria-label={`切换到${hero.name}`}
              onClick={() => setHeroSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      <p className="hero-highlight">
        当前聚焦：{activeHero?.name || '热门英雄'}{activeHero?.title ? ` · ${activeHero.title}` : ''}
      </p>
    </>
  );
}

export function HomeInfoCarousel() {
  const [infoSlide, setInfoSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setInfoSlide((value) => (value + 1) % INFO_SLIDES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-info-carousel">
        <div className="hero-info-track">
          {INFO_SLIDES.map((slide, index) => (
            <article className={`hero-info-slide ${index === infoSlide ? 'active' : ''}`} key={slide.title}>
              <span className="hero-info-label">{slide.label}</span>
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
              <a href={slide.link} className="hero-info-link">
                {slide.linkText}
              </a>
            </article>
          ))}
        </div>
        <div className="hero-info-dots">
          {INFO_SLIDES.map((slide, index) => (
            <button
              type="button"
              className={`hero-info-dot ${index === infoSlide ? 'active' : ''}`}
              key={slide.title}
              aria-label={`切换轮播内容${index + 1}`}
              onClick={() => setInfoSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}

export function HomeFeaturedChampions({ heroes = [] }) {
  const featured = useMemo(() => getFeaturedHeroes(heroes), [heroes]);

  return (
    <div className="champions-grid">
      {featured.map((hero) => (
        <a className="champion-card featured-champion-card" href={`/hero-detail.html?id=${hero.id}`} key={hero.id}>
          <div className="champion-image">
            <img
              className="champion-image-img"
              src={getChampionSplashUrl(DATA_DRAGON_VERSION, hero, HERO_BANNER_SKIN_MAP[hero.id] || 0)}
              alt={`${hero.name} 高清立绘`}
              loading="lazy"
            />
            <span className="featured-badge">热门</span>
          </div>
          <div className="champion-info">
            <h3 className="champion-name">{hero.name}</h3>
            <p className="champion-title">{hero.title}</p>
            <p className="featured-champion-desc">英雄介绍：{hero.title}</p>
            <p className="featured-champion-lore">背景故事：{summarizeText(hero.lore, 64)}</p>
            <div className="champion-roles">
              {(hero.roles || []).map((role) => (
                <span className={`role-tag ${getRoleClass(role)}`} key={role}>
                  {role}
                </span>
              ))}
            </div>
            <span className={`difficulty ${getDifficultyClass(hero.difficulty)}`}>{hero.difficulty}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
