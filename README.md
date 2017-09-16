# fbx parser animater

<img src="http://continue-jump.com/upload_image/20170916-173228289b6c6f.png" alt="FBX" title="FBX">
<button style="background:red;color:white;">
gitter
</button>

fbxファイルをjavascriptで読み込み、アニメーションさせるためのjavascriptクラスを作ります。

three.jsにあるfbxのloaderでは、私の持っているCGツールのCinema4Dで作ったfbxファイルをアニメーションさせません。

ということで自前でfbxのloaderとanimaterを作ることにします。

描画はthree.jsか、WebGLで行います。