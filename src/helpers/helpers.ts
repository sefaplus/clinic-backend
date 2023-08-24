export function convertStringTimeToSeconds(str: string) {
  const identifier = str.replace(/[0-9]/g, '');
  const num = parseInt(str);
  let multiplier: number;

  switch (identifier) {
    case 's':
    case 'seconds':
    case 'sec':
      multiplier = 1;
      break;
    case 'm':
    case 'min':
    case 'minute':
      multiplier = 60;
      break;
    case 'hr':
    case 'h':
    case 'hour':
    case 'hours':
      multiplier = 3600;
      break;
  }

  return num * multiplier;
}
