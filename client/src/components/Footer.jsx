import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoStorefrontSharp } from 'react-icons/io5';

const Footer = () => (
  <Box w='100%' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Container as='footer' role='contentinfo' maxW='7xl'>
      <Stack
        spacing='8'
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        py={{ base: '12', md: '16' }}
      >
        <Stack spacing={{ base: '6', md: '8' }} align='start'>
          <Flex alignItems='center'>
            <Icon as={IoStorefrontSharp} h={10} w={10} color='purple.400' />
            <Text fontSize='2xl' fontWeight='extrabold'>
              Magazin online
            </Text>
          </Flex>
          <Text color='muted'>Alabala portocala.</Text>
        </Stack>
        <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
          <Stack direction='row' spacing='8'>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Suport clienți
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Contact</Button>
                <Button variant='link'>Metode de plată</Button>
                <Button variant='link'>Informații retur</Button>
              </Stack>
            </Stack>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Regulamente
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Certificate și siguranță</Button>
                <Button variant='link'>Termeni și condiții</Button>
                <Button variant='link'>Licență</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing='4'>
            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
              Fii la curent
            </Text>
            <Stack spacing='4' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
              <Input placeholder='Adresa ta de email' type='email' required />
              <Button variant='primary' type='submit' flexShrink={0}>
                Abonează-te
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} Magazin online. All rights reserved.
        </Text>
        <ButtonGroup variant='ghost'>
          <IconButton as='a' href='#' aria-label='LinkedIn' icon={<FaLinkedin fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='GitHub' icon={<FaGithub fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='Twitter' icon={<FaTwitter fontSize='1.25rem' />} />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
