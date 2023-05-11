import React from 'react';
import moment from 'moment';
import { random } from 'lodash';
import type { ReactNode } from 'react';

import Currency from '@shared/utils/currency';

// 类型检查
import {
  CustomerTagType,
  FormUnitType,
  FormUnitTypeEnum,
  ScreenSymbol,
} from '@customer/types/common.d';
import type { FilterSchema } from '@customer/components/FilterPanel/types';
import { routerUrl } from '@customer/constant/routerUrl';
import { DATE_FORMATE, DATE_TIME_FORMATE, URL_PARAMS_KEY } from '@customer/constant';
import { CurrencyValue } from '@customer/types/currency';
import { SchemaModel } from '@customer/types/schema';

import { defaultSymbolConfigs } from '@customer/components/FilterPanel/FilterItem/config';

// 截止日期显示
const dayFormat = 'HH:mm';
export const deadLineConfig = (val: any) => {
  const date = typeof val === 'string' ? moment(val, DATE_TIME_FORMATE) : val;
  if (date.get('year') !== moment().get('year')) {
    return date.format(DATE_TIME_FORMATE);
  }
  const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const myDate = new Date(date.format(DATE_FORMATE));
  const nowDate = new Date();
  const cmp = ((myDate as any) - (nowDate as any)) / 1000 / 60 / 60 / 24;
  const today = nowDate.getDay() || 7;
  return cmp < 7 + 7 - today && -7 + -today < cmp
    ? cmp > -2 && cmp <= 1
      ? `${cmp < 0 ? (cmp < 0 && cmp > -1 ? '今天' : '昨天') : '明天'} ${date.format(dayFormat)}`
      : `${cmp > 7 - today ? '下' : cmp < -nowDate.getDay() ? '上' : ''}${
          weekDay[myDate.getDay()]
        } ${date.format(dayFormat)}`
    : date.format('MM/DD HH:mm');
};

// 设置自定义标签颜色
export function setTagStyle(tag: any) {
  if (!tag.systemTag) {
    return {
      // color: theme['primary-color'],
      // borderColor: theme['primary-color'],
      color: '#7262fd',
      borderColor: '#7262fd',
    };
  }
  return {};
}

// 处理消息内容中的特殊字符
export const handleSpecialCharacter = (sourceText: string) => {
  const tempDecoder = document.createElement('p');
  return sourceText.replace(/&#?\w+;/g, (match: string) => {
    tempDecoder.innerHTML = match;
    return tempDecoder.textContent || '';
  });
};

export const handleTagHighLight = (content: string, highLightInfoList: any[], decorate: any) => {
  let mContent = handleSpecialCharacter(content || '');
  const con = mContent.split('');
  const pre = decorate?.head ? decorate?.head : '<pre>';
  const end = decorate?.end ? decorate?.end : '</pre>';
  const offset = 2;

  highLightInfoList.forEach((item, i) => {
    // const end = +item.size + start;
    // const offset = i * perOffset;
    // con.splice(e.start, 0, pre);
    // con.splice(Number(e.start) + Number(e.size) + 1, 0, end);
    // 连续高亮时, con的长度会持续发生变化, 因此所有的index处理都要考虑偏移
    const start = +item.start + offset * i;
    const size = +item.size;
    con.splice(start, size, ...[pre, ...con.slice(start, start + size), end]);
  });
  mContent = con.join('');

  return mContent;
};

/** 预设的标签颜色 */
export const TAG_PRESET_COLORS = [
  '#65789B',
  '#0FC6C2',
  '#F7BA1E',
  '#FF7D00',
  '#722ED1',
  '#F5319D',
  '#165DFF',
  '#028685',
  '#1D9ED1',
  '#7262FD',
  '#FF4500',
  '#BB1DC9',
  '#76523B',
  '#4045B2',
  '#8C8C47',
  '#8E283B',
] as const;

/** 随机获取标签预设的颜色 */
export const genRandomPresetColor = () => {
  return TAG_PRESET_COLORS[random(0, TAG_PRESET_COLORS.length - 1)];
};

/**
 * 根据字段类型来进行格式化展示数据
 * @param value 字段值
 * @param type 表单类型
 */
export function formateSchemaTypeValue(
  value: string | string[],
  type: FormUnitType
): string | ReactNode {
  switch (type) {
    // 省市
    case FormUnitTypeEnum.PROVINCE_CITY:
      try {
        const { province, city } = JSON.parse(value as string);
        return [province, city].filter((x) => x).join('/');
      } catch {
        return value;
      }
    // 货币
    case FormUnitTypeEnum.MONEY:
      try {
        return new Currency(value as string, null, { decode: true }).toString();
      } catch {
        return value;
      }
    // 多值文本
    case FormUnitTypeEnum.MULTI_TEXT:
      return React.createElement(
        'div',
        null,
        (value as string[]).map((x: string, index: number) =>
          React.createElement('div', { key: index }, x)
        )
      );
    // 时间
    case FormUnitTypeEnum.DATETIME:
      return moment(value).format(DATE_TIME_FORMATE);
  }
  return value;
}

export function safeParseJson(json?: string) {
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch (error) {
    return {};
  }
}

/**
 * 自定义字段 转换参数 传至后端
 */
