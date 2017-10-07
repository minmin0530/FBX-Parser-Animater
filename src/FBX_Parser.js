var thisfbx;
class FBX_Parser {
  constructor(fbx) {
    thisfbx = fbx;
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
    begin = thisfbx.indexOf("Definitions:", 0);
    end = thisfbx.indexOf("\n", begin);
      
    begin = thisfbx.indexOf("Model", end);
    begin = thisfbx.indexOf("Count", begin);
    begin = thisfbx.indexOf(" ",     begin) + 1;
    end = thisfbx.indexOf("\n", begin);
    var modelNumber = thisfbx.substring(begin, end);
    
    begin = thisfbx.indexOf("NodeAttribute", end);
    begin = thisfbx.indexOf("Count", begin);
    begin = thisfbx.indexOf(" ",     begin) + 1;
    end = thisfbx.indexOf("\n", begin);
    var nodeAttributeNumber = thisfbx.substring(begin, end);

    begin = thisfbx.indexOf("Geometry", end);
    begin = thisfbx.indexOf("Count", begin);
    begin = thisfbx.indexOf(" ",     begin) + 1;
    end = thisfbx.indexOf("\n", begin);
    var geometryNumber = thisfbx.substring(begin, end);
    
    begin = thisfbx.indexOf("Material", end);
    begin = thisfbx.indexOf("Count", begin);
    begin = thisfbx.indexOf(" ",     begin) + 1;
    end = thisfbx.indexOf("\n", begin);
    var materialNumber = thisfbx.substring(begin, end);
    //#####
    // Connections
    //#####
    begin = thisfbx.indexOf("Connections:", 0);
    end = thisfbx.indexOf("\n", begin);      
    
    for (var v = 0; v < modelNumber; ++v) {
      var model = [];
      begin = thisfbx.indexOf(";Model", end) + 1;
      end = thisfbx.indexOf(",", begin);
      model.push(thisfbx.substring(begin, end));
  
      begin = thisfbx.indexOf("Model", end);
      end = thisfbx.indexOf("\n", begin);
      model.push(thisfbx.substring(begin, end));
  
      begin = thisfbx.indexOf(",", end) + 1;
      end = thisfbx.indexOf(",", begin);
      model.push(thisfbx.substring(begin, end));
  
      begin = end + 1;
      end = thisfbx.indexOf("\n", begin);
      model.push(thisfbx.substring(begin, end));
    
      connectionModel.push(model);
    }

    begin = thisfbx.indexOf("Connections:", 0);
    end = thisfbx.indexOf("\n", begin);
    for (var v = 0; v < nodeAttributeNumber; ++v) {
      begin = thisfbx.indexOf(";NodeAttribute", end) + 1;
      end = thisfbx.indexOf(",", begin);
      var childName = thisfbx.substring(begin, end);
  
      begin = thisfbx.indexOf("Model", end);
      end = thisfbx.indexOf("\n", begin);
      var parentName = thisfbx.substring(begin, end);
  
      begin = thisfbx.indexOf(",", end) + 1;
      end = thisfbx.indexOf(",", begin);
      var childId = thisfbx.substring(begin, end);
  
      begin = end + 1;
      end = thisfbx.indexOf("\n", begin);
      var parentId = thisfbx.substring(begin, end);
    }
    for (var v = 0; v < geometryNumber; ++v) {
      var geometry = [];
      begin = thisfbx.indexOf(";Geometry", end) + 1;
      end = thisfbx.indexOf(",", begin);
      geometry.push(thisfbx.substring(begin, end));
  
      begin = thisfbx.indexOf("Model", end);
      end = thisfbx.indexOf("\n", begin);
      geometry.push(thisfbx.substring(begin, end));
  
      begin = thisfbx.indexOf(",", end) + 1;
      end = thisfbx.indexOf(",", begin);
      geometry.push(thisfbx.substring(begin, end));
  
      begin = end + 1;
      end = thisfbx.indexOf("\n", begin);
      geometry.push(thisfbx.substring(begin, end));


      while (
          (thisfbx.indexOf(";Material", end) != -1 &&
           thisfbx.indexOf(";Material", end) < thisfbx.indexOf(";Geometry", end) ) ||
          (thisfbx.indexOf(";Geometry", end) == -1 && thisfbx.indexOf(";Material", end) != -1)
      ) {
        var cMaterial = [];
        begin = thisfbx.indexOf(";Material", end) + 1;
        end = thisfbx.indexOf(",", begin);
        cMaterial.push(thisfbx.substring(begin, end));
    
        begin = thisfbx.indexOf("Model", end);
        end = thisfbx.indexOf("\n", begin);
        cMaterial.push(thisfbx.substring(begin, end));
    
        begin = thisfbx.indexOf(",", end) + 1;
        end = thisfbx.indexOf(",", begin);
        cMaterial.push(thisfbx.substring(begin, end));
    
        begin = end + 1;
        end = thisfbx.indexOf("\n", begin);
        cMaterial.push(thisfbx.substring(begin, end));
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
    begin = thisfbx.indexOf("Objects:", 0);
    for (var u = 0; u < geometryNumber; ++u) {
      begin = thisfbx.indexOf("Geometry:", begin) + 10;
      end = thisfbx.indexOf(",", begin);
      geometryIdContainer.push(thisfbx.substring(begin, end));
  
      end = thisfbx.indexOf("Vertices", end);

      begin = thisfbx.indexOf("*", end) + 1;
      end = thisfbx.indexOf(" ", begin);
     //バーテックスの数
      var VertexNumber0 = thisfbx.substring(begin, end);
        
      end = thisfbx.indexOf("{", end);
      begin = thisfbx.indexOf(":", end) + 2;
      this.vertex0 = [];
      for (var v = 0; v < VertexNumber0 / 3; ++v) {
        var vertex = [];
        for (var w = 0; w < 3; ++w) {
          if (v * 3 + w == VertexNumber0 - 1) {
            end = thisfbx.indexOf("\n", begin);
          } else {
            end = thisfbx.indexOf(",", begin);
          }
          var token = thisfbx.substring(begin, end);
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
      end = thisfbx.indexOf("PolygonVertexIndex", end);
      begin = thisfbx.indexOf("*", end) + 1;
      end = thisfbx.indexOf(" ", begin);
      //インデックスの数
      var VertexIndexNumber = thisfbx.substring(begin, end);
      
      end = thisfbx.indexOf("{", end);
      begin = thisfbx.indexOf(":", end) + 2;
      
      this.index0 = [];
      var newLine = false;
      var index = [];
      for (var v = 0; v < VertexIndexNumber; ++v) {
        if (v == VertexIndexNumber - 1) {
          end = thisfbx.indexOf("\n", begin);
        } else {
          end = thisfbx.indexOf(",", begin);
        }
        var token = thisfbx.substring(begin, end);
        if (newLine) {
          var num = token.substring(1);
          num -= 1;
          token = num;
          index.push(token);
          
//          var adjustIndex = [];
//          for (var w = 0; w < index.length - 2; ++w) {
//            adjustIndex.push(index[w]);
//          }
//          adjustIndex.push(index[index.length - 1]);
//          adjustIndex.push(index[index.length - 2]);
//          this.index0.push(adjustIndex);
           this.index0.push(index);
          index = [];
          newLine = false;
        } else {
          index.push(token);
        }
          
        //ポリゴンの頂点の末端の "-" を検知
        if (thisfbx.substring(end + 1, end + 2) == "-") {
          newLine = true;
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
      end = thisfbx.indexOf("Normals:", end);
      begin = thisfbx.indexOf("*", end) + 1;
      end = thisfbx.indexOf(" ", begin);
      //インデックスの数
      var NormalNumber = thisfbx.substring(begin, end);
   //   document.body.innerHTML += NormalNumber + "<br>";

      end = thisfbx.indexOf("{", end);
      begin = thisfbx.indexOf(":", end) + 2;
      this.normal0 = [];
      for (var v = 0; v < NormalNumber / 3; ++v) {
        var normal = [];
        for (var w = 0; w < 3; ++w) {
          if (v * 3 + w == NormalNumber - 1) {
            end = thisfbx.indexOf("\n", begin);
          } else {
            end = thisfbx.indexOf(",", begin);
          }
          var token = thisfbx.substring(begin, end);
         //   document.body.innerHTML += token + "<br>";
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
      end = thisfbx.indexOf("Materials:", end);
      begin = thisfbx.indexOf("*", end) + 1;
      end = thisfbx.indexOf(" ", begin);
      var materialNumber0 = thisfbx.substring(begin, end);
//      document.body.innerHTML += "<br>" + thisfbx.substring(begin, end) + "<br>";
      end = thisfbx.indexOf("{", end);
      begin = thisfbx.indexOf(":", end) + 2;

      var materials = [];
      for (var v = 0; v < materialNumber0; ++v) {
        if (v == materialNumber0 - 1) {
          end = thisfbx.indexOf("\n", begin);
        } else {
          end = thisfbx.indexOf(",", begin);
        }
        materials.push(thisfbx.substring(begin, end));
        begin = end + 1;
      }
      this.materialsContainer0.push(materials);
//      document.body.innerHTML += "<br>" + this.materialsContainer0 + "<br>";
        
    }
    //#####
    // Model
    //#####  
    var modelContainer = [];
    for (var v = 0; v < modelNumber; ++v) {
      var modelArray = [];
      begin = thisfbx.indexOf("Model:", end) + 7;
      end = thisfbx.indexOf(",", begin);
      modelArray.push(thisfbx.substring(begin, end));
      begin = thisfbx.indexOf("Model::", end);
      end = thisfbx.indexOf(",", begin);
      modelArray.push(thisfbx.substring(begin, end));
      begin = thisfbx.indexOf("{", end);
      end = thisfbx.indexOf("}", begin);
      var scope = thisfbx.substring(begin, end);

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
      begin = thisfbx.indexOf("Material:", end) + 10;
      end = thisfbx.indexOf(",", begin);
      materialArray.push(thisfbx.substring(begin, end));

      begin = thisfbx.indexOf("Material::", end) + 10;
      end = thisfbx.indexOf(",", begin) - 1;
      materialArray.push(thisfbx.substring(begin, end));

      begin = thisfbx.indexOf("DiffuseColor", end);
      begin = thisfbx.indexOf("A", begin) + 3;
      end = thisfbx.indexOf(",", begin);
      materialArray.push(thisfbx.substring(begin, end));

      begin = end + 1;
      end = thisfbx.indexOf(",", begin);
      materialArray.push(thisfbx.substring(begin, end));
 
      begin = end + 1;
      end = thisfbx.indexOf("\n", begin);
      materialArray.push(thisfbx.substring(begin, end));
      
      materialContainer.push(materialArray);
    }
      
    this.vertexContainer1 = [];
    this.indexContainer1 = [];
    this.modelContainer1 = [];
    this.materialContainer1 = [];
    for (var v = 0; v < connectionGeometry.length; ++v) {
      for (var w = 0; w < geometryIdContainer.length; ++w) {
        if (connectionGeometry[v][2] == geometryIdContainer[w]) {
          this.vertexContainer1.push(this.vertexContainer0[w]);
          this.indexContainer1.push(this.indexContainerTriangle0[w]);
          break;
        }
      }
      for (var w = 0; w < modelContainer.length; ++w) {
        if (connectionGeometry[v][3] == modelContainer[w][0]) {
          this.modelContainer1.push(modelContainer[w]);
          break;
        }
      }
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
        
        
      this.colors = [];
      for (var v = 0; v < this.vertexContainer1[u].length; ++v) {
        this.colors.push(new GLBoost.Vector4(0, 0, 0, 1.0));
      }
      for (var v = 0; v < this.indexContainer1[u].length; ++v) {
        if ( this.materialsContainer0[u][v] == 0) {
          for (var w = 0; w < 3; ++w) {
            this.colors[this.indexContainer1[u][v][w]] = new GLBoost.Vector4(this.materialContainer1[u][2], this.materialContainer1[u][3], this.materialContainer1[u][4], 1.0);
          }
        }
      }
      for (var v = 0; v < this.indexContainer1[u].length; ++v) {
        if ( this.materialsContainer0[u][v] == 1) {
          for (var w = 0; w < 3; ++w) {
            this.colors[this.indexContainer1[u][v][w]] = new GLBoost.Vector4(this.materialContainer1[u][5], this.materialContainer1[u][6], this.materialContainer1[u][7], 1.0);
          }
        }
      }
      for (var v = 0; v < this.indexContainer1[u].length; ++v) {
        if ( this.materialsContainer0[u][v] == 2) {
          for (var w = 0; w < 3; ++w) {
            this.colors[this.indexContainer1[u][v][w]] = new GLBoost.Vector4(this.materialContainer1[u][8], this.materialContainer1[u][9], this.materialContainer1[u][10], 1.0);
          }
        }
      }
      this.colorContainer.push(this.colors);
    }
  }
  getColors() {
    return this.colorContainer;
  }
  getVertex() {
    return this.vertexContainer1;
  }
  getIndexTriangle() {
    return this.indexContainer2;
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
    console.log(thisfbx);
    document.body.innerHTML = thisfbx;
  }
};
