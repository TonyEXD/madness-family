# Madness Family — Project TODO

## Completed Features

- [x] 前台網站 - 完整複製原始 madness-family.zip 的設計（Neo-Brutalist Pixel Arcade 風格）
- [x] 前台網站 - Navbar、MarqueeBanner、HeroSection、AboutSection、ExperienceSection、ServicesSection、ContactSection、LinksSection
- [x] 前台網站 - 雙語支援（中文/英文）
- [x] 升級為全棧架構（Express + tRPC + MySQL 資料庫 + 用戶認證）
- [x] 資料庫 schema - siteSettings 表儲存網站 JSON 內容
- [x] contentRouter - GET/UPDATE API 讀取和儲存網站內容
- [x] LanguageContext - 從後端 API 動態讀取翻譯文字、圖片 URL、社群連結
- [x] 前台組件動態化 - HeroSection、AboutSection、ServicesSection、LinksSection 使用動態數據
- [x] 後台管理系統 (/admin) - 文字內容編輯（中文/英文）
- [x] 後台管理系統 (/admin) - 圖片連結管理（logo、characters、aboutTeam、gelatoCart、gelatoCup）
- [x] 後台管理系統 (/admin) - 社群連結管理（Instagram、Facebook、Email）
- [x] 後台管理系統 (/admin) - 分區段編輯（Navigation、Marquee、Hero、About、Experience、Services、Contact、Links）
- [x] 後台管理系統 (/admin) - 預覽網站連結
- [x] 後台管理系統 (/admin) - 儲存按鈕（即時更新前台）
- [x] Vitest 測試 - auth.logout 測試
- [x] Vitest 測試 - content.get 測試（6 個測試全部通過）

## New Requirements

- [x] 後台密碼保護（密碼：mfweb903923）
- [x] 聯絡表單整合（發送訊息到信箱）
- [x] 圖片上傳功能（直接上傳到雲端儲存）
- [x] 預設語言改為英文
- [x] 修復首頁粉紅色角色腿部被截斷問題
- [x] 每個區塊加入角色和雪糕裝飾（不遮擋文字、圖片、文字框）

## Character Fix Requirements

- [x] 修復首頁角色家族圖片 - 手腳完整清晰顯示（參考 PIC-02/PIC-04）
- [x] 各頁面裝飾角色改為實體不透明（非透明/半透明）
- [x] 確保裝飾角色不遮擋文字、文字框、圖片
