import { Wrap, Alert, AlertIcon, AlertTitle, Stack, Button, useToast } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'Ați fost deconectat.', status: 'success', isClosable: true });
    navigate('/products');
  };
  return (
    <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
      <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='auto'
      >
        <AlertIcon boxSize='55px' />
        <AlertTitle pt='8px' fontSize='xl'>
          Plată efectuată cu succes!
        </AlertTitle>

        <Stack mt='20px' minW='200px'>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/your-orders'>
            Comanda ta
          </Button>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
            Produse
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
            Deconectați-vă
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderSuccessScreen;
