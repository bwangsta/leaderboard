import TableHeader from "./TableHeader"

type TableProps = {
  title: string
  headers: string[]
  children: React.ReactNode
}

function Table({ title, headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto w-full max-w-7xl table-auto border-collapse text-left">
        <caption className="my-4 text-left text-3xl font-bold">{title}</caption>
        <TableHeader headers={headers} />
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default Table
