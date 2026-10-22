// Reusable pagination bar: Prev, page numbers (with "…"), Next
function getPages(current, total) {
  const set = new Set([1, total, current - 1, current, current + 1])
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push('…')
    out.push(n)
  })
  return out
}

export default function Pagination({ page, totalPages, onPageChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null

  const btn =
    'min-w-9 rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40'
  const from = totalItems ? (page - 1) * pageSize + 1 : 0
  const to = totalItems ? Math.min(page * pageSize, totalItems) : 0

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row">
      {totalItems ? (
        <p className="text-sm text-slate-500">
          Showing {from}–{to} of {totalItems}
        </p>
      ) : <span />}

      <nav className="flex flex-wrap items-center gap-1.5" aria-label="Pagination">
        <button
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {getPages(page, totalPages).map((p, i) =>
          p === '…' ? (
            <span key={`gap-${i}`} className="px-1 text-slate-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`${btn} ${
                p === page
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  )
}
