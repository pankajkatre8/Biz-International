// src/hooks/useRooms.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRooms, createRoom, bulkCreateRooms, importRoomsFromExcel, CreateRoomPayload } from "../lib/api";

export const useRooms = (projectId?: string) =>
  useQuery(["rooms", projectId], () => {
    if (!projectId) return Promise.resolve([] as any[]);
    return fetchRooms(projectId);
  }, {   enabled: !!projectId,
    staleTime: 1000 * 30,
  });

export const useCreateRoom = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation((payload: CreateRoomPayload) => createRoom(projectId, payload), {
    onSuccess: () => qc.invalidateQueries(["rooms", projectId]),
  });
};

export const useBulkCreateRooms = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation((payload: CreateRoomPayload[]) => bulkCreateRooms(projectId, payload), {
    onSuccess: () => qc.invalidateQueries(["rooms", projectId]),
  });
};

export const useImportRooms = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation((file: File) => importRoomsFromExcel(projectId, file), {
    onSuccess: () => qc.invalidateQueries(["rooms", projectId]),
  });
};
