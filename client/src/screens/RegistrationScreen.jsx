import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Contul dumneavostră a fost creat.Bine ați venit!', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Un nume și un prenume sunt necesare.'),
        email: Yup.string().email('Adresă de email invalidă.').required('Adresa de email este necesară.'),
        password: Yup.string()
          .min(1, 'Parola este prea scurtă - trebuie să conțină cel puțin un caracter.')
          .required('Parola este necesară'),
        confirmPassword: Yup.string()
          .min(1, 'Parola este prea scurtă - trebuie să conțină cel puțin un caracter.')
          .required('Parola este necesară')
          .oneOf([Yup.ref('password'), null], 'Parolele trebuie să corespundă'),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={headingBR}>Crează un cont</Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>Ai deja un cont? </Text>
                  <Button as={ReactLink} to='/login' variant='link' colorScheme='purple'>
                    Conectează-te
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}
            >
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <AlertIcon />
                    <AlertTitle>Ne pare rău!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField type='text' name='name' placeholder='numele și prenumele dvs.' label='Nume și prenume' />
                    <TextField type='text' name='email' placeholder='nume@exemplu.com' label='Email' />
                    <PasswordTextField type='password' name='password' placeholder='parola ta' label='Parolă' />
                    <PasswordTextField
                      type='password'
                      name='confirmPassword'
                      placeholder='confirmă parola'
                      label='Confirmă parola'
                    />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='purple' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Înregistrează-te
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
