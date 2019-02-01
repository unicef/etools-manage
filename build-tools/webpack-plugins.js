const path = require('path');
const { NamedChunksPlugin } = require('webpack');

// This plugin renames all the outputted files to the name of the chunk
// as set by "webpackChunkName".
module.exports.NamedChunksPlugin = new NamedChunksPlugin( // eslint-disable-line
    chunk => {
        if (chunk.name) {
            return chunk.name;
        }

        const regex = /src\/pages/;

        for (const m of chunk._modules) {
            if (regex.test(m.context)) {
                return path
                    .relative(`${__dirname}/src/pages`, m.context)
                    .split('/')
                    .slice(1)
                    .join('_');
            }
        }

        return null;
    }
);
