// Retained entry point. Native exports no longer depend on a browser TaskSpace.
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
require('./export-art-local.cjs');
