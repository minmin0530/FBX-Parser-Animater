class Main {
  draw() {
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

    var material = glBoostContext.createClassicMaterial();
    var texture = glBoostContext.createTexture('texture.png');
    material.setTexture(texture);

    var indices = [
      0, 1, 3, 2
    ];

    var positions = [
      new GLBoost.Vector3(-0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      [0.5,  0.5, 0.0], // GLBoost can accept arrays as vector values other than instances of vector class.
      [-0.5, 0.5, 0.0]  // GLBoost converts the arrays to instances of vector class.
    ];
    var texcoords = [
      new GLBoost.Vector2(0.0, 1.0),
      new GLBoost.Vector2(1.0, 1.0),
      [1.0, 0.0],  // GLBoost can accept arrays as vector values other than instances of vector class.
      [0.0, 0.0]   // GLBoost converts the arrays to instances of vector class.
    ];

    var geometry = glBoostContext.createGeometry();
    geometry.setVerticesData({
      position: positions,
      texcoord: texcoords
    }, [indices], GLBoost.TRIANGLE_STRIP, GLBoost.DYNAMIC_DRAW);

    var mesh = glBoostContext.createMesh(geometry, material);
    scene.addChild(mesh);

    var camera = glBoostContext.createPerspectiveCamera(
        {
          eye: new GLBoost.Vector3(0.0, 0.0, 5.0),
          center: new GLBoost.Vector3(0.0, 0.0, 0.0),
          up: new GLBoost.Vector3(0.0, 1.0, 0.0)
        },
        {
          fovy: 45.0,
          aspect: 1.0,
          zNear: 0.1,
          zFar: 300.0
        }
    );
    scene.addChild( camera );

    var expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    var render = function(){
      renderer.clearCanvas();
      renderer.draw(expression);

      var delta = 0.05;
      texcoords[0].x += delta;
      texcoords[1].x += delta;
      texcoords[2][0] += delta;  // You have to access this element using .x property, because GLBoost converted the above-specified arrays to instances of vector class.
      texcoords[3][0] += delta;  // same here.

      geometry.updateVerticesData({
        texcoord: texcoords
      });

      requestAnimationFrame(render);
    };
    render();
  }
};