import fs from 'fs';
import path from 'path';
import process from 'process'

export const parse = (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath)
    const file = fs.readFileSync(absolutePath, 'utf8')
    return JSON.parse(file)
}

export default parse