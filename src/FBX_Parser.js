class FBX_Parser {
  constructor(fbx) {
    this.fbx = fbx;
  }
  parseFBX() {
    var begin = 0;
    var end = 0;

    var connectionModel = [];
    var connectionGeometry = [];
    var connectionMaterial = [];
    //####
    // Definitions
    //####
    begin = this.fbx.indexOf("Definitions:", 0);
    end = this.fbx.indexOf("\n", begin);
      
    begin = this.fbx.indexOf("Model", end);
    begin = this.fbx.indexOf("Count", begin);
    begin = this.fbx.indexOf(" ",     begin) + 1;
    end = this.fbx.indexOf("\n", begin);
    var modelNumber = this.fbx.substring(begin, end);
    
    begin = this.fbx.indexOf("NodeAttribute", end);
    begin = this.fbx.indexOf("Count", begin);
    begin = this.fbx.indexOf(" ",     begin) + 1;
    end = this.fbx.indexOf("\n", begin);
    var nodeAttributeNumber = this.fbx.substring(begin, end);

    begin = this.fbx.indexOf("Geometry", end);
    begin = this.fbx.indexOf("Count", begin);
    begin = this.fbx.indexOf(" ",     begin) + 1;
    end = this.fbx.indexOf("\n", begin);
    var geometryNumber = this.fbx.substring(begin, end);
    
    begin = this.fbx.indexOf("Material", end);
    begin = this.fbx.indexOf("Count", begin);
    begin = this.fbx.indexOf(" ",     begin) + 1;
    end = this.fbx.indexOf("\n", begin);
    var materialNumber = this.fbx.substring(begin, end);
    //#####
    // Connections
    //#####
    begin = this.fbx.indexOf("Connections:", 0);
    end = this.fbx.indexOf("\n", begin);      
    
    for (var v = 0; v < modelNumber; ++v) {
      var model = [];
      begin = this.fbx.indexOf(";Model", end) + 1;
      end = this.fbx.indexOf(",", begin);
      model.push(this.fbx.substring(begin, end));
  
      begin = this.fbx.indexOf("Model", end);
      end = this.fbx.indexOf("\n", begin);
      model.push(this.fbx.substring(begin, end));
  
      begin = this.fbx.indexOf(",", end) + 1;
      end = this.fbx.indexOf(",", begin);
      model.push(this.fbx.substring(begin, end));
  
      begin = end + 1;
      end = this.fbx.indexOf("\n", begin);
      model.push(this.fbx.substring(begin, end));
    
      connectionModel.push(model);
    }

    begin = this.fbx.indexOf("Connections:", 0);
    end = this.fbx.indexOf("\n", begin);
    for (var v = 0; v < nodeAttributeNumber; ++v) {
      begin = this.fbx.indexOf(";NodeAttribute", end) + 1;
      end = this.fbx.indexOf(",", begin);
      var childName = this.fbx.substring(begin, end);
  
      begin = this.fbx.indexOf("Model", end);
      end = this.fbx.indexOf("\n", begin);
      var parentName = this.fbx.substring(begin, end);
  
      begin = this.fbx.indexOf(",", end) + 1;
      end = this.fbx.indexOf(",", begin);
      var childId = this.fbx.substring(begin, end);
  
      begin = end + 1;
      end = this.fbx.indexOf("\n", begin);
      var parentId = this.fbx.substring(begin, end);
    }
    for (var v = 0; v < geometryNumber; ++v) {
      var geometry = [];
      begin = this.fbx.indexOf(";Geometry", end) + 1;
      end = this.fbx.indexOf(",", begin);
      geometry.push(this.fbx.substring(begin, end));
  
      begin = this.fbx.indexOf("Model", end);
      end = this.fbx.indexOf("\n", begin);
      geometry.push(this.fbx.substring(begin, end));
  
      begin = this.fbx.indexOf(",", end) + 1;
      end = this.fbx.indexOf(",", begin);
      geometry.push(this.fbx.substring(begin, end));
  
      begin = end + 1;
      end = this.fbx.indexOf("\n", begin);
      geometry.push(this.fbx.substring(begin, end));


      while (
          (this.fbx.indexOf(";Material", end) != -1 &&
           this.fbx.indexOf(";Material", end) < this.fbx.indexOf(";Geometry", end) ) ||
          (this.fbx.indexOf(";Geometry", end) == -1 && this.fbx.indexOf(";Material", end) != -1)
      ) {
        var cMaterial = [];
        begin = this.fbx.indexOf(";Material", end) + 1;
        end = this.fbx.indexOf(",", begin);
        cMaterial.push(this.fbx.substring(begin, end));
    
        begin = this.fbx.indexOf("Model", end);
        end = this.fbx.indexOf("\n", begin);
        cMaterial.push(this.fbx.substring(begin, end));
    
        begin = this.fbx.indexOf(",", end) + 1;
        end = this.fbx.indexOf(",", begin);
        cMaterial.push(this.fbx.substring(begin, end));
    
        begin = end + 1;
        end = this.fbx.indexOf("\n", begin);
        cMaterial.push(this.fbx.substring(begin, end));
        geometry.push(cMaterial);
      }
      connectionGeometry.push(geometry);

    }

    //#####
    // Objects
    //#####
    var geometryIdContainer = [];
    this.vertexContainer0 = [];
    this.indexContainerTriangle0 = [];
    this.materialsContainer0 = [];
    this.normalContainer0 = [];
    begin = this.fbx.indexOf("Objects:", 0);
      
    for (var u = 0; u < geometryNumber; ++u) {
      begin = this.fbx.indexOf("Geometry:", begin) + 10;
      end = this.fbx.indexOf(",", begin);
      geometryIdContainer.push(this.fbx.substring(begin, end));
  
      end = this.fbx.indexOf("Vertices", end);

      begin = this.fbx.indexOf("*", end) + 1;
      end = this.fbx.indexOf(" ", begin);
     //バーテックスの数
      var VertexNumber0 = this.fbx.substring(begin, end);
        
      end = this.fbx.indexOf("{", end);
      begin = this.fbx.indexOf(":", end) + 2;
      this.vertex0 = [];
      for (var v = 0; v < VertexNumber0 / 3; ++v) {
        var vertex = [];
        for (var w = 0; w < 3; ++w) {
          if (v * 3 + w == VertexNumber0 - 1) {
            end = this.fbx.indexOf("\n", begin);
          } else {
            end = this.fbx.indexOf(",", begin);
          }
          var token = this.fbx.substring(begin, end);
          vertex.push(token);      
          if (w == 2) {
            this.vertex0.push(vertex);
          }
          begin = end + 1;
        }
      }
      this.vertexContainer0.push(this.vertex0);
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
      
      this.index0 = [];
      var newLine = false;
      var index = [];
      var token0 = "";
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
          token = Number(token);
          index.push(token);
          
          this.index0.push(index);
          index = [];
          newLine = false;
        } else {
          token = Number(token);
          index.push(token);
        }
          
        //ポリゴンの頂点の末端の "-" を検知
        var posEnd;
        if (v == VertexIndexNumber - 1) {
          posEnd = this.fbx.indexOf("\n", end + 1);
        } else {
          posEnd = this.fbx.indexOf(",", end + 1);
        }
          
        token0 = this.fbx.substring(end + 1, posEnd);
        var pos = token0.indexOf("-", 0);
        if (token0.substring(pos, pos + 1) == "-") {
          newLine = true;
          end += pos;
        }
          
        begin = end + 1;
      }//for(var v = 0)
      
      var triangle0 = [];
      for (var v = 0; v < this.index0.length; ++v) {
        if (this.index0[v].length == 3) {
          triangle0.push(this.index0[v]);
        }
      }      
      this.indexContainerTriangle0.push(triangle0);
      //#####
      // Normals
      //#####
      end = this.fbx.indexOf("Normals:", end);
      begin = this.fbx.indexOf("*", end) + 1;
      end = this.fbx.indexOf(" ", begin);
      //インデックスの数
      var NormalNumber = this.fbx.substring(begin, end);

      end = this.fbx.indexOf("{", end);
      begin = this.fbx.indexOf(":", end) + 2;
      this.normal0 = [];
      for (var v = 0; v < NormalNumber / 3; ++v) {
        var normal = [];
        for (var w = 0; w < 3; ++w) {
          if (v * 3 + w == NormalNumber - 1) {
            end = this.fbx.indexOf("\n", begin);
          } else {
            end = this.fbx.indexOf(",", begin);
          }
          var token = this.fbx.substring(begin, end);
          normal.push(token);      
          if (w == 2) {
            this.normal0.push(normal);
          }
          begin = end + 1;
        }
      }
      this.normalContainer0.push(this.normal0);
      //#####
      // Materials
      //#####
      end = this.fbx.indexOf("Materials:", end);
      begin = this.fbx.indexOf("*", end) + 1;
      end = this.fbx.indexOf(" ", begin);
      var materialNumber0 = this.fbx.substring(begin, end);
      end = this.fbx.indexOf("{", end);
      begin = this.fbx.indexOf(":", end) + 2;

      var materials = [];
      for (var v = 0; v < materialNumber0; ++v) {
        if (v == materialNumber0 - 1) {
          end = this.fbx.indexOf("\n", begin);
        } else {
          end = this.fbx.indexOf(",", begin);
        }
        materials.push(this.fbx.substring(begin, end));
        begin = end + 1;
      }
      this.materialsContainer0.push(materials);
        
    }
    //#####
    // Model
    //#####  
    var modelContainer = [];
    for (var v = 0; v < modelNumber; ++v) {
      var modelArray = [];
      begin = this.fbx.indexOf("Model:", end) + 7;
      end = this.fbx.indexOf(",", begin);
      modelArray.push(this.fbx.substring(begin, end));
      begin = this.fbx.indexOf("Model::", end);
      end = this.fbx.indexOf(",", begin);
      modelArray.push(this.fbx.substring(begin, end));
      begin = this.fbx.indexOf("{", end);
      end = this.fbx.indexOf("}", begin);
      var scope = this.fbx.substring(begin, end);

      var translationArray = [];
      var begin2 = scope.indexOf("Lcl Translation", 0);
      if (begin2 != -1) {
        begin2 = scope.indexOf("A", begin2) + 3;
        var end2 = scope.indexOf(",", begin2);
        translationArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf(",", begin2);
        translationArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf("\n", begin2);
        translationArray.push(scope.substring(begin2, end2));
      } else {
        translationArray.push(0);
        translationArray.push(0);
        translationArray.push(0);
      }
      modelArray.push(translationArray);
        
      var rotationArray = [];
      var begin2 = scope.indexOf("Lcl Rotation", 0);
      if (begin2 != -1) {
        begin2 = scope.indexOf("A", begin2) + 3;
        var end2 = scope.indexOf(",", begin2);
        rotationArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf(",", begin2);
        rotationArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf("\n", begin2);
        rotationArray.push(scope.substring(begin2, end2));
      } else {
        rotationArray.push(0);
        rotationArray.push(0);
        rotationArray.push(0);
      }
      modelArray.push(rotationArray);

      var scalingArray = [];
      var begin2 = scope.indexOf("Lcl Scaling", 0);
      if (begin2 != -1) {
        begin2 = scope.indexOf("A", begin2) + 3;
        var end2 = scope.indexOf(",", begin2);
        scalingArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf(",", begin2);
        scalingArray.push(scope.substring(begin2, end2));
        begin2 = end2 + 1;
        end2 = scope.indexOf("\n", begin2);
        scalingArray.push(scope.substring(begin2, end2));
      } else {
        scalingArray.push(1);
        scalingArray.push(1);
        scalingArray.push(1);
      }
      modelArray.push(scalingArray);
    
      modelContainer.push(modelArray);
    }
    //#####
    // Material
    //#####
    var materialContainer = [];
    for (var v = 0; v < materialNumber; ++v) {
      var materialArray = [];
      begin = this.fbx.indexOf("Material:", end) + 10;
      end = this.fbx.indexOf(",", begin);
      materialArray.push(this.fbx.substring(begin, end));

      begin = this.fbx.indexOf("Material::", end) + 10;
      end = this.fbx.indexOf(",", begin) - 1;
      materialArray.push(this.fbx.substring(begin, end));

      begin = this.fbx.indexOf("DiffuseColor", end);
      begin = this.fbx.indexOf("A", begin) + 3;
      end = this.fbx.indexOf(",", begin);
      materialArray.push(this.fbx.substring(begin, end));

      begin = end + 1;
      end = this.fbx.indexOf(",", begin);
      materialArray.push(this.fbx.substring(begin, end));
 
      begin = end + 1;
      end = this.fbx.indexOf("\n", begin);
      materialArray.push(this.fbx.substring(begin, end));
      
      materialContainer.push(materialArray);
    }
      
    this.vertexContainer1 = [];
    this.indexContainer1 = [];
    this.modelContainer1 = [];
    this.materialContainer1 = [];
    for (var w = 0; w < geometryNumber; ++w) {
      this.vertexContainer1.push(this.vertexContainer0[w]);
      this.indexContainer1.push(this.indexContainerTriangle0[w]);
      this.modelContainer1.push(modelContainer[w + 1]);
    }
    for (var v = 0; v < connectionGeometry.length; ++v) {
 
      for (var w = 0; w < materialContainer.length; ++w) {
        var temp = [];
        var breakFlag = false;
        if (connectionGeometry[v].length == 5 &&
            connectionGeometry[v][4][2] == materialContainer[w][0]) {
          temp.push(0);
          temp.push(0);
          temp.push(materialContainer[w][2]);
          temp.push(materialContainer[w][3]);
          temp.push(materialContainer[w][4]);
          breakFlag = true;
        }
        if (connectionGeometry[v].length == 6) {
          breakFlag = true;
          for (var a = 0; a < materialContainer.length; ++a) {
            if (connectionGeometry[v][4][2] == materialContainer[a][0]) {
              temp.push(0);
              temp.push(0);
              temp.push(materialContainer[a][2]);
              temp.push(materialContainer[a][3]);
              temp.push(materialContainer[a][4]);                
            }              
          }
          for (var a = 0; a < materialContainer.length; ++a) {
            if (connectionGeometry[v][5][2] == materialContainer[a][0]) {
              temp.push(materialContainer[a][2]);
              temp.push(materialContainer[a][3]);
              temp.push(materialContainer[a][4]);                
            }              
          }
        }
        if (connectionGeometry[v].length == 7) {
          breakFlag = true;
          for (var a = 0; a < materialContainer.length; ++a) {
            if (connectionGeometry[v][4][2] == materialContainer[a][0]) {
              temp.push(0);
              temp.push(0);
              temp.push(materialContainer[a][2]);
              temp.push(materialContainer[a][3]);
              temp.push(materialContainer[a][4]);                
            }              
          }
          for (var a = 0; a < materialContainer.length; ++a) {
            if (connectionGeometry[v][5][2] == materialContainer[a][0]) {
              temp.push(materialContainer[a][2]);
              temp.push(materialContainer[a][3]);
              temp.push(materialContainer[a][4]);                
            }              
          }
          for (var a = 0; a < materialContainer.length; ++a) {
            if (connectionGeometry[v][6][2] == materialContainer[a][0]) {
              temp.push(materialContainer[a][2]);
              temp.push(materialContainer[a][3]);
              temp.push(materialContainer[a][4]);                
            }              
          }
        }  

        if (breakFlag) {
          this.materialContainer1.push(temp);
          break;
        }
          
      }
    }
    this.indexContainer2 = [];
    this.colorContainer = [];
    for (var u = 0; u < geometryNumber; ++u) {
      var indices = [];
      for (var v = 0; v < this.indexContainer1[u].length; ++v) {
        for (var w = 0; w < 3; ++w) {
          indices.push(this.indexContainer1[u][v][w]);
        }
      }
      this.indexContainer2.push(indices);
    }
    
    this.vertexContainer2 = [];
    this.materialContainer2 = [];
    this.colorContainer2 = [];
    for (var u = 0; u < geometryNumber; ++u) {
      var indexedVertex = [];
      var mm = [];
      for (var v = 0; v < this.indexContainer2[u].length; ++v) {
        var vv = [];
        vv.push(this.vertexContainer1[u][this.indexContainer2[u][v]][0]);
        vv.push(this.vertexContainer1[u][this.indexContainer2[u][v]][1]);
        vv.push(this.vertexContainer1[u][this.indexContainer2[u][v]][2]);
        indexedVertex.push(vv);
        if (this.materialsContainer0[u][this.indexContainer2[u][v]] == 0) {
          mm.push(new GLBoost.Vector4(this.materialContainer1[u][2], this.materialContainer1[u][3], this.materialContainer1[u][4], 1.0));
        }
        else if (this.materialsContainer0[u][this.indexContainer2[u][v]] == 1) {
          mm.push(new GLBoost.Vector4(this.materialContainer1[u][5], this.materialContainer1[u][6], this.materialContainer1[u][7], 1.0));
        }
        else if (this.materialsContainer0[u][this.indexContainer2[u][v]] == 2) {
          mm.push(new GLBoost.Vector4(this.materialContainer1[u][8], this.materialContainer1[u][9], this.materialContainer1[u][10], 1.0));
        }
      }
      this.vertexContainer2.push(indexedVertex);
      this.colorContainer2.push(mm);
    }
      
    this.indexContainer3 = [];
    for (var u = 0; u < geometryNumber; ++u) {
      var vArray = [];
      for (var v = 0; v < this.indexContainer2[u].length; ++v) {
        var wArray = [];
        vArray.push(v);
      }
      this.indexContainer3.push(vArray);
    }
  }
  getColors() {
    return this.colorContainer2;
  }
  getVertex() {
    return this.vertexContainer2;
  }
  getIndexTriangle() {
    return this.indexContainer3;
  }
  getModelSRT() {
    return this.modelContainer1;
  }
  getMaterial() {
    return this.materialContainer1;
  }
  getMaterials() {
    return this.materialsContainer0;
  }
  getNormals() {
    return this.normalContainer0;
  }
  showFBX() {
    console.log(this.fbx);
    document.body.innerHTML = this.fbx;
  }
};
