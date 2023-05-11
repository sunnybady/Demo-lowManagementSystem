import React, { useEffect, useState, useRef } from "react";
import VirtualScroll from "../../components/VirtualScroll";
const Tuihui = () => {
  const data = Array.from({ length: 100000 }, (_, index) => `Item ${index}`);
  // 列表容器的dom
  return <VirtualScroll data={data} rowHeight={30}></VirtualScroll>;
};

export default Tuihui;
