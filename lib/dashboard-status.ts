import type { ActivityStatus } from "@/types/dashboard";

export function isHeldActivity(status: ActivityStatus) {
  return status === "On Hold";
}

export function getActivityStatusTone(status: ActivityStatus) {
  if (status === "Completed" || status === "Delivered") {
    return "success";
  }

  if (status === "Failed" || status === "On Hold") {
    return "danger";
  }

  if (status === "Pending" || status === "Scheduled") {
    return "warning";
  }

  return "info";
}
