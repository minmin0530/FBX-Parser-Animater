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
    console.log("Vertex");
    document.body.innerHTML += "Vertex" + "<br>";

    end = this.fbx.indexOf("Vertices", end);
    begin = this.fbx.indexOf("*", end) + 1;
    end = this.fbx.indexOf(" ", begin);

    //バーテックスの数
    var VertexNumber = this.fbx.substring(begin, end);
      
    end = this.fbx.indexOf("{", end);
    begin = this.fbx.indexOf(":", end) + 2;


    this.vertex = [];
    for (var v = 0; v < VertexNumber / 3; ++v) {
      var vertex = [];
      for (var w = 0; w < 3; ++w) {
        if (v * 3 + w == VertexNumber - 1) {
          end = this.fbx.indexOf("\n", begin);
        } else {
          end = this.fbx.indexOf(",", begin);
        }
        var token = this.fbx.substring(begin, end);
        vertex.push(token);      
        console.log(token);
        document.body.innerHTML += token;
        if (w == 2) {
          this.vertex.push(vertex);
          document.body.innerHTML += "<br>";
        }
        begin = end + 1;
      }
    }
    //#################
    // 頂点のインデックス
    //#################
    console.log("PolygonVertexIndex");
    document.body.innerHTML += "PolygonVertexIndex" + "<br>";

    end = this.fbx.indexOf("PolygonVertexIndex", end);
    begin = this.fbx.indexOf("*", end) + 1;
    end = this.fbx.indexOf(" ", begin);

    //インデックスの数
    var VertexIndexNumber = this.fbx.substring(begin, end);
    
    end = this.fbx.indexOf("{", end);
    begin = this.fbx.indexOf(":", end) + 2;
    
    this.index = [];
    var newLine = false;
    var index = [];
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
        index.push(token);
        
        var adjustIndex = [];
        for (var w = 0; w < index.length - 2; ++w) {
          adjustIndex.push(index[w]);
        }
        adjustIndex.push(index[index.length - 1]);
        adjustIndex.push(index[index.length - 2]);
        this.index.push(adjustIndex);
        index = [];
        console.log(token);
        document.body.innerHTML += token;
        document.body.innerHTML += "<br>";
        newLine = false;
      } else {
        index.push(token);
        console.log(token);
        document.body.innerHTML += token;
      }
        
      //ポリゴンの頂点の末端の "-" を検知
      if (this.fbx.substring(end + 1, end + 2) == "-") {
        newLine = true;
      }
      begin = end + 1;
    }
        
  }
  getVertx() {
    return this.vertex;
  }
  getIndex() {
    return this.index;
  }
  showFBX() {
    console.log(this.fbx);
    document.body.innerHTML = this.fbx;
  }
};
