import { katexOptionsCtx } from '@milkdown/plugin-math';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Tabs } from '@arco-design/web-react';
import katex from 'katex';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

const TabPane = Tabs.TabPane;

export const MathBlock: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const codePanel = useRef<HTMLDivElement>(null);
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('preview');
  const [loading, getEditor] = useInstance();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!codePanel.current || value !== 'preview' || loading) return;

      try {
        katex.render(
          code,
          codePanel.current,
          getEditor().ctx.get(katexOptionsCtx.key)
        );
      } catch {}
    });
  }, [code, getEditor, loading, value]);

  return (
    <Tabs
      defaultActiveTab="preview"
      className={selected ? 'ring-2 ring-offset-2' : ''}
      onChange={(value) => {
        setValue(value);
      }}
    >
      <TabPane
        key="preview"
        title="preview"
        className="border-b border-gray-200 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
      >
        <div className="py-3 text-center" ref={codePanel} />
      </TabPane>
      <TabPane
        key="source"
        title="source"
        className="border-b border-gray-200 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
      ></TabPane>
      <textarea
        className="block h-48 w-full bg-slate-800 font-mono text-gray-50"
        ref={codeInput}
        defaultValue={code}
      />
      <button
        className="absolute right-0 bottom-full mb-1 inline-flex items-center justify-center rounded border border-gray-600 bg-nord8 px-6 py-2 text-base font-medium leading-6 text-gray-50 shadow-sm hover:bg-blue-200 focus:ring-2 focus:ring-offset-2 dark:bg-nord9"
        onClick={() => {
          setAttrs({ value: codeInput.current?.value || '' });
          setValue('preview');
        }}
      >
        OK
      </button>
    </Tabs>
  );
};
