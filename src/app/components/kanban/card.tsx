import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  item: { id: string; content: string };
  columnId: string;
}

export function Card({ item, columnId }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${columnId}:${item.id}`,
  });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: '8px',
    margin: '4px 0',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {item.content}
    </div>
  );
}
