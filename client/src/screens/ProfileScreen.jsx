import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({ description: 'Profil salvat.', status: 'success', isClosable: true });
      dispatch(resetUpdateSuccess());
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: '', name: userInfo.name, confirmPassword: '' }}
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
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH='100vh'
          maxW={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing='10' direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack flex='1.5' mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize='3xl' fontWeight='extrabold'>
                Profil
              </Heading>
              <Stack spacing='6'>
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
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing='5'>
                    <FormControl>
                      <TextField
                        type='text'
                        name='name'
                        placeholder='numele și prenumele dvs.'
                        label='Nume și prenume'
                      />
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
                      Salvează
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
              <Card>
                <CardHeader>
                  <Heading size='md'> Raportul utilizatorului</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Înregistrat în {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
