import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu"

type DropdownProps = {
  buttonIcon: React.ReactNode
  children: React.ReactNode
}

function Dropdown({ buttonIcon, children }: DropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center gap-1 rounded-lg border-2 border-solid border-white p-2">
          {buttonIcon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 rounded-md bg-slate-700 shadow-2xl"
        align="end"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
