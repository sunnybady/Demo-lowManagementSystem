import { Input, Table } from 'antd';
import React, { useState } from 'react';
import * as XLSX from 'xlsx'

const Import = () => {

    const [proList, setProList] = useState()

    function upload (e) {
        console.log(e.target.files[0])

        const reader = new FileReader()
        // 将文件读取成数据流
        reader.readAsBinaryString(e.target.files[0])

        reader.onload = function () {
            // 将文件数据流读取成 js 对象
            const boox = XLSX.read(reader.result, { type: 'binary' })

            // 从对象中获取 工作表1 中的内容
            let res = boox.Sheets['工作表1']

            // 将表内容转换成 json 数据
            res = XLSX.utils.sheet_to_json(res)

            // console.log(res);
            setProList(res)
        }

    }

    const columns = [
        {
            title: '序号',
            render: (t, r, index) => {
                return <span> {index + 1} </span>
            }
        }, {
            title: '商品名称',
            dataIndex: 'proname'
        }
    ]

    return (
        <div>
            <h2>数据导入</h2>

            <Input type='file' onChange={upload}></Input>

            <Table dataSource={proList} rowKey='proid' pagination={{ pageSize: 6 }} columns={columns}></Table>

        </div>
    );
};

export default Import;