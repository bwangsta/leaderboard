type TableHeaderProps = {
  headers: String[]
}

function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead className="bg-slate-900">
      <tr className="text-lg font-bold">
        {headers.map((header) => {
          return <th key={header as React.Key}>{header}</th>
        })}
      </tr>
    </thead>
  )
}

export default TableHeader
