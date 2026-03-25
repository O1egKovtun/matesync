"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const LOGO_SVG = `<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M758.057 358.158C756.972 370.36 756.35 382.146 748.7 392.178C741.609 401.478 732.1 404.285 721.298 402.494C702.741 399.417 684.676 394.097 666.523 389.242C636.975 381.339 607.416 373.479 577.916 365.4C544.083 356.135 510.3 346.686 476.514 337.246C461.477 333.044 446.301 329.323 431.493 324.312C430.151 323.857 428.629 323.932 427 324.327C430.419 327.585 434.997 328.504 439.104 329.977C474.642 342.726 509.926 356.153 545.089 369.882C583.655 384.939 622.221 400.016 659.788 417.506C680.297 427.055 700.885 436.431 720.645 447.479C735.158 455.592 747.883 466.079 758.188 479.057C763.951 486.315 767.889 494.942 770.738 503.894C774.164 514.66 777.484 525.456 779.384 536.632C779.559 537.662 779.249 539.051 780.935 539.715C782.947 538.124 782.2 535.805 782.094 533.828C781.298 519.044 782.934 504.618 788.391 490.777C795.857 471.842 807.941 468.54 827.261 469.8C844.777 470.942 861.666 475.315 878.156 481.253C878.899 481.52 879.75 481.486 881.241 481.684C879.333 478.13 876.061 477.572 873.46 476.261C850.261 464.569 827.749 451.812 806.466 436.786C791.669 426.339 782.391 412.301 775.5 396.108C770.144 383.524 766.101 370.496 762.022 357.473C761.351 355.329 760.544 353.228 759.639 350.649C757.308 353.088 758.377 355.54 758.057 358.158Z" fill="#005DFF"/>
<path d="M339 460C347.4 460 354.467 461.933 360.2 465.8C365.933 469.667 370.333 474.933 373.4 481.6C375 478.8 376.867 476.133 379 473.6C381.133 470.933 383.6 468.6 386.4 466.6C389.333 464.6 392.533 463 396 461.8C399.6 460.6 403.6 460 408 460C414.667 460 420.467 461.267 425.4 463.8C430.467 466.2 434.667 469.667 438 474.2C441.333 478.6 443.8 483.867 445.4 490C447.133 496.133 448 502.8 448 510V560H424V510C424 506.667 423.667 503.4 423 500.2C422.333 497 421.133 494.133 419.4 491.6C417.667 489.067 415.333 487 412.4 485.4C409.467 483.8 405.667 483 401 483C398.2 483 395.467 483.6 392.8 484.8C390.133 486 387.8 487.8 385.8 490.2C383.8 492.467 382.133 495.267 380.8 498.6C379.6 501.933 379 505.733 379 510V560H355V510C355 506.667 354.667 503.4 354 500.2C353.333 497 352.133 494.133 350.4 491.6C348.667 489.067 346.333 487 343.4 485.4C340.467 483.8 336.667 483 332 483C329.2 483 326.467 483.6 323.8 484.8C321.133 486 318.8 487.8 316.8 490.2C314.8 492.467 313.133 495.267 311.8 498.6C310.6 501.933 310 505.733 310 510V560H286V469.6C286 466.533 286.733 464.133 288.2 462.4C289.8 460.667 291.6 459.8 293.6 459.8C295.067 459.8 296.533 460.333 298 461.4C299.6 462.333 301 463.933 302.2 466.2L307 475.2C308.333 473.2 310.133 471.333 312.4 469.6C314.667 467.733 317.2 466.133 320 464.8C322.8 463.333 325.8 462.2 329 461.4C332.333 460.467 335.667 460 339 460ZM510.423 560C502.023 560.4 494.69 559.267 488.423 556.6C482.157 553.933 476.89 550.333 472.623 545.8C468.49 541.133 465.357 535.8 463.223 529.8C461.223 523.667 460.223 517.467 460.223 511.2C460.223 504.8 461.223 498.533 463.223 492.4C465.357 486.267 468.49 480.8 472.623 476C476.89 471.2 482.157 467.333 488.423 464.4C494.69 461.467 502.023 460 510.423 460C517.89 460 524.69 461.2 530.823 463.6C536.957 466 542.223 469.4 546.623 473.8C551.023 478.067 554.423 483.267 556.823 489.4C559.223 495.533 560.423 502.333 560.423 509.8V550.4C560.423 553.467 559.623 555.867 558.023 557.6C556.557 559.333 554.823 560.2 552.823 560.2C551.357 560.2 549.823 559.733 548.223 558.8C546.757 557.733 545.423 556.067 544.223 553.8L539.423 544.8C536.623 548.933 532.823 552.467 528.023 555.4C523.223 558.2 517.357 559.733 510.423 560ZM510.423 484C504.69 484 499.823 485.333 495.823 488C491.957 490.533 489.023 493.733 487.023 497.6C485.157 501.333 484.223 505.467 484.223 510C484.223 514.533 485.157 518.733 487.023 522.6C489.023 526.333 491.957 529.533 495.823 532.2C499.69 534.733 504.557 536 510.423 536C513.89 536 517.157 535.467 520.223 534.4C523.423 533.2 526.223 531.533 528.623 529.4C531.023 527.133 532.89 524.4 534.223 521.2C535.69 518 536.423 514.267 536.423 510C536.423 501.733 534.157 495.333 529.623 490.8C525.223 486.267 518.823 484 510.423 484ZM588.167 436.6C591.234 432.733 594.167 430.8 596.967 430.8C598.434 430.8 599.634 431.467 600.567 432.8C601.634 434 602.167 436 602.167 438.8V460H628.167V480H603.167V518.8C603.167 526 605.234 530.733 609.367 533C613.634 535.267 619.901 536.267 628.167 536V560C622.167 559.733 616.167 559.067 610.167 558C604.301 556.8 599.034 554.667 594.367 551.6C589.834 548.533 586.101 544.2 583.167 538.6C580.367 533 578.967 525.6 578.967 516.4V480H569.967C568.101 480 566.501 479.733 565.167 479.2C563.834 478.667 562.967 477.733 562.567 476.4C562.167 475.067 562.367 473.4 563.167 471.4C563.967 469.267 565.567 466.6 567.967 463.4L588.167 436.6ZM684.847 560.6C673.647 560.6 664.247 558.133 656.647 553.2C649.18 548.133 643.58 541.867 639.847 534.4C636.114 526.933 634.18 518.8 634.047 510C634.047 501.2 635.914 493.067 639.647 485.6C643.514 478.133 649.18 471.933 656.647 467C664.247 461.933 673.647 459.4 684.847 459.4C693.38 459.4 700.847 460.933 707.247 464C713.78 467.067 719.114 471.133 723.247 476.2C727.514 481.267 730.514 487.067 732.247 493.6C734.114 500.133 734.647 506.867 733.847 513.8H658.447C658.847 516.733 659.714 519.6 661.047 522.4C662.38 525.067 664.114 527.467 666.247 529.6C668.514 531.733 671.18 533.467 674.247 534.8C677.314 536 680.847 536.6 684.847 536.6C690.847 536.6 695.714 535.467 699.447 533.2C703.18 530.933 706.114 527.933 708.247 524.2H733.847C732.514 529.133 730.514 533.8 727.847 538.2C725.18 542.6 721.78 546.467 717.647 549.8C713.647 553.133 708.914 555.8 703.447 557.8C697.98 559.667 691.78 560.6 684.847 560.6ZM708.247 495.8C706.114 492.067 703.18 489.067 699.447 486.8C695.714 484.533 690.847 483.4 684.847 483.4C679.247 483.4 674.58 484.6 670.847 487C667.114 489.267 664.18 492.2 662.047 495.8H708.247ZM742.352 547.4C742.352 543.667 743.485 540.667 745.752 538.4C748.152 536.133 751.285 535 755.152 535C758.885 535 761.885 536.133 764.152 538.4C766.418 540.667 767.552 543.667 767.552 547.4C767.552 551.133 766.418 554.2 764.152 556.6C761.885 558.867 758.885 560 755.152 560C751.285 560 748.152 558.867 745.752 556.6C743.485 554.2 742.352 551.133 742.352 547.4Z" fill="white"/>
</svg>`;

const EXTRUDE_DEPTH = 20;
const MAX_ROTATION = 15 * (Math.PI / 180);
const LERP_SPEED = 0.05;

function buildLogoGroup(): THREE.Group {
  const loader = new SVGLoader();
  const svgData = loader.parse(LOGO_SVG);
  const group = new THREE.Group();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: EXTRUDE_DEPTH,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1.5,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  for (let i = 0; i < svgData.paths.length; i++) {
    const path = svgData.paths[i];
    const shapes = SVGLoader.createShapes(path);
    const isIcon = i === 0;
    const fillColor = path.color ? "#" + path.color.getHexString() : "#ffffff";

    const material = new THREE.MeshPhysicalMaterial({
      color: fillColor,
      roughness: isIcon ? 0.2 : 0.15,
      metalness: isIcon ? 0.1 : 0.05,
      clearcoat: isIcon ? 0.8 : 1,
      clearcoatRoughness: isIcon ? 0.1 : 0.05,
      side: THREE.DoubleSide,
    });

    for (const shape of shapes) {
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }
  }

  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  group.position.set(-center.x, -center.y, -center.z);

  const wrapper = new THREE.Group();
  wrapper.add(group);

  const maxDim = Math.max(size.x, size.y);
  const desiredSize = 3.2;
  const s = desiredSize / maxDim;
  wrapper.scale.set(s, -s, s);

  return wrapper;
}

function LogoMesh() {
  const pivotRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const logoGroup = useMemo(() => buildLogoGroup(), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pivotRef.current) return;

    const targetX = mouse.current.y * MAX_ROTATION;
    const targetY = mouse.current.x * MAX_ROTATION;

    currentRotation.current.x += (targetX - currentRotation.current.x) * LERP_SPEED;
    currentRotation.current.y += (targetY - currentRotation.current.y) * LERP_SPEED;

    pivotRef.current.rotation.x = currentRotation.current.x;
    pivotRef.current.rotation.y = currentRotation.current.y;
  });

  return (
    <group ref={pivotRef}>
      <primitive object={logoGroup} />
    </group>
  );
}

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

export default function Logo3D() {
  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(0x000000, 0);
  }, []);

  return (
    <div className="w-[500px] h-[500px] overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={onCreated}
        style={{ background: "transparent" }}
      >
        <SceneSetup />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-3, -1, 3]} intensity={0.4} color="#4D9FFF" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#4D9FFF" />
        <LogoMesh />
      </Canvas>
    </div>
  );
}
