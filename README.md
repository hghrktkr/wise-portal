# wise portalサイト作成プロジェクト

## 概要
本プロジェクトは、  
**フロントエンド・バックエンド・API設計・Docker構成を一貫して学習すること**を目的とした個人学習用プロジェクトです。

画面遷移・ER図・API設計（YAML）などの設計資料を先に作成し、  
それをもとに実装へ落とし込むプロセスを重視しています。

---

## 目的・学習ゴール
- 設計から実装までの流れを一通り経験する
- ページ遷移図・ER図・API設計を **成果物として管理**できるようになる
- OpenAPI（YAML）を意識した API 設計ができるようになる
- React + API + Docker の構成を理解する

---

## 想定技術スタック（予定）
※ 学習の進行に応じて変更される可能性があります

### フロントエンド
- React
- TypeScript
- （状態管理 / ルーティングは後で選定）

### バックエンド
- Node.js（予定）
- REST API

### API設計
- OpenAPI（YAML）
- Markdown による設計補足

### インフラ / 開発環境
- Docker / Docker Compose
- GitHub

---

## ディレクトリ構成

```text
.
├─ README.md
├─ docs/
│  ├─ er/                # ER図・データ設計
│  ├─ navigation/        # ページ遷移図
│  ├─ api/               # API設計（Markdown / YAML）
│  └─ decisions/         # 設計判断の記録（ADR）
├─ frontend/             # フロントエンド実装
├─ backend/              # バックエンド実装
└─ docker/               # Docker関連

```

---

## ER図
[docs\er\er-2025-12-29.svg](https://github.com/hghrktkr/wise-portal/blob/main/docs/er/er-2025-12-29.svg)
---

## ページ遷移図
[docs\navigation\page-transition-2025-12-29.svg](https://github.com/hghrktkr/wise-portal/blob/main/docs/navigation/page-transition-2025-12-29.svg)
