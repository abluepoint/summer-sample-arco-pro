import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Select, Button, Space } from '@arco-design/web-react';
import clsx from 'clsx';
import type { FC } from 'react';
import { axisBottom } from 'd3';

const Option = Select.Option;

const langs = [
  'java',
  'text',
  'typescript',
  'javascript',
  'html',
  'css',
  'json',
  'markdown',
];

export const CodeBlock: FC = () => {
  const { contentRef, selected, node, setAttrs } = useNodeViewContext();
  return (
    <div className={clsx(selected ? 'ProseMirror-selectednode' : '')}>
      <Space style={{ paddingBottom: 5 }}>
        <Select
          value={node.attrs.language || 'text'}
          style={{ width: 154 }}
          onChange={(value) => {
            setAttrs({ language: value });
          }}
        >
          {langs.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        {/* <select
          className="!focus:shadow-none cursor-pointer rounded !border-0 bg-white shadow-sm focus:ring-2 focus:ring-offset-2 dark:bg-black"
          value={node.attrs.language || 'text'}
          onChange={(e) => {
            setAttrs({ language: e.target.value });
          }}
        >
          {langs.map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select> */}

        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(node.textContent);
          }}
        >
          Copy
        </Button>
      </Space>
      <pre spellCheck={false}>
        <code ref={contentRef} />
      </pre>
    </div>
  );
};
