import ProfessionalCard from '../ProfessionalCard/ProfessionalCard'
import { IProfessional } from '../../interfaces/interfaces'
import { Box } from '@chakra-ui/react'

function ProfessionalsList() {
  const professionals: IProfessional[] = [
    { name: 'Richard', specialty: 'emdr therapy' },
    { name: 'Jesus', specialty: 'meditation' },
    { name: 'Alberto', specialty: 'psychiatry' },
    { name: 'Prof', specialty: 'neurology' },
  ]

  //Al darle click a alguni de ellos se deberia abrir el calendario para poder seleccionar la fecha .
  return (
    <Box ml="200px" w="40vw" mt="5rem">
      {professionals.map((professional, index) => (
        <ProfessionalCard professional={professional} key={index} />
      ))}
    </Box>
  )
}

export default ProfessionalsList
