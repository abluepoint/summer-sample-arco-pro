import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Checkbox, Space } from '@arco-design/web-react';
import type { FC } from 'react';

export const ListItem: FC = () => {
  const { contentRef, node, setAttrs, selected } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === 'bullet';
  return (
    <li
      className={[
        'flex-column flex items-start gap-2',
        selected ? 'ProseMirror-selectednode' : '',
      ].join(' ')}
    >
      <Space>
        {checked != null ? (
          <Checkbox
            checked={checked}
            onChange={() => setAttrs({ checked: !checked })}
          ></Checkbox>
        ) : isBullet ? (
          <span className="h-2 w-2 rounded-full bg-nord8 dark:bg-nord9" />
        ) : (
          <span className="text-nord8">{attrs?.label}</span>
        )}
      </Space>
      <div className="min-w-0" ref={contentRef} />
    </li>
  );
};
