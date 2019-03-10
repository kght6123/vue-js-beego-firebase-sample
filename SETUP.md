# Vue＋Goプロジェクトのセットアップ

## Goをインストール

https://github.com/moovweb/gvm

```sh
# バージョン管理(gvm)のインストール
$ bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
$ source /Users/kogahirotaka/.gvm/scripts/gvm # gvmを$PATHに追加

# gvmのバージョン確認
$ gvm version

# 利用できるgoの確認（最新バージョンを控える）
$ gvm listall

# バイナリインストール、go1.4が不要
$ gvm install go1.11.5 -B

# インストールされたgoを確認
$ gvm list

# go1.11.5を使う
$ gvm use go1.11.5 # $PATHにgoの環境変数が追加

# goバージョン確認
$ go version
go version go1.11.5 darwin/amd64

# 環境変数の確認
$ echo $GOPATH
/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global
# $GOPATH/src/github.com/kght6123/MiraiNotes2 にプロジェクトを作る見込みで進める

$ echo $PATH
/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global/bin:/Users/kogahirotaka/.gvm/gos/go1.11.5/bin:/Users/kogahirotaka/.gvm/pkgsets/go1.11.5/global/overlay/bin:/Users/kogahirotaka/.gvm/bin

# delve(デバッガ)をインストール
$ xcode-select --install # winは不要
$ go get -u github.com/go-delve/delve/cmd/dlv

# シェルの起動設定に追加 (zshの場合)
echo 'source ${HOME}/.gvm/scripts/gvm' >>.zshrc
echo 'gvm use go1.11.5' >>.zshrc
```

## Bee Goをインストール

[bee tool usage - beego: simple & powerful Go app framework](https://beego.me/docs/install/bee.md)

```sh
# Beeをインストール
$ go get github.com/astaxie/beego

# Beeツールをインストール
$ go get github.com/beego/bee

# Beeプロジェクトを初期化
# bee new github.com/kght6123/MiraiNotes2/backend
# bee api [appname] [-tables=""] [-driver=mysql] [-conn=root:@tcp(127.0.0.1:3306)/test]
$ bee api github.com/kght6123/MiraiNotes2/backend

# Beeを起動
$ bee run

# Beeを起動
$ bee run -downdoc=true -gendoc=true
```

http://127.0.0.1:8080/swagger/ でAPIの一覧が見える

## Swaggerのこと

[Swaggerの概要をまとめてみた。 - Qiita](https://qiita.com/gcyata/items/342073fa7607fd4082bd#swagger-codegen)

[swagger-codegenでAPIクライアントを生成するメモ - Qiita](https://qiita.com/wanashi/items/2709a3b04a7f5331c85d)

```sh
$ brew cask install java
$ brew install swagger-codegen
$ swagger-codegen generate \
  -l Javascript \
  -i ./backend/swagger/swagger.yml \
  -o ./swagger_client
```

## VSCodeの拡張機能をインストール

goのコーディング中などに促される、追加モジュールのインストールは必ず実施すること

もし、キャンセルしてしまった場合は、もう一度、VSCodeを開き直し、同じ操作を行うことで再表示される

プロジェクト名.code-workspaceに下記のsettings内の設定を追加

```json
{
	"folders": [
		{
			"path": "."
		}
	],
	"settings": {
		"go.useLanguageServer": true,
		"go.languageServerExperimentalFeatures": {
			"format": true,
			"autoComplete": true,
			"rename": true,
			"goToDefinition": true,
			"hover": true,
			"signatureHelp": true,
			"goToTypeDefinition": true,
			"goToImplementation": true,
			"documentSymbols": true,
			"workspaceSymbols": true,
			"findReferences": true
		},
		"go.lintFlags": [],
	}
}
```

.vscode/launch.jsonに下記の設定を追加

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Launch Golang",
			"type": "go",
			"request": "launch",
			"mode": "auto",
			"program": "${workspaceFolder}/backend",
			"env": {},
			"args": []
		},
	]
}
```

https://code.visualstudio.com/docs/editor/variables-reference

https://github.com/Microsoft/vscode-go

https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code

https://github.com/Microsoft/vscode-go/wiki/GOPATH-in-the-VS-Code-Go-extension

## Vueのセットアップ

```sh
# vue-cliの2.xを削除
yarn global remove vue-cli

# vue-cliの3.0を導入
yarn global add @vue/cli

# ディレクトリ作成
mkdir -p $GOPATH/src/github.com/kght6123/MiraiNotes2 cd $GOPATH/src/github.com/kght6123/MiraiNotes2

