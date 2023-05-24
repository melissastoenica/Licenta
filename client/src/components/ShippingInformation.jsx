import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { setExpress } from '../redux/actions/cartActions';
import { useState } from 'react';
import { setShippingAddress, setShippingAddressError } from '../redux/actions/orderActions';

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: '', postalCode: '', city: '', country: '' }}
      validationSchema={Yup.object({
        address: Yup.string().required('Acest câmp este obligatoriu.').min(2, 'Această adresă este prea scurtă.'),
        postalCode: Yup.string().required('Acest câmp este obligatoriu.').min(2, 'Acest cod poștal este prea scurt.'),
        city: Yup.string().required('Acest câmp este obligatoriu.').min(2, 'Acest oraș este prea scurt'),
        country: Yup.string().required('Acest câmp este obligatoriu.').min(2, 'Această țară este prea scurtă.'),
      })}
    >
      {(formik) => (
        <VStack as='form'>
          <FormControl
            onChange={
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name='address' placeholder='Stradă' label='Stradă' />
            <Flex>
              <Box flex='1' mr='10'>
                <TextField name='postalCode' placeholder='Cod poștal' label='Cod poștal' type='number' />
              </Box>
              <Box flex='2'>
                <TextField name='city' placeholder='Oraș' label='Orș' />
              </Box>
            </Flex>
            <TextField name='country' placeholder='Țară' label='Țară' />
          </FormControl>

          <Box w='100%' h='180px' pr='5'>
            <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
              Metoda de livrare
            </Heading>
            <RadioGroup
              defaultValue='false'
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
                  <Box>
                    <Radio value='true'>
                      <Text fontWeight='bold'>Express 19.99 lei</Text>
                      <Text>Livrare în 24 de ore.</Text>
                    </Radio>
                  </Box>
                  <Stack spacing='6'>Express</Stack>
                </Stack>
                <Radio value='false'>
                  <Tooltip label='Livrare gratuită pentru comenzile peste 1000 de lei!'>
                    <Box>
                      <Text fontWeight='bold'>Standard 14.99 lei</Text>
                      <Text>Livrare în 2 - 3 zile lucrătoare.</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInformation;