export const parseSchemaFilterModels = (obj: FilterSchema, { regionList }: any) => {
  const { type, code, value, id, symbol, appId } = obj;

  // 非有效的字段
  if (!code) return false;

  // 给后台查询的单个参数
  const newObj: {
    archivesSchemaId: string;
    type: string;
    fromValue?: any;
    toValue?: any;
    value?: string | number;
    symbol?: ScreenSymbol;
    currencyId?: string;
    radioValue?: string[];
    checkboxValues?: string;
    textkeywords?: string;
    appId?: string;
    provinceCities?: any;
  } = {
    archivesSchemaId: id,
    type,
  };

  // 运算符
  const defaultTypeList = Object.keys(defaultSymbolConfigs);
  newObj.symbol = symbol;
  if (!symbol && defaultTypeList.length && defaultSymbolConfigs[type]) {
    newObj.symbol = defaultSymbolConfigs[type]?.[0].value;
  }

  // 如果有应用ID
  if (appId) {
    newObj.appId = appId;
  }

  // 根据表单类型做不同的处理
  switch (type) {
    // 货币处理
    case FormUnitTypeEnum.MONEY:
      const { id, amount } = value as CurrencyValue;
      newObj.currencyId = id;
      if (newObj.symbol === 'BETWEEN') {
        newObj.fromValue = amount[0];
        newObj.toValue = amount[1];
      } else {
        newObj.value = amount as string;
      }
      break;
    case FormUnitTypeEnum.RADIO:
      newObj.radioValue = Array.isArray(value) ? value : [value];
      break;
    case FormUnitTypeEnum.CHECKBOX:
      newObj.checkboxValues = value as string;
      break;
    case FormUnitTypeEnum.TEXT:
    case FormUnitTypeEnum.MULTI_TEXT:
      newObj.textkeywords = value as string;
      break;
    case FormUnitTypeEnum.PROVINCE_CITY:
      const provinceCities = [] as any[];
      ((value as any[]) || []).forEach((item: string[]) => {
        const [province, city] = item;

        if (!city) {
          const targetProvince = regionList.find((rItem: any) => rItem.id === province);
          if (targetProvince?.childList?.length) {
            provinceCities.push(
              ...targetProvince.childList.map((cItem: any) => ({ province, city: cItem.id }))
            );
          } else {
            provinceCities.push({ province });
          }
        } else {
          provinceCities.push({ province, city });
        }
      });
      newObj.provinceCities = provinceCities;

      break;

    // 日期
    case FormUnitTypeEnum.DATE:
    case FormUnitTypeEnum.DATETIME:
      newObj.symbol = value.symbol;
      if (newObj.symbol === 'BETWEEN') {
        newObj.fromValue = value.dateString[0];
        newObj.toValue = value.dateString[1];
      } else {
        newObj.value = Array.isArray(value.dateString) ? value.dateString[0] : value.dateString;
      }
      break;

    // 其余类型
    default:
      // 当运算符 = 介于
      if (newObj.symbol === 'BETWEEN' && Array.isArray(value)) {
        newObj.fromValue = value[0];
        newObj.toValue = value[1];
      } else {
        newObj.value = value as string;
      }
      break;
  }

  return newObj;
};

/**
 * @description 下钻到客户列表
 * @param filterSchemas 筛选的字段
 * @param filterGroupIds 筛选的群组id
 * @param filterTagIds 筛选的客户标签id
 */
export const customerListJump = ({
  filterSchemas = [],
  filterGroups,
  filterTags,
}: {
  filterSchemas?: FilterSchema[];
  filterGroups?: { value: string; label: string }[];
  filterTags?: CustomerTagType[];
}) => {
  const _filterSchemas: FilterSchema[] = [
    {
      id: 'customerTag',
      type: 'CUSTOMER_TAG',
      name: '客户标签',
      value: filterTags || [],
      code: '',
      dataType: 'TAG',
    },
  ];

  if (filterGroups?.length) {
    _filterSchemas.push({
      id: 'customerGroup',
      name: '客户群组',
      dataType: 'GROUP',
      type: 'CUSTOMER_GROUP',
      value: filterGroups,
      code: '',
    });
  }
  _filterSchemas.push(...filterSchemas);

  const filterSchemasKey = `filter_schemas_${Date.now()}`;
  sessionStorage.setItem(filterSchemasKey, JSON.stringify(_filterSchemas));
  window.open(`${routerUrl.custoemrList}#${URL_PARAMS_KEY.FILTER_SCHEMAS}=${filterSchemasKey}`);
};

export const SecondsToHoursAndMinutes = (number: number) => {
  if (number <= 60) {
    return number + '秒';
  }
  if (number <= 60 * 60 && number > 60) {
    return Math.ceil(number / 60) + '分钟';
  }
  const houer = String((number / 3600).toFixed(2));
  const minute = String((Number(houer.split('.')[1] || '0') / 100) * 60);
  return Number(minute)
    ? `${parseInt(houer)}小时${parseInt(minute)}分钟`
    : `${parseInt(houer)}小时`;
};

export const filterSchemaListStatus = (list: SchemaModel[], statusList: string) => {
  const _filter = (_list?: SchemaModel[]) => {
    return (
      _list?.filter((i: SchemaModel) => {
        if (i.type === FormUnitTypeEnum.PACKET) {
          i.children = _filter(i.children);
        }
        return statusList.includes[i.status];
      }) || []
    );
  };
  return _filter(list);
};

export const EXCLUDE_TYPES = ['PACKET', 'HYPERLINK', 'PICTURE'];
