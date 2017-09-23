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
    this.vertexContainer = [];
    this.indexContainerTriangle = [];
    this.indexContainerQuad = [];
    for (var u = 0; this.fbx.indexOf("Vertices", end) != -1; ++u) {
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
          if (w == 2) {
            this.vertex.push(vertex);
          }
          begin = end + 1;
        }
      }
      this.vertexContainer.push(this.vertex);
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
          newLine = false;
        } else {
          index.push(token);
        }
          
        //ポリゴンの頂点の末端の "-" を検知
        if (this.fbx.substring(end + 1, end + 2) == "-") {
          newLine = true;
        }
        begin = end + 1;
      }//for(var v = 0)
      
      var triangle = [];
      var quad = [];
      for (var v = 0; v < this.index.length; ++v) {
        if (this.index[v].length == 3) {
          triangle.push(this.index[v]);
        } else if (this.index[v].length == 4) {
          quad.push(this.index[v]);
        }
      }
      this.indexContainerTriangle.push(triangle);
      this.indexContainerQuad.push(quad);
    }//for(var u = 0)
    
  }
  getVertx() {
    return this.vertexContainer;
  }
  getIndexTriangle() {
    return this.indexContainerTriangle;
  }
  getIndexQuad() {
    return this.indexContainerQuad;
  }
  showFBX() {
    console.log(this.fbx);
    document.body.innerHTML = this.fbx;
  }
};
