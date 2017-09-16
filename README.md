# fbx parser animater

<img src="http://continue-jump.com/upload_image/20170916-173228289b6c6f.png" alt="FBX" title="FBX">
<a href="https://gitter.im/FBX-Parser-Animater/Lobby?source=orgpage"></a>
<style>
.CVButton {
  width: 15em;
  height: 3em;
  color: yellow;
  background: green;
  font-family:sans-serif;
  font-weight: 700;
  font-size: 2em;
  border: 8px solid yellow;
  border-radius: 1em 1em 1em 1em;
  outline:none;
  display: flex;
}
.line {
  display: flex;
  position: relative;
  width: 40px;
  height: 60px;
  border-radius: 10px 0px 0px 10px;
}
.line-text {
  width:auto;
  border-radius: 0px 10px 10px 0px;
  font-family:sans-serif;
  font-weight: 700;
  font-size: 1.5em;
}
.line span {
  position: absolute;
  height: 10px;
  width: 4px;
  background: #f0f;
  border-radius: 4px;
}

.line span:nth-last-of-type(1) {
  top: 5px;
  left: 10px;
  animation-name: anime1;
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

}
.line span:nth-last-of-type(2) {
  top: 20px;
  left: 20px;
  animation-name: anime2;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

}
.line span:nth-last-of-type(3) {
  bottom: 5px;
  left: 30px; 
  animation-name: anime3;
  animation-duration: 4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

}

@keyframes anime1 {
0% {height: 10px; background-color: red;}
50% {height: 40px; background-color: white;}
100% {height: 10px; background-color: red;}
}
@keyframes anime2 {
0% {height: 10px; background-color: red;}
50% {top: 5px; height: 40px; background-color: blue;}
100% {height: 10px; background-color: red;}
}
@keyframes anime3 {
0% {height: 10px; background-color: red;}
50% {height: 40px; background-color: black;}
100% {height: 10px; background-color: red;}
}

</style>
    <button class="CVButton">
      <div class="line" href="#">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="line-text" href="#">
        gitter
      </div>
    </button>





fbxファイルをjavascriptで読み込み、アニメーションさせるためのjavascriptクラスを作ります。

three.jsにあるfbxのloaderでは、私の持っているCGツールのCinema4Dで作ったfbxファイルをアニメーションさせません。

ということで自前でfbxのloaderとanimaterを作ることにします。

描画はthree.jsか、WebGLで行います。