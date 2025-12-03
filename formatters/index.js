import stylish from './stylish.js'
import plain from './plain.js'

export const getFormatter = (formatName) => {
    switch (formatName) {
        case 'stylish':
            return stylish;
        case 'plain':
            return plain;
        default:
            return stylish;
    };
}; 

export default getFormatter;