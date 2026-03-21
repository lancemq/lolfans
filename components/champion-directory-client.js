'use client';

import { useMemo, useState } from 'react';
import { getChampionLoadingUrl, getDifficultyClass, getRoleClass } from '../lib/champion-data';

const ROLE_FILTERS = ['all', '战士', '刺客', '法师', '射手', '辅助', '坦克'];

export function ChampionDirectoryClient({ heroes = [] }) {
  const [role, setRole] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesRole = role === 'all' || (hero.roles || []).includes(role);
      const matchesDifficulty = difficulty === 'all' || hero.difficulty === difficulty;
      const matchesQuery = !query.trim() || [hero.name, hero.title].some((text) => text.toLowerCase().includes(query.toLowerCase()));
      return matchesRole && matchesDifficulty && matchesQuery;
    });
  }, [heroes, role, difficulty, query]);

  return (
    <>
      <div className="filter-section">
        <div className="search-box">
          <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索英雄名称..." />
          <button className="search-btn" aria-label="搜索英雄" type="button">
            🔍
          </button>
        </div>
        <div className="filter-tags">
          {ROLE_FILTERS.map((item) => (
            <button
              className={`filter-btn ${role === item ? 'active' : ''}`}
              data-filter={item}
              key={item}
              onClick={() => setRole(item)}
              type="button"
            >
              {item === 'all' ? '全部' : item}
            </button>
          ))}
        </div>
        <div className="difficulty-filter">
          <label htmlFor="difficultySelect">难度:</label>
          <select id="difficultySelect" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="all">全部难度</option>
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>
        </div>
      </div>

      <div className="champions-list">
        {results.length === 0 ? (
          <div className="knowledge-card hero-empty-state">
            <h3>没有找到匹配的英雄</h3>
            <p>请尝试其他筛选条件。</p>
          </div>
        ) : (
          results.map((hero) => (
            <a className="champion-card" href={`/hero-detail.html?id=${hero.id}`} key={hero.id}>
              <div className="champion-image">
                <img className="champion-image-img" src={getChampionLoadingUrl('16.6.1', hero, 0)} alt={`${hero.name} 高清头像`} loading="lazy" />
              </div>
              <div className="champion-info">
                <h3 className="champion-name">{hero.name}</h3>
                <p className="champion-title">{hero.title}</p>
                <div className="champion-roles">
                  {(hero.roles || []).map((heroRole) => (
                    <span className={`role-tag ${getRoleClass(heroRole)}`} key={heroRole}>
                      {heroRole}
                    </span>
                  ))}
                </div>
                <span className={`difficulty ${getDifficultyClass(hero.difficulty)}`}>{hero.difficulty}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </>
  );
}
