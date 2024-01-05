import { useNodeViewContext } from '@prosemirror-adapter/react';
import type { FC } from 'react';

export const ListItem: FC = () => {
  const { contentRef, node, setAttrs, selected } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === 'bullet';
  return (
    <li
      className={['list-item', selected ? 'ProseMirror-selectednode' : ''].join(
        ' '
      )}
    >
      <span className="list-item-main-span">
        {checked != null ? (
          <input
            className="form-checkbox rounded"
            onChange={() => setAttrs({ checked: !checked })}
            type="checkbox"
            checked={checked}
          />
        ) : isBullet ? (
          <span className="list-item-span dark:bg-nord9" />
        ) : (
          <span className="list-item-text">{attrs?.label}</span>
        )}
      </span>
      <div className="list-item-content" ref={contentRef} />
    </li>
  );
};
