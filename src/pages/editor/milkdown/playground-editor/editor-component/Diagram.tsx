import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Tabs } from '@arco-design/web-react';
import clsx from 'clsx';
import mermaid from 'mermaid';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TabPane = Tabs.TabPane;

export const Diagram: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const id = node.attrs.identity;
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('preview');
  const codePanel = useRef<HTMLDivElement>(null);
  const darkMode = false;
  const rendering = useRef(false);

  const renderMermaid = useCallback(async () => {
    const container = codePanel.current;
    if (!container) return;

    if (code.length === 0) return;
    if (rendering.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: darkMode ? 'dark' : 'default',
    });
    rendering.current = true;
    const { svg, bindFunctions } = await mermaid.render(id, code);
    rendering.current = false;
    container.innerHTML = svg;
    bindFunctions?.(container);
  }, [code, darkMode, id]);

  useEffect(() => {
    requestAnimationFrame(() => {
      renderMermaid();
    });
  }, [renderMermaid, value]);

  return (
    <Tabs
      defaultActiveTab="preview"
      className={selected ? 'ring-2 ring-offset-2' : ''}
      onChange={(value) => {
        setValue(value);
      }}
    >
      <TabPane key="preview" title="preview">
        <div
          ref={codePanel}
          className={clsx(
            'flex justify-center py-3',
            value !== 'preview' ? 'hidden' : ''
          )}
        />
      </TabPane>
      <TabPane
        key="source"
        title="source"
        className="border-b border-gray-200 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400"
      >
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
        ></button>
      </TabPane>
    </Tabs>
  );
};
