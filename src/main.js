class Main {
  draw(vertex, indexTriangle, modelSRT, material, materials) {
    var arg = new Object;
    var pair = location.search.substring(1).split('&');
    for(var i = 0; pair[i] ; i++) {
      var kv = pair[i].split('=');
      arg[kv[0]] = kv[1];
    }

    GLBoost.VALUE_TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

    var canvas = document.getElementById("world");

    var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

    var renderer = glBoostContext.createRenderer({ clearColor: {red:0.5, green:0.5, blue:0.5, alpha:1}});

    var scene = glBoostContext.createScene();

    var material2 = glBoostContext.createClassicMaterial();
    var texture2 = glBoostContext.createTexture('../resource/texture.png');
    material2.setTexture(texture2);

      //三角ポリゴン描画
    for (var u = 0; u < indexTriangle.length; ++u) {
      var indices = [];
      for (var v = 0; v < indexTriangle[u].length; ++v) {
        for (var w = 0; w < 3; ++w) {
          indices.push(indexTriangle[u][v][w]);
        }
      }
      var positions = vertex[u];

      var colors = [];
      for (var v = 0; v < vertex[u].length; ++v) {
        colors.push(new GLBoost.Vector4(0, 0, 0, 1.0));
      }
      for (var v = 0; v < indexTriangle[u].length; ++v) {
        if ( materials[u][v] == 0) {
          for (var w = 0; w < 3; ++w) {
            colors[indexTriangle[u][v][w]] = new GLBoost.Vector4(material[u][2], material[u][3], material[u][4], 1.0);
          }
        }
      }
      for (var v = 0; v < indexTriangle[u].length; ++v) {
        if ( materials[u][v] == 1) {
          for (var w = 0; w < 3; ++w) {
            colors[indexTriangle[u][v][w]] = new GLBoost.Vector4(material[u][5], material[u][6], material[u][7], 1.0);
          }
        }
      }
      for (var v = 0; v < indexTriangle[u].length; ++v) {
        if ( materials[u][v] == 2) {
          for (var w = 0; w < 3; ++w) {
            colors[indexTriangle[u][v][w]] = new GLBoost.Vector4(material[u][8], material[u][9], material[u][10], 1.0);
          }
        }
      }
      var geometry = glBoostContext.createGeometry();
      geometry.setVerticesData({
        position: positions,
        color: colors
      }, [indices], GLBoost.TRIANGLES, GLBoost.DYNAMIC_DRAW);

      var mesh = glBoostContext.createMesh(geometry);
      mesh.translate = new GLBoost.Vector3(modelSRT[u][2][0], modelSRT[u][2][1], modelSRT[u][2][2]);
      mesh.rotate    = new GLBoost.Vector3(modelSRT[u][3][0], modelSRT[u][3][1], modelSRT[u][3][2]);
      mesh.scale     = new GLBoost.Vector3(modelSRT[u][4][0], modelSRT[u][4][1], modelSRT[u][4][2]);
      scene.addChild(mesh);
    }

    var camera = glBoostContext.createPerspectiveCamera(
        {
          eye: new GLBoost.Vector3(0.0, 0.0, 500.0),
          center: new GLBoost.Vector3(0.0, 0.0, 0.0),
          up: new GLBoost.Vector3(0.0, 1.0, 0.0)
        },
        {
          fovy: 45.0,
          aspect: 1.0,
          zNear: 0.1,
          zFar: 1000.0
        }
    );
    scene.addChild( camera );

    var expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    var angle = 0;
    var render = function(){
      renderer.clearCanvas();
      renderer.draw(expression);

      var rotateMatrix = GLBoost.Matrix33.rotateY(-1.0);
      var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
      camera.eye = rotatedVector;

      requestAnimationFrame(render);
    };
    render();
  }
};