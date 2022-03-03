function testRegex(value, regex) {
  return regex.test(value)
}

export function customRegex(value, option) {
  const options = {
    'phone': {
      regex: /^((09|03|07|08|05)+([0-9]{8}))$/g,
    },
    'fullName': {
      regex: /^[^!@#$%^&*()_+=\-[\]:'";.?<>|\\0-9]+$/g,
    },
    'email': {
      regex: /^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    },
    'otp': {
      regex: /^[0-9]{4}$/g,
    }
  }
  return testRegex(value, options[option].regex)
}

export function validate(className) {
  const validateErrorElement = document.getElementsByClassName(className || 'error-text')
  if (validateErrorElement.length > 0) {
    for (let index = 0; index < validateErrorElement.length; ++index) {
      validateErrorElement[index].setAttribute('style', 'display: block !important')
    }
    return false
  }
  return true
}

export function formatMoney(money) {
  if (money === '') return 0
  return String(money).split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + '.')) + prev
  })
}

export function isFloat(n) {
  const checked = Number(n) === n && n % 1 !== 0
  const numberBehind = Number(n) % 1
  return [checked, numberBehind]
}

export function renderEvaluationStar(value = 5) {
  let html = ''
  const [checked, numberBehind] = isFloat(value)
  const isHalf = numberBehind <= 0.5 && numberBehind !== 0
  const valueChecked = checked ? Math.floor(value) + 1 : value
  for (let i = 1; i <= 5; i++) {
    let star = '<font-awesome-icon icon="star"/>'
    if (i <= valueChecked) {
      if (isHalf && i === valueChecked) star = `<font-awesome-icon icon="star-half" class="star-checked"/>`
      else star = `<font-awesome-icon icon="star" class="star-checked"/>`
    }
    html += star
  }
  return html
}

export function serialize(data = {}) {
  let string = ''
  for (const property in data) {
    string += `${property}=${data[property]}&`
  }
  return string.slice(0, -1);
}

export function authHeader(token = null) {
  let headers = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers = {...headers, 'Authorization': 'Bearer ' + token}
  }
  return headers
}

export function handleDiffPostedDate(date = '') {
  const now = new Date()
  const datePost = date === '' ? new Date() : new Date(date)
  let delta = Math.abs(now - datePost) / 1000;
  const r = {};
  const s = {
    'năm': 31536000,
    'tháng': 2592000,
    'tuần': 604800,
    'ngày': 86400,
    'tiếng': 3600,
    'phút': 60,
    'giây': 1
  };
  let results = 'vài giây trước'

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(delta / s[key]);
    delta -= r[key] * s[key];
  });

  for (const key in r) {
    if (r[key] > 0) {
      results = `${r[key]} ${key} trước`
      break
    }
  }

  return results
}

export function convertHtmlToString(content = "") {
  const regex = /(?:\r\n|\r|\n)|(<br\s*\/?>)|(\\n)/mg
  let arr = [];
  if (content) {
    content = content.replace(regex, "$")
    arr = content.split("$")
  }
  return arr
}

export function scrollToTop(duration) {
  // cancel if already on top
  if (document.scrollingElement.scrollTop === 0) return;

  const cosParameter = document.scrollingElement.scrollTop / 2;
  let scrollCount = 0;
  let oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI) {
        // eslint-disable-next-line no-return-assign
        return document.scrollingElement.scrollTop = 0;
      }
      document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

export function convertPhoneNumber(phone) {
  let result = ''
  if (phone) {
    result = phone.slice(0, 2) + '******' + phone.substr(phone.length - 2)
  }
  return result
}

export function fullUrl(path) {
  return process.env.MEDIA_URL + path
}

export function handleLongString(text = '', maxText = 30) {
  const MAX_LENGTH = maxText
  if (text.length <= MAX_LENGTH) return text
  else return text.slice(0, MAX_LENGTH) + '...'
}

