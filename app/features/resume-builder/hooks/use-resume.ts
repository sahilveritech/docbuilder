import { useSyncExternalStore } from "react";
import { resumeService } from "~/services/resume.service";

export function useResume() {
  return useSyncExternalStore(
    resumeService.subscribe,
    resumeService.getState,
    resumeService.getServerSnapshot,
  );
}
