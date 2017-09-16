class FBX_Parser {
  constructor(fbx) {
    this.fbx = fbx;
  }
  parseFBX() {
    var begin = 0;
    var end = 0;

    //#####
    // 頂点
    //#####
    end = this.fbx.indexOf("Vertices", end);
    begin = this.fbx.lastIndexOf("\n", end);
    end = this.fbx.indexOf("}", begin);
    var token = this.fbx.substring(begin, end);
    console.log(token);
    document.body.innerHTML += token + "<br>";
    
    //#################
    // 頂点のインデックス
    //#################
    end = this.fbx.indexOf("PolygonVertexIndex", end);
    begin = this.fbx.indexOf("*", end) + 1;
    end = this.fbx.indexOf(" ", begin);

    //インデックスの数
    var VertexIndexNumber = this.fbx.substring(begin, end);
    
    end = this.fbx.indexOf("{", end);
    begin = this.fbx.indexOf(":", end) + 2;
    
    var newLine = false;
    for (var v = 0; v < VertexIndexNumber; ++v) {
      if (v == VertexIndexNumber - 1) {
      end = this.fbx.indexOf("\n", begin);
      } else {
      end = this.fbx.indexOf(",", begin);
      }
      var token = this.fbx.substring(begin, end);
      if (newLine) {
        var num = token.substring(1);
        num -= 1;
        token = num;
        console.log(token);
        document.body.innerHTML += token;
        document.body.innerHTML += "<br>";
        newLine = false;
      } else {
        console.log(token);
        document.body.innerHTML += token;
      }
        
      //ポリゴンの頂点の末端の "-" を検知
      if (this.fbx.substring(end + 1, end + 2) == "-") {
        newLine = true;
      }
      begin = end + 1;
    }
        
    console.log("PolygonVertexIndex");
    document.body.innerHTML += "PolygonVertexIndex" + "<br>";
  }
  showFBX() {
    console.log(this.fbx);
    document.body.innerHTML = this.fbx;
  }
};
