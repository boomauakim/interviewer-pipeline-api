export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type UserItem = {
  id: string;
  name: string;
  email: string;
};

export type ListAllTaskItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  created_by: UserItem;
};

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  is_archived: boolean;
  created_at: Date;
  created_by: UserItem;
};

export type ListAllCommentItem = {
  id: string;
  comment: string;
  created_at: Date;
  created_by: UserItem;
};

export type ListAllChangelogsItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  created_by: UserItem;
};
