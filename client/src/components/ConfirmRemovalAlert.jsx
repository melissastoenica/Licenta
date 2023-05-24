import {
    Button,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogOverlay,
  } from '@chakra-ui/react';
  import { useDispatch } from 'react-redux';
  
  const ConfirmRemovalAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction }) => {
    const dispatch = useDispatch();
    const onDeleteItem = () => {
      dispatch(deleteAction(itemToDelete._id));
      onClose();
    };
  
    return (
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Șterge {itemToDelete.name}
            </AlertDialogHeader>
            <AlertDialogBody>Sunteți sigur/ă? Nu puteți anula această acțiune ulterior. </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Anulare
              </Button>
              <Button colorScheme='red' onClick={onDeleteItem} ml={3}>
                Șterge {itemToDelete.name}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };
  
  export default ConfirmRemovalAlert;