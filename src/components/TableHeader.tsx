type TableHeaderProps = {
  headers: String[]
}

function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className="text-lg font-bold">
        {headers.map((header) => {
          return <td key={header as React.Key}>{header}</td>
        })}
      </tr>
    </thead>
  )
}

export default TableHeader
