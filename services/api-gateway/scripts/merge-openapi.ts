import path from 'path';
import { writeCombinedSpec } from '../src/openapi/openapi-merge';

async function run() {
  const baseDir = path.resolve(__dirname, '..');
  const outputPath = await writeCombinedSpec(baseDir);
  console.log(`Merged OpenAPI spec written to ${outputPath}`);
}

void run();