# 新しいプロジェクトを作成 Manuallyを選択 -> aキーで全て選択(TypeScriptだけ無効に) -> 基本的にYes -> Stylus -> ESLint -> Lint on Save -> Mocha + Chai -> Nightwatch -> In package.json -> No -> Use Yarn
vue create mirainotes2-frontend

# リネーム
mv mirainotes2-frontend frontend
rm -R frontend/.git # デフォルトのgitを削除

# 追加パッケージ
yarn add axios
yarn add markdown-it
yarn add highlight.js

yarn add markdown-it-emoji
```

下記のコマンドでdevサーバを起動

```sh
yarn run serve
```

## Vue-cliの環境変数の切り替え

[Modes and Environment Variables \| Vue CLI](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)

`frontend/package.json`のscriptsのserveとbuildに`--mode`引数を追加

```json
"scripts": {
  "serve": "vue-cli-service serve --mode development --port 18080",
  "build": "vue-cli-service build --mode production",
}
```

`frontend/.env`と`frontend/.env.production`、`frontend/.env.development`を作成

```ini:.env
VUE_APP_NAME=MiraiNotes2
```

## Vue-cliのProxyを設定

[Configuration Reference \| Vue CLI](https://cli.vuejs.org/config/#devserver-proxy)

http://127.0.0.1:8080/

webpack-dev-server上から、goのapiサーバへプロキシされ、CORSの設定が無くてもgoとvueがaxiosで通信できる。

## StandaloneのVue-devtoolを導入

https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md

```sh
# vue-remote-devtoolsを導入
yarn global add @vue/devtools
vue-devtools # 起動
```

`public/index.html`に`<script src="http://localhost:8098"></script>`を追記

## Vuex(Store)のモジュールやHotUpdateなどの使い方

https://github.com/hrpc/vue-webpack/blob/0793d3ae56f37095afb4566e2e2325fa3c50fdf4/vuex/types/test/index.ts

これが参考になりそう

## Firebaseの設定

https://console.firebase.google.com/u/0/project/_/overview

プロジェクトの追加

プロジェクト名：MiraiNotes2
プロジェクトID：mirainotes2-kght6123
アナリティクスの地域：日本
Cloudのロケーション：nam5

プロジェクトの作成を押下

Authのメール/パスワードを有効に

設定＞全般＞下のプロジェクトにはアプリがありませんのHTMLタグっぽいボタンをクリック＞ウェブアプリにFirebaseを追加の情報をメモ

```html
<script src="https://www.gstatic.com/firebasejs/5.8.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "*****",
    authDomain: "*****",
    databaseURL: "*****",
    projectId: "*****",
    storageBucket: "*****",
    messagingSenderId: "*****"
  };
  firebase.initializeApp(config);
</script>
```

firebaseをインストール

```sh
yarn add firebase
```

`frontend/src/main.js`にFirebaseの設定を追記

```js
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: '**********',
  authDomain: '**********',
  databaseURL: '**********',
  projectId: '**********',
  storageBucket: '**********',
  messagingSenderId: '**********'
}
firebase.initializeApp(config)
```

## CORSの設定を試行錯誤した、、、時のメモ

結局、webpack-dev-serverのproxy設定で解決した（`frontend/vue.config.dev.js`）

```js
import axiosBase from 'axios'
const axios = axiosBase.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    //'Content-Type': 'application/json',
    //'X-Requested-With': 'XMLHttpRequest',
    //'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
  },
  //responseType: 'json',
  //credentials: false,
});
```

```js
axios.get('/v1/object/', {
	//withCredentials: true,
	headers: {
		//'Content-Type': 'application/json',
		//'X-Requested-With': 'XMLHttpRequest',
		//'Access-Control-Allow-Origin': '*',
		'Accept': 'application/json'
	},
	//responseType: 'json',
	//credentials: false,
})
.then(function (response) {
	// handle success
	alert(response);
})
.catch(function (error) {
	// handle error
	alert(error);
})
.then(function () {
	// always executed
});
```

```go
// CORS for https://foo.* origins, allowing:
// - PUT and PATCH methods
// - Origin header
// - Credentials share
// https://qiita.com/tomoyukilabs/items/81698edd5812ff6acb34
beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
	AllowOrigins:     []string{"*"},
	AllowMethods:     []string{"GET", "PUT", "POST", "DELETE", "HEAD", "PATCH", "OPTIONS"},
	AllowHeaders:     []string{"Origin, X-Requested-With, Content-Type, Accept, Authorization"},
	ExposeHeaders:    []string{"Content-Length"},
	AllowCredentials: true,
}))
```