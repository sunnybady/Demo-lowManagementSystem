# Tag 标签组件

应用于客户档案、问卷调研客户标签。

## 调用方式

```javascript
import Tag from '@customer/components/Tag';
<Tag
    content="标签内容"
    description="标签说明"
    color="#FF7D00"
    checked={true} // 设置选中状态
    closable={true} // 是否可关闭
    size={'middle'} // 标签大小
    showToolTip={true} // 是否显示气泡提示
    maxLength={5} // 限制内容字符
   />
/>
```

## API

| 参数              | 说明                 | 类型                                      | 默认值  |
| ----------------- | -------------------- | ----------------------------------------- | ------- | ----- | ------ |
| content           | 标签内容             | string                                    | -       |
| description       | 标签描述             | string                                    | -       |
| color             | 标签色               | string                                    | #FF7D00 |
| checked           | 设置选中状态         | boolean                                   | false   |
| closable          | 是否可关闭           | boolean                                   | false   |
| size              | 标签大小             | small                                     | middle  | large | middle |
| maxLength         | 限制内容字符         | number                                    | -       |
| getPopupContainer | tooltip 浮窗渲染节点 | (triggerNode: HTMLElement) => HTMLElement | -       |
| showToolTip       | 是否显示气泡提示     | boolean                                   | false   |
| onClose           | 关闭时的回调         | (event) => void                           | -       |
| onClick           | 点击时的回调         | (event) => void                           | -       |
