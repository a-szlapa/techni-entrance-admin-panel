import { useQuery } from "@tanstack/react-query";

export const useLogs = (options: { page?: number; pageSize?: number }) => {
  const fetchLogs = async (page: number = 1, pageSize: number = 10) =>
    fetch(`${import.meta.env.VITE_API_URL}/admin/logs?page=${page}&page_size=${pageSize}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["logs", options.page, options.pageSize],
    queryFn: () => fetchLogs(options.page, options.pageSize),
    keepPreviousData: true,
  });
};

export const useStudentLogs = (studentId: string) => {
  const fetchStudentLogs = async (studentId: string) =>
    fetch(`${import.meta.env.VITE_API_URL}/admin/logs/${studentId}`, {
      credentials: "include",
    }).then((res) => res.json());

  return useQuery({
    queryKey: ["studentLogs", studentId],
    queryFn: () => fetchStudentLogs(studentId),
  });
};
