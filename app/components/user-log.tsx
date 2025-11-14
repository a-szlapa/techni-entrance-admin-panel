function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function formatDuration(ms: number) {
  if (!isFinite(ms) || ms < 0) return "—";
  const totalSec = Math.floor(ms / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function UserLogComponent({ log }: { log: any }) {
  const entryIso = log.entry_time ?? log.entryTime ?? null;
  const exitIso = log.exit_time ?? log.exitTime ?? null;
  const entryDate = entryIso ? new Date(entryIso) : null;
  const exitDate = exitIso ? new Date(exitIso) : null;
  const duration = entryDate && exitDate ? formatDuration(exitDate.getTime() - entryDate.getTime()) : null;

  return (
    <div className="p-3 border flex flex-col gap-2 rounded-md bg-card">
      <div className="font-semibold text-sm">{log.username}</div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">{log.action}</div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">{formatDate(log.timestamp)}</div>
    </div>
  );
}
