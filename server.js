const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.WINGO_API_URL ||
  "https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?pageNo=1&pageSize=100";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/history", async (_req, res) => {
  try {
    const response = await fetch(API_URL, {
      headers: { "Accept": "application/json", "User-Agent": "JalwaWingoAIPro/1.0" },
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) {
      return res.status(502).json({ ok: false, error: `Upstream returned HTTP ${response.status}` });
    }
    const payload = await response.json();
    const rows = payload?.data?.list;
    if (!Array.isArray(rows)) {
      return res.status(502).json({ ok: false, error: "Unexpected API response format" });
    }
    const results = rows.map(row => ({
      issueNumber: String(row.issueNumber ?? ""),
      number: Number(row.number),
      color: String(row.color ?? ""),
      premium: String(row.premium ?? row.number ?? "")
    })).filter(row => row.issueNumber && Number.isInteger(row.number) && row.number >= 0 && row.number <= 9);

    res.set("Cache-Control", "no-store");
    res.json({
      ok: true,
      source: "Configured WinGo 1M history endpoint",
      results,
      totalCount: payload?.data?.totalCount ?? results.length,
      fetchedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(502).json({ ok: false, error: error.name === "TimeoutError" ? "Data source timed out" : error.message });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`JALWA WINGO AI PRO running on port ${PORT}`));
