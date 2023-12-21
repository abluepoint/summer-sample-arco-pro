import React, { useState } from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { Card, Typography } from '@arco-design/web-react';

import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { prism } from '@milkdown/plugin-prism';
import { math } from '@milkdown/plugin-math';
import { slashFactory } from '@milkdown/plugin-slash';
import { emoji } from '@milkdown/plugin-emoji';
import { diagram } from '@milkdown/plugin-diagram';
import { indent } from '@milkdown/plugin-indent';
// import { upload } from '@milkdown/plugin-upload';
// import { block } from '@milkdown/plugin-block';

const { Title } = Typography;

const slash = slashFactory('my-slash');

// import { tooltipFactory } from '@milkdown/plugin-tooltip';

// const tooltip = tooltipFactory('my-tooltip');

// import { createBlockPluginView } from './block-sample'

import { SlashProvider } from '@milkdown/plugin-slash';

function slashPluginView(view) {
  const content = document.createElement('div');

  const provider = new SlashProvider({
    content,
  });

  return {
    update: (updatedView, prevState) => {
      provider.update(updatedView, prevState);
    },
    destroy: () => {
      provider.destroy();
      content.remove();
    },
  };
}

const MilkdownEditor: React.FC = () => {
  useEditor(
    (root) =>
      Editor.make()
        .config(nord)
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(slash.key, {
            view: slashPluginView,
          });
          // ctx.set(block.key, {
          //   view: createBlockPluginView(ctx)
          // })
        })
        .use(commonmark)
        .use(gfm)
        .use(history)
        .use(clipboard)
        .use(cursor)
        .use(prism)
        .use(math)
        .use(slash)
        .use(emoji)
        .use(diagram)
        .use(indent)
    // .use(block)
  );

  return <Milkdown />;
};

export default function () {
  const [loading, setLoading] = useState(true);
  return (
    <Card>
      <Title heading={6}>{'你好'}</Title>
      <MilkdownProvider>
        <MilkdownEditor />
      </MilkdownProvider>
    </Card>
  );
}
