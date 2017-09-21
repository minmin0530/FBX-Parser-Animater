# fbx parser animater

<img src="http://continue-jump.com/FPA.png" alt="FBX" title="FBX">
<a href="https://gitter.im/FBX-Parser-Animater/Lobby?source=orgpage">
<img src="http://continue-jump.com/gitter1.png" alt="gitter" title="gitter">
</a>

fbxファイルを読み込み、アニメーションさせるためのjavascriptクラスを作ります。

three.jsにあるfbxのloaderでは、アニメーション出来ないfbxファイルがあります。

ということで自前でfbxのparserとanimaterを作ることにします。

描画はjavascriptの3D国産ライブラリのGLBoostを使っています。

使い方：

### clone
```
$git clone https://github.com/minmin0530/FBX-Parser-Animater.git
$cd FBX-Parser-Animater
```
### setup
```
$npm install --save-dev gulp
$npm install --save-dev browser-sync 
```
### browser
```
$gulp
```