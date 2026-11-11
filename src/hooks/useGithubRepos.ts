import { useEffect, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
}

interface State {
  repos: GithubRepo[];
  loading: boolean;
  error: boolean;
}

const CACHE_MINUTES = 10;

function readCache(key: string): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw) as { at: number; repos: GithubRepo[] };
    return Date.now() - at < CACHE_MINUTES * 60_000 ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, repos: GithubRepo[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* storage unavailable — fine, we just refetch next time */
  }
}

/**
 * Fetches ALL of the user's public repos (every page), newest activity first.
 * Forks and the profile-README repo (named after the user) are left out.
 * New repos appear automatically — nothing to update in the portfolio code.
 */
export function useGithubRepos(username: string): State {
  const [state, setState] = useState<State>({ repos: [], loading: true, error: false });

  useEffect(() => {
    const cacheKey = `gh-repos:${username}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ repos: cached, loading: false, error: false });
      return;
    }

    const controller = new AbortController();

    async function loadAll() {
      const all: GithubRepo[] = [];
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?type=owner&sort=pushed&per_page=100&page=${page}`,
          { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const batch = (await res.json()) as GithubRepo[];
        all.push(...batch);
        if (batch.length < 100) break;
      }
      return all
        .filter((r) => !r.fork && r.name.toLowerCase() !== username.toLowerCase())
        .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));
    }

    loadAll()
      .then((repos) => {
        writeCache(cacheKey, repos);
        setState({ repos, loading: false, error: false });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ repos: [], loading: false, error: true });
      });

    return () => controller.abort();
  }, [username]);

  return state;
}
