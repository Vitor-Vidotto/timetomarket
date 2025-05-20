import React from 'react';
import { Card } from './card';
import type { KanbanColumn } from './types';

interface ColumnProps {
  column: KanbanColumn;
}

export function Column({ column }: ColumnProps) {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        padding: 16,
        width: 250,
        minHeight: 450,   // garante altura mínima da coluna
        marginRight: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3>{column.title}</h3>
      <div
        style={{
          flexGrow: 1,
          minHeight: 150,  // altura mínima para o container dos cards
          border: '2px dashed #ddd', // opcional: borda para visualizar área droppable
          padding: 8,
          borderRadius: 4,
          backgroundColor: column.items.length === 0 ? '#fafafa' : 'transparent',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {column.items.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic', marginTop: 'auto', marginBottom: 'auto', textAlign: 'center' }}>
            Nenhum item
          </p>
        ) : (
          column.items.map(item => (
            <Card key={item.id} item={item} columnId={column.id} />
          ))
        )}
      </div>
    </div>
  );
}
