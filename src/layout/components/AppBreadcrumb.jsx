import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom'
import menus from '../../router/index'

const breadcrumbNameMap = {}
function getMenusKeyValue (menus) {
    menus.forEach(item => {
        if (item.children) {
            getMenusKeyValue(item.children)
        }

        breadcrumbNameMap[item.key] = item.label
    })
}

getMenusKeyValue(menus)

// console.log(breadcrumbNameMap);

const App = () => {

    const { pathname } = useLocation()

    return (<div style={{ margin: '18px 0 0 18px' }}>
        <Breadcrumb>
            <Breadcrumb.Item href='/'>系统首页</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbNameMap['/' + pathname.split('/')[1]]}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbNameMap[pathname]}</Breadcrumb.Item>
        </Breadcrumb>
    </div>)
}


export default App;