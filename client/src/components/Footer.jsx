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
import { FaInstagram } from 'react-icons/fa';
import { GiLipstick } from 'react-icons/gi';

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
            <Icon as={GiLipstick} h={10} w={10} color='teal.400' />
            <Text fontSize='2xl' fontWeight='extrabold'>
              Saved by Make-up
            </Text>
          </Flex>
          <Text color='muted'>Make-up Shop.</Text>
        </Stack>
        <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
        </Stack>
      </Stack>
      <Divider />
      <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} Saved by Make-up. All rights reserved.
        </Text>

        <ButtonGroup variant='ghost'>
          <Text pt='2' pb='5' fontWeight='bold'>
            Instagram
          </Text>
          <IconButton
            as='a'
            href='https://www.instagram.com/saved.by.makeup/'
            aria-label='Instagram'
            icon={<FaInstagram fontSize='2rem' />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
