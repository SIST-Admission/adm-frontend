import { Loading } from '@nextui-org/react'
export const Spinner = ({size = "sm", children}) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 64px)",
      fontFamily: "helvetica",
    }}>
    <Loading size={size} >
      <div style={{
        marginTop: ".6em",
      }}>
        {children}
      </div>
    </Loading>
    </div>
  )
}