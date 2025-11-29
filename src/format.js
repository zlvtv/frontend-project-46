export const stylish = (data, depth = 1) => {
  const iter = (data) => {
    const indent = ' '.repeat(4);
    const currentIndent = indent.repeat(depth).slice(0, -2);
    const lines = data.map(([type, key, value]) => {
      const lineWithSign = (sym) => (Array.isArray(value)) ? `${currentIndent}${sym} ${key}: ${stylish(value, depth + 1)}` : `${currentIndent}${sym} ${key}: ${value}`;
      return lineWithSign(type);
    }); 
    return `{\n${lines.join('\n')}\n${indent.repeat(depth - 1)}}`; 
  };
  return iter(data);
}

export default stylish;