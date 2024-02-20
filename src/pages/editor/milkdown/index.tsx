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
import demo from './demo.md';

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

  const content = demo;

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
