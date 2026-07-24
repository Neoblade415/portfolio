import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

export function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);
  
  // Track rotation velocity. Base speed is 1.2
  const velocity = useRef(1.2);
  const targetVelocity = useRef(1.2);

  useFrame((state, delta) => {
    if (ref.current) {
      // Smoothly accelerate current velocity toward target velocity
      velocity.current = THREE.MathUtils.damp(velocity.current, targetVelocity.current, 10, delta);
      
      ref.current.rotation.y += delta * velocity.current;
      
      // Target velocity smoothly decays back to baseline 1.2
      if (targetVelocity.current > 1.2) {
        targetVelocity.current = THREE.MathUtils.damp(targetVelocity.current, 1.2, 1.5, delta);
      }
    }
  });

  const handleClick = (e: any) => {
    // Only trigger if it was a clean click (pointer didn't move much)
    if (e.delta <= 2) {
      e.stopPropagation(); // prevent interaction controls from fighting it
      targetVelocity.current = 18; // Reduced target burst
    }
  };

  return <primitive object={scene} ref={ref} onClick={handleClick} onDoubleClick={handleClick} />;
}

export function GLBViewer({ url, className }: { url: string, className?: string }) {
  return (
    <div className={`w-full h-full bg-black ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="city" intensity={0.5} castShadow={false} adjustCamera={2.2}>
              <Model url={url} />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
