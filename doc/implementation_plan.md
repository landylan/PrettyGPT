# Goal Description

建立一個 Chrome 擴充功能（PrettyGPT），用於自動收合 ChatGPT 網頁中的 AI 回答。這可以幫助使用者在長篇對話中更容易瀏覽上下文，並保持版面整潔。擴充功能會在 AI 的回答區域加上收合/展開的切換功能。

## User Feedback Addressed

1. **觸發條件與生成過程**：只有「最新（最後一個）」的 AI 回答不收合（包含正在生成中的回答）。之前的歷史回答都會自動收合。
2. **收合外觀**：預設為「完全隱藏」，並在右側顯示一個小按鈕。可以透過按鈕進行切換展開/收合。
3. **文件存放**：專案下將建立一個 `doc` 目錄，用於存放本計畫與後續生成的 AI 文件。

## Proposed Changes

以下是預計會建立的檔案與架構：

### Documentation
#### [NEW] [doc/implementation_plan.md]
- 將此計畫同步備份至專案的 doc 目錄下。

### Extension Core

#### [NEW] [manifest.json]
- 設定 Manifest V3。
- 配置 content scripts，讓腳本與樣式只在 `https://chatgpt.com/*` 網域下執行。

#### [NEW] [content.js]
- 使用 `MutationObserver` 監聽聊天室的 DOM 變化。
- 尋找所有 AI 的對話區塊（`[data-message-author-role="assistant"]`）。
- 判斷是否為「最後一個」回答。如果不是，則加上收合的 class，並動態插入一個靠右的「切換按鈕」。
- 點擊按鈕可切換展開/完全隱藏狀態。

#### [NEW] [style.css]
- 定義預設收合狀態：完全隱藏回答內容 (`display: none` 或高為 0 等方式)。
- 按鈕樣式：靠右對齊的小按鈕。
- 支援 ChatGPT 原生深色/淺色模式。

## Verification Plan

### Manual Verification
1. 在開發者模式載入此擴充功能 (`chrome://extensions/`)。
2. 開啟 ChatGPT 網頁，進行新的對話或查看歷史對話。
3. 驗證最新的 AI 回答是否保持展開，而之前的回答預設皆為完全隱藏。
4. 驗證點擊靠右側的小按鈕可以正確切換收合與展開狀態。
