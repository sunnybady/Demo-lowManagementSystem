import React, { useRef } from 'react';
import { RadialGraph } from '@ant-design/graphs';

const Page = () => {
    const chartRef = useRef();
    const RadialData = {
        nodes: [
            {
                id: 'string',
                value: {
                    title: '字符串',
                    items: [{
                        text: '文本',
                        value: '1111',
                        icon: 'aaa',
                    }]

                }
            },
            {
                id: '0',
                label: '0',
            },
            {
                id: '1',
                label: '1',
            },
            {
                id: '2',
                label: '2',
            },
            {
                id: '3',
                label: '3',
            },
            {
                id: '4',
                label: '4',
            },
            {
                id: '5',
                label: '5',
            },
            {
                id: '6',
                label: '6',
            },
            {
                id: '7',
                label: '7',
            },
            {
                id: '8',
                label: '8',
            },
            {
                id: '9',
                label: '9',
            },
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
            {
                source: '0',
                target: '2',
            },
            {
                source: '0',
                target: '3',
            },
            {
                source: '0',
                target: '4',
            },
            {
                source: '0',
                target: '5',
            },
            {
                source: '0',
                target: '6',
            },
            {
                source: '0',
                target: '7',
            },
            {
                source: '0',
                target: '8',
            },
            {
                source: '0',
                target: '9',
            },
        ],
    };


    const fetchData = (node) => {
        return new Promise((resolve, reject) => {
            const data = new Array(Math.ceil(Math.random() * 10) + 2).fill('').map((_, i) => i + 1);
            setTimeout(() => {
                resolve({
                    nodes: [
                        {
                            ...node,
                        },
                    ].concat(
                        data.map((i) => {
                            return {
                                id: `${node.id}-${i}`,
                                label: `${node.label}-${i}`,
                            };
                        }),
                    ),
                    edges: data.map((i) => {
                        return {
                            source: node.id,
                            target: `${node.id}-${i}`,
                        };
                    }),
                });
            }, 1000);
        });
    };

    const asyncData = async (node) => {
        return await fetchData(node);
    };

    const config = {
        data: RadialData,
        autoFit: false,
        layout: {
            unitRadius: 80,
            /** 节点直径 */
            nodeSize: 20,
            /** 节点间距 */
            nodeSpacing: 10,
        },
        nodeCfg: {
            asyncData,
            size: 20,
            style: {
                fill: '#6CE8DC',
                stroke: '#6CE8DC',
            },
            labelCfg: {
                style: {
                    fontSize: 5,
                    fill: '#000',
                },
            },
        },
        menuCfg: {
            customContent: (e) => {
                return (
                    <div>
                        <button
                            onClick={() => {
                                chartRef.current.emit('node:dblclick', e);
                            }}
                        >
                            手动拓展(双击节点也可以拓展)
                        </button>
                    </div>
                );
            },
        },
        edgeCfg: {
            style: {
                lineWidth: 1,
            },
            endArrow: {
                d: 10,
                size: 2,
            },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        onReady: (graph) => {
            chartRef.current = graph;
        },
    };
    return <RadialGraph {...config} />;
};
export default Page;




// -------------------------------------------------------------------
// import React from 'react';
// import { DecompositionTreeGraph } from '@ant-design/graphs';

// const Page = () => {
//     const data = {
//         id: 'A0',
//         value: {
//             title: '销售金额',
//             items: [
//                 {
//                     text: '300万',
//                 },
//             ],
//         },
//         children: [
//             {
//                 id: 'A1',
//                 value: {
//                     title: '黄焖鸡1',
//                     items: [
//                         {
//                             text: '100万',
//                         },
//                         {
//                             text: '占比',
//                             value: '30%',
//                         },
//                     ],
//                 },
//                 children: [
//                     {
//                         id: 'A11',
//                         value: {
//                             title: '黄焖排骨',
//                             items: [
//                                 {
//                                     text: '150万',
//                                 },
//                                 {
//                                     text: '占比',
//                                     value: '40%',
//                                 },
//                             ],
//                         },
//                     },
//                     {
//                         id: 'A12',
//                         value: {
//                             title: '黄焖茄子',
//                             items: [
//                                 {
//                                     text: '50万',
//                                 },
//                                 {
//                                     text: '占比',
//                                     value: '15%',
//                                 },
//                             ],
//                         },
//                     },
//                     {
//                         id: 'A13',
//                         value: {
//                             title: '黄焖猪脚',
//                             items: [
//                                 {
//                                     text: '100万',
//                                 },
//                                 {
//                                     text: '占比',
//                                     value: '30%',
//                                 },
//                             ],
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 'A2',
//                 value: {
//                     title: '黄焖大虾',
//                     items: [
//                         {
//                             text: '55万',
//                         },
//                         {
//                             text: '占比',
//                             value: '14%',
//                             icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
//                         },
//                     ],
//                 },
//             },
//         ],
//     };

//     const config = {
//         data,
//         markerCfg: (cfg) => {
//             const { children } = cfg;
//             return {
//                 show: children?.length,
//             };
//         },
//         behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
//     };
//     return <DecompositionTreeGraph {...config} />;
// };
// export default Page;





