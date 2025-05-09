import { LoaderCircle } from 'lucide-react'

export const LoadingComponent = () => {
  return (
    <div className="w-full md:w-[500px] h-[200px] items-center justify-center flex gap-4 opacity-70 mt-[150px]">
      <LoaderCircle className="w-16 h-16 animate-spin" />
      <h1 className="font-header uppercase w-min">Por favor, aguarde...</h1>
    </div>
  )
}
