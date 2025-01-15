const numberToWords = (num) => {
  const a = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];
  const b = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];
  const c = [
    '', 'thousand', 'million', 'billion', 'trillion'
  ];

  if (num === 0) return 'zero';

  let n = num.toString();
  let p = 0;
  let s = '';

  while (n.length > 0) {
    let chunk = n.length >= 3 ? n.slice(-3) : n;
    n = n.slice(0, -3);

    let str = '';
    let n1 = parseInt(chunk[0], 10);
    let n2 = parseInt(chunk[1], 10);
    let n3 = parseInt(chunk[2], 10);

    if (n1 > 0) {
      str += a[n1] + '  ';
    }

    // Corrected handling of teens
    if (n2 === 1) {
      str += a[parseInt(chunk.slice(1), 10)]; 
    } else {
      if (n2 > 1) {
        str += b[n2] + ' ';
      }
      if (n3 > 0) {
        str += a[n3];
      }
    }

    if (str.trim()) {
      s = str + (c[p] ? ' ' + c[p] : '') + ' ' + s;
    }
    p++;
  }

  return s.trim().replace(/\s+/g, ' ').replace('undefined', '').trim();
};

export default numberToWords;