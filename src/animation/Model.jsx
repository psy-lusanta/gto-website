// Model.jsx
import { useGLTF } from '@react-three/drei';

export default function Model() {
  const { scene } = useGLTF('/models/horn.glb');

  return (
    <primitive
      object={scene}
      scale={1.8}
      position={[0, 0.2, 0]}
    />
  );
}