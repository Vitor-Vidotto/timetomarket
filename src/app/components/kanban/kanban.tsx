import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Column } from './column';
import { initialColumns } from './data/initialData';

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      // Soltou fora da área válida, cancela e deixa o card no lugar
      return;
    }

    if (active.id === over.id) {
      // Soltou no mesmo lugar, não faz nada
      return;
    }

    const [fromColumnId, fromItemId] = active.id.split(':');
    const [toColumnId, toItemId] = over.id.split(':');

    if (!columns[toColumnId]) return;

    const fromItems = [...columns[fromColumnId].items];
    const toItems = [...columns[toColumnId].items];

    const fromIndex = fromItems.findIndex(item => item.id === fromItemId);
    const toIndex = toItems.findIndex(item => item.id === toItemId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movedItem] = fromItems.splice(fromIndex, 1);

    if (fromColumnId === toColumnId) {
      // Reordena dentro da mesma coluna
      const newItems = arrayMove(fromItems, fromIndex, toIndex);
      setColumns({
        ...columns,
        [fromColumnId]: {
          ...columns[fromColumnId],
          items: newItems,
        },
      });
    } else {
      // Move item entre colunas
      toItems.splice(toIndex, 0, movedItem);
      setColumns({
        ...columns,
        [fromColumnId]: {
          ...columns[fromColumnId],
          items: fromItems,
        },
        [toColumnId]: {
          ...columns[toColumnId],
          items: toItems,
        },
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', padding: 20 }}>
        {Object.values(columns).map(column => (
          <SortableContext
            key={column.id}
            items={column.items.map(item => `${column.id}:${item.id}`)}
            strategy={verticalListSortingStrategy}
          >
            <Column column={column} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
