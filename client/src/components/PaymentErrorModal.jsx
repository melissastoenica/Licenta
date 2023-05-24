import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Wrap,
} from '@chakra-ui/react';

const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent></ModalContent>
        <ModalBody>
          <Wrap justify='center' direction='column' align='center' mt='20px'>
            <Alert
              h='200px'
              status='error'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
            >
              <AlertIcon boxSize='55px' />
              <AlertTitle pt='8px' fontSize='xl'>
                Plata a eșuat!
              </AlertTitle>
              <AlertDescription>Nu am putut procesa plata ta.</AlertDescription>
            </Alert>
          </Wrap>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PaymentErrorModal;
