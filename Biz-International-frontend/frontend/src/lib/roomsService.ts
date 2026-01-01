// src/lib/roomsService.ts
export type Room = {
  id?: string;
  projectId?: string;
  floor: number | string;
  roomNumber: string;
  roomType?: string;
  length?: number | string;
  width?: number | string;
  doors?: number;
  windows?: number;
  notes?: string;
  status?: "empty" | "partial" | "filled";
  lastUpdated?: string;
};

async function fetchJson(url: string, opts?: RequestInit) {
  const res = await fetch(url, { credentials: "same-origin", ...opts });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function getFloors(projectId: string) {
  return fetchJson(`/api/projects/${projectId}/floors`);
}

export async function getRoomsByFloor(projectId: string, floorNumber: string | number) {
  const q = encodeURIComponent(String(floorNumber));
  return fetchJson(`/api/projects/${projectId}/rooms?floor=${q}`);
}

export async function checkDuplicates(projectId: string, entries: Partial<Room>[]) {
  return fetchJson(`/api/projects/${projectId}/rooms/check-duplicates`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ entries }),
  });
}

export async function saveRoomEntry(projectId: string, entry: Partial<Room>, resolution: "skip"|"replace"|"merge" = "replace") {
  return fetchJson(`/api/projects/${projectId}/rooms`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ entry, resolution }),
  });
}

export async function bulkCreateRooms(projectId: string, entries: Partial<Room>[], resolution: "skip"|"replace"|"merge" = "replace") {
  return fetchJson(`/api/projects/${projectId}/rooms/bulk`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ entries, resolution }),
  });
}

export async function saveTemplate(projectId: string, payload: { name: string; data: Partial<Room> }) {
  return fetchJson(`/api/projects/${projectId}/templates`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function fetchTemplates(projectId: string) {
  return fetchJson(`/api/projects/${projectId}/templates`);
}
