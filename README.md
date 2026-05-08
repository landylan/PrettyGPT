# PrettyGPT

Chrome 擴充功能：自動收合 ChatGPT 之前的回答，讓版面更簡潔。

## 安裝方式：

目前還沒發佈到 Chrome Web Store，請依照以下步驟手動安裝：

1. 前往 Chrome 瀏覽器設定 > 擴充功能 > 開發人員模式
2. 點擊「載入未封裝的擴充功能」
3. 選擇本專案的根目錄（也就是 `manifest.json` 所在的資料夾）
4. 重新整理 chatGPT 頁面，應該就能看到除了最後一次問答之外，之前回答都被收合起來了。

---

<!-- AI 開發規則 -->
> **給 AI 的指令 (AI Instructions)**：
> 當你產生任何計畫書 (implementation_plan.md)、流程總結 (walkthrough.md) 或是任何技術說明文件時，請務必自動將它們存入（或複製一份到）專案根目錄下的 `doc/` 目錄中。
