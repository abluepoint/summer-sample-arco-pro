import { PlaygroundMilkdown, MilkdownRef } from './playground-editor';
import { Card, Typography } from '@arco-design/web-react';
import { useCallback, useRef } from 'react';
import { FeatureToggleProvider } from './playground-editor/FeatureToggleProvider';
import { InspectorProvider } from './playground-editor/InspectorProvider';
import { ProseStateProvider } from './playground-editor/ProseStateProvider';
import { ShareProvider } from './playground-editor/ShareProvider';
import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { compose } from './utils/compose';

const { Title } = Typography;

const Provider = compose(
  FeatureToggleProvider,
  MilkdownProvider,
  ProsemirrorAdapterProvider,
  ProseStateProvider,
  ShareProvider,
  InspectorProvider
);

export default function MilkDownEditorPage() {
  const lockCodemirror = useRef(false);
  const milkdownRef = useRef<MilkdownRef>(null);

  const onMilkdownChange = useCallback((markdown: string) => {
    const lock = lockCodemirror.current;
    if (lock) return;
    console.log('markdown', markdown);
  }, []);

  const content = `# Milkdown
  ![greeting bear](/polar.jpeg)

> Milkdown is a WYSIWYG markdown editor framework.
>
> 🍼 Here is the [repo](https://github.com/Milkdown/milkdown) (right click to open link). \
> We ~~only support commonmark~~. GFM is also supported!

You can check the output markdown text in **two columns editing**.

* Features
  * [x] 📝 **WYSIWYG Markdown** - Write markdown in an elegant way
  * [x] 🎨 **Themable** - Theme can be shared and used with npm packages
  * [x] 🎮 **Hackable** - Support your awesome idea by plugin
  * [x] 🦾 **Reliable** - Built on top of [prosemirror](https://prosemirror.net/) and [remark](https://github.com/remarkjs/remark)
  * [x] ⚡ **Slash & Tooltip** - Write fast for everyone, driven by plugin
  * [x] 🧮 **Math** - LaTeX math equations support, driven by plugin
  * [x] 📊 **Table** - Table support with fluent ui, driven by plugin
  * [x] 📰 **Diagram** - Diagram support with [mermaid](https://mermaid-js.github.io/mermaid/#/), driven by plugin
  * [x] 🍻 **Collaborate** - Shared editing support with [yjs](https://docs.yjs.dev/), driven by plugin
  * [x] 💾 **Clipboard** - Support copy and paste markdown, driven by plugin
  * [x] 👍 **Emoji** - Support emoji shortcut and picker, driven by plugin
* Made by
  * Programmer: [Mirone](https://github.com/Milkdown)
  * Designer: [Mirone](https://github.com/Milkdown)
`;

  return (
    <Card>
      <Title heading={6}>{'Milkdown Editor'}</Title>
      <Provider>
        <div>
          <PlaygroundMilkdown
            content={content}
            milkdownRef={milkdownRef}
            onChange={onMilkdownChange}
          ></PlaygroundMilkdown>
        </div>
      </Provider>
    </Card>
  );
}
