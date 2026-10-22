import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPosts, deletePost } from '../api/PostApi'
import { getCommentsByPostId } from '../api/CommentApi'
import Pagination from '../components/Pagination'
import TEMP_CATEGORIES from '../data/categories'
import cover1 from '../assets/cover-1.svg'
import cover2 from '../assets/cover-2.svg'
import cover3 from '../assets/cover-3.svg'
import cover4 from '../assets/cover-4.svg'
import cover5 from '../assets/cover-5.svg'
import cover6 from '../assets/cover-6.svg'

const covers = [cover1, cover2, cover3, cover4, cover5, cover6]
const coverFor = (p) => covers[Math.abs(Number(p.postId) || 0) % covers.length]
const COLORS = ['#059669', '#0ea5e9', '#f59e0b', '#8b5cf6', '#ec4899', '#a8a29e']

const ICONS = {
  home: 'M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5',
  plus: 'M12 5v14M5 12h14',
  chat: 'M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 7.5h.01',
  text: 'M4 6h16M4 12h16M4 18h10',
  menu: 'M4 6h16M4 12h16M4 18h16',
}
function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  )
}

function getCategoryName(p) {
  const direct =
    p.categoryDto?.categoryTitle || p.category?.categoryTitle || p.category?.title ||
    p.category?.name || p.categoryTitle || p.categoryName ||
    (typeof p.category === 'string' ? p.category : '')
  if (direct) return direct
  const id = p.categoryId ?? p.categoryDto?.categoryId ?? p.category?.categoryId ?? p.category?.id
  if (id != null && Array.isArray(TEMP_CATEGORIES)) {
    const c = TEMP_CATEGORIES.find((x) => String(x.categoryId ?? x.id) === String(id))
    if (c) return c.categoryTitle || c.title || c.name || ''
  }
  return ''
}

function flattenComments(list, post, depth = 0, out = []) {
  list.forEach((c) => {
    out.push({
      id: c.id, content: c.content,
      author: c.user?.name || c.user?.userName || 'User',
      postId: post.postId, postTitle: post.title, isReply: depth > 0,
    })
    if (c.replies?.length) flattenComments(c.replies, post, depth + 1, out)
  })
  return out
}

const PAGE_SIZE = 5
const wordCount = (p) => (p.content ? p.content.trim().split(/\s+/).length : 0)

/* ---------- Layout ---------- */
function Sidebar({ open, onClose, token, name, onLogin, onLogout }) {
  const items = [
    { label: 'Dashboard', to: '/', icon: 'home' },
    { label: 'All posts', to: '/posts', icon: 'doc' },
    { label: 'New post', to: '/create-post', icon: 'plus' },
  ]
  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-emerald-950 p-4 text-emerald-100 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-3 py-4 text-xl font-semibold tracking-tight text-white">My Blog</div>
        <nav className="mt-4 space-y-1">
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                it.to === '/' ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <Icon name={it.icon} />
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-emerald-900 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 font-semibold text-white">
              {token ? name[0]?.toUpperCase() : '?'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{token ? name : 'Guest'}</p>
              <p className="text-xs text-emerald-200/70">{token ? 'Signed in' : 'Not signed in'}</p>
            </div>
          </div>
          <button
            onClick={token ? onLogout : onLogin}
            className="mt-3 w-full rounded-lg bg-emerald-800 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {token ? 'Log out' : 'Log in'}
          </button>
        </div>
      </aside>
    </>
  )
}

