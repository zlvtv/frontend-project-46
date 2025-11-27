export const format = (data) => {
  const lines = data.map(([type, key, value]) => {
    const indent = '  ';
    switch(type) {
    case '-': return `${indent}- ${key}: ${value}`;
    case '+': return `${indent}+ ${key}: ${value}`;
    default: return `${indent}  ${key}: ${value}`;
    }
  });
    
  return `{\n${lines.join('\n')}\n}`;
};

export default format;