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
//          this.index.push(index);
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
      for (var v = 0; v < this.index.length; ++v) {
        if (this.index[v].length == 3) {
          triangle.push(this.index[v]);
        } else if (this.index[v].length == 4) {
          var temp = [];
          var temp2 = [];
          temp.push(this.index[v][0]);
          temp.push(this.index[v][1]);
          temp.push(this.index[v][2]);
          triangle.push(temp);
          temp2.push(this.index[v][1]);
          temp2.push(this.index[v][2]);
          temp2.push(this.index[v][3]);
          triangle.push(temp2);
        }
      }
      this.indexContainerTriangle.push(triangle);
    }//for(var u = 0)
    
  }
  getVertx() {
    return this.vertexContainer;
  }
  getIndexTriangle() {
    return this.indexContainerTriangle;
  }
  showFBX() {
    console.log(this.fbx);
    document.body.innerHTML = this.fbx;
  }
};
