const getInitialVisited = () => {
  if (typeof window === 'undefined') return new Set();
  try {
    const saved = sessionStorage.getItem('ll_visited_paths');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch (e) {
    return new Set();
  }
};

export const visitedPaths = getInitialVisited();

export function markPathVisited(path) {
  if (!path) return;
  visitedPaths.add(path);
  try {
    sessionStorage.setItem('ll_visited_paths', JSON.stringify(Array.from(visitedPaths)));
  } catch (e) {}
}
