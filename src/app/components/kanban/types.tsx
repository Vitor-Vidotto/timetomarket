// types.ts (ou dentro do próprio arquivo se preferir)
export interface KanbanItem {
    id: string;
    title: string;
    [key: string]: any;
  }
  
  export interface KanbanColumn {
    id: string;
    title: string;
    items: KanbanItem[];
  }
  