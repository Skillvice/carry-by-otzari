// CARRY by OTZARI — Google Sheets backend client.
// Paste your Apps Script Web App /exec URL below after deploying apps-script/Code.gs.
export const SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycbyr1ZXcVAe_ISUByEAZLPIoQOvg5_MWn_HWvkasGcZK7PGvthj1Brk1nSTNsno2TM6o_w/exec";

export type SheetName = "Deliveries" | "Routes" | "Users" | "Matches";

export interface DeliveryRow {
  id: string;
  createdAt: string;
  pickup: string;
  dropoff: string;
  itemType: string;
  urgency: string;
  weight: string | number;
  price: string | number;
  status: string;
  requesterName: string;
  carrierId: string;
  notes: string;
}

export interface RouteRow {
  id: string;
  createdAt: string;
  carrierName: string;
  carrierId: string;
  from: string;
  to: string;
  schedule: string;
  status: string;
  rating: number | string;
  score?: number;
}

async function get<T>(params: Record<string, string>): Promise<T[]> {
  const url = new URL(SHEETS_API_URL);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { method: "GET" });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Sheets API error");
  return (json.rows || []) as T[];
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  // Use text/plain to avoid a CORS preflight against Apps Script.
  const res = await fetch(SHEETS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Sheets API error");
  return json.row as T;
}

export const sheetsApi = {
  listRoutes: () => get<RouteRow>({ action: "list", sheet: "Routes" }),
  listDeliveries: () => get<DeliveryRow>({ action: "list", sheet: "Deliveries" }),
  searchRoutes: (q: string) =>
    get<RouteRow>({ action: "search", sheet: "Routes", q }),
  matchRoutes: (pickup: string, dropoff: string) =>
    get<RouteRow>({ action: "match", sheet: "Routes", pickup, dropoff }),
  createDelivery: (data: Partial<DeliveryRow>) =>
    post<DeliveryRow>({ action: "create", sheet: "Deliveries", data }),
  createRoute: (data: Partial<RouteRow>) =>
    post<RouteRow>({ action: "create", sheet: "Routes", data }),
};