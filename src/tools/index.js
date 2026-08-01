// Registro e implementação das ferramentas ativas do dev-tool-box (Vanilla JS)

import { mdTools } from './mdReader.js';
import { htmlToMdTool } from './htmlToMdTool.js';
import { capsLockFixerTool } from './capsLockFixer.js';
import { validatorCpfCnpj } from './validatorCpfCnpj.js';
import { extractorColumns } from './extractorColumns.js';
import { kebabCase } from './kebabCase.js';
import { generateTableSql } from './generateTableSql.js'
import { htmlReplaceEntities } from './htmlReplaceEntities.js'
import { linesToList } from './linesToList.js'
import { sqlExtractor } from './sqlExtractor.js'
import { removeBlankLines } from './removeBlankLines.js'

export const tools = [
    validatorCpfCnpj,
    extractorColumns,
    kebabCase,
    generateTableSql,
    htmlReplaceEntities,
    linesToList,
    sqlExtractor,
   ...mdTools,
   htmlToMdTool,
   capsLockFixerTool,
   removeBlankLines,
];

