type HeaderProps = {
  children: React.ReactNode
}

function Header({ children }: HeaderProps) {
  return <h1 className="my-4 text-left text-3xl font-bold">{children}</h1>
}

export default Header
