type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const buttonClass =
    'rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button type="button" className={buttonClass} onClick={() => onChange(page - 1)} disabled={page === 0}>
        이전
      </button>
      <span className="text-sm text-gray-600">
        {page + 1} / {totalPages|| '-'}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        다음
      </button>
    </div>
  )
}

export default Pagination