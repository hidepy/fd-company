// utils.js
import * as _ from 'lodash';

export default class Utils {
  // プリミティブ型かどうか判定する
  static isPrimitive(val) {
    return _.includes(['string',  'number', 'boolean'], typeof val);
  }

  // キーを変換する
  static localizeKeys(object, toStyle = _.camelCase) {

    function _localize(obj) {
      // プリミティブ型なら変換しない
      if (Utils.isPrimitive(obj) || obj === null) {
        return obj;
      }

      // 配列の中身がオブジェクトの場合のみキーを変換する
      if (Array.isArray(obj)) {
        const dest = [];
        obj.forEach(a => {
          if (Utils.isPrimitive(a) || a === null)  return dest.push(a);
          if (typeof a === 'object') return dest.push(_localize(a));
        });
        return dest;
      }

      // オブジェクトのキーを変換する
      if (typeof obj === 'object') {
        const dest = {};
        Object.keys(obj).forEach(a => {
          if (Utils.isPrimitive(obj[a]) || obj[a] === null) {
            return dest[toStyle(a)] = obj[a];
          }

          if (typeof obj[a] === 'object') {
            return dest[toStyle(a)] = _localize(obj[a]);
          }
        });

        return dest;
      }
    }

    return _localize(object);
  }
}
