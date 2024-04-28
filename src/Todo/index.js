import {List, Table} from 'antd';
import {useEffect, useState} from "react";

const columns = [
    {
        dataIndex: 'todo',
        render: (text) => <a>{text}</a>
    }
];

const Todo = (props) => {
    const { todos, handleComplete } = props;
    const [selected, setSelected] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            selectedRows.map(item => setSelected([...selected, item.key]));
            console.log(selected);
        },
    };

    useEffect(() => {
        handleComplete(selected);
    }, [selected]);

    return (
        <>
            {
                todos.length > 0 ?
                    (
                        <div>
                            <Table
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                showHeader={false}
                                columns={columns}
                                dataSource={todos}
                            />
                        </div>
                    ) :
                    (
                        <List/>
                    )
            }
        </>
    );
};

export default Todo;