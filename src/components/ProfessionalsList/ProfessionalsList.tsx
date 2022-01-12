import ProfessionalCard from '../ProfessionalCard/ProfessionalCard'
import { IProfessional } from '../../interfaces/interfaces'
import { Box, Text } from '@chakra-ui/react'

function ProfessionalsList() {
  const professionals: IProfessional[] = [
    { name: 'Richard', specialty: 'emdr therapy' },
    { name: 'Jesus', specialty: 'meditation' },
    { name: 'Alberto', specialty: 'psychiatry' },
    { name: 'Prof', specialty: 'neurology' },
  ]

  //seria coool que si creas un usuario tipo professional ya te aparezca aqui
  //crear automaticamente en el localStorage todos estos personajes y tirar de ahi, es una opcion
  return (
    <Box ml="200px" w="40vw" mt="5rem">
      <Text ms="3rem">Click date to schedule ...</Text>
      {professionals.map((professional, index) => (
        <ProfessionalCard professional={professional} key={index} />
      ))}
    </Box>
  )
}

export default ProfessionalsList
