import { Button, Space } from '@arco-design/web-react';
import {
  IconUndo,
  IconRedo,
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnorderedList,
  IconOrderedList,
  IconNav,
  IconQuote,
} from '@arco-design/web-react/icon';
import type { CmdKey } from '@milkdown/core';
import { editorViewCtx, parserCtx } from '@milkdown/core';
import { redoCommand, undoCommand } from '@milkdown/plugin-history';
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import {
  insertTableCommand,
  toggleStrikethroughCommand,
} from '@milkdown/preset-gfm';
import { Slice } from '@milkdown/prose/model';
import { Milkdown as Editor } from '@milkdown/react';
import { callCommand } from '@milkdown/utils';
import clsx from 'clsx';
import type { FC, RefObject } from 'react';
import { useImperativeHandle } from 'react';
import { usePlayground } from './usePlayground';

interface MilkdownProps {
  content: string;
  onChange: (markdown: string) => void;
  milkdownRef: RefObject<MilkdownRef>;
}

export interface MilkdownRef {
  update: (markdown: string) => void;
}

export const PlaygroundMilkdown: FC<MilkdownProps> = ({
  content,
  onChange,
  milkdownRef,
}) => {
  const { loading, get } = usePlayground(content, onChange);

  useImperativeHandle(milkdownRef, () => ({
    update: (markdown: string) => {
      if (loading) return;
      const editor = get();
      editor?.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(markdown);
        if (!doc) return;
        const state = view.state;
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0)
          )
        );
      });
    },
  }));

  function call<T>(command: CmdKey<T>, payload?: T) {
    return get()?.action(callCommand(command, payload));
  }

  return (
    <div className="relative h-full pt-10">
      <div className="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
        <Space size="mini">
          <Button onClick={() => call(undoCommand.key)}>
            <IconUndo />
          </Button>
          <Button onClick={() => call(redoCommand.key)}>
            <IconRedo />
          </Button>
          <Button onClick={() => call(toggleStrongCommand.key)}>
            <IconBold />
          </Button>
          <Button onClick={() => call(toggleEmphasisCommand.key)}>
            <IconItalic />
          </Button>
          <Button onClick={() => call(toggleStrikethroughCommand.key)}>
            <IconStrikethrough />
          </Button>
          <Button onClick={() => call(insertTableCommand.key)}>
            <IconNav />
          </Button>
          <Button onClick={() => call(wrapInBulletListCommand.key)}>
            <IconUnorderedList />
          </Button>
          <Button onClick={() => call(wrapInOrderedListCommand.key)}>
            <IconOrderedList />
          </Button>
          <Button onClick={() => call(wrapInBlockquoteCommand.key)}>
            <IconQuote />
          </Button>
        </Space>

        <div />
      </div>
      <div className="h-full overflow-auto overscroll-none">
        <Editor />
      </div>
    </div>
  );
};
