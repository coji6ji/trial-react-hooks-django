# README

React Hooks と Django の技術的キャッチアップを目的とした簡単なSNSアプリケーションです.

## 機能

- ログイン画面
  - 新規ユーザー作成
  - ログイン
- ユーザーリスト画面
  - 全ユーザを表示
  - 友達申請を送信
- マイプロフィール画面
  - プロフィール表示, 編集, 削除
    - ニックネーム, アバター画像
- 友達一覧画面
  - 友達表示
  - 友達申請の承認
  - ダイレクトメッセージの送信
- ダイレクトメッセージ一覧画面

## 技術スタック

- Server
  - python v3.8
    - Django v3.0.8
- Front
  - React v16.13.1
    - React Hooks
  - Modules
    - material-ui
    - axios
    - react-cookies
    - react-icons

## APIエンドポイント

- /api/user/create
  - POST：新規ユーザー作成
- /api/user/profile
  - POST | GET | PUT | DELETE：プロフィール作成,編集,削除（CRUD）
- /api/user/myprofile
  - GET：ログインユーザーのプロフィール取得
- /api/dm/inbox
  - GET：ログインユーザー宛のダイレクトメッセージ取得
- /api/dm/message
  - POST：ダイレクトメッセージ送信（友達認証済みユーザーのみ）
- /authen/
  - POST：Token取得