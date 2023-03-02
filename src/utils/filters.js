import numeral from 'numeral';
import moment from 'moment';

export const fmt = (v, m = 2, optional = false, needValue = false, intFmt = false) => {
  if (v == null || v === '') {
    return '';
  }
  if (m > 0) {
    const mm = m + 1;
    const str = ''.padStart(mm, '0');
    let format;
    if (intFmt) {
      format = optional ? `0,0.[${str}]` : `0,0.${str}`;
    } else {
      format = optional ? `0.[${str}]` : `0.${str}`;
    }
    let nv = Number(v);
    nv = nv < 0.000001 && nv > -0.0000001 ? 0 : v;
    let vStr = numeral(nv).format(format);
    const re = new RegExp(`.+\\.[0-9]{${mm}}$`);
    if (re.test(vStr)) {
      vStr = vStr.substr(0, vStr.length - 1);
    }
    return needValue ? numeral(vStr).value() : vStr;
  }

  if (v > 0) {
    return numeral(Math.floor(+v)).format('0,0');
  }
  return numeral(Math.ceil(+v)).format('0,0');
};

export const fmtUSD = (v) => {
  if (v == null || v === '') {
    return '';
  }
  if (v > 1000000) {
    return numeral(Math.floor(+v)).format('0.00a');
  }
  return numeral(Math.ceil(+v)).format('0a');
};

export const retain = (num, decimal) => {
  num = num.toString();
  const index = num.indexOf('.');
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
};

export const dateFmt = (v, format = 'YYYY-MM-DD') => {
  if (!v) {
    return '';
  }
  return moment(v).format(format);
};

export const strShort = (v, m = 4, n = 2) => {
  if (!v) {
    return '';
  }
  if (v.length <= m + n) {
    return v;
  }
  return `${v.slice(0, m)}..${n > 0 ? v.slice(-n) : ''}`;
};

export const percent = (v, m = 2) => {
  if (v == null || v === '') {
    return '';
  }

  const nv = Number(v) * 100;

  if (nv < 0.000001 && nv > -0.000001) {
    return '0%';
  }

  if (nv < 0.01 && nv > -0.01 && nv !== 0) {
    return fmt(nv, m, false, false, false) + '%';
  }

  return fmt(nv, m, true, false, false) + '%';
};

export const rated = (v) => {
  if (v == null || v === '') {
    return '';
  }
  if (v < 0.000001) {
    const st = numeral(v).format('0.00000e+0');
    const arr = st.split('e');
    const nv = fmt(arr[0], 3);
    return nv + 'e' + arr[1];
  }
  return fmt(v, 6, true);
};

export const duration = (num) => {
  if (!num) {
    return '--';
  }
  const dn = Math.floor(num / (3600 * 1000 * 24));
  num = num % (3600 * 1000 * 24);
  const hn = Math.floor(num / (3600 * 1000));
  num = num % (3600 * 1000);
  const mn = Math.floor(num / (60 * 1000));
  const dStr = dn ? `${dn}d` : '';
  const hStr = hn ? `${hn}h` : '';
  const mStr = mn ? `${mn}m` : '';
  const arr = [dStr, hStr, mStr];
  const duration = arr.filter((item) => item).join(' ');
  if (duration) {
    return duration;
  } else {
    return '--';
  }
};
