import { GridContentProps } from './types';

export function GridStoryContent({ item }: GridContentProps) {
  return (
    <div>
      <div>{item.title}</div>
    </div>
  );
}
