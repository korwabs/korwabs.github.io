const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repoRoot, 'src/components/ui/chatDemoState.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
});

const moduleExports = {};
const sandbox = {
  exports: moduleExports,
  module: { exports: moduleExports },
  require,
};
vm.runInNewContext(compiled.outputText, sandbox, { filename: sourcePath });
const { demoConversation, appendNextMessage } = sandbox.module.exports;

assert.equal(demoConversation.length, 4, 'demo conversation fixture should contain four messages');

const almostComplete = demoConversation.slice(0, demoConversation.length - 1);
const complete = appendNextMessage(almostComplete, demoConversation);
assert.deepEqual(complete, demoConversation, 'adds the final valid message');

const afterDelayedDuplicateTimeout = appendNextMessage(complete, demoConversation);
assert.deepEqual(
  afterDelayedDuplicateTimeout,
  complete,
  'does not append undefined when a delayed duplicate timeout fires after the conversation is complete',
);
assert.ok(
  afterDelayedDuplicateTimeout.every((message) => message && typeof message.role === 'string'),
  'messages remain render-safe and all have a role',
);

const tooLong = [...demoConversation, undefined];
assert.deepEqual(
  appendNextMessage(tooLong, demoConversation),
  tooLong,
  'leaves already-overflowed state unchanged instead of adding another invalid entry',
);

console.log('ChatDemo state regression tests passed');
