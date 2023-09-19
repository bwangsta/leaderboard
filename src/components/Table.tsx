type TableProps = {
  headers: string[]
  children: React.ReactNode
}

function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="mx-auto w-full max-w-7xl table-auto border-collapse text-left">
        <thead className="bg-slate-900">
          <tr className="text-lg font-bold">
            {headers.map((header) => {
              return <th key={header as React.Key}>{header}</th>
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default Table
