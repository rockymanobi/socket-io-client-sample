# Spps Client

[photoshop-sv](https://github.com/rockymanobi/photoshop-sv)のテスト用socket-ioクライアント。

photoshop側のプラグインと接続関係では同じ動きをするので、起動中に
http://spps-demo.herokuapp.com にファイルをアップロードすると
ファイルを受信した事がコンソールに出力される。

コンソールに出力される謎の文字列は`uuid`です。
`node main &`で大量にやったら、、、ね！

## Get started

```bash
git clone git@github.com:rockymanobi/spps-atk.git
cd spps-atk
npm install
node main
```

## 接続先

* 通常は`http://spps-demo.herokuapp.com`に接続
* `NODE_ENV=development node main`で`localhost:3000`に接続


