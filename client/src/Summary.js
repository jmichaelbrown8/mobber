import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "./store";

export function Summary() {
  const rotations = useSelector((state) => state.rotations);
  return <div>Rotations: {rotations}</div>;
}
