import { mockSearchRequests, type SearchRequest } from "./data";

export const SEARCH_REQUESTS_KEY = "okkaz_search_requests";

export function readSearchRequests() {
  if (typeof window === "undefined") return mockSearchRequests;

  const raw = window.localStorage.getItem(SEARCH_REQUESTS_KEY);
  if (!raw) {
    window.localStorage.setItem(SEARCH_REQUESTS_KEY, JSON.stringify(mockSearchRequests));
    return mockSearchRequests;
  }

  try {
    const parsed = JSON.parse(raw) as SearchRequest[];
    if (parsed.length === 0) {
      window.localStorage.setItem(SEARCH_REQUESTS_KEY, JSON.stringify(mockSearchRequests));
      return mockSearchRequests;
    }
    return parsed;
  } catch {
    window.localStorage.setItem(SEARCH_REQUESTS_KEY, JSON.stringify(mockSearchRequests));
    return mockSearchRequests;
  }
}

export function writeSearchRequests(requests: SearchRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEARCH_REQUESTS_KEY, JSON.stringify(requests));
}

export function pushSearchRequest(request: Omit<SearchRequest, "id" | "reference" | "createdAt">) {
  const id = Date.now().toString();
  const nextRequest: SearchRequest = {
    ...request,
    id: `REQ-${id}`,
    reference: `OKK-REQ-${id.slice(-4)}`,
    createdAt: "A l'instant",
  };

  writeSearchRequests([nextRequest, ...readSearchRequests()]);
  window.dispatchEvent(new Event("okkaz-search-requests-updated"));
  return nextRequest;
}
