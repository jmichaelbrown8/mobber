import { useSelector } from "react-redux";

export function Summary() {
  const rotations = useSelector((state) => state.rotations);
  return <div>Rotations: {rotations}</div>;
}
