import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import { useEffect, useState, useCallback } from 'react';
import CheckoutItem from './CheckoutItem';
import PaypalButton from './PaypalButton';

import { resetCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const CheckoutOrderSummary = () => {
  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const shipping = useCallback(
    () => (expressShipping === 'true' ? 19.99 : subtotal <= 1000 ? 14.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
    [shipping, subtotal]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    navigate('/order-success');
  };

  const onPaymentError = (error) => {
    toast({
      description:
        'Ceva a mers greșit în timpului procesului de plată. Vă rugăm să încercați din nou sau să vă asigurați că aveți fonduri suficiente.',
      status: 'error',

      duration: '600000',
      isClosable: true,
    });
  };

  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>Sumarul comenzii</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal} lei
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Livrare
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            ) : (
              `${shipping()} lei`
            )}
          </Text>
        </Flex>

        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            {Number(total())} lei
          </Text>
        </Flex>
      </Stack>

      <PaypalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />

      <Box align='center'>
        <Text fontSize='sm'>Aveți întrebări? Aveți nevoie de ajutor pentru a completa comanda?</Text>
        <Flex justifyContent='center' color={mode('purple.500', 'purple.100')}>
          <Flex align='center'>
            <ChatIcon />
            <Text m='2'>Chat Live</Text>
          </Flex>
          <Flex align='center'>
            <PhoneIcon />
            <Text m='2'>Telefon</Text>
          </Flex>
          <Flex align='center'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        <p>sau</p>
        <Link as={ReactLink} to='/products' ml='1' color='purple.500'>
          Continuă cumpărăturile
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
