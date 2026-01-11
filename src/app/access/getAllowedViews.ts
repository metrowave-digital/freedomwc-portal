// src/app/access/getAllowedViews.ts

import type { WebUser, FWCRole } from "./roles"
import type { ViewRole } from "./viewRoles"
import { VIEW_MATRIX } from "./viewMatrix"

export function getAllowedViews(
  user: WebUser | null,
): ViewRole[] {
  const views = new Set<ViewRole>()

  // 🔒 Hard guard — access logic must never throw
  if (!user || !Array.isArray(user.roles)) {
    return ["viewer"]
  }

  for (const role of user.roles) {
    const allowed = VIEW_MATRIX[role as FWCRole]
    if (!allowed) continue

    for (const view of allowed) {
      views.add(view)
    }
  }

  return Array.from(views)
}
