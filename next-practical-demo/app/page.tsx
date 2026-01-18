// app/page.tsx
import { db } from '@/lib/db';
import { addTask, deleteTask, toggleTask } from './actions';

export default async function Home() {
  // サーバーコンポーネント内で直接DBアクセス (API不要)
  const tasks = await db.task.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
          Codespaces Next.js Demo
        </h1>

        {/* 新規作成フォーム */}
        <form action={addTask} className="flex gap-2 mb-8">
          <input
            type="text"
            name="title"
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            追加
          </button>
        </form>

        {/* タスクリスト */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                task.isDone ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-800 border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* 完了切り替えフォーム */}
                {/* bindを使って引数を埋め込むのがモダンな手法 */}
                <form action={toggleTask.bind(null, task.id, task.isDone)}>
                  <button
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      task.isDone
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {task.isDone && <span>✓</span>}
                  </button>
                </form>
                
                <span className={task.isDone ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </span>
              </div>

              {/* 削除フォーム */}
              <form action={deleteTask.bind(null, task.id)}>
                <button
                  type="submit"
                  className="text-gray-500 hover:text-red-400 transition-colors text-sm"
                >
                  削除
                </button>
              </form>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-10">タスクがありません 🎉</p>
          )}
        </div>
      </div>
    </main>
  );
}