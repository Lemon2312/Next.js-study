// app/actions.ts
'use server'; // 👈 これが重要！このファイル内の関数はすべてサーバーで実行されます

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// タスク追加
export async function addTask(formData: FormData) {
  const title = formData.get('title') as string;
  
  if (!title || title.trim() === '') return;

  await db.task.create({
    data: { title },
  });

  // データの更新を画面に反映させる
  revalidatePath('/');
}

// タスク完了切り替え
export async function toggleTask(id: String, isDone: boolean) {
  await db.task.update({
    where: { id: id as string },
    data: { isDone: !isDone },
  });
  revalidatePath('/');
}

// タスク削除
export async function deleteTask(id: String) {
  await db.task.delete({
    where: { id: id as string },
  });
  revalidatePath('/');
}