//  用来自定义 hooks 用的文件
export function useTreeData(menus) {
  // 深拷贝一个数组
  const list = JSON.parse(JSON.stringify(menus));
  list.forEach((item) => {
    if (item.children) {
      // 将所有状态都设置为可以被点击选中
      item.children.forEach((it) => {
        it.disabled = false;
      });
    }
  });
  return list;
}

//URL的裁剪的hooks
export const useRouterSearch = (url: string) => {
  //url:pagesize=5&page=1&orderBy=id&order=asc&selected=2348800
  //searchParams={pagesize:5,page:1,orderBy:id,order:asc,selected:2348800}
  // console.log('urlllll',url)
  const searchParams: any = new URLSearchParams(url);
  const keys: any[] = [];
  const _setKeys = () => {
    keys.length = 0;
    for (let b of searchParams) {
      keys.push(b[0]);
    }
  };
  _setKeys();
  const setParams = (params: any) => {
    // for (let i = 0, len = keys.length; i < len; i++) {
    //   searchParams.delete(keys[i]);
    // }
    for (let k in params) {
      searchParams.set(k, params[k]);
    }
    _setKeys();
  };
  const getParam = (key: string) => {
    return searchParams.get(key);
  };
  const removeParam = (key: string) => {
    searchParams.delete(key);
  };
  const getParamsString = (): any => {
    return searchParams.toString();
  };
  return { searchParams, setParams, getParamsString, getParam, removeParam };
};

export default useRouterSearch;
