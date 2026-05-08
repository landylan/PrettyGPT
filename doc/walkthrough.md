# PrettyGPT 實作完成 🎉

擴充功能已經初步完成，所有的設計與邏輯都實作好了！以下是我們完成的內容與接下來的測試步驟。

## 完成的項目

- [doc/implementation_plan.md](file:///c:/Users/landy/程式/Antigravity/PrettyGPT/doc/implementation_plan.md)：我們討論並確認的計畫書，已保存在專案內的 `doc` 資料夾。
- [manifest.json](file:///c:/Users/landy/程式/Antigravity/PrettyGPT/manifest.json)：擴充功能的設定檔，授權在 `chatgpt.com` 執行腳本。
- [content.js](file:///c:/Users/landy/程式/Antigravity/PrettyGPT/content.js)：核心腳本，它會：
  - 監聽 ChatGPT 聊天室的 DOM 變化。
  - 找出所有 AI（assistant）的回答。
  - 將**非最後一個**（歷史）回答預設加上隱藏的 Class，並加入「🤖 展開 AI 回答」按鈕。
  - 將**最後一個**（最新/生成中）回答預設展開，加上「🤖 收合 AI 回答」按鈕。
- [style.css](file:///c:/Users/landy/程式/Antigravity/PrettyGPT/style.css)：處理 UI 外觀，讓收合按鈕靠右顯示，並在收合狀態下完全隱藏原始的對話內容（`.markdown`），同時也支援了深色模式。

## 如何測試（Verification）

請按照以下步驟在您的 Chrome 瀏覽器中載入並測試：

1. 開啟 Chrome 瀏覽器，網址列輸入 `chrome://extensions/` 並進入。
2. 在右上角開啟 **開發人員模式 (Developer mode)**。
3. 點擊左上角的 **載入未封裝項目 (Load unpacked)**。
4. 選擇資料夾：`c:\Users\landy\程式\Antigravity\PrettyGPT`。
5. 成功載入後，打開 [ChatGPT 網站](https://chatgpt.com/)（如果已經打開，請重新整理網頁）。
6. 開啟一個包含多個對話的歷史紀錄，驗證是否**除了最後一個回答外，其他都被自動收合了**。
7. 點擊右側的按鈕，測試展開與收合的切換功能。

> [!NOTE]
> 如果您在測試過程中發現按鈕沒有出現，或是收合的效果有不如預期的地方，這可能是因為 ChatGPT 的 DOM 結構在您的帳號上有微調。請隨時告訴我，我們可以透過調整 `content.js` 來修正它！
