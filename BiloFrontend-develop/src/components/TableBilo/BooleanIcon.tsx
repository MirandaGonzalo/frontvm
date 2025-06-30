import { Image } from '@chakra-ui/react'
import check from '@/assets/icons/circle-check-big.svg'
import close from '@/assets/icons/circle-x.svg'
import { Tooltip } from '@chakra-ui/react'

const BooleanIcon = ({ value, tooltipTrue = "Activo", tooltipFalse = "Inactivo" }: { value: boolean, tooltipTrue?: string, tooltipFalse?: string }) => {
  return (
    <Tooltip label={value ? tooltipTrue : tooltipFalse} placement="top">
      <Image src={value ? check : close} boxSize="2rem"/>
    </Tooltip>
  )
}

export default BooleanIcon