/* ---------- Data widgets ---------- */
function StatCard({ label, value, hint, icon, tone }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone}`}><Icon name={icon} className="h-5 w-5" /></span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  )
}

function CategoryDonut({ posts }) {
  const counts = {}
  posts.forEach((p) => {
    const n = getCategoryName(p) || 'Uncategorized'
    counts[n] = (counts[n] || 0) + 1
  })
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const total = rows.reduce((s, r) => s + r[1], 0)

  const segs = []
  let acc = 0
  for (const [name, n] of rows) {
    const pct = (n / total) * 100
    segs.push({ name, n, pct, offset: 25 - acc })
    acc += pct
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Posts by category</h2>
      {total === 0 ? (
        <p className="mt-6 text-sm text-slate-500">Publish a post to see categories here.</p>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-40 w-40 shrink-0">
            <svg viewBox="0 0 42 42" className="h-full w-full">
              <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="5" />
              {segs.map((s, i) => (
                <circle key={s.name} cx="21" cy="21" r="15.9155" fill="none" stroke={COLORS[i]} strokeWidth="5"
                  strokeDasharray={`${s.pct} ${100 - s.pct}`} strokeDashoffset={s.offset} />
              ))}
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div><p className="text-2xl font-semibold">{total}</p><p className="text-xs text-slate-500">posts</p></div>
            </div>
          </div>
          <ul className="w-full space-y-2.5">
            {segs.map((s, i) => (
              <li key={s.name} className="flex items-center gap-3 text-sm">
                <span className="h-3 w-3 rounded-full" style={{ background: COLORS[i] }} />
                <span className="flex-1 truncate text-slate-700">{s.name}</span>
                <span className="font-medium text-slate-900">{s.n}</span>
                <span className="w-10 text-right text-slate-500">{Math.round(s.pct)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function MostDiscussed({ posts, comments, loading }) {
  const byPost = {}
  comments.forEach((c) => { byPost[c.postId] = (byPost[c.postId] || 0) + 1 })
  const rows = posts
    .map((p) => ({ p, n: byPost[p.postId] || 0 }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 5)
  const max = Math.max(1, ...rows.map((r) => r.n))

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Most discussed posts</h2>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading comments…</p>}
      {!loading && rows.length === 0 && <p className="mt-6 text-sm text-slate-500">No comments yet.</p>}
      <ul className="mt-5 space-y-4">
        {rows.map(({ p, n }) => (
          <li key={p.postId}>
            <div className="mb-1.5 flex justify-between gap-3 text-sm">
              <Link to={`/posts/${p.postId}`} className="truncate text-slate-700 hover:underline">{p.title}</Link>
              <span className="font-medium text-slate-900">{n}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(n / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LatestComments({ comments, loading }) {
  const recent = [...comments].sort((a, b) => b.id - a.id).slice(0, 5)
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Latest comments</h2>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading comments…</p>}
      {!loading && recent.length === 0 && <p className="mt-6 text-sm text-slate-500">Comments from readers will show up here.</p>}
      <ul className="mt-4 space-y-4">
        {recent.map((c) => (
          <li key={c.id} className="flex gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
              {c.author[0]?.toUpperCase()}
            </div>
            <Link to={`/posts/${c.postId}`} className="min-w-0 hover:opacity-80">
              <p className="text-sm text-slate-900">
                <span className="font-medium">{c.author}</span>
                <span className="text-slate-500"> {c.isReply ? 'replied on' : 'on'} {c.postTitle}</span>
              </p>
              <p className="truncate text-sm text-slate-600">{c.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PostsTable({ posts, comments, loading, error, onDelete }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const byPost = {}
  comments.forEach((c) => { byPost[c.postId] = (byPost[c.postId] || 0) + 1 })

  const filtered = [...posts]
    .sort((a, b) => b.postId - a.postId)
    .filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()))
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, totalPages)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center gap-3 p-5">
        <h2 className="mr-auto font-semibold text-slate-900">Recent posts</h2>
        <input
          type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} placeholder="Search by title"
          className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 sm:w-60"
        />
        <Link to="/posts" className="text-sm font-medium text-emerald-600 hover:underline">View all</Link>
      </div>

      {loading && <p className="px-5 pb-6 text-sm text-slate-500">Loading your posts…</p>}
      {error && <p className="px-5 pb-6 text-sm text-red-700">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <div className="px-5 pb-8 text-sm text-slate-600">
          <p>You haven’t published anything yet.</p>
          <button onClick={() => navigate('/create-post')} className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700">
            Write your first post
          </button>
        </div>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Post</th>
                <th className="hidden px-3 py-3 font-medium md:table-cell">Category</th>
                <th className="hidden px-3 py-3 font-medium sm:table-cell">Words</th>
                <th className="px-3 py-3 font-medium">Comments</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((p) => (
                <tr key={p.postId} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link to={`/posts/${p.postId}`} className="flex items-center gap-3">
                      <img src={coverFor(p)} alt="" className="h-11 w-16 shrink-0 rounded-lg object-cover" />
                      <span className="max-w-xs truncate font-medium text-slate-900">{p.title}</span>
                    </Link>
                  </td>
                  <td className="hidden px-3 py-3 md:table-cell">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {getCategoryName(p) || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="hidden px-3 py-3 text-slate-600 sm:table-cell">{wordCount(p).toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-600">{byPost[p.postId] || 0}</td>
                  <td className="px-5 py-3 text-right">
                    <Link to={`/posts/${p.postId}`} className="mr-4 font-medium text-emerald-600 hover:underline">View</Link>
                    <button onClick={() => onDelete(p)} className="font-medium text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={current} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
    </div>
  )
}

/* ---------- Page ---------- */
export default function Dashboard() {
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()
  const name = user?.name || user?.username || 'there'

  const [menuOpen, setMenuOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getPosts()
        const list = Array.isArray(res.data) ? res.data : []
        console.log('Dashboard: first post from API =>', list[0])
        if (cancelled) return
        setPosts(list)
        setLoading(false)

        const results = await Promise.allSettled(list.map((p) => getCommentsByPostId(p.postId)))
        const all = []
        results.forEach((r, i) => {
          if (r.status !== 'fulfilled') return
          const d = r.value.data
          flattenComments(Array.isArray(d) ? d : d?.content ?? [], list[i], 0, all)
        })
        // A comment can appear twice (top-level and inside a parent's replies): keep one copy
        const unique = new Map()
        all.forEach((c) => {
          const prev = unique.get(c.id)
          unique.set(c.id, prev ? { ...c, isReply: prev.isReply || c.isReply } : c)
        })
        if (!cancelled) setComments([...unique.values()])
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        if (!cancelled) setError('Could not load posts. Check that your backend is running.')
      } finally {
        if (!cancelled) { setLoading(false); setCommentsLoading(false) }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    try {
      await deletePost(post.postId)
      setPosts((prev) => prev.filter((x) => x.postId !== post.postId))
      setComments((prev) => prev.filter((c) => c.postId !== post.postId))
    } catch (err) {
      console.error('Delete failed:', err.response?.status, err.response?.data)
      alert(err.response?.data?.message || 'Could not delete the post. Make sure you are logged in.')
    }
  }

  const totalPosts = posts.length
  const categories = new Set(posts.map(getCategoryName).filter(Boolean)).size
  const words = posts.reduce((s, p) => s + wordCount(p), 0)
  const perPost = totalPosts ? (comments.length / totalPosts).toFixed(1) : '0'

  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <Sidebar
        open={menuOpen} onClose={() => setMenuOpen(false)} token={token} name={name}
        onLogin={() => navigate('/login')} onLogout={() => { logout(); navigate('/login') }}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, {name}</p>
          </div>
          <button
            onClick={() => navigate('/create-post')}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Icon name="plus" className="h-4 w-4" /> Write a post
          </button>
        </header>

        <main className="space-y-6 p-4 sm:p-8">
          <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <StatCard label="Total posts" value={totalPosts} hint="Published on your blog" icon="doc" tone="bg-emerald-50 text-emerald-600" />
            <StatCard label="Comments" value={commentsLoading ? '…' : comments.length} hint={`${perPost} per post`} icon="chat" tone="bg-sky-50 text-sky-600" />
            <StatCard label="Categories" value={categories} hint="In use across posts" icon="tag" tone="bg-violet-50 text-violet-600" />
            <StatCard label="Words written" value={words.toLocaleString()} hint={`${totalPosts ? Math.round(words / totalPosts) : 0} per post`} icon="text" tone="bg-amber-50 text-amber-600" />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <CategoryDonut posts={posts} />
            <MostDiscussed posts={posts} comments={comments} loading={commentsLoading} />
          </section>

          <PostsTable posts={posts} comments={comments} loading={loading} error={error} onDelete={handleDelete} />

          <LatestComments comments={comments} loading={commentsLoading} />
        </main>
      </div>
    </div>
  )
}
