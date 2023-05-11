import React from 'react';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import './index.less';
const Color = require('color');

interface PropsType {
  /** 内容 */
  content: string;
  /** 标签说明 */
  description?: string;
  /** 标签色 */
  color?: string;
  /** 设置选中状态 */
  checked?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 标签大小 */
  size?: 'small' | 'middle' | 'large';
  /** 是否显示气泡提示 */
  showToolTip?: boolean;
  /** 限制内容字符 */
  maxLength?: number;
  style?: React.CSSProperties;
  /** 是否已删除，会影响颜色 */
  isDeleted?: boolean;
  /** tooltip 浮窗渲染节点 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 关闭时回调 */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击时回调 */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const prefixCls = 'yt_customer_tag';

const Tag: React.FC<PropsType> = ({
  content,
  checked = false,
  closable = false,
  showToolTip = false,
  color = '#FF7D00',
  size = 'middle',
  description = '',
  maxLength,
  style,
  isDeleted,
  getPopupContainer,
  onClick,
  onClose,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    (onClick as React.MouseEventHandler<HTMLElement>)?.(e);
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
  };

  const tagStyle: React.CSSProperties = {
    color,
    backgroundColor: Color(color).alpha(0.06).string(),
    borderColor: !!checked ? '#7262fd' : Color(color).alpha(0.3).string(),
    ...(style || {}),
  };

  const TagContent = (
    <span
      className={classnames(prefixCls, `${prefixCls}-${size}`, isDeleted ? 'is-deleted' : '')}
      style={tagStyle}
      onClick={handleClick}
    >
      {!!checked && <i className="icon-xuanzhong1 icon-checked"></i>}{' '}
      <label>
        {maxLength !== undefined && content.length > maxLength
          ? `${content.slice(0, maxLength)}...`
          : content}
      </label>
      {!!closable && <i className="icon-cem_cancel icon-close" onClick={handleCloseClick}></i>}
    </span>
  );

  if (showToolTip) {
    const TooltipContent = (
      <>
        <span className={`${prefixCls}-tip`}> {content}</span>
        {description && <div className={`${prefixCls}-description`}>说明：{description}</div>}
      </>
    );
    return (
      <Tooltip
        title={TooltipContent}
        placement="top"
        overlayClassName={`${prefixCls}-tooltip-overlay`}
        getPopupContainer={getPopupContainer || ((triggerNode) => triggerNode.parentElement!)}
      >
        {TagContent}
      </Tooltip>
    );
  }
  return TagContent;
};

export default Tag;
