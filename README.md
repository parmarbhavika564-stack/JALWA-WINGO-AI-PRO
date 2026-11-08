# JALWA WINGO AI PRO

A responsive web dashboard for automatically fetching and displaying Wingo 1-minute historical results.

## Requirements
- Node.js 18 or newer
- Internet access from the server to the configured results endpoint

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000

## Configure the data source
Default endpoint:
`https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?pageNo=1&pageSize=100`

If the operator provides a different official endpoint, set `WINGO_API_URL` in the hosting environment. Do not put login cookies, passwords, OTPs, or session tokens in public code.

## Deploy
Deploy this folder to a Node.js host that supports Node 18+. Set the start command to `npm start` and expose the host's assigned port.

## Important data notes
- This starter expects a JSON response containing `data.list` with `issueNumber`, `number`, and optionally `color`.
- The dashboard refreshes every 15 seconds.
- The supplied endpoint's availability and correspondence to the RAXI account must be verified before relying on it. A matching response format alone does not prove that the feed is official or synchronized.
- Frequency, Big/Small, and color counts are descriptive summaries of past outcomes, not reliable predictions of future outcomes. No 100% or guaranteed prediction is possible.
- This app does not log in, place bets, or automate wagering.
