class Main {
  constructor() {
    ajax('resource/cube3.fbx').then(this.onFulfilled, this.onRejected);
  }
  onFulfilled(response) {
    var renderer = new Renderer();
    renderer.draw(response);
  }
  onRejected(error) { }
};

class Renderer {
  draw(response) {
    var fbx = new FBX_Parser(response);
    fbx.parseFBX();
    var colors        = fbx.getColors();
    var vertex        = fbx.getVertex();
    var indexTriangle = fbx.getIndexTriangle();
    var modelSRT      = fbx.getModelSRT();
    var normals       = fbx.getNormals();
    var uv            = fbx.getUVs();
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

    //三角ポリゴン描画
    for (var u = 0; u < indexTriangle.length; ++u) {

      var geometry = glBoostContext.createGeometry();
      geometry.setVerticesData({
        position: vertex[u],
//        color: colors[u],
        normal: normals[u],
        texcoord: uv[u]

      }, [indexTriangle[u]], GLBoost.TRIANGLES, GLBoost.DYNAMIC_DRAW);

      var material = glBoostContext.createClassicMaterial();
      material.shaderClass = GLBoost.LambertShader;
      var texture = glBoostContext.createTexture('resource/texture.png');
      material.setTexture(texture);
      var mesh = glBoostContext.createMesh(geometry, material);
      mesh.translate = new GLBoost.Vector3(modelSRT[u][2][0], modelSRT[u][2][1], modelSRT[u][2][2]);
      mesh.rotate    = new GLBoost.Vector3(modelSRT[u][3][0], modelSRT[u][3][1], modelSRT[u][3][2]);
      mesh.scale     = new GLBoost.Vector3(modelSRT[u][4][0], modelSRT[u][4][1], modelSRT[u][4][2]);
      scene.addChild(mesh);
    }
    var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(3.0, 3.0, 3.0), new GLBoost.Vector3(-500, -500, -500));
    var directionalLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(3.0, 3.0, 3.0), new GLBoost.Vector3(500, 500, 500));
    scene.addChild( directionalLight );
    scene.addChild( directionalLight2 );

    var camera = glBoostContext.createPerspectiveCamera(
        {
          eye: new GLBoost.Vector3(-100.0, 0.0, 500.0),
          center: new GLBoost.Vector3(0.0, 0.0, 0.0),
          up: new GLBoost.Vector3(0.0, 1.0, 0.0)
        },
        {
          fovy: 45.0,
          aspect: 1.0,
          zNear: 0.1,
          zFar: 3000.0
        }
    );
    scene.addChild( camera );

    var expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

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