window.addEventListener("DOMContentLoaded", init);



function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setClearColor( 0xdc6b9a, 1.3 ); // 背景色
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    1,
    10000
  );
  camera.position.set(0, 0, +1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(400, 400, 400);

  let loader = new THREE.TextureLoader();
  let texture = loader.load( '../logo.jpg' );
  let material = new THREE.MeshBasicMaterial( { map: texture } );
    // var materials = [
    //     new THREE.MeshLambertMaterial({color: 0x2cb4ad}),
    //     new THREE.MeshLambertMaterial({color: 0x2cb4ad}),
    //     new THREE.MeshLambertMaterial({color: 0xdc6b9a}),
    //     new THREE.MeshLambertMaterial({color: 0xdc6b9a}),
    //     new THREE.MeshLambertMaterial({color: 0x68a4d9}),
    //     new THREE.MeshLambertMaterial({color: 0x68a4d9})
    // ];
    // var material = new THREE.MeshFaceMaterial(materials);

  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 1.5; // 光の強さを倍に
  light.position.set(0, 0,10);
  // シーンに追加
  scene.add(light);

//   初回実行
  tick();

  function tick() {
    window.onmousemove = handleMouseMove;
    requestAnimationFrame(tick);

    function handleMouseMove(event) {
        b_x = width/2;
        b_y = height/2;
        event = event || window.event; // IE対応
        if(event.clientX < 960 && event.clientY < 540){
            x = parseInt(event.clientX) * 0.005;
            y = (parseInt(event.clientY)- 250) * 0.005;
            box.rotation.x = y - b_y;
            box.rotation.y = x - b_x;
        }
        b_x = x
        b_y = y
        // console.log(String(x) + ", " + String(y));
    }
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }

}