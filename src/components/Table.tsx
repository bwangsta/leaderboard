import TableHeader from "./TableHeader"

type TableProps = {
  headers: String[]
  children: React.ReactNode
}

function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto w-full max-w-7xl table-auto border-collapse text-left">
        <TableHeader headers={headers} />
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default Table
