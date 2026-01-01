// src/lib/api.ts
import axios, { AxiosInstance } from "axios";

/**
 * Frontend API wrapper with mock fallback.
 * - Use NEXT_PUBLIC_USE_MOCK=false to call real backend.
 * - NEXT_PUBLIC_API_BASE should be e.g. http://localhost:3001/api
 */

/* ---------- axios client (real API) ---------- */
export const client: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* ---------- Mock implementations (used while backend not ready) ---------- */
const useMock = typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK !== "false";

function wait<T>(payload: T, ms = 400) {
  return new Promise<T>((res) => setTimeout(() => res(payload), ms));
}

const mockApi = {
  async fetchStats() {
    return wait({
      projectsCount: 8,
      openTasks: 23,
      pendingPayments: 4,
      avgRating: 4.12,
    });
  },

  async fetchRecentProjects(limit = 6) {
    return wait(
      Array.from({ length: limit }).map((_, i) => ({
        id: `proj-${i + 1}`,
        name: `Project ${i + 1}`,
        location: ["Mumbai", "Pune", "Delhi", "Noida", "Hyderabad", "Nagpur"][i % 6],
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      })),
      350
    );
  },

  async fetchTaskOverview() {
    return wait({
      counts: { Pending: 10, InProgress: 8, Blocked: 3, Done: 12 },
    });
  },

  async fetchPendingPayments(limit = 6) {
    return wait(
      Array.from({ length: Math.min(limit, 4) }).map((_, i) => ({
        id: `pay-${i + 1}`,
        taskId: `task-${100 + i}`,
        amount: (Math.floor(Math.random() * 20) + 1) * 1000,
        createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      })),
      300
    );
  },

  async fetchActivity(limit = 10) {
    const now = Date.now();
    return wait(
      [
        { id: "a1", text: "Carpenter assigned to Task 101", createdAt: new Date(now - 1000 * 60 * 5).toISOString() },
        { id: "a2", text: "Payment requested for Task 96", createdAt: new Date(now - 1000 * 60 * 60).toISOString() },
        { id: "a3", text: "New project created: Central Mall", createdAt: new Date(now - 1000 * 60 * 60 * 5).toISOString() },
      ].slice(0, limit),
      250
    );
  },
};

/* ---------- Typed API wrapper ---------- */
export type Api = {
  client: AxiosInstance;
  fetchStats: () => Promise<any>;
  fetchRecentProjects: (limit?: number) => Promise<any[]>;
  fetchTaskOverview: () => Promise<{ counts: Record<string, number> }>;
  fetchPendingPayments: (limit?: number) => Promise<any[]>;
  fetchActivity: (limit?: number) => Promise<any[]>;
};

const api: Api = {
  client,
  async fetchStats() {
    if (useMock) return mockApi.fetchStats();
    const { data } = await client.get("/dashboard/stats");
    return data;
  },

  async fetchRecentProjects(limit = 6) {
  if (useMock) return mockApi.fetchRecentProjects(limit);

  const { data } = await client.get("/projects", { params: { limit } });

  return Array.isArray(data)
    ? data
    : data.data ?? data.projects ?? [];
},


  async fetchTaskOverview() {
    if (useMock) return mockApi.fetchTaskOverview();
    const { data } = await client.get("/tasks/overview");
    return data;
  },

  async fetchPendingPayments(limit = 6) {
    if (useMock) return mockApi.fetchPendingPayments(limit);
    const { data } = await client.get("/payments/pending", { params: { limit } });
    return data;
  },

  async fetchActivity(limit = 10) {
    if (useMock) return mockApi.fetchActivity(limit);
    const { data } = await client.get("/activity/recent", { params: { limit } });
    return data;
  },
};



/* ---------------- Rooms APIs ---------------- */

/**
 * Types for rooms payloads (lightweight; expand in src/types if needed)
 */
export type CreateRoomPayload = {
  floorNumber: number;
  roomNumber: string;
  roomName?: string | null;
  length?: number | null;   // meters
  width?: number | null;    // meters
  doors?: number | null;
  windows?: number | null;
  flatId?: string | null;
  notes?: string | null;
};

const mockRoomsStore: Record<string, any[]> = {}; // projectId => rooms[]

if (useMock) {
  // seed small store for demo
  mockRoomsStore["proj-1"] = [
    { id: "r-1", floorNumber: 1, roomNumber: "1-1", roomName: "Living", length: 4, width: 3.5, doors: 1, windows: 1, notes: "" },
  ];
}

/**
 * Create a single room entry
 */
export async function createRoom(projectId: string, payload: CreateRoomPayload) {
  if (useMock) {
    const id = `r-${Math.random().toString(36).slice(2, 9)}`;
    const row = { id, ...payload };
    mockRoomsStore[projectId] = mockRoomsStore[projectId] || [];
    mockRoomsStore[projectId].push(row);
    return wait(row, 300);
  }

  const { data } = await client.post(`/projects/${projectId}/rooms`, payload);
  return data;
}

/**
 * Bulk create rooms (array payload)
 */
export async function bulkCreateRooms(projectId: string, payload: CreateRoomPayload[]) {
  if (useMock) {
    mockRoomsStore[projectId] = mockRoomsStore[projectId] || [];
    const created = payload.map((p) => {
      const id = `r-${Math.random().toString(36).slice(2, 9)}`;
      const row = { id, ...p };
      mockRoomsStore[projectId].push(row);
      return row;
    });
    return wait(created, 400);
  }

  const { data } = await client.post(`/projects/${projectId}/rooms/bulk`, { rooms: payload });
  return data;
}

/**
 * Import rooms from Excel/CSV — multipart/form-data with field 'file'
 */
export async function importRoomsFromExcel(projectId: string, file: File) {
  if (useMock) {
    // very simple CSV parsing fallback for quick demo (CSV expected)
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    const headers = lines.shift()?.split(",").map((h) => h.trim()) || [];
    const rows = lines.map((ln) => {
      const cols = ln.split(",").map((c) => c.trim());
      const obj: any = {};
      headers.forEach((h, i) => (obj[h] = cols[i] ?? ""));
      return {
        id: `r-${Math.random().toString(36).slice(2, 8)}`,
        floorNumber: Number(obj.floorNumber || 1),
        roomNumber: obj.roomNumber || "",
        roomName: obj.roomName || "",
        length: obj.length ? Number(obj.length) : null,
        width: obj.width ? Number(obj.width) : null,
        doors: obj.doors ? Number(obj.doors) : null,
        windows: obj.windows ? Number(obj.windows) : null,
        flatId: obj.flatId || null,
        notes: obj.notes || null,
      };
    });

    mockRoomsStore[projectId] = [...(mockRoomsStore[projectId] || []), ...rows];
    return wait({ imported: rows.length, rows }, 600);
  }

  const fd = new FormData();
  fd.append("file", file);
  const { data } = await client.post(`/projects/${projectId}/rooms/import`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/**
 * Fetch rooms for a project
 */
export async function fetchRooms(projectId: string) {
  if (useMock) {
    const rows = mockRoomsStore[projectId] || [];
    return wait(rows, 250);
  }

  const { data } = await client.get(`/projects/${projectId}/rooms`);
  return data;
}
const apiWithHttp = {
  ...api,

  get: client.get.bind(client),
  post: client.post.bind(client),
  put: client.put.bind(client),
  delete: client.delete.bind(client),
};

export default apiWithHttp;


